const oldMan =
{
    name: 'Old Man',

    x: 520,
    y: 300,
    width: 48,
    height: 48,
    radius: 90,
    color: '#fcef00',

    colliderWidth: 0,
    colliderHeight: 20,
    colliderOffsetX: 0,
    colliderOffsetY: -10,

    sprite: new Image(),

    // the dialogue text itself lives only in dialogueText.js

    getLines()
    {
        return getDialogueLines('oldMan', allPartsInstalled() ? 'end' : 'start');
    },

    talk()
    {
        dialogue.open(getDialogueName('oldMan'), this.getLines());
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

        const cx = this.x + this.colliderOffsetX;
        const cy = this.y + this.colliderOffsetY;

        const omLeft = cx - this.colliderWidth / 2;
        const omRight = cx + this.colliderWidth / 2;
        const omTop = cy - this.colliderHeight / 2;
        const omBot = cy + this.colliderHeight / 2;

        return left < omRight && right > omLeft && top < omBot && bot > omTop;
    },

    render(ctx)
    {
        ctx.save();

        if(this.sprite.complete && this.sprite.naturalWidth !== 0)
        {
            ctx.drawImage(this.sprite, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
        else
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }

        if(window.Player && this.nearPlayer(window.Player) && !(window.dialogue && dialogue.isOpen))
        {
            ctx.fillStyle = 'black';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(getText('talkPrompt'), this.x, this.y - this.height / 2 - 15);
        }

        ctx.restore();
    }
};

oldMan.sprite.src = 'assets/character/oldMan.png';
window.oldMan = oldMan;