// Note for anyone who reads this: please fix translations, yes they're all AI translations, no I'm not oging to manually translate them all
// who am i kidding, no one else touches the code but me fuck my life

const dialogueText =
{
    oldMan:
    {
        name: { en: "Old Man", zh: '老人' },

        lines:
        {
            en:
            {
                start:
                [
                    "This is your first day but remember that the job remains the same, we are responsible for repairing the essential airship machinery, and today as the one taking over I will be supervising YOU take hold of the situation.",
                    "Despite my protests you insist on acquiring the parts we lack from inventory yourself to take advantage of your temporary maneuverability and cost efficiency but I say your just being a reckless little runt, so do us all a favor and be careful or I will lock you in the workshop myself from here on out.",
                ],
                end:
                [
                    "I, I do not believe it, despite all the challenges and sabotage that has arisen you have managed to finish none the less,",
                    "however we are not across the finish line yet we just managed to stand before the door despite all the traps along the path,",
                    "now as hands off as it may seem, you have proven to take lead where ever I have fallen short, and I believe it should be you who knocks on the palace doors, take responsibility for your vision and all your reckless plans and finish this yourself for all those who trust you myself included,",
                    "bring an end to their crimes and bring them into the light, stand on the stage yourself and change these folks minds, I know you can",
                ],
            },

            zh:
            {
                start:
                [
                    '今天是你的第一天，但请记住，我们的工作没有变：我们负责修理飞艇的核心机械。今天由你来接手，而我会在一旁监督，看你如何掌控局面。',
                    '尽管我再三反对，你还是坚持要亲自去仓库里取我们缺少的零件，想借此发挥你灵活机动、成本低廉的优势。但我只能说，你就是个莽撞的小鬼。所以帮大家一个忙，小心点，否则我就亲自把你锁在工坊里，从此哪儿也别想去。',
                ],
                end:
                [
                    '我、我简直不敢相信。尽管一路上挑战与破坏不断，你还是完成了这一切，',
                    '不过我们还没到终点。尽管沿途陷阱重重，我们总算站到了这扇门前，',
                    '虽说这样有些撒手不管，但你已经证明，在我力有不逮的地方，你能挺身而出。我认为，该去敲响宫殿大门的人是你。为你的远见和所有莽撞的计划负起责任，亲手把这件事做完，为了所有信任你的人，也包括我在内，',
                    '终结他们的罪行，让他们重见光明。亲自站上那个舞台，改变这些人的想法。我知道你可以的。',
                ],
            }
        }
    }
};

// set is the name of a group of lines, e.g. 'start' or 'end'
function getDialogueLines(npc, set)
{
    return pickLines(dialogueText[npc].lines, set);
}

function getDialogueName(npc)
{
    const names = dialogueText[npc].name;
    const code = (window.lang && window.lang.current) ? window.lang.current() : 'en';

    return names[code] || names.en;
}

window.dialogueText = dialogueText;
window.getDialogueLines = getDialogueLines;
window.getDialogueName = getDialogueName;