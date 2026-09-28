class vehicleManager
{
    constructor()
    {
        this.currentVehicleIdx = 0;
        this.repairCount = 0;
        this.activeVehicle = null;
        this.heldPart = null;

        this.triggeredEnd = false;
        this.endlessModeUnlock = false;
        this.endlessMode = false;

        this.allParts = ['Wires', 'Part2', 'Part3', 'Part4', 'Part5', 'Part6', 'Part7', 'Part8', 'Part9', 'Part10', 'Part11', 'Part12'];
    }

    getPartCount(vehicleNum)
    {
        if(vehicleNum == 0)
        {
            return 3;
        }

        if(vehicleNum <= 4)
        {
            return Math.floor(Math.random() * 3) + 4; //4-6
        }

        if(vehicleNum <= 8)
        {
            return Math.floor(Math.random() * 4) + 5; //5-8
        }

        if(vehicleNum == 9)
        {
            return 8;
        }

        if(vehicleNum <= 13)
        {
            return Math.floor(Math.random() * 3) + 7; //7-9
        }

        if(vehicleNum == 14)
        {
            return 10;
        }

        if(vehicleNum <= 18)
        {
            return Math.floor(Math.random() * 2) + 10; // 10-11
        }

        if(vehicleNum == 19)
        {
            return 12;
        }

        if(vehicleNum >= 20)
        {
            const currDay = (window.gameTimer && window.gameTimer.currDay) ? window.gameTimer.currDay : 1;

            const vehicleBonus = Math.floor((vehicleNum - 20) / 3); // adds 1 extra part each 3 vehicles
            const dayBonus = Math.floor(currDay / 5) // adds 1 extra part every 5 days

            const baseParts = 12 + vehicleBonus + dayBonus

            const randomVariance = Math.floor((Math.random() * ((Math.random() * 2) + 3)) + 1); //random extra parts (i wanted to have some fun so the odds are liek skewed to all hell but who cares :P)

            return baseParts + randomVariance;
        }
        
    }

    receivePart(partKey)
    {
        if(this.heldPart)
        {
            if(typeof showMsgPopup === 'function')
            {
                showMsgPopup(getText('alrCarryPart'));
            }

            return false;
        }
        
        this.heldPart = partKey;

        if(typeof showMsgPopup === 'function')
        {
            showMsgPopup(`${getText('acquiredPart')}${partKey}`);
        }

        return true;
    }

    deliverHeldPart()
    {
        if(!this.heldPart || !this.activeVehicle)
        {
            return;
        }

        const partKey = this.heldPart;

        if(this.activeVehicle.parts.hasOwnProperty(partKey) && this.activeVehicle.parts[partKey] > 0)
        {
            this.activeVehicle.parts[partKey]--;
            this.activeVehicle.installedParts++;

            if(typeof showMsgPopup === 'function')
            {
                showMsgPopup(`${getText('installedPart')}${partKey}`);
            }

            if(this.activeVehicle.installedParts >= this.activeVehicle.totalParts)
            {
                this.finishVehicle(true);
            }
        }
        else
        {
            if(typeof showMsgPopup === 'function')
            {
                showMsgPopup(`${getText('scrappedPart')}${partKey}`);
            }
        }

        this.heldPart = null;
    }

    spawnNextVeh()
    {
        const vehicleNum = this.currentVehicleIdx;
        const count = this.getPartCount(vehicleNum);
        const requiredParts = {};

        if(vehicleNum >= 20)
        {
            for(let i = 0; i < count; i++)
            {
                const randomPart = this.allParts[Math.floor(Math.random() *  this.allParts.length)];
                requiredParts[randomPart] = (requiredParts[randomPart] || 0) + 1;
            }
        }
        else
        {
            const shuffled = [...this.allParts].sort(() => 0.5 - Math.random()); //picks the necesary amoutn from teh possibel lsit of parts
            const selectedParts = shuffled.slice(0, count);

            selectedParts.forEach(part =>
            {
                requiredParts[part] = 1;
            }
            )
        }

        this.activeVehicle = 
        {
            id: vehicleNum,
            parts: requiredParts,
            partsTotal: {...requiredParts},
            totalParts: count,
            installedParts: 0,
            isComplete: false
        };

        return this.activeVehicle;
    }

    completePart(partKey)
    {
        if(!this.activeVehicle || this.activeVehicle.parts[partKey])
        {
            return;
        }

        this.activeVehicle.parts[partKey]--;
        this.activeVehicle.installedParts++;

        if(this.activeVehicle.installedParts >= this.activeVehicle.totalParts)
        {
            this.finishVehicle(true);
        }
    }

    finishVehicle(success)
    {
        
        if(success)
        {
            this.repairCount++;
        }

        this.currentVehicleIdx++;

        this.spawnNextVeh();
    }

    ending()
    {

        if(this.triggeredEnd)
        {
            return;
        }
        this.triggeredEnd = true;

        let endingType = 'BAD';

        if(this.repairCount >= 15)
        {
            endingType = 'GOOD';
        } 
        else if(this.repairCount >= 10)
        {
            endingType = 'NEUTRAL';
        }
        
        this.endingType = endingType;
        Game.currentState = 'END';
        console.log(`Repaired #${this.repairCount}, Ending Type #${endingType}`);

        if(window.saveManager && Game.currentSaveSlot)
        {
            saveManager.save(Game.currentSaveSlot);
        }

        if(typeof showCutscene === 'function')
        {
            showCutscene(endingType);
        }
        

    }

};

window.vehicleManager = new vehicleManager();