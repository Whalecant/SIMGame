const savePoint =
{
    x: 450,
    y: 250,
    width: 35,
    height: 50,
    radius: 60,
    color: '#a91313' ,

    colliderWidth: 20,
    colliderHeight: 18,
    colliderOffset: 14,

    render(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    },

    nearPlayer(pos)
    {
        const dx = pos.x - this.x;
        const dy = pos.y - this.y;

        return Math.sqrt(dx * dx + dy * dy) <= this.radius;
    },
    
    boxCollider(pos, nextX, nextY)
    {
        const halfWidth = pos.width / 2;
        const halfHeight = pos.height / 2;

        const left = nextX - halfWidth;
        const right = nextX + halfWidth;
        const top = nextY - halfHeight;
        const bot = nextY + halfHeight;

        const cx = this.x;
        const cy = this.y - this.colliderOffset;

        const sLeft = cx - this.colliderWidth/2;
        const sRight = cx + this.colliderWidth/2;
        const sTop = cy - this.colliderHeight/2;
        const sBot = cy + this.colliderHeight/2;

        return left < sRight && right > sLeft && top < sBot && bot > sTop;
    }
};

window.savePoint = savePoint;

