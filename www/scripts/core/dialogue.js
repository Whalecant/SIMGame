const dialogue =
{
    isOpen: false,
    lines: [],
    lineIdx: 0,
    charIdx: 0,
    typing: false,
    timer: null,
    armed: false,
    onClose: null,

    charDelay: 10,

    open(speaker, lines, onClose = null)
    {
        if(this.isOpen || !lines || lines.length === 0)
        {
            return;
        }

        this.isOpen = true;
        this.armed = false;
        this.lines = lines;
        this.lineIdx = 0;
        this.onClose = onClose;

        document.getElementById('dialogueName').textContent = speaker;
        document.getElementById('dialogueBox').classList.remove('hidden');

        this.startLine();
    },

    startLine()
    {
        clearTimeout(this.timer);

        this.charIdx = 0;
        this.typing = true;
        this.renderLine();
        this.timer = setTimeout(() => this.typeChar(), this.charDelay);
    },

    renderLine()
    {
        const line = this.lines[this.lineIdx];
        const box = document.getElementById('dialogueText');

        box.textContent = '';

        const typed = document.createElement('span');
        typed.textContent = line.slice(0, this.charIdx);

        const rest = document.createElement('span');
        rest.textContent = line.slice(this.charIdx);
        rest.style.visibility = 'hidden';

        box.append(typed, rest);
    },

    typeChar()
    {
        const line = this.lines[this.lineIdx];

        if(this.charIdx >= line.length)
        {
            this.typing = false;
            return;
        }

        this.charIdx++;
        this.renderLine();
        this.timer = setTimeout(() => this.typeChar(), this.charDelay);
    },

    next()
    {
        if(!this.isOpen)
        {
            return;
        }

        if(this.typing)
        {
            clearTimeout(this.timer);
            this.charIdx = this.lines[this.lineIdx].length;
            this.typing = false;
            this.renderLine();
            return;
        }

        this.lineIdx++;

        if(this.lineIdx >= this.lines.length)
        {
            this.close();
            return;
        }

        this.startLine();
    },

    close()
    {
        clearTimeout(this.timer);
        this.typing = false;
        this.isOpen = false;
        document.getElementById('dialogueBox').classList.add('hidden');

        if(window.Input)
        {
            Input.consumePress('e');
        }

        if(this.onClose)
        {
            this.onClose();
        }
    },

    isAdvanceKey(key)
    {
        const k = key.toLowerCase();
        return k === 'e' || k === ' ' || k === 'enter';
    }
};

window.dialogue = dialogue;

window.addEventListener('keydown', (e) =>
{
    if(dialogue.isOpen && !e.repeat && dialogue.isAdvanceKey(e.key))
    {
        dialogue.armed = true;
    }
});

window.addEventListener('keyup', (e) =>
{
    if(dialogue.isOpen && dialogue.armed && dialogue.isAdvanceKey(e.key))
    {
        dialogue.armed = false;
        dialogue.next();
    }
});

window.addEventListener('pointerdown', (e) =>
{
    if(dialogue.isOpen && e.button === 0)
    {
        dialogue.next();
    }
});