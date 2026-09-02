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
            },

            {
                edge: 'top',
                rangeStart: 560,
                rangeEnd: 720,
                targetMg: 'connectWireMinigame',
            },

            {
                edge: 'left',
                rangeStart: 260,
                rangeEnd: 460,
                targetMg: 'mgTemp1',
            },

            {
                edge: 'right',
                rangeStart: 260,
                rangeEnd: 460,
                targetMg: 'mgTemp2',
            },

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
            },

            {
                edge: 'bot',
                rangeStart: 560,
                rangeEnd: 720,
                targetMg: 'mgTemp3',
            },

            {
                edge: 'left',
                rangeStart: 260,
                rangeEnd: 460,
                targetMg: 'mgTemp4',
            },

            {
                edge: 'right',
                rangeStart: 260,
                rangeEnd: 460,
                targetMg: 'mgTemp5',
            },
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
            },

            {
                edge: 'top',
                rangeStart: 560,
                rangeEnd: 720,
                targetMg: 'mgTemp6',
            },

            {
                edge: 'bot',
                rangeStart: 560,
                rangeEnd: 720,
                targetMg: 'mgTemp7',
            },

            {
                edge: 'right',
                rangeStart: 260,
                rangeEnd: 460,
                targetMg: 'mgTemp8',
            },
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
            },

            {
                edge: 'bot',
                rangeStart: 560,
                rangeEnd: 720,
                targetMg: 'mgTemp9',
            },

            {
                edge: 'top',
                rangeStart: 560,
                rangeEnd: 720,
                targetMg: 'mgTemp10',
            },

            {
                edge: 'left',
                rangeStart: 260,
                rangeEnd: 460,
                targetMg: 'mgTemp11',
            },
        ],

        render(ctx)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, 1280, 720);
        }
    }, 
};

window.Rooms = rooms;