class forestLevel9Minigame extends forestLevel2Minigame
{
	init()
	{
		super.init();
		this.levelData = {
			id: 9,
			spawn: this.cellRect(3, 48, 2, 2),
			enemySpawn: this.cellRect(44, 2, 2, 2),
			exit: this.cellRect(29, 30, 1, 2),
			walls: this.wallRanges([
				[1, 1, 1, 1], [50, 1, 50, 1], [1, 2, 1, 2], [50, 2, 50, 2], [1, 3, 1, 3], [50, 3, 50, 3],
				[1, 4, 3, 4], [6, 4, 50, 4], [1, 5, 1, 5], [50, 5, 50, 5], [1, 6, 1, 6], [50, 6, 50, 6],
				[1, 7, 1, 7], [50, 7, 50, 7], [1, 8, 25, 8], [28, 8, 42, 8], [47, 8, 50, 8], [1, 9, 1, 9], [17, 9, 17, 9], [34, 9, 34, 9], [50, 9, 50, 9],
				[1, 10, 1, 10], [17, 10, 17, 10], [34, 10, 34, 10], [50, 10, 50, 10], [1, 11, 1, 11], [17, 11, 25, 11], [28, 11, 34, 11], [50, 11, 50, 11],
				[1, 12, 1, 12], [17, 12, 17, 12], [34, 12, 34, 12], [50, 12, 50, 12], [1, 13, 1, 13], [17, 13, 17, 13], [34, 13, 34, 13], [50, 13, 50, 13],
				[1, 14, 1, 14], [17, 14, 17, 14], [34, 14, 34, 14], [50, 14, 50, 14], [1, 15, 1, 15], [17, 15, 17, 15], [34, 15, 34, 15], [50, 15, 50, 15],
				[1, 16, 1, 16], [17, 16, 17, 16], [20, 16, 20, 16], [34, 16, 34, 16], [50, 16, 50, 16], [1, 17, 1, 17], [17, 17, 17, 17], [20, 17, 20, 17], [34, 17, 34, 17], [50, 17, 50, 17],
				[1, 18, 1, 18], [17, 18, 17, 18], [20, 18, 20, 18], [34, 18, 34, 18], [50, 18, 50, 18], [1, 19, 1, 19], [17, 19, 17, 19], [20, 19, 20, 19], [34, 19, 34, 19], [50, 19, 50, 19],
				[1, 20, 1, 20], [17, 20, 17, 20], [20, 20, 20, 20], [34, 20, 34, 20], [50, 20, 50, 20], [1, 21, 12, 21], [17, 21, 17, 21], [20, 21, 20, 21], [34, 21, 34, 21], [40, 21, 50, 21],
				[1, 22, 1, 22], [10, 22, 10, 22], [17, 22, 17, 22], [20, 22, 23, 22], [34, 22, 34, 22], [50, 22, 50, 22], [1, 23, 1, 23], [10, 23, 10, 23], [17, 23, 17, 23], [20, 23, 20, 23], [34, 23, 34, 23], [50, 23, 50, 23],
				[1, 24, 1, 24], [10, 24, 10, 24], [15, 24, 15, 25], [17, 24, 17, 24], [20, 24, 20, 24], [34, 24, 36, 24], [50, 24, 50, 24], [1, 25, 1, 25], [6, 25, 6, 25], [17, 25, 17, 25], [20, 25, 20, 25], [34, 25, 34, 25], [50, 25, 50, 25],
				[1, 26, 1, 26], [6, 26, 6, 26], [17, 26, 17, 26], [20, 26, 20, 26], [34, 26, 34, 26], [50, 26, 50, 26], [1, 27, 1, 27], [6, 27, 6, 27], [17, 27, 17, 27], [20, 27, 20, 27], [34, 27, 34, 27], [50, 27, 50, 27],
				[1, 28, 1, 28], [5, 28, 17, 28], [20, 28, 20, 28], [27, 28, 30, 28], [34, 28, 46, 28], [50, 28, 50, 28], [1, 29, 1, 29], [17, 29, 17, 29], [20, 29, 20, 29], [27, 29, 27, 29], [34, 29, 34, 29], [50, 29, 50, 29],
				[1, 30, 1, 30], [17, 30, 17, 30], [20, 30, 20, 30], [27, 30, 27, 30], [34, 30, 34, 30], [50, 30, 50, 30], [1, 31, 1, 31], [17, 31, 17, 31], [20, 31, 20, 31], [27, 31, 27, 31], [34, 31, 34, 31], [50, 31, 50, 31],
				[1, 32, 1, 32], [17, 32, 17, 32], [20, 32, 34, 32], [50, 32, 50, 32], [1, 33, 1, 33], [50, 33, 50, 33], [1, 34, 1, 34], [50, 34, 50, 34], [1, 35, 1, 35], [50, 35, 50, 35],
				[1, 36, 1, 36], [50, 36, 50, 36], [1, 37, 1, 37], [9, 37, 43, 37], [50, 37, 50, 37], [1, 38, 1, 38], [50, 38, 50, 38], [1, 39, 1, 39], [50, 39, 50, 39],
				[1, 40, 1, 40], [50, 40, 50, 40], [1, 41, 1, 41], [50, 41, 50, 41], [1, 42, 1, 42], [50, 42, 50, 42], [1, 43, 1, 43], [50, 43, 50, 43],
				[1, 44, 1, 44], [9, 44, 11, 44], [40, 44, 42, 44], [50, 44, 50, 44], [1, 45, 1, 45], [15, 45, 22, 45], [50, 45, 50, 45],
				[1, 46, 1, 46], [15, 46, 15, 46], [22, 46, 22, 46], [33, 46, 37, 46], [50, 46, 50, 46], [1, 47, 1, 47], [15, 47, 15, 47], [22, 47, 22, 47], [50, 47, 50, 47],
				[1, 48, 1, 48], [15, 48, 15, 48], [22, 48, 22, 48], [50, 48, 50, 48], [1, 49, 1, 49], [15, 49, 15, 49], [22, 49, 22, 49], [50, 49, 50, 49], [1, 50, 50, 50]
			]),
			boxes: [
				{ ...this.movableCell(2, 41, 2, 33, 'pressure1', '可动砖块1', null, 5, 1), color: 'red' },
				{ ...this.movableCell(45, 41, 45, 33, 'pressure2', '可动砖块2', null, 5, 1), color: 'purple' },
				{ ...this.movableCell(42, 17, 42, 12, null, '可动砖块4', 'lock4', 6, 1), color: 'purple' }
			],
			keys: [{ ...this.cellRect(21, 21), color: 'yellow', name: '钥匙0' }],
			locks: [
				{ ...this.cellRect(7, 20), color: 'green', channel: 'lock3', name: '机关锁3' },
				{ ...this.cellRect(45, 16), color: 'purple', channel: 'lock4', name: '机关锁4' }
			],
			doors: [
				{ ...this.cellRect(47, 28, 3, 1), color: 'green', channel: 'lock3', controlSource: 'lock', active: true, name: '机关门3' },
				{ ...this.cellRect(30, 29, 1, 3), color: 'yellow', keyChannel: 'yellow', controlSource: 'key', active: true, name: '机关门0' }
			],
			hiddenDoors: [],
			pressurePlates: [
				{ ...this.cellRect(11, 36), color: 'red', channel: 'pressure1', controlSource: 'pressure', name: '压力机关1' },
				{ ...this.cellRect(39, 36), color: 'blue', channel: 'pressure2', controlSource: 'pressure', name: '压力机关2' }
			],
			traps: [
				{ ...this.halfCellRect(18, 44, 2, 1), name: '陷阱' },
				{ ...this.halfCellRect(43, 49, 5, 1), name: '陷阱' },
				{ ...this.halfCellRect(8, 49, 2, 1), name: '陷阱' },
				{ ...this.halfCellRect(27, 49, 2, 1), name: '陷阱' }
			],
			machine: null,
			consoles: [],
			fragileWalls: [],
			mirrors: [],
			seeds: [],
			batteries: [],
			lightSensors: [],
			lightSources: [],
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

		if(!this.levelData || this.levelData.id !== 9)
		{
			return;
		}

		this.enemySpawn = { ...this.levelData.enemySpawn };
		this.enemy = {
			x: this.enemySpawn.x + (this.enemySpawn.width - this.player.width) / 2,
			y: this.enemySpawn.y,
			width: this.player.width,
			height: this.player.height,
			velocityY: 0,
			grounded: false,
			direction: -1,
			speed: this.runSpeed * 0.55,
			alive: true
		};
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

window.forestLevel9Minigame = forestLevel9Minigame;
