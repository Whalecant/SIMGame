class vehicleManager
{
    constructor()
    {
        this.currentVehicleIdx = 0; //0 to 14 for 15 of them
        this.repairCount = 0;
        this.activeVehicle = null;
        this.timer = 0;
        this.timerInterval = null;

        this.allParts = ['wires', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7', 'part8', 'part9', 'part10', 'part11', 'part12'];
    }

    getPartCount(vehicleNum)
    {
        if(vehicleNum == 0)
        {
            return 3;
        }

        if(vehicleNum <= 4)
        {
            return Math.floor(Math.random() * 3) + 4;
        }

        if(vehicleNum <= 8)
        {
            return Math.floor(Math.random() * 4) + 5;
        }

        if(vehicleNum <= 13)
        {
            return Math.floor(Math.random() * 3) + 7;
        }

        if(vehicleNum == 14)
        {
            return 10;
        }
        
    }

    getTimeLim(partCount)
    {
        return partCount * 60 + 30;
    }

    spawnNextVeh()
    {
        if(this.currentVehicleIdx >= 15)
        {
            this.ending();
            return null;
        }

        const vehicleNum = this.currentVehicleIdx;
        const count = this.getPartCount(vehicleNum);

        const shuffled = [...this.allParts].sort(() => 0.5 - Math.random()); //picks the necesary amoutn from teh possibel lsit of parts
        const selectedParts = shuffled.slice(0, count);

        const requiredParts = {};

        selectedParts.forEach(part =>
        {
            requiredParts[part] = false;
        }
        );

        this.activeVehicle = 
        {
            id: vehicleNum,
            parts: requiredParts,
            totalParts: count,
            installedParts: 0,
            timeRem: this.getTimeLim(count),
            isComplete: false
        };

        this.startTimer();
        return this.activeVehicle;
    }

    startTimer()
    {
        clearInterval(this.timerInterval); // allows clearing of timers set with setInteveral

        this.timerInterval = setInterval(() =>
        {
            if(Game.currentState === 'PLAYING' && !overworld.isTrans)
            {
                this.activeVehicle.timeRem--;
            }

            const vehicleTimer = document.getElementById('vehicleTimer');
            
            if(vehicleTimer)
            {
                vehicleTimer.textContent = this.activeVehicle.timeRem;
            }

            if(this.activeVehicle.timeRem <= 0)
            {
                this.vehicleFail();
            }

            
        }, 1000);
    }

    timePenalty(seconds)
    {
        this.activeVehicle.timeRem = Math.max(0, this.activeVehicle.timeRem - seconds);
    }

    completePart(partKey)
    {
        if(!this.activeVehicle || this.activeVehicle.parts[partKey])
        {
            return;
        }

        this.activeVehicle.parts[partKey] = true;
        this.activeVehicle.installedParts++;

        if(this.activeVehicle.installedParts >= this.activeVehicle.totalParts)
        {
            this.finishVehicle(true);
        }
    }

    vehicleFail()
    {
        clearInterval(this.timerInterval);

        alert(`Timeout for vehicle #${this.activeVehicle.id + 1}`);

        this.finishVehicle(false);
    }

    finishVehicle(success)
    {
        clearInterval(this.timerInterval);
        if(success)
        {
            this.repairCount++;
        }

        this.currentVehicleIdx++;

        if(this.currentVehicleIdx < 15)
        {
            this.spawnNextVeh();
        }
        else
        {
            this.ending();
        }
    }

    ending()
    {
        clearInterval(this.timerInterval);

        let endingType = 'BAD';

        if(this.repairCount >= 15)
        {
            endingType = 'GOOD';
        } 
        else if(this.repairCount >= 10)
        {
            endingType = 'NEUTRAL';
        }

        Game.currentState = 'END';
        console.log(`Repaired #${this.repairCount}, Ending Type #${endingType}`);
        

    }

};

window.vehicleManager = new vehicleManager();