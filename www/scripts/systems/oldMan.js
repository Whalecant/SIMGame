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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod lorem sit amet tempor iaculis.',
            'Vestibulum luctus feugiat urna vel pharetra. Fusce pretium urna diam, sed semper diam tincidunt ac.'
        ],

        end:
        [
            'Nulla id massa lacus. Quisque gravida turpis eget odio elementum tristique.' ,
            'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
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