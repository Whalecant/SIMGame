class gameTimer
{
    constructor()
    {
        this.currDay = 1;
        this.maxDays = 7;

        this.realLifeDur = 600; //600 seconds per day
        this.elapsedSec = 0;

        // go from 8 am to 6 pm, after 6, the character will automatically(?) go back to their house and saving will occur for the day
        this.startHour = 8;
        this.endHour = 18
        
    }

    reset()
    {
        this.currDay = 1;
        this.elapsedSec = 0;
    }

    update(deltaTime)
    {

    }

    getFormattedTime()
    {
        return "";
    }

    
}

window.gameTimer = new gameTimer();