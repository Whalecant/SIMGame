class forestLevel7Minigame extends forestLevel2Minigame
{
    init()
    {
        super.init();
        this.levelData = {
            id: 7,
            spawn: this.cellRect(3, 48, 2, 2),
            exit: this.cellRect(45, 48, 2, 2),
            walls: this.wallCells([
                [40, 50],
                [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15], [1, 16], [1, 17], [1, 18], [1, 19], [1, 20], [1, 21], [1, 22], [1, 23], [1, 24], [1, 25], [1, 26], [1, 27], [1, 28], [1, 29], [1, 30], [1, 31], [1, 32], [1, 33], [1, 34], [1, 35], [1, 36], [1, 37], [1, 38], [1, 39], [1, 40], [1, 41], [1, 42], [1, 43], [1, 44], [1, 45], [1, 46], [1, 47], [1, 48], [1, 49], [1, 50],
                [2, 15], [2, 33], [2, 37], [2, 45], [2, 50], [3, 15], [3, 33], [3, 37], [3, 45], [3, 50], [4, 15], [4, 33], [4, 37], [4, 45], [4, 50], [5, 15], [5, 33], [5, 37], [5, 45], [5, 50], [6, 15], [6, 37], [6, 50], [7, 15], [7, 37], [7, 50], [8, 15], [8, 31], [8, 37], [8, 50], [9, 15], [9, 31], [9, 37], [9, 50], [10, 15], [10, 30], [10, 37], [10, 50], [11, 15], [11, 30], [11, 37], [11, 41], [11, 50], [12, 15], [12, 29], [12, 41], [9, 45], [12, 50], [13, 15], [13, 29], [13, 41], [13, 45], [13, 46], [13, 50], [14, 15], [14, 41], [14, 45], [14, 50], [15, 15], [15, 26], [15, 41], [15, 45], [15, 50], [16, 19], [16, 26], [16, 37], [16, 41], [16, 45], [16, 50], [17, 19], [17, 25], [17, 37], [17, 41], [17, 45], [17, 50], [18, 19], [18, 25], [18, 33], [18, 37], [18, 41], [18, 45], [18, 50], [19, 19], [19, 24], [19, 33], [19, 37], [19, 41], [19, 45], [19, 50], [20, 24], [20, 33], [20, 37], [20, 41], [20, 45], [20, 50], [21, 23], [21, 24], [21, 25], [21, 26], [21, 27], [21, 28], [21, 33], [21, 37], [21, 41], [21, 45], [21, 50], [22, 23], [22, 33], [22, 37], [22, 41], [22, 45], [22, 50], [23, 23], [23, 33], [23, 37], [23, 41], [23, 45], [23, 50], [24, 23], [24, 33], [24, 37], [24, 41], [24, 45], [24, 50], [25, 23], [25, 33], [25, 37], [25, 45], [25, 50], [26, 23], [26, 33], [26, 37], [26, 45], [26, 50],
                [27, 1], [27, 2], [27, 3], [27, 4], [27, 5], [27, 13], [27, 14], [27, 15], [27, 16], [27, 17], [27, 18], [27, 19], [27, 20], [27, 21], [27, 22], [27, 23], [27, 24], [27, 25], [27, 26], [27, 27], [27, 29], [27, 30], [27, 31], [27, 32], [27, 33], [27, 34], [27, 35], [27, 36], [27, 37], [27, 38], [27, 39], [27, 40], [27, 41], [27, 42], [27, 43], [27, 44], [27, 45], [27, 46], [27, 50], [28, 50], [29, 50], [30, 50], [31, 50], [32, 50], [33, 50], [34, 50], [35, 50], [36, 50], [37, 50], [38, 50], [39, 50],
                [40, 1], [40, 2], [40, 3], [40, 4], [40, 5], [40, 6], [40, 7], [40, 8], [40, 9], [40, 10], [40, 11], [40, 12], [40, 13], [40, 14], [40, 15], [40, 16], [40, 17], [40, 18], [40, 19], [40, 20], [40, 21], [40, 22], [40, 23], [40, 24], [40, 25], [40, 26], [40, 27], [40, 29], [40, 30], [40, 31], [40, 32], [40, 33], [40, 34], [40, 35], [40, 36], [40, 37], [40, 38], [40, 39], [40, 40], [40, 41], [40, 42], [40, 43], [40, 44], [40, 45], [41, 1], [41, 2], [41, 3], [41, 4], [41, 5], [41, 6], [41, 7], [41, 8], [41, 9], [41, 10], [41, 11], [41, 12], [41, 13], [41, 14], [41, 15], [41, 16], [41, 17], [41, 18], [41, 19], [41, 20], [41, 21], [41, 22], [41, 23], [41, 24], [41, 25], [41, 26], [41, 27], [41, 29], [41, 30], [41, 31], [41, 32], [41, 33], [41, 34], [41, 35], [41, 36], [41, 37], [41, 38], [41, 39], [41, 40], [41, 41], [41, 42], [41, 43], [41, 44], [41, 45], [41, 46], [41, 50], [42, 50], [43, 50], [44, 50], [45, 50], [46, 50], [47, 50], [48, 50], [49, 50], [50, 1], [50, 2], [50, 3], [50, 4], [50, 5], [50, 6], [50, 7], [50, 8], [50, 9], [50, 10], [50, 11], [50, 12], [50, 13], [50, 14], [50, 15], [50, 16], [50, 17], [50, 18], [50, 19], [50, 20], [50, 21], [50, 22], [50, 23], [50, 24], [50, 25], [50, 26], [50, 27], [50, 28], [50, 29], [50, 30], [50, 31], [50, 32], [50, 33], [50, 34], [50, 35], [50, 36], [50, 37], [50, 38], [50, 39], [50, 40], [50, 41], [50, 42], [50, 43], [50, 44], [50, 45], [50, 46], [50, 47], [50, 48], [50, 49], [50, 50]
            ]),
            boxes: [
                { ...this.cellRect(7, 12), name: '箱子1' },
                { ...this.movableCell(27, 6, 39, 6, 'light5', '可动砖块5', null, 1, 7), controlSource: 'light' },
                { ...this.movableCell(5, 13, 22, 13, 'pressure8', '可动砖块8', null, 5) },
                { ...this.cellRect(24, 27), name: '箱子2' },
                { ...this.movableCell(22, 28, 35, 28, 'pressure3', '可动砖块3', null, 11) },
                { ...this.cellRect(4, 44), name: '箱子3' }
            ],
            keys: [{ ...this.cellRect(38, 27), color: 'green', name: '钥匙7' }],
            locks: [
                { ...this.cellRect(19, 40), color: 'blue', channel: 'lock1', name: '机关锁1' },
                { ...this.cellRect(21, 44), color: 'blue', channel: 'lock2', name: '机关锁2' },
                { ...this.cellRect(33, 49), color: 'blue', channel: 'lock6', name: '机关锁6' }
            ],
            doors: [
                { ...this.cellRect(19, 34, 1, 3), color: 'red', channel: 'light3', controlSource: 'light', lightOpens: true, active: true, name: '机关门3' },
                { ...this.cellRect(22, 38, 1, 3), color: 'blue', channel: 'lock2', lightChannel: 'light2', lockChannel: 'lock2', controlSource: 'light', lightOpens: true, active: true, name: '机关门2' },
                { ...this.cellRect(15, 42, 1, 3), color: 'yellow', channel: 'lock1', lightChannel: 'light1', lockChannel: 'lock1', controlSource: 'light', lightOpens: true, active: true, name: '机关门1' },
                { ...this.cellRect(13, 47, 1, 3), color: 'orange', channel: 'pressure0', controlSource: 'pressure', active: true, name: '机关门0' },
                { ...this.cellRect(27, 47, 1, 3), color: 'blue', channel: 'lock6', controlSource: 'lock', active: true, name: '机关门6' },
                { ...this.cellRect(41, 47, 1, 3), color: 'green', keyChannel: 'green', controlSource: 'key', active: true, name: '机关门7' }
            ],
            hiddenDoors: [],
            pressurePlates: [
                { ...this.cellRect(13, 14), color: 'orange', channel: 'pressure8', controlSource: 'pressure', name: '压力机关8' },
                { ...this.cellRect(23, 36), color: 'red', channel: 'pressure3', controlSource: 'pressure', name: '压力机关3' },
                { ...this.cellRect(8, 49), color: 'orange', channel: 'pressure0', controlSource: 'pressure', name: '压力机关0' }
            ],
            traps: [],
            machine: { ...this.cellRect(38, 48, 2, 2), angle: -Math.PI / 2, name: '机械' },
            consoles: [{ ...this.cellRect(19, 48, 2, 2), name: '控制台' }],
            fragileWalls: [{ ...this.cellRect(40, 46, 1, 4), name: '易碎墙体' }],
            mirrors: [],
            seeds: [{ ...this.cellRect(24, 1), name: '种子' }],
            batteries: [],
            lightSensors: [
                { ...this.cellRect(30, 25), color: 'yellow', channel: 'light5', name: '光敏开关5' },
                { ...this.cellRect(35, 35), color: 'yellow', channel: 'light3', name: '光敏开关3' },
                { ...this.cellRect(32, 38), color: 'yellow', channel: 'light1', name: '光敏开关1' },
                { ...this.cellRect(30, 43), color: 'yellow', channel: 'light2', name: '光敏开关2' }
            ],
            lightSources: [],
            prompts: [],
            papers: [
                {...this.cellRect(23, 39), category: 'ship'},
            ],
        };
        this.applyLevelData();
    }

    movableCell(column, row, targetColumn, targetRow, channel, name, lockChannel = null, width = 1, height = 1)
    {
        return {
            ...this.cellRect(column, row, width, height),
            target: this.cellRect(targetColumn, targetRow, width, height),
            isMovable: true,
            blocksLight: true,
            color: 'blue',
            active: false,
            movementTriggered: false,
            channel,
            lockChannel,
            controlSource: 'pressure',
            name
        };
    }

    applyLevelData()
    {
        super.applyLevelData();

        if(!this.levelData || this.levelData.id !== 7)
        {
            return;
        }

        this.machine = this.levelData.machine ? { ...this.levelData.machine } : null;
        this.consoles = this.levelData.consoles.map(item => ({ ...item }));
        this.fragileWalls = this.levelData.fragileWalls.map(wall => ({ ...wall }));
        this.seeds = this.levelData.seeds.map(seed => ({ ...seed, germinated: false }));
        this.lightSensors = this.levelData.lightSensors.map(sensor => ({ ...sensor, active: false }));
        this.lightSources = this.levelData.lightSources.map(source => ({ ...source }));
        this.boxes = this.levelData.boxes.map(box =>
        {
            const movableBox = { ...box };
            if(box.target)
            {
                movableBox.targetX = box.target.x;
                movableBox.targetY = box.target.y;
            }
            delete movableBox.target;
            return movableBox;
        });
    }
}

window.forestLevel7Minigame = forestLevel7Minigame;
