const vehicle = 
{
    x: 640,
    y: 250,
    width: 200,
    height: 100,
    color: '#020101',
    radius: 125,

    colliderWidth: 150,
    colliderHeight: 10,
    colliderOffset: 20,

    installedParts: new Set(),
    totalRequired: 8,
    
    installPart(partKey)
    {
        if(partKey)
        {
            this.installedParts.add(partKey);
        }
    },

    isFullyRepaired()
    {
        return this.installedParts.size >= this.totalRequired;
    },

    render(ctx)
    {
        if(!ctx)
            return;

        if(vehicleSprite.complete && vehicleSprite.naturalWidth !== 0)
        {
            ctx.save();

            ctx.translate(this.x, this.y);

            ctx.rotate(Math.PI / 2);

            ctx.drawImage(
                vehicleSprite,
                -this.height / 2,
                -this.width / 2,
                this.height,
                this.width,
            );

            ctx.restore();
        }
        else
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        }
        
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

        const vLeft = cx - this.colliderWidth/2;
        const vRight = cx + this.colliderWidth/2;
        const vTop = cy - this.colliderHeight/2;
        const vBot = cy + this.colliderHeight/2;

        return left < vRight && right > vLeft && top < vBot && bot > vTop;
    }
}

const vehicleSprite = new Image();
vehicleSprite.src = 'assets/airshipAndGears/airshipModel.png';

window.Vehicle = vehicle;