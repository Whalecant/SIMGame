const oldMan = 
{
    name: 'Old Man',

    x: 520,
    y: 330,
    width: 48,
    height: 48,
    radius: 90,
    color: '#fcef00',

    colliderWidth: 40,
    colliderHeight: 20,

    sprite: new Image(),

    lines:
    {
        start:
        [
            'This is your first day but remember that the job remains the same, we are responsible for repairing the essential airship machinery, and today as the one taking over I will be supervising YOU take hold of the situation.',
            'Despite my protests you insist on acquiring the parts we lack from inventory yourself to take advantage of your temporary maneuverability and cost efficiency but I say your just being a reckless little runt, so do us all a favor and be careful or I will lock you in the workshop myself from here on out.',

        ],

        end:
        [
            'I, I do not believe it, despite all the challenges and sabotage that has arisen you have managed to finish none the less,',
            'however we are not across the finish line yet we just managed to stand before the door despite all the traps along the path,',
            'now as hands off as it may seem, you have proven to take lead where ever I have fallen short, and I believe it should be you who knocks on the palace doors, take responsibility for your vision and all your reckless plans and finish this yourself for all those who trust you myself included,',
            'bring an end to their crimes and bring them into the light, stand on the stage yourself and change these folks minds, I know you can',
        ],
    },

    getLines()
    {
        return allPartsInstalled() ? this.lines.end : this.lines.start;
    },

    talk()
    {
        dialogue.open(this.name, this.getLines());
    },

    nearPlayer(pos)
    {
        return Math.hypot(pos.x - this.x, pos.y - this.y) <= this.radius;
    },

    boxCollider(pos, nextX, nextY)
    {
        const left = nextX - pos.width / 2;
        const right = nextX + pos.width / 2;
        const top = nextY - pos.height / 2;
        const bot = nextY + pos.height / 2;

        const omLeft = this.x - this.colliderWidth / 2;
        const omRight = this.x + this.colliderWidth / 2;
        const omBot = this.y + this.colliderHeight / 2;
        const omTop = this.y - this.colliderHeight / 2;

        return left < omRight && right > omLeft && top < omBot && bot > omTop;
    },

    render(ctx)
    {
        ctx.save()
        
        if(this.sprite.complete && this.sprite.naturalWidth !== 0)
        {
            ctx.drawImage(this.sprite, this.x - this.widt / 2, this.y - this.height / 2);
        }
        else
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

            ctx.fill();
        }

        if(window.Player && this.nearPlayer(window.Player) && !(window.dialogue && dialogue.isOpen))
        {
            ctx.fillStyle = 'black';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('[E] Talk', this.x, this.y - this.height / 2 - 30);
        }

        ctx.restore();
    }
};

window.oldMan = oldMan