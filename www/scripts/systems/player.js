const player = 
{
    x: 640,
    y: 320,
    width: 20,
    height: 32,
    speed: 7,
    color: 'skyblue',

    sprite: new Image(),
    isLoaded: false,

    init()
    {
        this.sprite.src = './assets/character/firstModelPrototype.png';

        this.sprite.onload = () => {this.isLoaded = true;};
    },

    update(deltaTime)
    {
        if(!window.Input)
        {
            return;
        }

        const freeze = window.overworld && overworld.isTrans;

        if(!freeze)
        {
            const prevX = this.x;
            const prevY = this.y;

            if(Input.isDown('w'))
            {
                this.y -=this.speed;
            }

            if(Input.isDown('s'))
            {
                this.y += this.speed;
            }

            if(window.roomManager && roomManager.currRoomId === 'hub' && window.Vehicle && vehicle.boxCollider(this, this.x, this.y))
            {
                this.y = prevY;
            }

            if(Input.isDown('a'))
            {
                this.x -= this.speed;
            }

            if(Input.isDown('d'))
            {
                this.x += this.speed;
            }

            if(window.roomManager && roomManager.currRoomId === 'hub' && window.Vehicle && vehicle.boxCollider(this, this.x, this.y))
            {
                this.x = prevX;
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
        if(this.isLoaded)
        {
            ctx.drawImage
            (
                this.sprite,
                this.x - this.width/2,
                this.y - this.height/2,
                this.width,
                this.height
            );
        }
        else
        {
        
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }

    }
};


player.init();

window.Player = player; //load bearing player :)) (ok no but in all seriousness, this lets like... everything else works lol, because they all search for this)