class forestPlatformMinigame extends baseMinigame
{
    constructor(canvas, ctx, onComplete, rewardPartKey = 'Part2')
    {
        super(canvas, ctx, onComplete);
        this.rewardPartKey = rewardPartKey;
        this.sprite = new Image();
        this.sprite.src = './assets/character/characterAnimationSpritesheet.png';
        this.spriteLoaded = false;
        this.sprite.onload = () => { this.spriteLoaded = true; };
        this.mapImages = {};
        for(const imageName of ['background1', 'wall', 'key', 'destination', 'lock', 'door', 'trap'])
        {
            const image = new Image();
            image.src = `./assets/map/${imageName}.png`;
            this.mapImages[imageName] = image;
        }
    }

    init()
    {
        this.hidePlayer = true;
        this.hideDpad = true;
        this.worldWidth = this.canvas.width;
        this.worldHeight = this.canvas.height;
        this.wallUnit = 24;
        this.itemUnit = this.wallUnit;
        this.gravity = 1800;
        this.runSpeed = 150;
        this.jumpHeight = this.wallUnit * 4;
        this.jumpSpeed = Math.sqrt(2 * this.gravity * this.jumpHeight);
        this.spawn = { x: 120, y: 592 };
        this.isComplete = false;
        this.goalStayTime = 0;
        this.heldKey = null;
        this.controlMode = 'player';
        this.growth = 0;
        this.namedObjects = new Set();
        this.nameNotice = '';
        this.nameNoticeTimer = 0;
        this.promptNotice = '';
        this.promptNoticeTimer = 0;
        this.prompts = [];

        this.platforms = [
            { x: 0, y: this.worldHeight - this.wallUnit * 2, width: this.worldWidth, height: this.wallUnit * 2 },
            { x: 300, y: 530, width: 190, height: 24 },
            { x: 620, y: 450, width: 190, height: 24 },
            { x: 930, y: 530, width: 190, height: 24 }
        ];

        // Wall dimensions are expressed in level units: width: 1, height: 1 is one wall block.
        this.walls = [
            { x: 540, y: 592, width: 1, height: 1 }
        ].map(wall => ({
            x: wall.x,
            y: wall.y,
            width: wall.width * this.wallUnit,
            height: wall.height * this.wallUnit
        }));

        this.boxes = [];
        this.keys = [];
        this.locks = [];
        this.doors = [];
        this.hiddenDoors = [];
        this.pressurePlates = [];
        this.photosensitiveSwitches = [];
        this.movingBlocks = [];
        this.lightSources = [];
        this.traps = [];
        this.fragileWalls = [];
        this.machines = [];
        this.consoles = [];
        this.mirrors = [];
        this.seeds = [];
        this.batteries = [];

        this.goal = { x: 1130, y: this.worldHeight - this.wallUnit * 2, width: this.itemUnit, height: this.itemUnit * 2 };
        this.player =
        {
            x: this.spawn.x,
            y: this.spawn.y,
            width: this.wallUnit,
            height: this.wallUnit * 2,
            renderWidth: this.wallUnit * 2,
            renderHeight: this.wallUnit * 2,
            velocityX: 0,
            velocityY: 0,
            grounded: false,
            direction: 'right',
            frameIndex: 0,
            animationTimer: 0,
            isMoving: false
        };

        this.normalPlayerWidth = this.player.width;
        this.normalPlayerHeight = this.player.height;

        this.machine = null;
        this.lightSources = [];
        this.beamSegments = [];
    }

    update(deltaTime)
    {
        if(window.Input && Input.consumePress('q'))
        {
            if(this.controlMode === 'machine')
            {
                this.controlMode = 'player';
            }
            else
            {
                this.stop(false);
            }
            return;
        }

        if(!this.isRunning || this.isComplete)
        {
            return;
        }

        const dt = Math.min(deltaTime, 0.05);

        if(this.controlMode === 'machine')
        {
            this.updateMachine();
            this.updateBeam();
            return;
        }

        const player = this.player;
        const wasGrounded = player.grounded;
        const movingLeft = window.Input && Input.isDown('a');
        const movingRight = window.Input && Input.isDown('d');

        player.velocityX = 0;
        player.isMoving = false;

        this.updateBoxes(dt);
        this.updateKeys(dt);
        this.updatePressurePlates();
        this.updatePhotosensitiveSwitches();
        this.updateBrickSwitches();
        this.updateMovingBlocks(dt);

        if(movingLeft)
        {
            player.velocityX = -this.runSpeed;
            player.direction = 'left';
            player.isMoving = true;
        }
        else if(movingRight)
        {
            player.velocityX = this.runSpeed;
            player.direction = 'right';
            player.isMoving = true;
        }

        if(this.controlMode !== 'combined' && window.Input && (Input.consumePress('w') || Input.consumePress(' ')) && wasGrounded)
        {
            player.velocityY = -this.jumpSpeed;
            player.grounded = false;
        }

        player.velocityY += this.gravity * dt;
        const pushFactor = this.isPushing(player, player.velocityX) ? 0.5 : 1;
        this.moveHorizontal(player, player.velocityX * pushFactor * dt);
        this.moveVertical(player, player.velocityY * dt);
        this.updateAnimation(player, dt);

        this.collectNearbyKey();
        this.handleInteractions();
        this.handleControlInteractions();
        this.updateSeedsAndBatteries();
        this.updateNearbyNames();
        this.updateNearbyPrompts();

        if(this.controlMode !== 'combined' && this.traps.some(trap => this.intersectsTrap(player, trap)))
        {
            this.stop(false);
            return;
        }

        if(this.controlMode === 'combined')
        {
            this.destroyFragileWalls();
            this.traps = this.traps.filter(trap => !this.intersectsTrap(this.player, trap));
        }

        this.updateBeam();
        this.updatePhotosensitiveSwitches();

        if(player.y > this.worldHeight + player.height)
        {
            this.resetPlayer();
        }

        if(this.intersects(player, this.goal))
        {
            this.goalStayTime += dt;
            if(this.goalStayTime >= 1)
            {
                this.isComplete = true;
                this.stop(true, this.rewardPartKey);
            }
        }
        else
        {
            this.goalStayTime = 0;
        }
    }

    moveHorizontal(player, distance)
    {
        player.x += distance;

        for(const platform of [...this.platforms, ...this.walls, ...this.fragileWalls, ...this.doors.filter(door => door.active !== false), ...this.hiddenDoors.filter(door => door.opened), ...this.movingBlocks])
        {
            if(!this.intersects(player, platform))
            {
                continue;
            }

            if(distance > 0)
            {
                player.x = platform.x - player.width / 2;
            }
            else if(distance < 0)
            {
                player.x = platform.x + platform.width + player.width / 2;
            }
            player.velocityX = 0;
        }

        for(const box of this.boxes)
        {
            if(!this.intersects(player, box))
            {
                continue;
            }

            const pushDistance = distance;
            if(!this.canMoveBox(box, pushDistance))
            {
                player.x = distance > 0 ? box.x - player.width / 2 : box.x + box.width + player.width / 2;
                player.velocityX = 0;
                continue;
            }

            box.x += pushDistance;
        }

        player.x = Math.max(player.width / 2, Math.min(this.worldWidth - player.width / 2, player.x));
    }

    moveVertical(player, distance)
    {
        player.y += distance;
        player.grounded = false;

        for(const platform of this.getColliders())
        {
            if(!this.intersects(player, platform))
            {
                continue;
            }

            if(distance > 0)
            {
                player.y = platform.y - player.height / 2;
                player.velocityY = 0;
                player.grounded = true;
            }
            else if(distance < 0)
            {
                player.y = platform.y + platform.height + player.height / 2;
                player.velocityY = 0;
            }
        }
    }

    intersects(player, rectangle)
    {
        const playerLeft = player.x - player.width / 2;
        const playerRight = player.x + player.width / 2;
        const playerTop = player.y - player.height / 2;
        const playerBottom = player.y + player.height / 2;

        return playerLeft < rectangle.x + rectangle.width &&
            playerRight > rectangle.x &&
            playerTop < rectangle.y + rectangle.height &&
            playerBottom > rectangle.y;
    }

    getColliders()
    {
        const openedHiddenDoors = this.hiddenDoors.filter(door => door.opened);
        const openDoors = this.doors.filter(door => door.active !== false);
        const movingBlocks = this.movingBlocks.filter(block => block.activeCollision !== false);
        return [...this.platforms, ...this.walls, ...this.fragileWalls, ...openDoors, ...openedHiddenDoors, ...this.boxes, ...movingBlocks, ...(this.machine ? [this.machine] : [])];
    }

    handleControlInteractions()
    {
        if(!window.Input || !Input.consumePress('e'))
        {
            return;
        }

        if(this.controlMode === 'player')
        {
            if(this.machine && this.isWithinRange(this.machine, this.wallUnit))
            {
                this.controlMode = 'combined';
                this.player.width = this.wallUnit * 2;
                this.player.height = this.wallUnit * 2;
                return;
            }

            const consoleObject = this.consoles.find(item => this.isWithinRange(item, this.wallUnit));
            if(consoleObject)
            {
                this.controlMode = 'machine';
            }
        }
        else if(this.controlMode === 'combined' && this.machine && this.isWithinRange(this.machine, this.wallUnit))
        {
            this.controlMode = 'player';
            this.player.width = this.normalPlayerWidth;
            this.player.height = this.normalPlayerHeight;
        }
    }

    updateMachine()
    {
        if(!this.machine || !window.Input)
        {
            return;
        }

        if(Input.isDown('a'))
        {
            this.machine.angle -= 0.025;
        }
        if(Input.isDown('d'))
        {
            this.machine.angle += 0.025;
        }
    }

    updateBeam()
    {
        this.beamSegments = [];
        if(!this.machine)
        {
            return;
        }

        const sources = this.machine ? [this.machine] : this.lightSources;
        for(const source of sources)
        {
            this.traceBeam(source.x + source.width / 2, source.y + source.height / 2, source.angle || 0, 0);
        }
    }

    traceBeam(startX, startY, angle, depth)
    {
        const maxLength = Math.max(this.worldWidth, this.worldHeight) * 2;
        const step = 4;
        let endX = startX;
        let endY = startY;
        let hitMirror = null;

        for(let distance = 0; distance <= maxLength; distance += step)
        {
            const point = { x: startX + Math.cos(angle) * distance, y: startY + Math.sin(angle) * distance };
            endX = point.x;
            endY = point.y;

            if(point.x < 0 || point.x > this.worldWidth || point.y < 0 || point.y > this.worldHeight)
            {
                break;
            }

            const blocker = [...this.walls, ...this.fragileWalls, ...this.movingBlocks, ...this.doors.filter(door => door.active !== false), ...this.hiddenDoors.filter(door => door.opened)].find(item => this.pointInRect(point, item));
            if(blocker)
            {
                break;
            }

            hitMirror = this.mirrors.find(mirror => this.pointInRect(point, mirror));
            if(hitMirror)
            {
                break;
            }

            this.illuminateBeamObjects(point);
        }

        this.beamSegments.push({ startX, startY, endX, endY });

        if(hitMirror && depth < 2)
        {
            const nextAngle = hitMirror.type === 'reflect' ? -angle : angle + Math.PI / 4;
            this.traceBeam(endX, endY, nextAngle, depth + 1);
        }
    }

    illuminateBeamObjects(point)
    {
        for(const seed of this.seeds)
        {
            if(this.pointInRect(point, seed))
            {
                if(!seed.germinated)
                {
                    seed.germinated = true;
                    this.growth += 1;
                }
            }
        }

        for(const battery of this.batteries)
        {
            if(this.pointInRect(point, battery) && battery.color)
            {
                battery.active = true;
                this.doors.forEach(door =>
                {
                    if(door.color === battery.color)
                    {
                        door.active = true;
                    }
                });
            }
        }
    }

    updateSeedsAndBatteries()
    {
        this.seeds.forEach(seed => { seed.germinated = !!seed.germinated; });
        this.batteries.forEach(battery => { battery.active = !!battery.active; });
    }

    destroyFragileWalls()
    {
        this.fragileWalls = this.fragileWalls.filter(wall => !this.intersects(this.player, wall));
    }

    pointInRect(point, rectangle)
    {
        return point.x >= rectangle.x && point.x <= rectangle.x + rectangle.width &&
            point.y >= rectangle.y && point.y <= rectangle.y + rectangle.height;
    }

    updateBoxes(deltaTime)
    {
        for(const box of this.boxes)
        {
            box.velocityY = (box.velocityY || 0) + this.gravity * deltaTime;
            box.y += box.velocityY * deltaTime;

            for(const collider of [...this.platforms, ...this.walls, ...this.doors.filter(door => door.active !== false), ...this.hiddenDoors.filter(door => door.opened)])
            {
                if(!this.intersectsRect(box, collider))
                {
                    continue;
                }

                if(box.velocityY > 0)
                {
                    box.y = collider.y - box.height;
                    box.velocityY = 0;
                }
            }
        }
    }

    canMoveBox(box, distance)
    {
        const nextBox = { ...box, x: box.x + distance };
        return !this.getColliders().some(collider => collider !== box && this.intersectsRect(nextBox, collider));
    }

    isPushing(player, velocityX)
    {
        if(velocityX === 0)
        {
            return false;
        }

        return this.boxes.some(box =>
        {
            const touching = this.intersects(player, box);
            const inDirection = velocityX > 0 ? player.x < box.x : player.x > box.x;
            return touching && inDirection;
        });
    }

    updateKeys(deltaTime)
    {
        for(const key of this.keys)
        {
            key.velocityY = (key.velocityY || 0) + this.gravity * deltaTime;
            key.y += key.velocityY * deltaTime;

            for(const collider of [...this.platforms, ...this.walls, ...this.doors.filter(door => door.active !== false), ...this.hiddenDoors.filter(door => door.opened), ...this.boxes])
            {
                if(this.intersectsRect(key, collider) && key.velocityY > 0)
                {
                    key.y = collider.y - key.height;
                    key.velocityY = 0;
                }
            }
        }
    }

    collectNearbyKey()
    {
        const range = this.wallUnit * 3;
        const playerCenter = { x: this.player.x, y: this.player.y };
        const keyIndex = this.keys.findIndex(key =>
            Math.abs(playerCenter.x - (key.x + key.width / 2)) <= range &&
            Math.abs(playerCenter.y - (key.y + key.height / 2)) <= range
        );

        if(keyIndex === -1)
        {
            return;
        }

        this.heldKey = this.keys[keyIndex].color;
        this.keys.splice(keyIndex, 1);
    }

    handleInteractions()
    {
        const lockRange = Math.max(this.wallUnit, this.worldWidth / 50 * 2);
        const doorRange = this.wallUnit * 3;
        const nearLock = this.locks.find(lock => this.isWithinRange(lock, lockRange));
        const nearDoor = this.doors.find(door => door.active !== false && this.isWithinRange(door, doorRange));
        const target = nearLock || nearDoor;

        if(!target || !window.Input || !Input.consumePress('e'))
        {
            return;
        }

        if(nearLock || this.heldKey === target.color)
        {
            if(nearLock)
            {
                this.locks = this.locks.filter(lock => lock !== nearLock);
                this.openDoorsForChannel(nearLock.channel || nearLock.color);
            }
            else
            {
                this.openDoorsForChannel(target.channel || target.color);
            }
            this.heldKey = null;
        }
    }

    openDoorsForChannel(channel)
    {
        this.doors.forEach(door =>
        {
            if(door.controlSource === 'lock' && (door.channel || door.color) === channel)
            {
                door.active = false;
            }
        });
        this.hiddenDoors.forEach(door =>
        {
            if(door.controlSource === 'lock' && (door.channel || door.color) === channel)
            {
                door.opened = true;
            }
        });
    }

    updatePressurePlates()
    {
        for(const plate of this.pressurePlates)
        {
            const playerOnPlate = this.intersectsRect(this.playerBounds(), plate);
            const heavyObjectOnPlate = this.boxes.some(box => this.isObjectOnPlate(box, plate));
            plate.active = playerOnPlate || heavyObjectOnPlate;

            const channel = plate.channel || plate.color;
            this.doors.forEach(door =>
            {
                if(door.controlSource === 'pressure' && (door.channel || door.color) === channel)
                {
                    door.active = plate.active;
                }
            });
            this.hiddenDoors.forEach(door =>
            {
                if(door.controlSource === 'pressure' && (door.channel || door.color) === channel)
                {
                    door.opened = plate.active;
                }
            });
        }
    }

    updatePhotosensitiveSwitches()
    {
        for(const switchObject of this.photosensitiveSwitches)
        {
            switchObject.active = this.beamSegments.some(segment => this.segmentIntersectsRect(segment, switchObject));
            this.updateSwitchTargets(switchObject);
        }
    }

    updateSwitchTargets(switchObject)
    {
        const channel = switchObject.channel || switchObject.color;
        for(const door of this.doors)
        {
            if(door.controlSource === 'photosensitive' && (door.channel || door.color) === channel)
            {
                door.active = switchObject.active;
            }
        }
        for(const hiddenDoor of this.hiddenDoors)
        {
            if(hiddenDoor.controlSource === 'photosensitive' && (hiddenDoor.channel || hiddenDoor.color) === channel)
            {
                hiddenDoor.opened = switchObject.active;
            }
        }
    }

    updateMovingBlocks(deltaTime)
    {
        for(const block of this.movingBlocks)
        {
            const target = block.active ? block.target : block.origin;
            const dx = target.x - block.x;
            const dy = target.y - block.y;
            const distance = Math.hypot(dx, dy);

            if(distance <= block.speed * deltaTime)
            {
                block.x = target.x;
                block.y = target.y;
                continue;
            }

            block.x += dx / distance * block.speed * deltaTime;
            block.y += dy / distance * block.speed * deltaTime;
        }
    }

    updateBrickSwitches()
    {
        for(const switchObject of this.brickSwitches || [])
        {
            switchObject.active = this.intersectsRect(this.playerBounds(), switchObject);
            for(const block of this.movingBlocks)
            {
                if((block.channel || block.color) === switchObject.channel)
                {
                    block.active = switchObject.active;
                }
            }
        }
    }

    segmentIntersectsRect(segment, rectangle)
    {
        const steps = Math.max(1, Math.ceil(Math.hypot(segment.endX - segment.startX, segment.endY - segment.startY) / 4));
        for(let index = 0; index <= steps; index++)
        {
            const ratio = index / steps;
            const point = {
                x: segment.startX + (segment.endX - segment.startX) * ratio,
                y: segment.startY + (segment.endY - segment.startY) * ratio
            };
            if(this.pointInRect(point, rectangle))
            {
                return true;
            }
        }
        return false;
    }

    isObjectOnPlate(object, plate)
    {
        const overlap = object.x < plate.x + plate.width && object.x + object.width > plate.x;
        const bottom = object.y + object.height;
        return overlap && bottom >= plate.y - 2 && bottom <= plate.y + plate.height + 2;
    }

    playerBounds()
    {
        return {
            x: this.player.x - this.player.width / 2,
            y: this.player.y - this.player.height / 2,
            width: this.player.width,
            height: this.player.height
        };
    }

    intersectsTrap(player, trap)
    {
        const activeTrapArea = {
            x: trap.x,
            y: trap.y + trap.height / 2,
            width: trap.width,
            height: trap.height / 2
        };
        return this.intersectsRect(this.playerBoundsFor(player), activeTrapArea);
    }

    playerBoundsFor(player)
    {
        return {
            x: player.x - player.width / 2,
            y: player.y - player.height / 2,
            width: player.width,
            height: player.height
        };
    }

    isWithinRange(rectangle, range)
    {
        return Math.abs(this.player.x - (rectangle.x + rectangle.width / 2)) <= range &&
            Math.abs(this.player.y - (rectangle.y + rectangle.height / 2)) <= range;
    }

    updateNearbyNames()
    {
        const objects = [
            ...this.boxes,
            ...this.keys,
            ...this.locks,
            ...this.doors,
            ...this.traps,
            ...this.fragileWalls,
            ...this.consoles,
            ...(this.machine ? [this.machine] : []),
            ...this.mirrors,
            ...this.seeds,
            ...this.batteries,
            this.goal
        ];
        const range = this.wallUnit * 3;

        for(const object of objects)
        {
            if(!object || !object.name || this.namedObjects.has(object.name))
            {
                continue;
            }

            if(this.isWithinRange(object, range))
            {
                this.namedObjects.add(object.name);
                this.nameNotice = object.name;
                this.nameNoticeTimer = 2.5;
                break;
            }
        }

        if(this.nameNoticeTimer > 0)
        {
            this.nameNoticeTimer = Math.max(0, this.nameNoticeTimer - 1 / 60);
        }
    }

    updateNearbyPrompts()
    {
        const range = this.wallUnit * 3;
        const prompt = this.prompts.find(item =>
            !item.shown && this.isWithinRange(item, range)
        );

        if(prompt)
        {
            prompt.shown = true;
            this.promptNotice = prompt.text;
            this.promptNoticeTimer = 10;
        }

        if(this.promptNoticeTimer > 0)
        {
            this.promptNoticeTimer = Math.max(0, this.promptNoticeTimer - 1 / 60);
        }
    }

    intersectsRect(first, second)
    {
        return first.x < second.x + second.width &&
            first.x + first.width > second.x &&
            first.y < second.y + second.height &&
            first.y + first.height > second.y;
    }

    resetPlayer()
    {
        this.player.x = this.spawn.x;
        this.player.y = this.spawn.y;
        this.player.velocityX = 0;
        this.player.velocityY = 0;
        this.player.grounded = false;
    }

    updateAnimation(player, deltaTime)
    {
        if(!player.isMoving || !player.grounded)
        {
            player.frameIndex = 0;
            player.animationTimer = 0;
            return;
        }

        player.animationTimer += deltaTime;
        if(player.animationTimer >= 0.15)
        {
            player.animationTimer = 0;
            player.frameIndex = (player.frameIndex + 1) % 3;
        }
    }

    render()
    {
        const ctx = this.ctx;
        const background = this.mapImages.background1;
        if(background.complete && background.naturalWidth > 0)
        {
            ctx.drawImage(background, 0, 0, this.worldWidth, this.worldHeight);
        }
        else
        {
            ctx.fillStyle = '#183b3b';
            ctx.fillRect(0, 0, this.worldWidth, this.worldHeight);
        }

        for(const platform of this.platforms)
        {
            ctx.fillStyle = '#7a5037';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            ctx.fillStyle = '#9bd15b';
            ctx.fillRect(platform.x, platform.y, platform.width, 8);
        }

        for(const wall of this.walls)
        {
            this.drawWallTiles(wall);
        }

        for(const box of this.boxes)
        {
            ctx.fillStyle = '#a86f3d';
            ctx.fillRect(box.x, box.y, box.width, box.height);
            ctx.strokeStyle = '#5b3928';
            ctx.lineWidth = 3;
            ctx.strokeRect(box.x, box.y, box.width, box.height);
            ctx.beginPath();
            ctx.moveTo(box.x + 6, box.y + 6);
            ctx.lineTo(box.x + box.width - 6, box.y + box.height - 6);
            ctx.moveTo(box.x + box.width - 6, box.y + 6);
            ctx.lineTo(box.x + 6, box.y + box.height - 6);
            ctx.stroke();
        }

        for(const key of this.keys)
        {
            this.drawMapImage('key', key);
        }

        for(const lock of this.locks)
        {
            this.drawMapImage('lock', lock);
        }

        for(const door of this.doors.filter(door => door.active !== false))
        {
            this.drawMapTiles('door', door);
        }

        for(const door of this.hiddenDoors)
        {
            if(!door.opened)
            {
                continue;
            }

            this.drawWallTiles(door);
        }

        for(const plate of this.pressurePlates)
        {
            ctx.fillStyle = plate.active ? '#e6c84f' : '#8c7c38';
            ctx.fillRect(plate.x, plate.y, plate.width, plate.height);
            ctx.strokeStyle = '#fff3a6';
            ctx.lineWidth = 2;
            ctx.strokeRect(plate.x, plate.y, plate.width, plate.height);
        }

        for(const switchObject of this.photosensitiveSwitches)
        {
            ctx.fillStyle = switchObject.active ? '#f6df5b' : '#765f24';
            ctx.fillRect(switchObject.x, switchObject.y, switchObject.width, switchObject.height);
            ctx.strokeStyle = '#fff4a3';
            ctx.strokeRect(switchObject.x, switchObject.y, switchObject.width, switchObject.height);
        }

        for(const block of this.movingBlocks)
        {
            this.drawWallTiles(block);
        }

        for(const trap of this.traps)
        {
            this.drawMapTiles('trap', trap);
        }

        for(const fragileWall of this.fragileWalls)
        {
            ctx.fillStyle = '#76504b';
            ctx.fillRect(fragileWall.x, fragileWall.y, fragileWall.width, fragileWall.height);
            ctx.strokeStyle = '#e0aaa0';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(fragileWall.x + 4, fragileWall.y + 6);
            ctx.lineTo(fragileWall.x + fragileWall.width / 2, fragileWall.y + fragileWall.height / 2);
            ctx.lineTo(fragileWall.x + fragileWall.width - 4, fragileWall.y + 8);
            ctx.stroke();
        }

        for(const mirror of this.mirrors)
        {
            ctx.fillStyle = mirror.type === 'reflect' ? '#8ad8e8' : '#d69be8';
            ctx.fillRect(mirror.x, mirror.y, mirror.width, mirror.height);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(mirror.x, mirror.y, mirror.width, mirror.height);
        }

        for(const seed of this.seeds)
        {
            ctx.fillStyle = seed.germinated ? '#72d572' : '#c4a06a';
            ctx.fillRect(seed.x, seed.y, seed.width, seed.height);
        }

        for(const battery of this.batteries)
        {
            ctx.fillStyle = battery.active ? battery.color : '#68727a';
            ctx.fillRect(battery.x, battery.y, battery.width, battery.height);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(battery.x, battery.y, battery.width, battery.height);
        }

        for(const consoleObject of this.consoles)
        {
            ctx.fillStyle = '#1b2d35';
            ctx.fillRect(consoleObject.x, consoleObject.y, consoleObject.width, consoleObject.height);
            ctx.strokeStyle = '#8de5f2';
            ctx.lineWidth = 2;
            ctx.strokeRect(consoleObject.x, consoleObject.y, consoleObject.width, consoleObject.height);
            ctx.fillStyle = '#d9f0f5';
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('C', consoleObject.x + consoleObject.width / 2, consoleObject.y + consoleObject.height * 0.65);
            if(this.isWithinRange(consoleObject, this.wallUnit))
            {
                ctx.font = '12px sans-serif';
                ctx.fillText('E 操作', consoleObject.x + consoleObject.width / 2, consoleObject.y - 8);
            }
        }

        if(this.machine)
        {
            ctx.fillStyle = '#75828b';
            ctx.fillRect(this.machine.x, this.machine.y, this.machine.width, this.machine.height);
            ctx.strokeStyle = '#d9e2e6';
            ctx.strokeRect(this.machine.x, this.machine.y, this.machine.width, this.machine.height);
        }

        for(const source of this.lightSources)
        {
            ctx.fillStyle = '#f6df5b';
            ctx.fillRect(source.x, source.y, source.width, source.height);
            ctx.strokeStyle = '#fff4a3';
            ctx.strokeRect(source.x, source.y, source.width, source.height);
        }

        for(const segment of this.beamSegments || [])
        {
            ctx.strokeStyle = '#fff4a3';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(segment.startX, segment.startY);
            ctx.lineTo(segment.endX, segment.endY);
            ctx.stroke();
        }

        this.drawMapImage('destination', this.goal);
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`出口 ${Math.min(1, this.goalStayTime).toFixed(1)}s`, this.goal.x + this.goal.width / 2, this.goal.y - 6);

        this.drawPlayer();

        ctx.fillStyle = '#ffffff';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('A/D 跑动  W/空格 跳跃  E 交互  Q 退出', 24, 34);
        ctx.fillText(`钥匙：${this.heldKey || '无'}`, 24, this.worldHeight - 24);
        ctx.fillText(`萌发值：${this.growth}`, 150, this.worldHeight - 24);
        ctx.fillText(`控制：${this.controlMode}`, 300, 34);

        if(this.nameNoticeTimer > 0)
        {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            ctx.fillRect(this.worldWidth / 2 - 140, 54, 280, 34);
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(this.nameNotice, this.worldWidth / 2, 77);
        }

        if(this.promptNoticeTimer > 0)
        {
            ctx.fillStyle = 'rgba(80, 80, 80, 0.9)';
            ctx.fillRect(this.worldWidth / 2 - 280, this.worldHeight - 92, 560, 42);
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(this.promptNotice, this.worldWidth / 2, this.worldHeight - 65);
        }
    }

    drawMapImage(imageName, rectangle)
    {
        const image = this.mapImages[imageName];
        if(image && image.complete && image.naturalWidth > 0)
        {
            this.ctx.drawImage(image, rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        }
    }

    drawWallTiles(rectangle)
    {
        const image = this.mapImages.wall;
        if(!image || !image.complete || image.naturalWidth === 0)
        {
            this.ctx.fillStyle = '#6b4633';
            this.ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            return;
        }

        const cellWidth = this.worldWidth / 50;
        const cellHeight = this.worldHeight / 50;
        const columns = Math.max(1, Math.round(rectangle.width / cellWidth));
        const rows = Math.max(1, Math.round(rectangle.height / cellHeight));

        for(let row = 0; row < rows; row++)
        {
            for(let column = 0; column < columns; column++)
            {
                this.ctx.drawImage(
                    image,
                    rectangle.x + column * cellWidth,
                    rectangle.y + row * cellHeight,
                    cellWidth,
                    cellHeight
                );
            }
        }
    }

    drawMapTiles(imageName, rectangle)
    {
        const image = this.mapImages[imageName];
        if(!image || !image.complete || image.naturalWidth === 0)
        {
            return;
        }

        const cellWidth = this.worldWidth / 50;
        const cellHeight = this.worldHeight / 50;
        const columns = Math.max(1, Math.round(rectangle.width / cellWidth));
        const rows = Math.max(1, Math.round(rectangle.height / cellHeight));

        for(let row = 0; row < rows; row++)
        {
            for(let column = 0; column < columns; column++)
            {
                this.ctx.drawImage(
                    image,
                    rectangle.x + column * cellWidth,
                    rectangle.y + row * cellHeight,
                    cellWidth,
                    cellHeight
                );
            }
        }
    }

    drawPlayer()
    {
        const player = this.player;
        const baseFrame = player.direction === 'left' ? 9 : 6;
        const frame = baseFrame + player.frameIndex;
        const drawWidth = player.renderWidth;
        const drawHeight = player.renderHeight;

        if(this.spriteLoaded)
        {
            this.ctx.drawImage(
                this.sprite,
                frame * 304,
                0,
                304,
                304,
                player.x - drawWidth / 2,
                player.y - drawHeight / 2,
                drawWidth,
                drawHeight
            );
            return;
        }

        this.ctx.fillStyle = '#8ed1fc';
        this.ctx.fillRect(player.x - drawWidth / 2, player.y - drawHeight / 2, drawWidth, drawHeight);
    }

    cleanup()
    {
        this.sprite.onload = null;
    }
}

window.forestPlatformMinigame = forestPlatformMinigame;
