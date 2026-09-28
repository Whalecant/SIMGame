class forestLevel6Minigame extends forestLevel2Minigame
{
    init()
    {
        super.init();
        this.levelData = {
            id: 6,
            spawn: this.cellRect(3, 47),
            exit: this.cellRect(36, 45),
            walls: this.wallRanges([
                [1, 1, 50, 1], [1, 2, 1, 2], [22, 2, 23, 2], [25, 2, 25, 2], [27, 2, 30, 2], [50, 2, 50, 2],
                [1, 3, 1, 3], [22, 3, 23, 3], [25, 3, 25, 3], [28, 3, 30, 3], [50, 3, 50, 3], [1, 4, 1, 4], [50, 4, 50, 4],
                [1, 5, 1, 5], [50, 5, 50, 5], [1, 6, 1, 6], [50, 6, 50, 6], [1, 7, 1, 7], [20, 7, 20, 7], [32, 7, 32, 7], [50, 7, 50, 7],
                [1, 8, 1, 8], [16, 8, 20, 8], [32, 8, 32, 8], [50, 8, 50, 8], [1, 9, 1, 9], [20, 9, 22, 9], [30, 9, 32, 9], [50, 9, 50, 9],
                [1, 10, 1, 10], [11, 10, 13, 10], [20, 10, 20, 10], [32, 10, 32, 10], [50, 10, 50, 10], [1, 11, 1, 11], [20, 11, 20, 11], [32, 11, 32, 11], [50, 11, 50, 11],
                [1, 12, 1, 12], [20, 12, 20, 12], [32, 12, 32, 12], [50, 12, 50, 12], [1, 13, 14, 13], [18, 13, 43, 13], [47, 13, 50, 13],
                [1, 14, 1, 14], [20, 14, 20, 14], [50, 14, 50, 14], [1, 15, 1, 15], [20, 15, 20, 15], [50, 15, 50, 15],
                [1, 16, 1, 16], [17, 16, 20, 16], [50, 16, 50, 16], [1, 17, 1, 17], [20, 17, 20, 17], [50, 17, 50, 17],
                [1, 18, 1, 18], [20, 18, 20, 18], [50, 18, 50, 18], [1, 19, 1, 19], [16, 19, 20, 19], [50, 19, 50, 19],
                [1, 20, 1, 20], [20, 20, 20, 20], [31, 20, 31, 20], [50, 20, 50, 20], [1, 21, 1, 21], [10, 21, 13, 21], [20, 21, 24, 21], [37, 21, 50, 21],
                [1, 22, 1, 22], [20, 22, 20, 22], [50, 22, 50, 22], [1, 23, 1, 23], [20, 23, 20, 23], [50, 23, 50, 23], [1, 24, 1, 24], [20, 24, 20, 24], [50, 24, 50, 24],
                [1, 25, 1, 25], [20, 25, 20, 25], [50, 25, 50, 25], [1, 26, 1, 26], [20, 26, 20, 26], [50, 26, 50, 26], [1, 27, 1, 27], [9, 27, 12, 27], [20, 27, 20, 27], [50, 27, 50, 27],
                [1, 28, 1, 28], [20, 28, 20, 28], [50, 28, 50, 28], [1, 29, 1, 29], [20, 29, 20, 29], [50, 29, 50, 29], [1, 30, 2, 30], [6, 30, 45, 30], [49, 30, 50, 30],
                [1, 31, 1, 31], [12, 31, 13, 31], [15, 31, 17, 31], [35, 31, 35, 31], [42, 31, 42, 31], [50, 31, 50, 31], [1, 32, 1, 32], [12, 32, 13, 32], [16, 32, 17, 32], [42, 32, 42, 32], [50, 32, 50, 32],
                [1, 33, 1, 33], [35, 33, 35, 33], [42, 33, 42, 33], [50, 33, 50, 33], [1, 34, 6, 34], [35, 34, 35, 34], [42, 34, 42, 34], [50, 34, 50, 34],
                [1, 35, 1, 35], [35, 35, 35, 35], [42, 35, 42, 35], [50, 35, 50, 35], [1, 36, 1, 36], [8, 36, 10, 36], [35, 36, 35, 36], [42, 36, 42, 36], [50, 36, 50, 36],
                [1, 37, 1, 37], [35, 37, 35, 37], [42, 37, 42, 37], [50, 37, 50, 37], [1, 38, 1, 38], [13, 38, 17, 38], [35, 38, 35, 38], [42, 38, 42, 38], [50, 38, 50, 38],
                [1, 39, 1, 39], [35, 39, 35, 39], [42, 39, 42, 39], [50, 39, 50, 39], [1, 40, 1, 40], [35, 40, 35, 40], [42, 40, 42, 40], [50, 40, 50, 40],
                [1, 41, 1, 41], [20, 41, 22, 41], [35, 41, 35, 41], [42, 41, 45, 41], [50, 41, 50, 41], [1, 42, 6, 42], [8, 42, 12, 42], [35, 42, 35, 42], [50, 42, 50, 42],
                [1, 43, 6, 43], [9, 43, 9, 43], [13, 43, 17, 43], [25, 43, 27, 43], [35, 43, 35, 43], [36, 43, 39, 43], [50, 43, 50, 43], [1, 44, 1, 44], [35, 44, 35, 44], [50, 44, 50, 44],
                [1, 45, 1, 45], [30, 45, 35, 45], [50, 45, 50, 45], [1, 46, 1, 46], [35, 46, 35, 46], [50, 46, 50, 46], [1, 47, 1, 47], [35, 47, 39, 47], [50, 47, 50, 47],
                [1, 48, 1, 48], [35, 48, 39, 48], [50, 48, 50, 48], [1, 49, 11, 49], [14, 49, 50, 49], [1, 50, 50, 50]
            ]),
            boxes: [
                { ...this.cellRect(26, 2), name: '箱子1' },
                { ...this.movableCell(26, 3, 27, 3, 'pressure6', '可动砖块6') },
                { ...this.cellRect(30, 20), name: '箱子2' },
                { ...this.movableCell(30, 21, 31, 21, 'pressure7', '可动砖块7') },
                { ...this.movableCell(4, 24, 9, 24, null, '可动砖块4', 'lock4', 5) },
                { ...this.cellRect(14, 30), name: '箱子3' },
                { ...this.movableCell(14, 32, 15, 32, 'pressure3', '可动砖块3') },
                { ...this.cellRect(7, 42), name: '箱子4' },
                { ...this.movableCell(7, 43, 8, 43, 'pressure2', '可动砖块2') }
            ],
            keys: [{ ...this.cellRect(43, 40), color: 'green', name: '钥匙9' }],
            locks: [
                { ...this.cellRect(11, 20), color: 'blue', channel: 'lock4', name: '机关锁4' },
                { ...this.cellRect(12, 49), color: 'green', channel: 'lock1', name: '机关锁1' }
            ],
            doors: [
                { ...this.cellRect(15, 13, 3, 1), color: 'yellow', channel: 'light5', controlSource: 'light', lightOpens: true, active: true, name: '机关门5' },
                { ...this.cellRect(3, 30, 3, 1), color: 'blue', channel: 'lock1', controlSource: 'lock', active: true, name: '机关门1' },
                { ...this.cellRect(46, 30, 3, 1), color: 'orange', channel: 'pressure8', controlSource: 'pressure', active: true, name: '机关门8' },
                { ...this.cellRect(35, 32), color: 'red', channel: 'pressure3', controlSource: 'pressure', active: true, name: '门' },
                { ...this.cellRect(39, 44, 1, 3), color: 'green', keyChannel: 'green', controlSource: 'key', active: true, name: '机关门9' }
            ],
            hiddenDoors: [],
            pressurePlates: [
                { ...this.cellRect(7, 12), color: 'purple', channel: 'pressure6', controlSource: 'pressure', name: '压力机关6' },
                { ...this.cellRect(39, 20), color: 'blue', channel: 'pressure7', controlSource: 'pressure', name: '压力机关7' },
                { ...this.cellRect(25, 29), color: 'orange', channel: 'pressure8', controlSource: 'pressure', name: '压力机关8' },
                { ...this.cellRect(4, 40), color: 'red', channel: 'pressure3', controlSource: 'pressure', name: '压力机关3' },
                { ...this.cellRect(20, 48), color: 'yellow', channel: 'pressure2', controlSource: 'pressure', name: '压力机关2' }
            ],
            traps: [
                { ...this.halfCellRect(24, 12, 5, 1), name: '尖刺' },
                { ...this.halfCellRect(14, 37, 3, 1), name: '尖刺' }
            ],
            machine: null,
            consoles: [],
            fragileWalls: [],
            mirrors: [],
            seeds: [],
            batteries: [],
            lightSensors: [{ ...this.cellRect(6, 14), color: 'yellow', channel: 'light5', name: '光敏开关5' }],
            lightSources: [{ ...this.cellRect(6, 29), angle: -Math.PI / 2, name: '光源向上' }],
            prompts: []
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

        if(!this.levelData || this.levelData.id !== 6)
        {
            return;
        }

        this.batteries = this.levelData.batteries.map(battery => ({ ...battery, active: false }));
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

window.forestLevel6Minigame = forestLevel6Minigame;
