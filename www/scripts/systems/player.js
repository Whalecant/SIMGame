const player = 
{
    x: 640,
    y: 320,
    width: 16,
    height: 32,
    speed: 8,
    color: 'skyblue',

    update(deltaTime)
    {
        if(!window.Input)
        {
            return;
        }

        const freeze = window.overworld && overworld.isTrans;

        if(!freeze)
        {
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
        }

        

        /*if(window.roomManager)
        {
            roomManager.roomClamp(this);
        }*/

        if(window.overworld)
        {
            overworld.update(this, deltaTime);
        }
    },

    render(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
};

window.Player = player; //load bearing player :)) (ok no but in all seriousness, this lets like... everything else works lol, because they all search for this)