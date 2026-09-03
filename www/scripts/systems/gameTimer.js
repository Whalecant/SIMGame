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
        const isTrans = window.overworld && window.overworld.isTrans;

        if(Game.currentState !== 'PLAYING' || isTrans)
        {
            return;
        }

        this.elapsedSec += deltaTime;

        if(this.elapsedSec >= this.realLifeDur)
        {
            this.nextDay();
        }
    }

    getFormattedTime()
    {
        const totalWorkHours = this.endHour - this.startHour;
        const totalworkMins = totalWorkHours * 60;

        const progress = Math.min(this.elapsedSec / this.realLifeDur, 1);
        const currWorkMin = Math.floor(progress * totalworkMins);

        const currHour = this.startHour + Math.floor(currWorkMin / 60);
        const currMin = currWorkMin % 60;

        const paddedHour = String(currHour).padStart(2, '0');
        const paddedMin = String(currMin).padStart(2, '0');

        return `Day ${this.currDay}/${this.maxDays} - ${paddedHour}:${paddedMin}`;

    }

    nextDay()
    {
        this.elapsedSec = 0;
        this.currDay++;

        if(this.currDay > this.maxDays)
        {
            if(window.vehicleManager)
            {
                window.vehicleManager.ending();
            }
        }
        else
        {
            if(typeof showMsgPopup === 'function')
            {
                showMsgPopup(`Day ${this.currDay - 1} finished!`)
            }
        }
    }
}

window.gameTimer = new gameTimer();