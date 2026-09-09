class forestLevel2Minigame extends forestPlatformMinigame
{
    init()
    {
        super.init();
        this.levelData = { id: 2, spawn: { x: 120, y: 592 }, platforms: [{ x: 0, y: this.worldHeight - this.wallUnit * 2, width: this.worldWidth, height: this.wallUnit * 2 }], walls: [] };
        this.applyLevelData();
    }

    applyLevelData()
    {
        this.spawn = this.levelData.spawn;
        this.platforms = this.levelData.platforms;
        this.walls = this.levelData.walls.map(wall => ({ ...wall, width: wall.width * this.wallUnit, height: wall.height * this.wallUnit }));
        this.resetPlayer();
    }
}

window.forestLevel2Minigame = forestLevel2Minigame;
