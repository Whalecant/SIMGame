class connectWireMinigame extends baseMinigame
{
    constructor(canvas, ctx, onComplete, rewardPartKey = 'wires')
    {
        super(canvas, ctx, onComplete);
        this.rewardPartKey = rewardPartKey;
    }

    init() //this is also required btw for all minigames due to how i made the template
    {
        this.hidePlayer = true;
        this.hideDpad = true;
        this.wireCount = 5;
        this.isCompleted = false; //this is jsut an edgecase handler since potential bug if player finshes game at exactly 0 seconds... some fucking how

        // for mobile support
        const minDimension = Math.min(this.canvas.width, this.canvas.height);
        this.nodeRadius = Math.max(15, Math.min(20, minDimension * 0.035));
        this.lineWidth = Math.max(5, Math.min(6, minDimension * 0.012));

        const verticalPadding = this.canvas.height * 0.10;
        const availableHeight = this.canvas.height - (verticalPadding * 2);
        const stepY = availableHeight / (this.wireCount - 1);

        const xMargin = Math.max(35, this.canvas.width * 0.12);

        //for random colour generation, uses HSL, but this case only the hue is randomyl generated, the S and L are fixed
        const hueStep = 360/this.wireCount;
        const baseHueOffset = Math.floor(Math.random() * 360);

        this.colors = Array.from({length: this.wireCount}, (_, i) => // for looping, this is essentially for(int i = 0; i < 5; i++)
        {
            const hue = (baseHueOffset + i * hueStep) % 360 //do you *really* want me to explain boring math, or do you want me to just say random number generator + mod = a set of random hues are generated within predetermined limits
            return `hsl(${hue}, 85%, 85%)`;
        });


        //left side
        this.leftNodes = this.colors.map((color, i) => (
            {
                id: i,
                x : xMargin,
                y : verticalPadding + (i * stepY),
                color: color
            }
        ));

        //right side
        const shuffledColors = [...this.colors].sort(() => Math.random() - 0.5); //the ... before the this.colors is called a spread operator, it allows allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected
        //tldr, its just QOL since there's an array and i need to include em all :thumbsup:
        
        this.rightNodes = shuffledColors.map((color, i) => (
            {
                id: `R${i}`,
                x : this.canvas.width - xMargin,
                y : verticalPadding + (i * stepY),
                color: color
            }
        ));

        this.connections = [];
        this.activeNode = null;
        this.mousePos = {x: 0, y: 0};

        //for inputs
        this.bindInputs();

    }

    bindInputs()
    {
        this.mouseDownHandler = (e) => this.handleStart(this.getCanvasInputPos(e)); //the more you know, 'e' stands for even in JS, just used to idnicate if certain event happed, very simple for control schemes :thumbsup:
        this.mouseMoveHandler = (e) => this.handleMove(this.getCanvasInputPos(e));
        this.mouseUpHandler = () => this.handleEnd();

        this.canvas.addEventListener('mousedown', this.mouseDownHandler);
        this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
        this.canvas.addEventListener('mouseup', this.mouseUpHandler);
        // another feature about javascript i jsut learned, DOM events (the events for add and remove event listeners) needs it to be enitrely lowercase... i think i learned this in the past but its been a bit lol, also again, i write in camelCase by default for code :v

        // for mobile port, e.preventDefault seems very self explanatory me, istg if I somehow forget it when making the documentation I'll slap the ever living day lights out of myself ay
        this.touchStartHandler = (e) => 
        {
            e.preventDefault(); 
            this.handleStart(this.getCanvasInputPos(e.touches[0]));
        };
        
        this.touchMoveHandler = (e) => 
        {
            e.preventDefault();
            this.handleMove(this.getCanvasInputPos(e.touches[0]));
        };
        
        this.touchEndHandler = () => this.handleEnd();

        // passive false prevents the player from accidentally scrolling rather than yk... dragging the fucking wires
        this.canvas.addEventListener('touchstart', this.touchStartHandler, {passive: false});
        this.canvas.addEventListener('touchmove', this.touchMoveHandler, {passive: false});
        this.canvas.addEventListener('touchend', this.touchEndHandler);
    }

    getCanvasInputPos(e)
    {
        const rect = this.canvas.getBoundingClientRect(); //inbuilt function, returns an object (DOMRect) with the size of an element and its position relative to the browser viewport
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        }; //so TIL JS is a bitch (if return is written then a new line then the {}, it autaomatically gives return a ';' which breaks it... LOOK HOW WOULD I KNOW I WRITE CODE LIKE THAT MAN)
    }

    handleStart(pos)
    {
        for(let node of this.leftNodes)
        {
            const isConnected = this.connections.some(c => c.startNode === node);
            
            if(!isConnected && this.isInsideNode(pos, node))
            {
                this.activeNode = node;
                this.mousePos = pos;
                break;
            }
        }
    }

    handleMove(pos)
    {
        if(this.activeNode)
        {
            this.mousePos = pos;
        }
    }

    handleEnd()
    {
        if(!this.activeNode)
        {
            return;
        }

        for(let rNode of this.rightNodes)
        {
            if(this.isInsideNode(this.mousePos, rNode))
            {
                const isRightConnected = this.connections.some(c => c.endNode === rNode);

                if(!isRightConnected && rNode.color == this.activeNode.color)
                {
                    this.connections.push
                    (
                        {
                            startNode: this.activeNode,
                            endNode: rNode
                        }
                    );

                    if(this.connections.length === this.wireCount)
                    {
                        this.isCompleted = true;
                        this.stop(true, this.rewardPartKey); //win... idt i need to elaborate more lol
                        return;
                    }
                }

                break;
            }
        }

        this.activeNode = null;
    }

    isInsideNode(point, node)
    {
        const dx = point.x - node.x;
        const dy = point.y - node.y;

        const hitRad = this.nodeRadius + 15; //generosity radius
        return Math.sqrt(dx * dx + dy * dy) <= hitRad;
    }

    // for well... updating the fucking time for lose con lol
    update(deltaTime) //this is also required btw for all minigames due to how i made the template
    {
        super.update(deltaTime) //super lets the code yoink from its parent

        if(this.isCompleted)
        {
            return;
        }

    }

    render() //this is also required btw for all minigames due to how i made the template
    {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.connections.forEach(con => {this.drawLine(con.startNode.x, con.startNode.y, con.endNode.x, con.endNode.y, con.startNode.color, this.lineWidth);});

        if(this.activeNode)
        {
            this.drawLine(this.activeNode.x, this.activeNode.y, this.mousePos.x, this.mousePos.y, this.activeNode.color, this.lineWidth-1);
        }


        this.leftNodes.forEach(node => this.drawNode(node));
        this.rightNodes.forEach(node => this.drawNode(node));

        this.ctx.font = '16px Segoe UI, sans-serif';
        this.ctx.textAlign = 'center';


    }

    drawLine(x1, y1, x2, y2, color, width)
    {
        // huh, well guess i needed to search more for ctx lol, here's just the link for future reference https://www.w3schools.com/tAGS/ref_canvas.asp
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    // draw the wires thigny thigny yea you get what i mean... I'm fucking tired its 5:28 am rn TwT
    drawNode(node)
    {
        this.ctx.fillStyle = node.color;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, this.nodeRadius, 0, Math.PI * 2);
        this.ctx.fill();

        const coreRadius = Math.max(4, this.nodeRadius * 0.65);
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, coreRadius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = node.color;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, Math.max(2, coreRadius * 0.3), 0, Math.PI * 2);
        this.ctx.fill();
    }

    //remove the even listeners after making
    cleanup() //this is also required btw for all minigames due to how i made the template
    {
        this.canvas.removeEventListener('mousedown', this.mouseDownHandler);
        this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
        this.canvas.removeEventListener('mouseup', this.mouseUpHandler);

        this.canvas.removeEventListener('touchstart', this.touchStartHandler);
        this.canvas.removeEventListener('touchmove', this.touchMoveHandler);
        this.canvas.removeEventListener('touchend', this.touchEndHandler)
    }

};

window.connectWireMinigame = connectWireMinigame;