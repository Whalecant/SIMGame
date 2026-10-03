class forestLevel4Minigame extends forestLevel2Minigame
{
    init()
    {
        super.init();
        this.levelData = {
            id: 4,
            spawn: this.cellRect(47, 48),
            exit: this.cellRect(7, 37),
            walls: this.wallRanges([
                [1, 1, 50, 1], [1, 2, 50, 2], [1, 3, 50, 3],
                [1, 4, 32, 4], [38, 4, 50, 4], [1, 5, 32, 5], [38, 5, 50, 5], [1, 6, 32, 6], [38, 6, 50, 6],
                [1, 7, 15, 7], [17, 7, 21, 7], [23, 7, 31, 7], [38, 7, 40, 7], [42, 7, 47, 7], [49, 7, 50, 7],
                [1, 8, 15, 8], [18, 8, 21, 8], [24, 8, 31, 8], [36, 8, 40, 8], [43, 8, 47, 8], [50, 8, 50, 8],
                [1, 9, 1, 9], [13, 9, 13, 9], [50, 9, 50, 9], [1, 10, 1, 10], [13, 10, 13, 10], [50, 10, 50, 10],
                [1, 11, 1, 11], [13, 11, 13, 11], [50, 11, 50, 11], [1, 12, 1, 12], [13, 12, 13, 12], [50, 12, 50, 12],
                [1, 13, 1, 13], [13, 13, 13, 13], [50, 13, 50, 13],
                [1, 14, 1, 14], [5, 14, 7, 14], [13, 14, 13, 14],  [50, 14, 50, 14],
                [1, 15, 1, 15], [13, 15, 13, 15], [31, 15, 37, 15], [50, 15, 50, 15],
                [1, 16, 1, 16], [13, 16, 13, 16], [31, 16, 37, 16], [50, 16, 50, 16],
                [1, 17, 1, 17], [13, 17, 13, 17], [29, 17, 38, 17], [50, 17, 50, 17],
                [1, 18, 4, 18], [13, 18, 13, 18], [29, 18, 38, 18], [50, 18, 50, 18],
                [1, 19, 1, 19], [28, 19, 39, 19], [50, 19, 50, 19], [1, 20, 1, 20], [5, 20, 7, 20], [28, 20, 39, 20], [50, 20, 50, 20],
                [1, 21, 1, 21], [50, 21, 50, 21], [1, 22, 1, 22], [8, 22, 10, 22], [13, 22, 13, 22], [50, 22, 50, 22],
                [1, 23, 1, 23], [13, 23, 13, 23], [43, 23, 43, 23], [50, 23, 50, 23],
                [1, 24, 43, 24], [50, 24, 50, 24], [1, 25, 43, 25], [50, 25, 50, 25],
                [1, 26, 1, 26], [43, 26, 44, 26], [50, 26, 50, 26], [1, 27, 1, 27], [44, 27, 44, 27], [50, 27, 50, 27],
                [1, 28, 1, 28], [44, 28, 44, 28], [50, 28, 50, 28], [1, 29, 1, 29], [44, 29, 45, 29], [50, 29, 50, 29],
                [1, 30, 1, 30], [45, 30, 45, 30], [50, 30, 50, 30], [1, 31, 36, 31], [45, 31, 45, 31], [50, 31, 50, 31],
                [1, 32, 36, 32], [45, 32, 47, 32], [50, 32, 50, 32], [1, 33, 1, 33], [35, 33, 35, 33], [50, 33, 50, 33],
                [1, 34, 1, 34], [35, 34, 35, 34], [50, 34, 50, 34], [1, 35, 1, 35], [35, 35, 35, 35], [49, 35, 50, 35],
                [1, 36, 1, 36], [49, 36, 50, 36], [1, 37, 1, 37], [49, 37, 50, 37], [1, 38, 1, 38], [49, 38, 50, 38],
                [1, 39, 36, 39], [49, 39, 50, 39], [1, 40, 36, 40], [48, 40, 50, 40],
                [1, 41, 6, 41], [48, 41, 50, 41], [1, 42, 6, 42], [47, 42, 50, 42],
                [1, 43, 6, 43], [38, 43, 39, 43], [47, 43, 50, 43], [1, 44, 1, 44], [38, 44, 39, 44], [50, 44, 50, 44],
                [1, 45, 1, 45], [38, 45, 41, 45], [45, 45, 45, 45], [50, 45, 50, 45], [1, 46, 1, 46], [38, 46, 41, 46], [44, 46, 45, 46], [50, 46, 50, 46],
                [1, 47, 1, 47], [50, 47, 50, 47], [1, 48, 1, 48], [50, 48, 50, 48], [1, 49, 1, 49], [50, 49, 50, 49], [1, 50, 50, 50]
            ]),
            boxes: [
                { ...this.cellRect(16, 7), name: '箱子1' },
                { ...this.cellRect(22, 7), name: '箱子2' },
                { ...this.cellRect(32, 7), name: '箱子3' },
                { ...this.cellRect(18, 23), name: '箱子4' },
                { ...this.cellRect(25, 23), name: '箱子5' },
                { ...this.movableCell(16, 8, 17, 8, null, '可动砖块4', 'lock4') },
                { ...this.movableCell(22, 8, 23, 8, null, '可动砖块5', 'lock5') },
                { ...this.movableCell(32, 8, 33, 8, null, '可动砖块6', 'lock6') },
                { ...this.movableCell(37, 5, 36, 5, 'pressure7', '可动砖块7') }
            ],
            keys: [{ ...this.cellRect(34, 23), color: 'purple', name: '钥匙0' }],
            locks: [
                { ...this.cellRect(6, 13), color: 'red', channel: 'lock4', name: '机关锁4' },
                { ...this.cellRect(3, 17), color: 'blue', channel: 'lock5', name: '机关锁5' },
                { ...this.cellRect(33, 23), color: 'yellow', channel: 'lock6', name: '机关锁6' }
            ],
            doors: [
                { ...this.cellRect(30, 21, 1, 3), color: 'red', channel: 'pressure1', controlSource: 'pressure', active: true, name: '机关门1' },
                { ...this.cellRect(37, 21, 1, 3), color: 'blue', channel: 'pressure2', controlSource: 'pressure', active: true, name: '机关门2' },
                { ...this.cellRect(35, 36, 1, 3), color: 'purple', channel: 'key0', controlSource: 'key', keyChannel: 'purple', active: true, name: '机关门0' }
            ],
            hiddenDoors: [],
            pressurePlates: [
                { ...this.cellRect(16, 23), color: 'purple', channel: 'pressure1', controlSource: 'pressure', name: '压力机关1' },
                { ...this.cellRect(22, 23), color: 'blue', channel: 'pressure2', controlSource: 'pressure', name: '压力机关2' },
                { ...this.cellRect(36, 7), color: 'green', channel: 'pressure7', controlSource: 'pressure', name: '压力机关7' }
            ],
            traps: [],
            machine: null,
            consoles: [],
            fragileWalls: [],
            mirrors: [],
            seeds: [{ ...this.cellRect(37, 7), name: '种子' }],
            batteries: [],
            lightSensors: [],
            lightSources: [{ ...this.cellRect(37, 4), angle: Math.PI / 2, name: '光源向下' }],
            prompts: [],
            papers: [
                {...this.cellRect(33, 4), category: 'characters'},
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
            color: 'green',
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

        if(!this.levelData || this.levelData.id !== 4)
        {
            return;
        }

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

window.forestLevel4Minigame = forestLevel4Minigame;
