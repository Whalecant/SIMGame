class forestLevel3Minigame extends forestLevel2Minigame
{
    init()
    {
        super.init();
        this.levelData = {
            id: 3,
            spawn: this.cellRect(23, 48, 2, 2),
            exit: this.cellRect(48, 48, 2, 2),
            walls: this.wallRanges([
                [50, 1, 50, 11], [31, 12, 50, 14], [31, 15, 34, 16], [36, 15, 50, 16],
                [50, 17, 50, 23], [43, 24, 50, 24], [50, 25, 50, 25], [41, 26, 42, 26],
                [50, 26, 50, 27], [39, 28, 40, 28], [50, 28, 50, 29], [37, 30, 38, 30],
                [50, 30, 50, 32], [25, 33, 45, 35], [50, 33, 50, 35], [25, 36, 26, 36],
                [43, 36, 43, 36], [50, 36, 50, 36], [25, 37, 26, 37], [50, 37, 50, 37],
                [21, 38, 22, 38], [25, 38, 26, 38], [50, 38, 50, 38], [25, 39, 26, 39],
                [50, 39, 50, 39], [25, 40, 26, 40], [43, 40, 43, 40], [50, 40, 50, 40],
                [11, 41, 14, 41], [18, 41, 20, 41], [25, 41, 26, 41], [29, 41, 50, 41],
                [11, 42, 11, 42], [25, 42, 26, 42], [29, 42, 50, 42], [11, 43, 11, 43],
                [25, 43, 26, 43], [29, 43, 50, 43], [11, 44, 11, 44], [25, 44, 26, 44],
                [47, 44, 47, 44], [50, 44, 50, 44], [4, 45, 11, 45], [25, 45, 26, 45],
                [47, 45, 47, 45], [50, 45, 50, 45], [25, 46, 26, 46], [47, 46, 47, 46],
                [50, 46, 50, 46], [1, 47, 1, 47], [25, 47, 26, 47], [50, 47, 50, 47],
                [1, 48, 1, 48], [25, 48, 26, 48], [50, 48, 50, 48], [1, 49, 1, 49],
                [25, 49, 26, 49], [50, 49, 50, 49], [1, 50, 50, 50]
            ]),
            boxes: [
                { ...this.cellRect(35, 15), name: '箱子' },
                { ...this.cellRect(8, 44), name: '箱子' }
            ],
            keys: [{ ...this.cellRect(46, 23), color: 'yellow', name: '钥匙4' }],
            locks: [{ ...this.cellRect(35, 32), color: 'yellow', channel: 'lock5', name: '机关锁5' }],
            doors: [
                { ...this.cellRect(43, 37, 1, 3), color: 'yellow', channel: 'lock5', controlSource: 'lock', active: true, name: '机关门5' },
                { ...this.cellRect(47, 47, 1, 3), color: 'yellow', channel: 'lock5', controlSource: 'lock', active: true, name: '机关门4' }
            ],
            hiddenDoors: [{ ...this.cellRect(15, 41, 3, 1), color: 'green', channel: 'photo2', controlSource: 'photosensitive', opened: false, name: '隐藏门2' }],
            pressurePlates: [],
            photosensitiveSwitches: [{ ...this.cellRect(15, 38), color: 'green', channel: 'photo2', name: '光敏开关2' }],
            movingBlocks: [
                { ...this.cellRect(14, 38), origin: this.cellRect(14, 38), target: this.cellRect(14, 37), channel: 'brick1', speed: 48, active: false, activeCollision: true, name: '可动砖块1' },
                { ...this.cellRect(35, 16), origin: this.cellRect(35, 16), target: this.cellRect(35, 15), channel: 'brick3', speed: 48, active: false, activeCollision: true, name: '可动砖块3' }
            ],
            brickSwitches: [
                { ...this.cellRect(12, 40), channel: 'brick1', active: false, name: '砖块机关1' },
                { ...this.cellRect(33, 32), channel: 'brick3', active: false, name: '砖块机关3' }
            ],
            traps: [
                { ...this.halfCellRect(44, 23), name: '尖刺' },
                { ...this.halfCellRect(6, 44), name: '尖刺' }
            ],
            machine: null,
            lightSources: [{ ...this.cellRect(1, 38), angle: 0, name: '光源' }],
            consoles: [],
            fragileWalls: [],
            mirrors: [],
            seeds: [],
            batteries: [],
            prompts: []
        };
        this.applyLevelData();
    }

    applyLevelData()
    {
        this.spawn = {
            x: this.levelData.spawn.x + this.levelData.spawn.width / 2,
            y: this.levelData.spawn.y + this.levelData.spawn.height / 2
        };
        this.goal = this.levelData.exit;
        this.platforms = [];
        this.walls = this.levelData.walls;
        this.boxes = this.levelData.boxes;
        this.keys = this.levelData.keys;
        this.locks = this.levelData.locks;
        this.doors = this.levelData.doors;
        this.hiddenDoors = this.levelData.hiddenDoors;
        this.pressurePlates = [];
        this.photosensitiveSwitches = this.levelData.photosensitiveSwitches;
        this.movingBlocks = this.levelData.movingBlocks;
        this.brickSwitches = this.levelData.brickSwitches;
        this.traps = this.levelData.traps;
        this.machine = this.levelData.machine;
        this.lightSources = this.levelData.lightSources;
        this.consoles = [];
        this.fragileWalls = [];
        this.mirrors = [];
        this.seeds = [];
        this.batteries = [];
        this.prompts = [];
        this.player.width = this.worldWidth / 50;
        this.player.height = this.worldHeight / 50 * 2;
        this.player.renderWidth = this.player.height;
        this.player.renderHeight = this.player.height;
        this.normalPlayerWidth = this.player.width;
        this.normalPlayerHeight = this.player.height;
        this.resetPlayer();
    }
}

window.forestLevel3Minigame = forestLevel3Minigame;
