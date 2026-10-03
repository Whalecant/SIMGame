class forestLevel8Minigame extends forestLevel2Minigame
{
    init()
    {
        super.init();
        this.levelData = {
            id: 8,
            spawn: this.cellRect(11, 48, 2, 2),
            exit: this.cellRect(3, 48, 1, 2),
            walls: this.wallCells([
                [1, 1], [50, 1], [1, 2], [50, 2], [1, 3], [50, 3], [1, 4], [50, 4], [1, 5], [50, 5], [1, 6], [50, 6], [1, 7],
                [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [21, 7], [22, 7], [23, 7], [24, 7], [25, 7], [26, 7], [27, 7], [31, 7], [32, 7], [33, 7], [34, 7], [35, 7], [36, 7], [37, 7], [38, 7], [39, 7], [50, 7],
                [1, 8], [50, 8], [1, 9], [50, 9], [1, 10], [50, 10], [1, 11], [50, 11], [1, 12], [50, 12], [1, 13], [50, 13], [1, 14], [50, 14], [1, 15], [50, 15], [1, 16], [50, 16], [1, 17], [50, 17], [1, 18], [50, 18], [1, 19], [50, 19], [1, 20], [50, 20], [1, 21], [50, 21], [1, 22], [50, 22], [1, 23], [50, 23], [1, 24], [50, 24], [1, 25], [50, 25], [1, 26], [50, 26], [1, 27], [50, 27], [1, 28], [50, 28], [1, 29], [50, 29], [1, 30], [50, 30], [1, 31], [50, 31], [1, 32], [50, 32], [1, 33], [50, 33], [1, 34], [50, 34], [1, 35], [50, 35], [1, 36], [50, 36], [1, 37], [50, 37], [1, 38], [50, 38], [1, 39], [50, 39], [1, 40], [50, 40], [1, 41], [50, 41], [1, 42], [50, 42], [1, 43], [50, 43], [1, 44], [50, 44], [1, 45], [50, 45], [1, 46], [50, 46], [1, 47], [50, 47], [1, 48], [50, 48], [1, 49], [43, 49], [50, 49],
                [1, 50], [2, 50], [3, 50], [4, 50], [5, 50], [6, 50], [7, 50], [8, 50], [9, 50], [10, 50], [11, 50], [12, 50], [13, 50], [14, 50], [15, 50], [16, 50], [17, 50], [18, 50], [19, 50], [20, 50], [21, 50], [22, 50], [23, 50], [24, 50], [25, 50], [26, 50], [27, 50], [28, 50], [29, 50], [30, 50], [31, 50], [32, 50], [33, 50], [34, 50], [35, 50], [36, 50], [37, 50], [38, 50], [39, 50], [40, 50], [41, 50], [42, 50], [43, 50], [44, 50], [45, 50], [46, 50], [47, 50], [48, 50], [49, 50], [50, 50]
            ]),
            glassWalls: this.wallCells([
                [8, 1], [8, 2], [8, 3], [8, 7], [8, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14], [8, 15], [8, 16], [8, 17], [8, 18], [8, 19], [8, 20], [8, 21], [8, 22],
                [8, 23], [10, 23], [11, 23], [12, 23], [13, 23], [14, 23], [8, 24], [8, 25], [8, 26], [8, 27], [8, 28], [8, 29], [8, 30],
                [45, 31], [46, 31], [47, 31], [48, 31], [49, 31], [8, 31], [8, 32], [8, 33], [8, 34], [8, 35], [8, 36], [8, 37], [8, 38], [8, 39], [8, 40],
                [10, 41], [11, 41], [12, 41], [13, 41], [14, 41], [8, 41], [8, 42], [8, 43], [8, 44], [8, 45], [8, 46], [8, 47], [8, 48], [8, 49]
            ]),
            boxes: [
                { ...this.cellRect(29, 4), name: '箱子' },
                { ...this.cellRect(18, 6), name: '箱子' },
                { ...this.movableCell(28, 5, 31, 5, 'pressure1', '可动砖块1', null, 4, 1) },
                { ...this.movableCell(42, 21, 42, 7, 'pressure6', '可动砖块6', null, 5, 1), controlSource: 'pressure' },
                { ...this.movableCell(2, 25, 18, 25, 'pressure4', '可动砖块4（3）', null, 6, 1) },
                { ...this.movableCell(2, 26, 28, 26, 'pressure4', '可动砖块4（2）', null, 6, 1) },
                { ...this.movableCell(2, 27, 38, 27, 'pressure4', '可动砖块4（1）', null, 6, 1) },
                { ...this.movableCell(2, 35, 18, 35, 'light3', '可动砖块3（3）', null, 6, 1), controlSource: 'light' },
                { ...this.movableCell(2, 36, 28, 36, 'light3', '可动砖块3（2）', null, 6, 1), controlSource: 'light' },
                { ...this.movableCell(2, 37, 38, 37, 'light3', '可动砖块3（1）', null, 6, 1), controlSource: 'light' },
                { ...this.movableCell(2, 45, 18, 45, 'light2', '可动砖块2（3）', null, 6, 1), controlSource: 'light' },
                { ...this.movableCell(2, 46, 28, 46, 'light2', '可动砖块2（2）', null, 6, 1), controlSource: 'light' },
                { ...this.movableCell(2, 47, 38, 47, 'light2', '可动砖块2（1）', null, 6, 1), controlSource: 'light' }
            ],
            keys: [],
            locks: [
                { ...this.cellRect(12, 22), color: 'blue', channel: 'lock5', name: '机关锁5' }
            ],
            doors: [
                { ...this.cellRect(8, 4, 1, 3), color: 'orange', channel: 'pressure7', controlSource: 'pressure', active: true, name: '机关门7' }
            ],
            hiddenDoors: [
                { ...this.cellRect(47, 25, 3, 1), color: 'blue', channel: 'lock5', controlSource: 'lock', opened: false, name: '隐藏门5' }
            ],
            pressurePlates: [
                { ...this.cellRect(22, 49), color: 'blue', channel: 'pressure1', controlSource: 'pressure', name: '压力机关1' },
                { ...this.cellRect(31, 35), color: 'orange', channel: 'pressure4', controlSource: 'pressure', name: '压力机关4' },
                { ...this.cellRect(44, 20), color: 'orange', channel: 'pressure6', controlSource: 'pressure', name: '压力机关6' },
                { ...this.cellRect(22, 6), color: 'orange', channel: 'pressure7', controlSource: 'pressure', name: '压力机关7' }
            ],
            traps: [
                { ...this.halfCellRect(16, 49, 2, 1), name: '陷阱' },
                { ...this.halfCellRect(26, 49, 6, 1), name: '陷阱' },
                { ...this.halfCellRect(37, 49, 2, 1), name: '陷阱' }
            ],
            machine: { ...this.cellRect(5, 48, 2, 2), angle: -Math.PI / 2, name: '机械' },
            consoles: [{ ...this.cellRect(45, 48, 2, 2), name: '控制台' }],
            fragileWalls: [],
            mirrors: [],
            seeds: [{ ...this.cellRect(4, 3), name: '种子' }],
            batteries: [],
            lightSensors: [
                { ...this.cellRect(22, 6), color: 'yellow', channel: 'light4', name: '光敏开关4' },
                { ...this.cellRect(12, 35), color: 'yellow', channel: 'light3', name: '光敏开关3' },
                { ...this.cellRect(12, 45), color: 'yellow', channel: 'light2', name: '光敏开关2' }
            ],
            lightSources: [],
            prompts: [],
            papers: [
                {...this.cellRect(10, 20), category: 'ending'},
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

        if(!this.levelData || this.levelData.id !== 8)
        {
            return;
        }

        this.walls = [
            ...this.levelData.walls,
            ...this.levelData.glassWalls.map(wall => ({ ...wall, blocksLight: false, isGlass: true }))
        ];
        this.machine = this.levelData.machine ? { ...this.levelData.machine } : null;
        this.consoles = this.levelData.consoles.map(item => ({ ...item }));
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

window.forestLevel8Minigame = forestLevel8Minigame;
