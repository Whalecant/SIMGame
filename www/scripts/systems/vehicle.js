const vehicle = 
{
    x: 640,
    y: 250,
    width: 200,
    height: 100,
    color: '#020101',

    render(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    },

    boxCollider(pos, nextX, nextY)
    {
        const halfWidth = pos.width / 2;
        const halfHeight = pos.height / 2;

        const left = nextX - halfWidth;
        const right = nextX + halfWidth;
        const top = nextY - halfHeight;
        const bot = nextY + halfHeight;

        const vLeft = this.x - this.width/2;
        const vRight = this.x + this.width/2;
        const vTop = this.y - this.height/2;
        const vBot = this.y + this.height/2;

        return left < vRight && right > vLeft && top < vBot && bot > vTop;
    }
}

window.Vehicle = vehicle;