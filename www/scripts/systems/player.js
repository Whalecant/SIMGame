const player = 
{
    x: 640,
    y: 400,
    width: 48,
    height: 48,
    speed: 5,
    color: 'skyblue',

    sprite: new Image(),
    isLoaded: false,
    
    // for spritesheet per frame thing
    frameWidth: 304,
    frameHeight: 304,
    direction: 'down',
    frameIndex: 0,
    animTimer: 0,
    animSpeed: 0.15,
    isMoving: false,

    squishScaleY: [1.0, 0.9, 1.0],
    squishScaleX: [1.0, 1.15, 1.0],

    directionMap:
    {
        'down': 0,
        'up': 3,
        'left': 6,
        'right': 9
    },

    init()
    {
        this.sprite.src = './assets/character/characterAnimationSpritesheet.png';

        this.sprite.onload = () => {this.isLoaded = true;};
    },

    update(deltaTime)
    {
        if(!window.Input)
        {
            return;
        }

        const freeze = window.overworld && overworld.isTrans;
        const currRoom = window.roomManager ? roomManager.currRoomId : 'hub';

        if(!freeze)
        {
            const prevX = this.x;
            const prevY = this.y;

            this.isMoving = false;

            if(Input.isDown('w'))
            {
                this.y -=this.speed;
                this.direction = 'up';
                this.isMoving = true; 
            }

            if(Input.isDown('s'))
            {
                this.y += this.speed;
                this.direction = 'down';
                this.isMoving = true;
            }

            if(window.roomManager && roomManager.currRoomId === 'hub' && window.Vehicle && vehicle.boxCollider(this, this.x, this.y))
            {
                this.y = prevY;
            }

            if(window.roomManager && roomManager.currRoomId === 'hub' && window.savePoint && savePoint.boxCollider(this, this.x, this.y))
            {
                this.y = prevY;
            }

            if(Input.isDown('a'))
            {
                this.x -= this.speed;
                this.direction = 'left';
                this.isMoving = true;
            }

            if(Input.isDown('d'))
            {
                this.x += this.speed;
                this.direction = 'right';
                this.isMoving = true;
            }

            if(window.roomManager && roomManager.currRoomId === 'hub' && window.Vehicle && vehicle.boxCollider(this, this.x, this.y))
            {
                this.x = prevX;
            }

            if(window.roomManager && roomManager.currRoomId === 'hub' && window.savePoint && savePoint.boxCollider(this, this.x, this.y))
            {
                this.x = prevX;
            }
            
            if(this.isMoving)
            {
                this.animTimer += deltaTime;

                if(this.animTimer >= this.animSpeed)
                {
                    this.animTimer = 0;
                    this.frameIndex = (this.frameIndex + 1) % 3 // each animation is a cycle of 3, so it'll naturall loop back to the first state after ti reacehs the end... hopefully
                }
                
            }
            else
            {
                this.frameIndex = 0;
                this.animTimer = 0;
            }
        }

        

        /*if(window.roomManager)
        {
            roomManager.roomClamp(this);
        }*/

        if(window.overworld)
        {
            overworld.update(this, deltaTime);
        }
    },

    render(ctx)
    {
        if(this.isLoaded)
        {
            // shit for spritesheet stuff
            const baseFrame = this.directionMap[this.direction];
            const currFrame = baseFrame + this.frameIndex;
            const sx = currFrame * this.frameWidth;
            const sy = 0;

            const scaleY = this.isMoving ? this.squishScaleY[this.frameIndex] : 1.0;
            const scaleX = this.isMoving ? this.squishScaleX[this.frameIndex] : 1.0;

            const drawWidth = Math.round(this.width *  scaleX);
            const drawHeight = Math.round(this.height * scaleY);

            ctx.drawImage
            (
                this.sprite,
                sx, 
                sy,
                this.frameWidth,
                this.frameHeight,
                this.x - drawWidth/2,
                this.y - this.height/2 + (this.height - drawHeight),
                drawWidth,
                drawHeight
            );
        }
        else
        {
        
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }

    }
};


player.init();

window.Player = player; //load bearing player :)) (ok no but in all seriousness, this lets like... everything else works lol, because they all search for this)