const lang =
{
    storageKey: 'SCCFLang',
    supported: ['en', 'zh'],

    current()
    {
        const saved = localStorage.getItem(this.storageKey);
        return this.supported.includes(saved) ? saved : 'en';
    },

    set(code)
    {
        if(!this.supported.includes(code))
        {
            return;
        }

        localStorage.setItem(this.storageKey, code);

        if(typeof Game !== 'undefined' && Game.settings)
        {
            Game.settings.currLang = code;
        }

        document.documentElement.lang = (code === 'zh') ? 'zh-CN' : 'en';

        this.apply();

        // anything drawn by JS (menus, HUD, journal...) can listen for this and re-render itself
        window.dispatchEvent(new CustomEvent('langchange', { detail: { code } }));
    },

    // fills every element that has data-i18n="key" or data-i18n-placeholder="key"
    apply(root = document)
    {
        root.querySelectorAll('[data-i18n]').forEach(el =>
        {
            this.setContent(el, getText(el.dataset.i18n));
        });

        root.querySelectorAll('[data-i18n-placeholder]').forEach(el =>
        {
            el.placeholder = getText(el.dataset.i18nPlaceholder);
        });
    },

    // supports <br> and <em>...</em> inside translated text (built with DOM nodes, never innerHTML)
    setContent(el, text)
    {
        el.textContent = '';

        let parent = el;

        text.split(/(<br>|<em>|<\/em>)/).forEach(part =>
        {
            if(part === '<br>')
            {
                parent.appendChild(document.createElement('br'));
            }
            else if(part === '<em>')
            {
                const em = document.createElement('em');
                el.appendChild(em);
                parent = em;
            }
            else if(part === '</em>')
            {
                parent = el;
            }
            else if(part)
            {
                parent.appendChild(document.createTextNode(part));
            }
        });
    }
};

window.lang = lang;

document.addEventListener('DOMContentLoaded', () =>
{
    lang.set(lang.current());
});