const islandSprite = new Image();
islandSprite.src = 'assets/map/island.png';

const bridgeSprite = new Image();
bridgeSprite.src = 'assets/map/bridge.png';

const rooms = 
{
    hub:
    {
        id: 'hub',
        color: '#e69552',
        minX: 200,
        maxX: 1080,
        minY: 180,
        maxY: 540,
        exits:
        [
            {
                edge: 'top', 
                rangeStart: 620, 
                rangeEnd: 650, 
                targetRoom: 'northWing',
                length: 220,
                thickness: 90,
            },
            
            {
                edge: 'bot', 
                rangeStart: 620, 
                rangeEnd: 670, 
                targetRoom: 'southWing',
                length: 150,
                thickness: 90,
            },

            {
                edge: 'right', 
                rangeStart: 360, 
                rangeEnd: 410, 
                targetRoom: 'eastWing',
                length: 250,
                thickness: 90,
            },
            
            {
                edge: 'left', 
                rangeStart: 360, 
                rangeEnd: 410, 
                targetRoom: 'westWing',
                length: 250,
                thickness: 90,
            }

        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, 0, 0, 1280, 720);
            }
        }
    },

    northWing:
    {
        id: 'northWing',
        color: '#e69552',

        minX: 300,
        maxX: 1000,
        minY: 400,
        maxY: 720,
        exits:
        [
            {
                edge: 'bot',
                rangeStart: 620,
                rangeEnd: 670,
                targetRoom: 'hub',
                length: 50,
                thickness: 90,
            },
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, 180, 300, 920, 500);
            }
        }
    }, 

    southWing:
    {
        id: 'southWing',
        color: '#e69552',
        minX: 300,
        maxX: 1000,
        minY: 50,
        maxY: 320,
        exits:
        [
            {
                edge: 'top',
                rangeStart: 620,
                rangeEnd: 670,
                targetRoom: 'hub',
                length: 100,
                thickness: 90,
            },
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, 180, -80, 920, 500);
            }
        }
    }, 

    eastWing:
    {
        id: 'eastWing',
        color: '#e69552',
        minX: 50,
        maxX: 600,
        minY: 220,
        maxY: 500,

        exits:
        [
            {
                edge: 'left',
                rangeStart: 360,
                rangeEnd: 410,
                targetRoom: 'hub',
                length: 100,
                thickness: 90,
                
            },
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, -40, 110, 720, 500);
            }
        }
    }, 

    westWing:
    {
        id: 'westWing',
        color: '#e69552',
        minX: 680,
        maxX: 1230,
        minY: 220,
        maxY: 500,
        exits:
        [
            {
                edge: 'right',
                rangeStart: 360,
                rangeEnd: 410,
                targetRoom: 'hub',
                length: 100,
                thickness: 90,
            },
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);

            if(islandSprite.complete && islandSprite.naturalWidth !== 0)
            {
                ctx.drawImage(islandSprite, 600, 110, 720, 500);       
            }
        }
    }, 
};

window.Rooms = rooms;