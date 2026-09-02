const player = 
{
    x: 640,
    y: 320,
    width: 16,
    height: 32,
    speed: 8,
    color: 'skyblue',

    update()
    {
        if(!window.Input)
        {
            return;
        }

        if(Input.isDown('w'))
        {
            this.y -=this.speed;
        }

        if(Input.isDown('s'))
        {
            this.y += this.speed;
        }

        if(Input.isDown('a'))
        {
            this.x -= this.speed;
        }

        if(Input.isDown('d'))
        {
            this.x += this.speed;
        }

        if(window.roomManager)
        {
            roomManager.roomClamp(this);
            roomManager.update(this);
        }
    },

    render(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
};

window.Player = player; //load bearing player :)) (ok no but in all seriousness, this lets like... everything else works lol, because they all search for this)