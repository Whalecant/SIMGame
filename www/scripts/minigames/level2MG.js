class forestLevel2Minigame extends forestPlatformMinigame
{
    init()
    {
        super.init();
        this.levelData = {
            id: 2,
            spawn: this.cellRect(3, 48, 2, 2),
            exit: this.cellRect(48, 32, 1, 2),
            walls: this.wallCells([
                [46, 1], [50, 1], [46, 2], [50, 2], [46, 3], [50, 3], [46, 4], [50, 4],
                [46, 5], [50, 5], [46, 6], [50, 6], [46, 7], [50, 7], [46, 8], [50, 8],
                [46, 9], [50, 9], [46, 10], [50, 10], [46, 11], [50, 11],
                [21, 12], [22, 12], [23, 12], [46, 12], [50, 12], [46, 13], [50, 13],
                [46, 14], [50, 14], [10, 15], [46, 15], [50, 15], [10, 16], [17, 16],
                [18, 16], [19, 16], [29, 16], [30, 16], [31, 16], [46, 16], [50, 16],
                [10, 17], [31, 17], [46, 17], [50, 17], [10, 18], [31, 18], [46, 18], [50, 18],
                [7, 19], [8, 19], [9, 19], [10, 19], [26, 19], [27, 19], [31, 19], [46, 19], [50, 19],
                [7, 20], [8, 20], [9, 20], [10, 20], [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [31, 20], [46, 20], [50, 20],
                [7, 21], [8, 21], [9, 21], [10, 21], [12, 21], [13, 21], [14, 21], [15, 21], [16, 21], [31, 21], [46, 21], [50, 21],
                [3, 22], [4, 22], [5, 22], [7, 22], [8, 22], [9, 22], [10, 22], [12, 22], [13, 22], [14, 22], [15, 22], [16, 22], [31, 22], [46, 22], [50, 22],
                [12, 23], [13, 23], [14, 23], [15, 23], [16, 23], [17, 23], [18, 23], [19, 23], [20, 23], [21, 23], [22, 23], [23, 23], [24, 23], [25, 23], [26, 23], [27, 23], [28, 23], [29, 23], [30, 23], [31, 23], [46, 23], [50, 23],
                [46, 24], [50, 24], [46, 25], [50, 25], [1, 26], [2, 26], [46, 26], [50, 26], [1, 27], [2, 27], [46, 27], [50, 27], [1, 28], [2, 28], [3, 28], [46, 28], [50, 28], [1, 29], [2, 29], [3, 29], [46, 29], [50, 29],
                [3, 30], [4, 30], [46, 30], [50, 30], [3, 31], [4, 31], [50, 31], [4, 32], [5, 32], [50, 32], [5, 33], [6, 33], [50, 33],
                [5, 34], [6, 34], [46, 34], [47, 34], [48, 34], [49, 34], [50, 34], [6, 35], [7, 35], [50, 35], [7, 36], [8, 36], [44, 36], [45, 36], [50, 36], [7, 37], [8, 37], [9, 37], [44, 37], [45, 37], [50, 37], [50, 38],
                [12, 39], [13, 39], [50, 39], [12, 40], [13, 40], [20, 40], [30, 40], [41, 40], [42, 40], [43, 40], [50, 40], [10, 41], [11, 41], [12, 41], [13, 41], [20, 41], [30, 41], [41, 41], [42, 41], [43, 41], [50, 41],
                [10, 42], [11, 42], [12, 42], [20, 42], [30, 42], [41, 42], [42, 42], [43, 42], [50, 42], [8, 43], [9, 43], [10, 43], [11, 43], [20, 43], [30, 43], [41, 43], [42, 43], [43, 43], [50, 43],
                [8, 44], [9, 44], [10, 44], [17, 44], [18, 44], [19, 44], [20, 44], [30, 44], [38, 44], [39, 44], [40, 44], [41, 44], [42, 44], [43, 44], [50, 44], [6, 45], [7, 45], [8, 45], [9, 45], [17, 45], [18, 45], [19, 45], [20, 45], [30, 45], [50, 45],
                [6, 46], [7, 46], [8, 46], [17, 46], [18, 46], [19, 46], [20, 46], [30, 46], [50, 46], [17, 47], [18, 47], [19, 47], [20, 47], [30, 47], [31, 47], [32, 47], [34, 47], [35, 47], [36, 47], [50, 47],
                [17, 48], [18, 48], [19, 48], [20, 48], [30, 48], [31, 48], [32, 48], [33, 48], [34, 48], [35, 48], [36, 48], [50, 48], [17, 49], [18, 49], [19, 49], [20, 49], [30, 49], [31, 49], [32, 49], [33, 49], [34, 49], [35, 49], [36, 49], [50, 49],
                [1, 50], [2, 50], [3, 50], [4, 50], [5, 50], [6, 50], [7, 50], [8, 50], [9, 50], [10, 50], [11, 50], [12, 50], [13, 50], [14, 50], [15, 50], [16, 50], [17, 50], [18, 50], [19, 50], [20, 50], [21, 50], [22, 50], [23, 50], [24, 50], [25, 50], [26, 50], [27, 50], [28, 50], [29, 50], [30, 50], [31, 50], [32, 50], [33, 50], [34, 50], [35, 50], [36, 50], [37, 50], [38, 50], [39, 50], [40, 50], [41, 50], [42, 50], [43, 50], [44, 50], [45, 50], [46, 50], [47, 50], [48, 50], [49, 50], [50, 50]
            ]),
            boxes: [
                { ...this.cellRect(23, 11), name: '箱子' },
                { ...this.cellRect(35, 46), name: '箱子' }
            ],
            keys: [],
            locks: [{ ...this.cellRect(30, 39), color: 'blue', channel: 'lock2', name: '机关锁2' }],
            doors: [{ ...this.cellRect(46, 31, 1, 3), color: 'blue', channel: 'lock2', controlSource: 'lock', active: true, name: '机关门2' }],
            hiddenDoors: [{ ...this.cellRect(31, 43, 2, 1), color: 'blue', channel: 'pressure1', controlSource: 'pressure', opened: false, name: '隐藏门1' }],
            pressurePlates: [{ ...this.cellRect(33, 46), color: 'blue', channel: 'pressure1', controlSource: 'pressure', name: '压力机关1' }],
            traps: [
                { ...this.halfCellRect(17, 22, 14, 1), name: '尖刺' },
                { ...this.halfCellRect(45, 35, 1, 1), name: '尖刺' },
                { ...this.halfCellRect(21, 49, 1, 1), name: '尖刺' },
                { ...this.halfCellRect(22, 49, 1, 1), name: '尖刺' },
                { ...this.halfCellRect(23, 49, 1, 1), name: '尖刺' },
                { ...this.halfCellRect(24, 49, 1, 1), name: '尖刺' },
                { ...this.halfCellRect(25, 49, 5, 1), name: '尖刺' }
            ],
            machine: null,
            consoles: [],
            fragileWalls: [],
            mirrors: [],
            seeds: [],
            batteries: [],
            prompts: [],
            papers: [
                {...this.cellRect(24, 20), category: 'history'},
            ],
        };
        this.applyLevelData();
    }

    cellRect(column, row, width = 1, height = 1)
    {
        return {
            x: (column - 1) * this.worldWidth / 50,
            y: (row - 1) * this.worldHeight / 50,
            width: width * this.worldWidth / 50,
            height: height * this.worldHeight / 50
        };
    }

    halfCellRect(column, row, width = 1, height = 1)
    {
        const rectangle = this.cellRect(column, row, width, height);
        rectangle.y += rectangle.height / 2;
        rectangle.height /= 2;
        return rectangle;
    }

    wallRanges(ranges)
    {
        return ranges.map(([startColumn, startRow, endColumn, endRow]) => this.cellRect(
            startColumn,
            startRow,
            endColumn - startColumn + 1,
            endRow - startRow + 1
        ));
    }

    wallCells(cells)
    {
        return cells.map(([column, row]) => this.cellRect(column, row));
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
        this.pressurePlates = this.levelData.pressurePlates;
        this.traps = this.levelData.traps;
        this.machine = null;
        this.consoles = [];
        this.fragileWalls = [];
        this.mirrors = [];
        this.seeds = [];
        this.batteries = [];
        this.lightSensors = [];
        this.lightSources = [];
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

window.forestLevel2Minigame = forestLevel2Minigame;
