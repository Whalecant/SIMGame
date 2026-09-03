class vehicleManager
{
    constructor()
    {
        this.currentVehicleIdx = 0; //0 to 14 for 15 of them
        this.repairCount = 0;
        this.activeVehicle = null;
        this.heldPart = null;

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

        if(vehicleNum >= 14)
        {
            return Math.floor(Math.random() * 3) + 8;
        }

        if(vehicleNum >= 19)
        {
            return Math.floor(Math.random() * 3) + 10;
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

        if(this.activeVehicle.parts.hasOwnProperty(partKey) && !this.activeVehicle.parts[partKey])
        {
            this.activeVehicle.parts[partKey] = true;
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

        this.activeVehicle.parts[partKey] = true;
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