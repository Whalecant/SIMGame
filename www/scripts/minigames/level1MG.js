class forestLevel1Minigame extends forestPlatformMinigame
{
    init()
    {
        super.init();
        this.levelData = {
            id: 1,
            spawn: { x: 168, y: 648 },
            platforms: [
                { x: 0, y: this.worldHeight - this.wallUnit * 2, width: this.worldWidth, height: this.wallUnit * 2 },
                { x: 144, y: 600, width: 144, height: 24 },
                { x: 336, y: 528, width: 168, height: 24 },
                { x: 576, y: 600, width: 120, height: 24 },
                { x: 744, y: 480, width: 168, height: 24 },
                { x: 960, y: 576, width: 192, height: 24 }
            ],
            walls: [
                { x: 288, y: 576, width: 2, height: 4, name: '石墙' },
                { x: 696, y: 552, width: 2, height: 5, name: '石墙' }
            ],
            boxes: [{ x: 192, y: 576, width: 1, height: 1, name: '箱子' }],
            keys: [{ x: 792, y: 432, width: 1, height: 1, color: 'yellow', name: '黄色钥匙' }],
            locks: [{ x: 1056, y: 624, width: 1, height: 1, color: 'yellow', name: '黄色机关锁' }],
            doors: [{ x: 1128, y: 600, width: 1, height: 3, color: 'yellow', name: '黄色机关门' }],
            traps: [
                { x: 528, y: 648, width: 1, height: 1, name: '尖刺陷阱' },
                { x: 552, y: 648, width: 1, height: 1, name: '尖刺陷阱' }
            ],
            machine: { x: 120, y: 624, width: 2, height: 2, angle: 0, name: '机械' },
            consoles: [{ x: 48, y: 624, width: 2, height: 2, name: '控制台' }],
            fragileWalls: [{ x: 912, y: 624, width: 2, height: 2, name: '易碎墙' }],
            mirrors: [
                { x: 360, y: 624, width: 1, height: 2, type: 'reflect', name: '反射镜' },
                { x: 360, y: 504, width: 1, height: 2, type: 'refract', name: '折射镜' }
            ],
            seeds: [{ x: 360, y: 456, width: 1, height: 1, name: '种子' }],
            batteries: [{ x: 792, y: 432, width: 1, height: 1, color: 'yellow', name: '光敏电池' }]
        };
        this.applyLevelData();
    }

    applyLevelData()
    {
        this.spawn = this.levelData.spawn;
        this.platforms = this.levelData.platforms;
        this.walls = this.levelData.walls.map(wall => ({ ...wall, width: wall.width * this.wallUnit, height: wall.height * this.wallUnit }));
        this.boxes = this.levelData.boxes.map(box => ({ ...box, width: box.width * this.itemUnit, height: box.height * this.itemUnit }));
        this.keys = this.levelData.keys.map(key => ({ ...key, width: key.width * this.itemUnit, height: key.height * this.itemUnit }));
        this.locks = this.levelData.locks.map(lock => ({ ...lock, width: lock.width * this.itemUnit, height: lock.height * this.itemUnit }));
        this.doors = this.levelData.doors.map(door => ({ ...door, width: door.width * this.itemUnit, height: door.height * this.itemUnit }));
        this.traps = this.levelData.traps.map(trap => ({ ...trap, width: trap.width * this.itemUnit, height: trap.height * this.itemUnit }));
        this.machine = {
            ...this.levelData.machine,
            x: this.levelData.machine.x,
            y: this.levelData.machine.y,
            width: this.levelData.machine.width * this.itemUnit,
            height: this.levelData.machine.height * this.itemUnit
        };
        this.consoles = this.levelData.consoles.map(item => ({ ...item, width: item.width * this.itemUnit, height: item.height * this.itemUnit }));
        this.fragileWalls = this.levelData.fragileWalls.map(wall => ({ ...wall, width: wall.width * this.wallUnit, height: wall.height * this.wallUnit }));
        this.mirrors = this.levelData.mirrors.map(mirror => ({ ...mirror, width: mirror.width * this.itemUnit, height: mirror.height * this.itemUnit }));
        this.seeds = this.levelData.seeds.map(seed => ({ ...seed, width: seed.width * this.itemUnit, height: seed.height * this.itemUnit, germinated: false }));
        this.batteries = this.levelData.batteries.map(battery => ({ ...battery, width: battery.width * this.itemUnit, height: battery.height * this.itemUnit, active: false }));
        this.resetPlayer();
    }
}

window.forestLevel1Minigame = forestLevel1Minigame;
