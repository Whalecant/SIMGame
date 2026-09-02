const rooms = 
{
    hub:
    {
        id: 'hub',
        color: '#477450',
        exits:
        [
            {
                edge: 'top', 
                rangeStart: 560, 
                rangeEnd: 720, 
                targetRoom: 'northWing'
            },
            
            {
                edge: 'bot', 
                rangeStart: 560, 
                rangeEnd: 720, 
                targetRoom: 'southWing'
            },

            {
                edge: 'right', 
                rangeStart: 260, 
                rangeEnd: 460, 
                targetRoom: 'eastWing'
            },
            
            {
                edge: 'left', 
                rangeStart: 260, 
                rangeEnd: 460, 
                targetRoom: 'westWing'
            }

        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);
        }
    },

    northWing:
    {
        id: 'northWing',
        color: 'rgb(67, 67, 145)',
        exits:
        [
            {
                edge: 'bot',
                rangeStart: 560,
                rangeEnd: 720,
                targetRoom: 'hub'
            }
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);
        }
    }, 

    southWing:
    {
        id: 'southWing',
        color: 'rgb(177, 76, 157)',
        exits:
        [
            {
                edge: 'top',
                rangeStart: 560,
                rangeEnd: 720,
                targetRoom: 'hub'
            }
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);
        }
    }, 

    eastWing:
    {
        id: 'eastWing',
        color: 'rgb(174, 190, 92)',
        exits:
        [
            {
                edge: 'left',
                rangeStart: 260,
                rangeEnd: 460,
                targetRoom: 'hub'
            }
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);
        }
    }, 

    westWing:
    {
        id: 'westWing',
        color: 'rgb(151, 119, 36)',
        exits:
        [
            {
                edge: 'right',
                rangeStart: 260,
                rangeEnd: 460,
                targetRoom: 'hub'
            }
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);
        }
    }, 
};

window.Rooms = rooms;