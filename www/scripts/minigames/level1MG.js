class forestLevel1Minigame extends forestPlatformMinigame
{
    init()
    {
        super.init();
        this.levelData = {
            id: 1,
            spawn: this.cellRect(3, 46, 2, 2),
            exit: this.cellRect(45, 17, 2, 2),
            walls: this.wallRanges([
                [41, 1, 41, 10], [29, 11, 29, 11], [41, 11, 41, 15],
                [28, 12, 30, 12], [27, 13, 31, 13], [25, 14, 33, 14],
                [22, 15, 36, 15], [22, 19, 50, 21], [19, 22, 22, 22],
                [17, 23, 20, 23], [15, 24, 18, 24], [13, 25, 16, 25],
                [11, 26, 14, 26], [3, 28, 7, 28], [9, 31, 12, 31],
                [14, 34, 17, 34], [19, 37, 22, 37], [24, 40, 27, 40],
                [29, 43, 32, 43], [1, 48, 50, 48]
            ]),
            boxes: [ { ...this.cellRect(21, 21), name: '箱子' }],
            keys: [{ ...this.cellRect(5, 27), color: 'orange', name: '钥匙1' }],
            locks: [{ ...this.cellRect(29, 10), color: 'blue', name: '机关2' }],
            doors: [
                { ...this.cellRect(23, 16, 1, 3), color: 'orange', channel: 'orange', controlSource: 'lock', name: '机关门1' },
                { ...this.cellRect(35, 16, 1, 3), color: 'orange', channel: 'orange', controlSource: 'lock', name: '机关门1' },
                { ...this.cellRect(41, 16, 1, 3), color: 'blue', channel: 'blue', controlSource: 'lock', name: '机关门2' }
            ],
            traps: [],
            machine: null,
            consoles: [],
            fragileWalls: [],
            mirrors: [],
            seeds: [],
            batteries: [],
            prompts: [
                { ...this.cellRect(32, 10, 4, 2), text: '好吧，另一种开门方式' },
                { ...this.cellRect(44, 12, 4, 3), text: '看来这就是出口了？' },
                { ...this.cellRect(17, 16, 6, 2), text: '居然毫不意外地出现了门呢，按E打开它吧' },
                { ...this.cellRect(3, 24, 5, 2), text: '一把钥匙，会有什么用呢' },
                { ...this.cellRect(17, 33, 5, 2), text: '你已经是运动细胞发达的人类了' },
                { ...this.cellRect(4, 43, 6, 2), text: '试试按A、D左右移动' },
                { ...this.cellRect(30, 44, 6, 2), text: '现在用W跳跃' }
            ]
        };
        this.applyLevelData();
    }

    cellRect(column, row, width = 1, height = 1)
    {
        const cellWidth = this.worldWidth / 50;
        const cellHeight = this.worldHeight / 50;
        return {
            x: (column - 1) * cellWidth,
            y: (row - 1) * cellHeight,
            width: width * cellWidth,
            height: height * cellHeight
        };
    }

    wallRanges(ranges)
    {
        return ranges.map(([startColumn, startRow, endColumn, endRow]) =>
        {
            return this.cellRect(startColumn, startRow, endColumn - startColumn + 1, endRow - startRow + 1);
        });
    }

    applyLevelData()
    {
        this.spawn = { x: this.levelData.spawn.x + this.levelData.spawn.width / 2, y: this.levelData.spawn.y + this.levelData.spawn.height / 2 };
        this.goal = this.levelData.exit;
        this.platforms = [];
        this.walls = this.levelData.walls;
        this.boxes = this.levelData.boxes.map(box => ({ ...box }));
        this.keys = this.levelData.keys.map(key => ({ ...key }));
        this.locks = this.levelData.locks.map(lock => ({ ...lock }));
        this.doors = this.levelData.doors.map(door => ({ ...door }));
        this.traps = this.levelData.traps.map(trap => ({ ...trap }));
        this.machine = this.levelData.machine ? {
            ...this.levelData.machine,
            x: this.levelData.machine.x,
            y: this.levelData.machine.y,
            width: this.levelData.machine.width * this.itemUnit,
            height: this.levelData.machine.height * this.itemUnit
        } : null;
        this.consoles = this.levelData.consoles.map(item => ({ ...item, width: item.width * this.itemUnit, height: item.height * this.itemUnit }));
        this.fragileWalls = this.levelData.fragileWalls.map(wall => ({ ...wall, width: wall.width * this.wallUnit, height: wall.height * this.wallUnit }));
        this.mirrors = this.levelData.mirrors.map(mirror => ({ ...mirror, width: mirror.width * this.itemUnit, height: mirror.height * this.itemUnit }));
        this.seeds = this.levelData.seeds.map(seed => ({ ...seed, width: seed.width * this.itemUnit, height: seed.height * this.itemUnit, germinated: false }));
        this.batteries = this.levelData.batteries.map(battery => ({ ...battery, width: battery.width * this.itemUnit, height: battery.height * this.itemUnit, active: false }));
        this.prompts = this.levelData.prompts.map(prompt => ({ ...prompt, shown: false }));
        this.player.width = this.worldWidth / 50;
        this.player.height = (this.worldHeight / 50) * 2;
        this.player.renderWidth = this.player.height;
        this.player.renderHeight = this.player.height;
        this.normalPlayerWidth = this.player.width;
        this.normalPlayerHeight = this.player.height;
        this.resetPlayer();
    }
}

window.forestLevel1Minigame = forestLevel1Minigame;
