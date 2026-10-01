const saveManager = 
{
    keyFor (slot)
    {
        return `saveSlot${slot}`;
    },

    hasSave(slot)
    {
        return localStorage.getItem(this.keyFor(slot)) !== null;
    },

    buildData()
    {
        const data =
        {
            playerX: window.Player ? Player.x : 640,
            playerY: window.Player ? Player.y : 400,
            roomId: window.roomManager ? roomManager.currRoomId : 'hub',
            vehicle:
            {
                currentVehicleIdx: window.vehicleManager.currentVehicleIdx,
                repairCount: window.vehicleManager.repairCount,
                activeVehicle: window.vehicleManager.activeVehicle,
                endlessMode: window.vehicleManager.endlessMode,
                endingType: window.vehicleManager.endingType || null,
            },

            timer: window.gameTimer ? { currDay: window.gameTimer.currDay, elapsedSec: window.gameTimer.elapsedSec } : null,

            installedParts: window.Vehicle ? [...window.Vehicle.installedParts] : [],
            completedLevels: window.stationManager ? [...window.stationManager.completedLevels] : [],
        };

        return data;
    },

    save(slot)
    {
        if(!slot)
        {
            return;
        }

        localStorage.setItem(this.keyFor(slot), JSON.stringify(this.buildData()));
        refreshSaveSlotDisplay(slot);
    },

    load(slot)
    {
        const raw = localStorage.getItem(this.keyFor(slot));
        if(!raw)
        {
            return null;
        }

        try
        {
            return JSON.parse(raw);
        }
        catch(e)
        {
            return null; //if error cocured when trying to load save data
        }
    },

    deleteSave(slot)
    {
        localStorage.removeItem(this.keyFor(slot));

        refreshSaveSlotDisplay(slot);
    }


};

window.saveManager = saveManager;