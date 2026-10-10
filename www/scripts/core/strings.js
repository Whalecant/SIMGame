//  Long story text lives in endingText.js and dialogueText.js.
//  Missing or empty zh entries fall back to English automatically (see getText / pickLines).


const strings =
{
    en:
    {

        // Game messages
        saveMsg: "Game Saved",
        partDone: "Installed",
        partMissing: "Missing",
        alrCarryPart: "Already Carrying Part",
        acquiredPart: "Acquired Part: ",
        installedPart: "Part Installed: ",
        scrappedPart: "Part Scrapped: ",
        takeToVeh: "Bring back to vehicle",
        endlesModeUnlock: "Endless Mode has been unlocked",

        // main menu thingies yes.
        title: "Shipwright's Countdown: Civilizations Future",
        menuTitle: "Shipwright's Countdown:<br>Civilizations Future",
        nav: "Navigation",
        login: "Login",
        play: "Play",
        settings: "Settings",
        achievements: "Achievements",
        credits: "Credits",
        selectSave: "Select Save Slot",
        slot: "Slot",
        load: "Load",
        delete: "Delete",
        confirmDelete: "Confirm Delete?",
        confirm: "Confirm",
        cancel: "Cancel",
        back: "Back",
        audioTab: "Audio",
        controlsTab: "Controls",
        languageTab: "Language",
        volume: "Volume",
        garageControls: "Garage Controls:",
        interact: "Interact:",
        pause: "Pause:",
        map: "Map:",
        minigameControls: "Minigame Controls:",
        exitMinigame: "Exit Minigame:",
        language: "English",
        roleProgrammers: "Programmers:",
        roleArtist: "Artist:",
        roleSoundDesigner: "Sound Designer:",
        roleWriter: "Writer:",
        roleVideo: "Promotional Video:",
        paused: "Paused",
        resume: "Resume",
        mainMenu: "Main Menu",
        returnToHub: "Return to Hub",
        partsTitle: "Required Parts",
        closeNotice: "Click anywhere to close",
        continue: "Continue",

        // HUB stuff
        finalTitle: "Final Level",
        finalReady: "All 8 parts installed! Enter final level?",
        finalNoParts: "Not all parts are installed. Enter the final level anyway?",
        finalNoLogs: "Some journal entries are still scattered. Enter the final level anyway?",
        finalMissingBoth: "A lot of important things are still missing. Enter the final level anyway?",
        btnEnter: "Enter",
        btnNotYet: "Not yet",
        btnEnterAnyway: "Enter anyway",
        btnViewBlueprint: "View blueprint",


        // Popup stuff
        partInstalled: "{part} installed! ({count}/{total})",
        achievementUnlocked: "Achievement Unlocked!",
        achievementUnlockedLabel: "Unlocked",
        achievementLockedDesc: "Not yet unlocked.",
        journalUnlocked: "Journal Entry Unlocked",
        journalFound: "Journal Entry found! Reach the exit to keep it",
        journalLost: "Journal Entry Lost.",
        eggMsg: "Egg.",

        // Vehicle stuff
        journalLogsTitle: "Journal Logs ({count}/{total})",
        journalCollected: "Collected",
        journalMissing: "Missing",
        cat_setting: "Setting",
        cat_history: "History",
        cat_factions: "Factions",
        cat_characters: "Characters",
        cat_religions: "Religions",
        cat_technology: "Technology",
        cat_ship: "Ship",
        cat_ending: "Ending",

        // save stuffs
        slotEmpty: "Empty",
        slotInfo: "Levels {levels}/{totalLevels} | Journal Pages {journal}/{totalJournal}",
        levelLabel: "Lvl {n}",

        // ending stuff
        endingTitleBAD: "BAD ENDING",
        endingTitleGOOD: "GOOD ENDING",
        endingTitleTRUE: "TRUE ENDING",

        // login and register stuff
        logoutTitle: "Log out",
        logoutText: "Log out of {user}?",
        logoutYes: "Log out",
        registeredMsg: "Account created successfully! Please log in",
        noAccountMsg: "Account does not exist. Please register first.",
        badPasswordMsg: "Invalid password. Try Again",
        registerNotFoundMsg: "Account not found. Please create an account below.",
        usernameTakenMsg: "Account already exists / Username already taken",

        // login.html / register.html page text
        loginHeading: "LOGIN",
        loginSubtitle: "Enter your credentials to login",
        registerHeading: "REGISTER",
        registerSubtitle: "Create a new account",
        usernameLabel: "Username",
        passwordLabel: "Password",
        loginBtn: "LOGIN",
        registerBtn: "REGISTER",
        noAccountYet: "Don't have an account?",
        alreadyRegistered: "Already registered?",
        backToMenu: "BACK TO MAIN MENU",

        // shared "desktop only" notice (login, register, navigation, gallery...)
        restrictedTitle: "ACCESS RESTRICTED",
        restrictedText: "Please access this terminal via desktop screen size for optimal viewing.",
        desktopOnlyTitle: "Desktop Only Page",
        desktopOnlyText: "We apologize, but this portal requires a wider screen. Please view on desktop or in a wider screen.",

        // gallery.html
        galleryTitle: "Gallery Archive",
        gallerySubtitle: "All media archives, from cutscenes to images to audio",
        gallerySectionArt: "Artwork & Visuals",
        gallerySectionMusic: "Soundtrack Archive",
        galleryAirship: "Airship Vehicle Sprite",
        galleryConcept: "Early Character Concept Art",
        gallerySpritesheet: "Character Spritesheet",
        gallerySavePoint: "Save Point",
        galleryCharacterAnimations: "Character Animations",
        galleryOldMan: "Old Man",
        galleryLevelBlock: "Block",
        galleryLevelBox: "Box",
        galleryLevelEnd: "End Portal",
        galleryLevelLock: "Lock",
        galleryLevelKey: "Key",
        galleryLevelSpikes: "Spikes",
        galleryLevelDoor: "Door",
        galleryLevelPages: "Journal Pages",
        galleryBridge: "Bridge",
        galleryOverworld: "Overworld",
        galleryUnusedAssets: "Unused Assets",
        galleryLevelBg1: "Level Background Early",
        galleryLevelBg2: "Level Background Mid",
        galleryLevelBg3: "Level Background End",
        galleryMainMenuBgNormal: "Main Menu Background Normal",
        galleryMainMenuBgExtra: "Main Menu Background Extra",
        asset_catalyticBoiler: "Catalytic Boiler",
        asset_chasisCog: "Chassis Cog",
        asset_exhaustValves: "Exhaust Valves",
        asset_extractedCatalyst: "Extracted Catalyst",
        asset_propellerFan: "Propeller Fan",
        bgmHub: "Hub BGM",
        bgmGold: "Gold BGM",
        bgmBlack: "Black BGM",
        bgmWhite: "White BGM",
        bgmPurple: "Purple BGM",
        bgmPink: "Pink BGM",
        bgmAzure: "Azure BGM",
        bgmEmerald: "Emerald BGM",
        bgmAmber: "Amber BGM",
        bgmRed: "Red BGM",

        // lore.html (Journal page)
        loreTitle: "Journal",
        loreSubtitle: "— from the journal of the Shipwright's Countdown —",
        loreLocked: "🔒 Locked — find the key in the platformer level.",
        loreReturn: "Return to Menu",
        lore_cat_setting: "🌍 Setting & Atmosphere",
        lore_cat_history: "📜 History & Chronology",
        lore_cat_factions: "⚔️ The Nine Factions",
        lore_cat_characters: "👥 Principal Characters",
        lore_cat_religions: "🕯️ Religions",
        lore_cat_technology: "⚙️ Technology & Parts",
        lore_cat_ship: "🚢 The Assembled Super Ship & Society",
        lore_cat_ending: "🌅 The Ending",
        lore_setting_1_title: "Genre",
        lore_setting_1_text: "Diesel Corrupted Steampunk Pixel SIM Game",
        lore_setting_2_title: "Central Themes",
        lore_setting_2_text: "Conformity vs Autonomy. The tension between imposing one's will and respecting the choices of others; the cost of revolution; the weight of conviction.",
        lore_setting_3_title: "Atmosphere",
        lore_setting_3_text: "Gears always turning & metal clanking in a workshop ridden with the stench of oil.",
        lore_setting_4_title: "Core Loop",
        lore_setting_4_text: "Dialogue → Gather Resource Minigame → Timed Repair Mini Game → Output → Repeat",
        lore_history_1_title: "1301 Fjorric Calendar",
        lore_history_1_text: "Alternate Scandinavia invents steam-centric technology; their calendar is adopted across most of the European continent, rapidly advancing centuries within one. By the 1400s the world began being recognized as a planet.",
        lore_history_2_title: "1412 Fjorric Calendar",
        lore_history_2_text: "Alternate Italy nobility discovers Diesel Combustion, contaminating lower altitudes. Humanity pushes upward, eventually relying on airship technology to maintain everyday society — an event known as <em>\"The Rise\"</em>.",
        lore_history_3_title: "1667",
        lore_history_3_text: "A wreckage from a storm is brought to the tower. The Forge Master finds a young orphan survivor and personally looks after them until authorities arrive — by then, an attachment forms.",
        lore_history_4_title: "1672",
        lore_history_4_text: "The orphan becomes the apprentice of the workshop, responsible for part retrieval and delivery across the Assembled super ship. Their intelligence and curiosity push them to want more.",
        lore_history_5_title: "1673",
        lore_history_5_text: "Current events of the story unfold.",
        lore_factions_1_title: "1. (Gold) Royal Familia — ALT-SWEDISH",
        lore_factions_1_text: "The governing head of Icor-Celeste.",
        lore_factions_2_title: "2. (Ebony) Inquisitors Office — ALT-RUSSIAN",
        lore_factions_2_text: "Judicial/Enforcement Office, the Hands of Icor-Celeste. Guides and crushes all incursions of disorder or injustice — the most dangerous thorn in the side of the Sangue Familia.",
        lore_factions_3_title: "3. (Ruby) Sangue Familia — ALT-ITALIAN",
        lore_factions_3_text: "Factory Clan. The blood flowing throughout Icor-Celeste; the technological monopoly of most major craftsmen and artisans who cannot handle sustainability, encouraging short-term benefit over the sustainability of the land below.",
        lore_factions_4_title: "4. (Silver) Star Merchantry — ALT-POLISH",
        lore_factions_4_text: "The bones connecting Icor-Celeste — the common folk themselves. The largest faction, uncontested in membership, accumulates so much manpower that even the most noble houses hesitate before acting out of turn. The richest group as a whole; individual executives are the poorest of leading factions, but ensuring the common folk are happy maintains their absolute unity.",
        lore_factions_5_title: "5. (Azure/Sapphire) Education & Research Administration — ALT-SCANDINAVIAN",
        lore_factions_5_text: "Known formerly as the Sapphire to the Ruby, they were the rivaling half of the clan during times of division. Those not swallowed took what they had to continue their devotion to wisdom and research. The elders believe that in a world so enclosed, knowledge must always circulate or the people will crumble from within. Second to none in records, secretarial, and administrative duties.",
        lore_factions_6_title: "6. (Emerald/Verdant) Healthcare & Welfare Association — ALT-GERMAN",
        lore_factions_6_text: "Absorbed the medical clinics and secured the hospitals confused during \"The Rise\". Reformed the capitalistic view to focus on survival first, as they cannot be certain how much of humanity remains.",
        lore_factions_7_title: "7. (Violet/Amethyst) Intelligence & Espionage Society — ALT-TURKISH",
        lore_factions_7_text: "The Shadows of Icor-Celeste, corrupted by the influence of the Sangue Familia. Repurposed after abandoning the hopes of exploration, they became agents guiding all outcomes into the clutches of the Familia. Revealed as the saboteurs only when played correctly — the first step to bringing the Familia's crimes to light. However, the Familia may be prepared to cut ties and let them take the fall.",
        lore_factions_8_title: "8. (Amber) Assembly Guild — ALT-DANISH",
        lore_factions_8_text: "The organization that takes care of... (record incomplete).",
        lore_factions_9_title: "9. (Pink) Entertainment & Art — ALT-FRENCH",
        lore_factions_9_text: "Responsible for maintaining the <em>quality</em> of living rather than just survival. Retains creative expression of creators and artists of all avenues — culture, theatre, dance, music, and all forms of important life-quality features, especially handling the European union since Italy absorbed the...",
        lore_characters_1_title: "Player Character — Sognatore/Sognatori (Amber)",
        lore_characters_1_text: "An androgynous blonde Scandinavian orphan clad in belt-strap leather outfits and a cap, with a burn mark on one cheek and a colloquial Rural Italian accent. Became an apprentice for the old engineer Ferro Dolcer. Brings creative curiosity and an innate talent for the craft. Their fixation and skills console the mentor's worries that he may not have raised them right by raising them around only his work. Unwanted curiosity and desire to improve what does not need nor desire any is their unfortunate flaw. Believes in Radicalism. Named after their amnesia — \"dreamer\" in their mother tongue.",
        lore_characters_2_title: "Ferro Dolcer (Amber) — Touchstone NPC",
        lore_characters_2_text: "Paler, older, broad-shouldered Italian engineer with a formal Southern accent. Mentors and raises the young orphan found on an investigated wreck, eventually finding the child was truly meant for this. His love and admiration may blind him sometimes, giving rise to opportunities such as the trial week. He worries the lad does not listen to warnings about letting curiosity get the better of rational judgement — for a dreamer is needed in great work, but such a volatile element if not controlled can lose control of what they are entrusted with. Acts as tutorial guide and voice of hints.",
        lore_characters_3_title: "Carrado Von Sangue (Ruby) — Antagonist NPC",
        lore_characters_3_text: "Second Generation Head of the Sangue Dei Familia. Chief descendant of the inventors of the industrial combustion engine schematics. A pragmatic, long-red-haired man in colonial attire who took over all oil mining, farming, and production rights to hyper-specialize profits and monopolize the economy. Adamantly refuses any method that may overturn the public's dependency on oil, paying extra \"Donations\" to media and governing lords. Believes in Consequentialism and Idealistic Capitalism — the outcomes determine morality, not the means. Blinds the public from the objective truth: the ever-accumulating debt by the environment, a debt to be paid by children who never had a voice.",
        lore_characters_4_title: "Regina Bel Fiora (Ebony) — Authority NPC",
        lore_characters_4_text: "4th Chief Inquisitor of the Ufficio Inquisitoriale Del Eterreto. A gothic formal madame of the absolute neutral governing body responsible for strict management of any business or group. Known for outing any noticeable corruption, including many clumsy assets of the Sangue Dei Familia, but cannot act without sufficient evidence. Deems La Bottega Del Cielo a possible asset. Believes in Deontology — duty first, foremost, because even righteousness can breed bias.",
        lore_characters_5_title: "Astolfo Vermich (Silver) — Eccentric NPC",
        lore_characters_5_text: "3rd President of Corpadei Stella Pescatori, the revolutionary marine agriculture corporation built by former generation fisherman peasants. Massive alliances built by the people, for the people. The supreme commercial merchantry that even nobility can no longer afford to disrespect. This generation's president has peculiar albinism mutations — silver hair, purple eyes, white suits. Believes in Solipsism ironically; maintains fairness of meritocracy, making life better for all members despite them being happy puppets in his mental theatre. Truly does not care for corruption and guarantees prosperity.",
        lore_characters_6_title: "Aurelios El Etere (Gold) — Endgame NPC",
        lore_characters_6_text: "6th Generation Crown Prince of La Casa Del Etere, the house that led the lands long before they rose to become a monarchy — now possibly an outdated governing body of the current province governors and mayors.",
        lore_characters_7_title: "Gustav El Etere (Gold) — Endgame Antagonist NPC",
        lore_characters_7_text: "Believes in hedonistic tyranny and that birthright is the divine-given talent of people. Might of those above makes right their decisions upon those below. Aligned with the faction with the most apparent power and measures to implement actions others would approve of. Less willing to concede second-hand command to one who proves their worth, understanding their place and obedience. He stands as the replacement for his older brother, Crown Prince Aurelios, who he knows with his recklessness would take the bait for a last-stand scheme before days of coronation within the end of the week.",
        lore_religions_1_title: "Faith in the Enclosed City",
        lore_religions_1_text: "Religion is a common occurrence wherever people gather. The city is enclosed, with no accessible way to leave, and holds many nationalities and ethnicities. Religions have not been oppressed. They have moved out of general and official spaces and are practiced in people's homes.",
        lore_religions_2_title: "A Neutral Gray Space",
        lore_religions_2_text: "The society is built on the absolute necessity of advancing engineering, with limited resource recycling. It cannot afford to devote attention or space to religious buildings. This has become an awkwardly silent agreement: religion is neutral gray space in the artificial super city.",
        lore_religions_3_title: "Languages & Culture",
        lore_religions_3_text: "Differing languages overlap, with English and Italian as the classic universals, due to the groups that ruled thus far. Concerns of history, culture, religion and linguistics are handled by the Pink faction, comprised primarily of the French.",
        lore_technology_1_title: "Steampunk — Filtration",
        lore_technology_1_text: "Heat push & pull move gaseous particles through 16th-century mesh. The naturally high moisture content of steam can separate contaminants with condensation, trapping oils and airborne compounds while the heat dries the system's chassis — sustainable compared to real-world electricity, especially for thinner air altitudes with moist pulls.",
        lore_technology_2_title: "Steampunk — Fundamentals",
        lore_technology_2_text: "Boilers naturally by circulation generate mechanical motion, heat, and pressure.",
        lore_technology_3_title: "Steampunk — Aeronautics",
        lore_technology_3_text: "Steam pumps regulate ballast bladders and buoyancy for ideal altitude control, with naturally mechanical onboard fans regulating air quality as well as managing any necessary extra propulsion.",
        lore_technology_4_title: "Steampunk — Heat",
        lore_technology_4_text: "Heating critical parts of the system despite the cold environmental cooling of high altitudes, yet running radiators to diverge heat from enclosed spaces.",
        lore_technology_5_title: "Diesel — Ground",
        lore_technology_5_text: "Exhaust fumes with particular nitrogen oxide-based pollutants concentrate on lower atmospheric stagnant air levels, localizing at lower levels without being as potent at higher altitudes.",
        lore_technology_6_title: "Parts List",
        lore_technology_6_text: "1. Piston Engine · 2. Gas Valves · 3. Boiler Engine · 4. Gears & Cogs · 5. Propellor Fans · 6. Gas Pumps · 7. Metal Mesh · 8. Chemical Catalysts · 9. Gyroscope Dial · 10. Diesel Engine · 11. Humidity Oscillator",
        lore_technology_7_title: "Setting Aesthetic",
        lore_technology_7_text: "Victorian English Aesthetic Variant of Italian Renaissance Era (14th – 16th Century).",
        lore_ship_1_title: "La Bottega Del Cielo",
        lore_ship_1_text: "The best of the best for repairing the sections of the super city. Reserves only the highest of reservations due to limited supply unable to meet weekly demands. Trusted by all walks of life; clues of the system's controlling monopoly begin to pile up for the few who can see the overlap.",
        lore_ship_2_title: "The Rise & The Airship",
        lore_ship_2_text: "Ships of various Organizations and Colors assembled with the best technology Europe could muster to create a slow floating artificial super nation to avoid the consequences of reckless Diesel. Their paths converge at La Bottega Del Cielo before splitting off into their proverbial horizons.",
        lore_ship_3_title: "Resolution & Conclusion",
        lore_ship_3_text: "The trial is a post-game sequence that tallies the invisible score applied by how well the player has performed. Good ending: the Familia is destroyed, you rally your connections, living a happier grander life as a new pillar of the nation. Bad ending: you fail and are executed for dying rather than serving the Familia and their chosen prince, even if tortured. True Ending: entrusting you with power and influence, you become the forerunning spearhead — the face of the future. Post-ending screen: a variant of the opening menu with a memento of the Mentor and a sunrise instead of a sunset.",
        lore_ending_1_text: "Approaches the fact that the airship had to be very slow in order to handle its work, and the magnetic fields of the changing world further decelerated the advances. But now it was time to resume the exploration, the hope they abandoned, the search through what remains of the other continents and the mainlands of what the other nations may have become...",

        // navigation.html
        navTitle: "Navigation",
        navSubtitle: "Access team credentials, media archives, and world lore",
        navAbout: "About Us",
        navJournal: "Journal",
        navGallery: "Gallery",
        navChangeNotes: "Change Notes",
        navReturn: "Return to Game",

        // achievement cards (achievements.html) - one title/desc pair per state
        ach_badEnd_title: "Bad Ending",
        ach_badEnd_desc: "Unfortunately, you were not able to prove your worth",
        ach_badEnd_lockedDesc: "Sometimes things just don't go your way",
        ach_goodEnd_title: "Good Ending",
        ach_goodEnd_desc: "You were able to save yourself, unfortunately it wasn't enough to fully fix this corrupt system",
        ach_goodEnd_lockedDesc: "You did what you could, yet there was more that could be done",
        ach_trueEnd_title: "True Ending",
        ach_trueEnd_desc: "You have successfully proved your worth and have made a change to the world",
        ach_trueEnd_lockedDesc: "You successfully made a change to this corrupted world",
        close: "Close",

        // level stuff
        pickupPrompt: "[E] to pick up",
        talkPrompt: "[E] Talk",
        hudControls: "A/D Move   W/Space Jump   E Interact   ESC Menu",
        hudExit: "Exit {sec}s",
        hudConsole: "E: Operate",
        hudKey: "Key: {key}",
        hudKeyNone: "None",
        hudMode: "Control: {mode}",
        mode_player: "Player",
        mode_machine: "Machine",
        mode_combined: "Combined",

        // level 1 tutorial stuff
        lvl1Prompt1: "Well, another way to open a door.",
        lvl1Prompt2: "So this must be the exit?",
        lvl1Prompt3: "A door, as expected. Press E to open it.",
        lvl1Prompt4: "A key. I wonder what it's for.",
        lvl1Prompt5: "You're already quite the athlete.",
        lvl1Prompt6: "Try A and D to move left and right.",
        lvl1Prompt7: "Now press W to jump.",
    }
    ,
    zh:
    {

        saveMsg: "游戏已保存",
        partDone: "已安装",
        partMissing: "缺失",
        alrCarryPart: "手上已有零件",
        acquiredPart: "获得零件：",
        installedPart: "已安装零件：",
        scrappedPart: "零件已报废：",
        takeToVeh: "请将其送到载具处",
        endlesModeUnlock: "无尽模式已解锁",

        title: "造船匠的倒计时：文明的未来",
        menuTitle: "造船匠的倒计时：<br>文明的未来",
        nav: "导航",
        login: "登录",
        play: "开始游戏",
        settings: "设置",
        achievements: "成就",
        credits: "制作人员",
        selectSave: "选择存档位",
        slot: "存档位",
        load: "读取",
        delete: "删除",
        confirmDelete: "确认删除？",
        confirm: "确认",
        cancel: "取消",
        back: "返回",
        audioTab: "音频",
        controlsTab: "操作",
        languageTab: "语言",
        volume: "音量",
        garageControls: "车库操作：",
        interact: "互动：",
        pause: "暂停：",
        map: "地图：",
        minigameControls: "小游戏操作：",
        exitMinigame: "退出小游戏：",
        language: "中文简体",
        roleProgrammers: "程序：",
        roleArtist: "美术：",
        roleSoundDesigner: "音效设计：",
        roleWriter: "编剧：",
        roleVideo: "宣传视频：",
        paused: "已暂停",
        resume: "继续",
        mainMenu: "主菜单",
        returnToHub: "返回大厅",
        partsTitle: "所需零件",
        closeNotice: "点击任意位置关闭",
        continue: "继续",

        finalTitle: "最终关卡",  // Final Level
        finalReady: "8个零件已全部安装！是否进入最终关卡？",  // All 8 parts installed! Enter final level?
        finalNoParts: "还有零件尚未安装，仍要进入最终关卡吗？",  // Not all parts are installed. Enter the final level anyway?
        finalNoLogs: "还有日志散落在外，仍要进入最终关卡吗？",  // Some journal entries are still scattered. Enter the final level anyway?
        finalMissingBoth: "还有许多重要的东西没有找齐，仍要进入最终关卡吗？",  // A lot of important things are still missing. Enter the final level anyway?
        btnEnter: "进入",  // Enter
        btnNotYet: "暂不",  // Not yet
        btnEnterAnyway: "仍然进入",  // Enter anyway
        btnViewBlueprint: "查看蓝图",  // View blueprint

        partInstalled: "{part}已安装！（{count}/{total}）",  // {part} installed! ({count}/{total})
        achievementUnlocked: "成就已解锁！",  // Achievement Unlocked!
        achievementUnlockedLabel: "已解锁",  // Unlocked
        achievementLockedDesc: "尚未解锁。",  // Not yet unlocked.
        journalUnlocked: "日志已解锁",  // Journal Entry Unlocked
        journalFound: "找到日志！抵达出口即可保留",  // Journal Entry found! Reach the exit to keep it
        journalLost: "日志已丢失。",  // Journal Entry Lost.
        eggMsg: "蛋。",  // Egg.

        journalLogsTitle: "日志（{count}/{total}）",  // Journal Logs ({count}/{total})
        journalCollected: "已收集",  // Collected
        journalMissing: "未收集",  // Missing
        cat_setting: "背景设定",  // Setting
        cat_history: "历史",  // History
        cat_factions: "势力",  // Factions
        cat_characters: "人物",  // Characters
        cat_religions: "宗教",  // Religions
        cat_technology: "科技",  // Technology
        cat_ship: "飞艇",  // Ship
        cat_ending: "结局",  // Ending

        slotEmpty: "空",  // Empty
        slotInfo: "关卡 {levels}/{totalLevels} | 日志页 {journal}/{totalJournal}",  // Levels {levels}/{totalLevels} | Journal Pages {journal}/{totalJournal}
        levelLabel: "第{n}关",  // Lvl {n}

        endingTitleBAD: "坏结局",  // BAD ENDING
        endingTitleGOOD: "好结局",  // GOOD ENDING
        endingTitleTRUE: "真结局",  // TRUE ENDING

        logoutTitle: "登出",  // Log out
        logoutText: "要登出{user}吗？",  // Log out of {user}?
        logoutYes: "登出",  // Log out
        registeredMsg: "账号创建成功！请登录",  // Account created successfully! Please log in
        noAccountMsg: "账号不存在，请先注册。",  // Account does not exist. Please register first.
        badPasswordMsg: "密码错误，请重试",  // Invalid password. Try Again
        registerNotFoundMsg: "未找到账号，请在下方创建账号。",  // Account not found. Please create an account below.
        usernameTakenMsg: "账号已存在 / 用户名已被占用",  // Account already exists / Username already taken

        // login.html / register.html page text
        loginHeading: "登录",
        loginSubtitle: "请输入账号信息以登录",
        registerHeading: "注册",
        registerSubtitle: "创建新账号",
        usernameLabel: "用户名",
        passwordLabel: "密码",
        loginBtn: "登录",
        registerBtn: "注册",
        noAccountYet: "还没有账号？",
        alreadyRegistered: "已经注册过了？",
        backToMenu: "返回主菜单",

        restrictedTitle: "访问受限",
        restrictedText: "请使用桌面端屏幕尺寸访问本终端，以获得最佳显示效果。",
        desktopOnlyTitle: "仅限桌面端",
        desktopOnlyText: "抱歉，本页面需要更宽的屏幕。请使用桌面端或更宽的屏幕访问。",

        galleryTitle: "画廊档案",
        gallerySubtitle: "所有媒体档案，从过场动画到图片再到音频",
        gallerySectionArt: "美术与视觉",
        gallerySectionMusic: "原声档案",
        galleryAirship: "飞艇载具精灵图",
        galleryConcept: "早期角色概念图",
        gallerySpritesheet: "角色精灵图集",
        gallerySavePoint: "存档点",
        galleryCharacterAnimations: "角色动画",
        galleryOldMan: "老人",
        galleryLevelBlock: "砖块",
        galleryLevelBox: "箱子",
        galleryLevelEnd: "终点传送门",
        galleryLevelLock: "机关锁",
        galleryLevelKey: "钥匙",
        galleryLevelSpikes: "尖刺",
        galleryLevelDoor: "门",
        galleryLevelPages: "日志页",
        galleryBridge: "桥梁",
        galleryOverworld: "主世界",
        galleryUnusedAssets: "未使用素材",
        galleryLevelBg1: "关卡背景（前期）",
        galleryLevelBg2: "关卡背景（中期）",
        galleryLevelBg3: "关卡背景（后期）",
        galleryMainMenuBgNormal: "主菜单背景（普通）",
        galleryMainMenuBgExtra: "主菜单背景（额外）",
        asset_catalyticBoiler: "催化锅炉",
        asset_chasisCog: "底盘齿轮",
        asset_exhaustValves: "排气阀",
        asset_extractedCatalyst: "萃取催化剂",
        asset_propellerFan: "螺旋桨风扇",
        bgmHub: "大厅背景音乐",
        bgmGold: "金色背景音乐",
        bgmBlack: "黑色背景音乐",
        bgmWhite: "白色背景音乐",
        bgmPurple: "紫色背景音乐",
        bgmPink: "粉色背景音乐",
        bgmAzure: "天蓝背景音乐",
        bgmEmerald: "翠绿背景音乐",
        bgmAmber: "琥珀背景音乐",
        bgmRed: "红色背景音乐",

        // lore.html (specific in-world names are intentionally left untranslated)
        loreTitle: "日志",
        loreSubtitle: "——摘自《造船匠的倒计时》的日志——",
        loreLocked: "🔒 未解锁——请在平台关卡中找到钥匙。",
        loreReturn: "返回菜单",
        lore_cat_setting: "🌍 背景与氛围",
        lore_cat_history: "📜 历史与年表",
        lore_cat_factions: "⚔️ 九大势力",
        lore_cat_characters: "👥 主要人物",
        lore_cat_religions: "🕯️ 宗教",
        lore_cat_technology: "⚙️ 科技与零件",
        lore_cat_ship: "🚢 组装超级飞船与社会",
        lore_cat_ending: "🌅 结局",
        lore_setting_1_title: "类型",
        lore_setting_1_text: "柴油腐化蒸汽朋克像素模拟游戏",
        lore_setting_2_title: "核心主题",
        lore_setting_2_text: "服从与自主。强加己见与尊重他人选择之间的张力；革命的代价；信念的分量。",
        lore_setting_3_title: "氛围",
        lore_setting_3_text: "齿轮不停转动，金属叮当作响，工坊里弥漫着机油的气味。",
        lore_setting_4_title: "核心循环",
        lore_setting_4_text: "对话 → 资源收集小游戏 → 限时修理小游戏 → 产出 → 重复",
        lore_history_1_title: "1301 Fjorric 历",
        lore_history_1_text: "架空斯堪的纳维亚发明了以蒸汽为核心的技术，其历法被欧洲大陆大部分地区采用，使文明在短短一个世纪内飞跃了数百年。到了 1400 年代，人们开始认识到世界是一颗行星。",
        lore_history_2_title: "1412 Fjorric 历",
        lore_history_2_text: "架空意大利的贵族发现了柴油内燃技术，污染了低空地带。人类转而向高处迁移，最终依靠飞艇技术维持日常社会运转——这一事件被称为<em>「The Rise」</em>。",
        lore_history_3_title: "1667",
        lore_history_3_text: "一艘在风暴中失事的船只残骸被带回塔中。锻造大师发现了一名年幼的孤儿幸存者，并亲自照料，直到当局赶到——此时，他早已对这孩子产生了感情。",
        lore_history_4_title: "1672",
        lore_history_4_text: "孤儿成为工坊的学徒，负责在组装而成的超级飞船各处取送零件。他们的聪明与好奇心，驱使他们渴望更多。",
        lore_history_5_title: "1673",
        lore_history_5_text: "故事的当前事件展开。",
        lore_factions_1_title: "1.（金）Royal Familia —— 架空瑞典",
        lore_factions_1_text: "Icor-Celeste 的统治核心。",
        lore_factions_2_title: "2.（乌木）审判庭 —— 架空俄罗斯",
        lore_factions_2_text: "司法与执法机构，Icor-Celeste 的双手。引导并粉碎一切混乱或不公的侵扰——是 Sangue Familia 身边最危险的芒刺。",
        lore_factions_3_title: "3.（红宝石）Sangue Familia —— 架空意大利",
        lore_factions_3_text: "工厂氏族。流淌于 Icor-Celeste 全身的血液；掌握着大多数主要工匠与手艺人的技术垄断，而这些人无力顾及可持续性，只鼓励短期利益，置脚下大地的可持续性于不顾。",
        lore_factions_4_title: "4.（银）星辰商会 —— 架空波兰",
        lore_factions_4_text: "连接 Icor-Celeste 的骨骼——即平民百姓本身。规模最大、成员数量无可匹敌的派系，聚集的人力之多，连最显赫的贵族之家在贸然行动前也要犹豫。整体而言是最富有的团体；其高管个人却是主要派系中最穷的，但确保平民幸福，让他们保持着绝对的团结。",
        lore_factions_5_title: "5.（蔚蓝/蓝宝石）教育与研究管理局 —— 架空斯堪的纳维亚",
        lore_factions_5_text: "昔日被称为与“红宝石”相对的“蓝宝石”，是氏族分裂时期与之抗衡的另一半。没有被吞并的人带着所剩的一切，继续致力于智慧与研究。长老们相信，在如此封闭的世界里，知识必须不断流通，否则人民会从内部崩塌。在记录、文书与行政职责方面无人能及。",
        lore_factions_6_title: "6.（翠绿）医疗与福利协会 —— 架空德国",
        lore_factions_6_text: "吸纳了各处医疗诊所，并接管了在“The Rise”期间陷入混乱的医院。他们改革了资本主义的观念，把生存放在首位，因为他们无法确定人类还剩下多少。",
        lore_factions_7_title: "7.（紫罗兰/紫水晶）情报与谍报协会 —— 架空土耳其",
        lore_factions_7_text: "Icor-Celeste 的暗影，被 Sangue Familia 的影响所腐蚀。在放弃探索的希望后被重新利用，成为把一切结果引向 Familia 掌控的特工。只有在玩家操作得当时才会被揭露为破坏者——这是揭露 Familia 罪行的第一步。然而，Familia 可能早已准备好断绝关系，让他们背黑锅。",
        lore_factions_8_title: "8.（琥珀）装配公会 —— 架空丹麦",
        lore_factions_8_text: "负责照管……的组织（记录不完整）。",
        lore_factions_9_title: "9.（粉）娱乐与艺术 —— 架空法国",
        lore_factions_9_text: "负责维护生活的<em>品质</em>，而不仅仅是生存。保留各个领域的创作者与艺术家的创造性表达——文化、戏剧、舞蹈、音乐，以及一切关乎生活品质的重要事物，尤其是在意大利吞并了……之后，负责处理欧洲联盟的事务。",
        lore_characters_1_title: "玩家角色 —— Sognatore/Sognatori（琥珀）",
        lore_characters_1_text: "一名中性气质的金发斯堪的纳维亚孤儿，身穿皮带束身的皮革服饰，头戴帽子，一边脸颊有烧伤痕迹，说话带着乡村意大利口音。成为老工程师 Ferro Dolcer 的学徒。带来创造性的好奇心与对手艺天生的才能。他们的专注与技艺，安抚了导师的忧虑——他担心自己只让他们在工作的环境中长大，或许没有把他们养好。对本不需要、也不渴望任何改进的事物抱有好奇心与改进的欲望，是他们不幸的缺点。信奉激进主义。名字源于他们的失忆——在其母语中意为“梦想家”。",
        lore_characters_2_title: "Ferro Dolcer（琥珀）—— 基石 NPC",
        lore_characters_2_text: "肤色较苍白、年纪较长、肩膀宽阔的意大利工程师，说话带着正式的南方口音。他抚养并教导在一艘被调查的残骸中发现的年幼孤儿，最终发现这孩子确实就是为此而生的。他的爱与欣赏有时会蒙蔽他，从而催生了试用周这样的机会。他担心这孩子不听劝告，让好奇心压过理性判断——因为伟大的事业需要梦想家，但这样一种易变的元素，若不加以控制，就可能失控，辜负所托之事。担任教程向导与提示之声。",
        lore_characters_3_title: "Carrado Von Sangue（红宝石）—— 反派 NPC",
        lore_characters_3_text: "Sangue Dei Familia 的第二代当家。工业内燃机图纸发明者的嫡系后裔。一位务实、留着红色长发、身穿殖民风服饰的男子，接管了所有石油开采、种植与生产的权利，以将利润高度专业化并垄断经济。坚决拒绝任何可能动摇公众对石油依赖的方法，并向媒体和执政领主额外支付“捐款”。信奉结果主义与理想主义资本主义——结果决定道德，而非手段。他蒙蔽公众，使其看不见客观真相：环境不断累积的债务，一笔将由从未有过发言权的孩子们偿还的债务。",
        lore_characters_4_title: "Regina Bel Fiora（乌木）—— 权威 NPC",
        lore_characters_4_text: "Ufficio Inquisitoriale Del Eterreto 的第四任首席审判官。一位哥特风、举止正式的夫人，代表绝对中立的治理机构，负责严格管理一切商业或团体。以揭露任何明显的腐败而闻名，包括 Sangue Dei Familia 的许多笨拙爪牙，但在缺乏充分证据时无法采取行动。认为 La Bottega Del Cielo 可能是其资产。信奉义务论——责任高于一切，因为即使是正义也会滋生偏见。",
        lore_characters_5_title: "Astolfo Vermich（银）—— 古怪 NPC",
        lore_characters_5_text: "Corpadei Stella Pescatori 的第三任总裁，这是一家由前几代渔民农夫建立的革命性海洋农业公司。由人民建立、为人民服务的庞大联盟，是连贵族也再不敢轻慢的至高商贾势力。这一代的总裁有着奇特的白化突变——银发、紫眼、白色西装。讽刺的是，他信奉唯我论；他维护精英制的公平，让所有成员的生活变得更好，尽管他们都只是他心灵剧场里快乐的木偶。他确实不在乎腐败，并保证繁荣。",
        lore_characters_6_title: "Aurelios El Etere（金）—— 终局 NPC",
        lore_characters_6_text: "La Casa Del Etere 的第六代王储，这个家族在崛起为君主制之前很久便已执掌这片土地——如今或许已是现任各省总督与市长眼中过时的统治机构。",
        lore_characters_7_title: "Gustav El Etere（金）—— 终局反派 NPC",
        lore_characters_7_text: "信奉享乐主义的暴政，认为出身即是神所赐予人们的天赋。上位者的力量，即是他们对下位者所做决定的正当性。与拥有最明显权力、并有手段推行他人会认可之举措的派系结盟。不太愿意把次位指挥权让给证明了自身价值的人，他深知自己的位置与服从。他取代了兄长 Aurelios 王储的位置——他知道兄长鲁莽，会在加冕前几日、本周之内，上钩于一场背水一战的计谋。",
        lore_religions_1_title: "封闭城市中的信仰",
        lore_religions_1_text: "只要有人聚集的地方，宗教就很常见。这座城市是封闭的，无法离开，容纳着许多民族与种族。宗教并未受到压制，只是退出了公共与官方场所，在人们的家中延续。",
        lore_religions_2_title: "中立的灰色地带",
        lore_religions_2_text: "这个社会建立在推进工程技术的绝对必要性之上，资源回收有限，无力把注意力或空间投入宗教建筑。这形成了一种尴尬而沉默的默契：在这座人造超级城市里，宗教是中立的灰色地带。",
        lore_religions_3_title: "语言与文化",
        lore_religions_3_text: "不同语言相互交融，英语与意大利语是通行的经典语言，源于迄今统治过的各个群体。关于历史、文化、宗教与语言学的事务由粉色派系负责，其成员主要是法国人。",
        lore_technology_1_title: "蒸汽朋克——过滤",
        lore_technology_1_text: "热量的推拉使气态微粒穿过 16 世纪的网格。蒸汽天然的高湿度可通过冷凝分离污染物，截留油污与空气中的化合物，同时热量使系统外壳保持干燥——相比现实世界的电力更具可持续性，尤其适合湿润气流较多的稀薄高空。",
        lore_technology_2_title: "蒸汽朋克——基础",
        lore_technology_2_text: "锅炉通过自然循环产生机械运动、热量与压力。",
        lore_technology_3_title: "蒸汽朋克——航空",
        lore_technology_3_text: "蒸汽泵调节压舱气囊与浮力，以实现理想的高度控制，机载的机械风扇则调节空气质量，并负责必要的额外推进。",
        lore_technology_4_title: "蒸汽朋克——热能",
        lore_technology_4_text: "在高空寒冷环境的降温之下为系统关键部件加热，同时运行散热器，把热量从封闭空间中导出。",
        lore_technology_5_title: "柴油——地面",
        lore_technology_5_text: "废气排放，尤其是以氮氧化物为主的污染物，会聚集在较低处停滞的大气层，集中于低空，而在高空则没那么强烈。",
        lore_technology_6_title: "零件清单",
        lore_technology_6_text: "1. 活塞发动机 · 2. 气阀 · 3. 锅炉发动机 · 4. 齿轮与轮齿 · 5. 螺旋桨风扇 · 6. 气泵 · 7. 金属网 · 8. 化学催化剂 · 9. 陀螺仪表盘 · 10. 柴油发动机 · 11. 湿度振荡器",
        lore_technology_7_title: "场景美学",
        lore_technology_7_text: "意大利文艺复兴时期（14 至 16 世纪）的维多利亚英式美学变体。",
        lore_ship_1_title: "La Bottega Del Cielo",
        lore_ship_1_text: "修理超级城市各区域的顶尖之选。由于供应有限，无法满足每周的需求，只接受最高规格的预约。受到各行各业的信任；对少数能看出其中重叠之处的人来说，这套系统被垄断控制的线索开始不断堆积。",
        lore_ship_2_title: "The Rise 与飞艇",
        lore_ship_2_text: "各个组织与各种颜色的飞船，凭借欧洲所能汇聚的最佳技术组装在一起，打造出一个缓缓漂浮的人造超级国度，以躲避鲁莽使用柴油所带来的后果。它们的航路在 La Bottega Del Cielo 交汇，然后各自分开，驶向自己的地平线。",
        lore_ship_3_title: "结局与终章",
        lore_ship_3_text: "审判是通关后的环节，会根据玩家的表现统计一份无形的评分。好结局：Familia 覆灭，你团结起自己的人脉，过上更幸福、更宏大的生活，成为国家新的支柱。坏结局：你失败了，因为没有为 Familia 和他们选定的王子效力，反而被处决，哪怕遭受折磨。真结局：被托付以权力与影响力，你成为先锋——未来的面孔。通关后画面：开场菜单的变体，其中有导师的纪念物，且是日出而非日落。",
        lore_ending_1_text: "谈到飞艇必须非常缓慢才能完成它的工作，而不断变化的世界磁场进一步拖慢了前进的步伐。但现在，是时候重新开始探索了——那曾被他们放弃的希望，搜寻其他大陆所剩下的一切，以及其他国家可能已变成的模样的本土……",

        navTitle: "导航",
        navSubtitle: "查看团队信息、媒体档案与世界背景",
        navAbout: "关于我们",
        navJournal: "日志",
        navGallery: "画廊",
        navChangeNotes: "更新说明",
        navReturn: "返回游戏",

        ach_badEnd_title: "坏结局",
        ach_badEnd_desc: "很遗憾，你未能证明自己的价值",
        ach_badEnd_lockedDesc: "有时事情就是不会如你所愿",
        ach_goodEnd_title: "好结局",
        ach_goodEnd_desc: "你成功拯救了自己，但这还不足以彻底修复这个腐败的体系",
        ach_goodEnd_lockedDesc: "你已尽力而为，但本可以做得更多",
        ach_trueEnd_title: "真结局",
        ach_trueEnd_desc: "你成功证明了自己的价值，并为这个世界带来了改变",
        ach_trueEnd_lockedDesc: "你成功地改变了这个腐败的世界",
        close: "关闭",

        pickupPrompt: "[E] 拾取",  // [E] to pick up
        talkPrompt: "[E] 交谈",  // [E] Talk
        hudControls: "A/D 跑动  W/空格 跳跃  E 交互  ESC 菜单",
        hudExit: "出口 {sec}s",
        hudConsole: "E 操作",
        hudKey: "钥匙：{key}",
        hudKeyNone: "无",
        hudMode: "控制：{mode}",
        mode_player: "玩家",
        mode_machine: "机械",
        mode_combined: "联动",

        // ===== LEVEL 1 TUTORIAL PROMPTS  (level1MG.js) =====
        // Chinese is the original text; English is a draft translation of it.
        lvl1Prompt1: "好吧，另一种开门方式",
        lvl1Prompt2: "看来这就是出口了？",
        lvl1Prompt3: "居然毫不意外地出现了门呢，按E打开它吧",
        lvl1Prompt4: "一把钥匙，会有什么用呢",
        lvl1Prompt5: "你已经是运动细胞发达的人类了",
        lvl1Prompt6: "试试按A、D左右移动",
        lvl1Prompt7: "现在用W跳跃",
    }
};

const objectNames =
{
    "箱子": "Box",
    "钥匙": "Key",
    "机关锁": "Lock",
    "机关": "Mechanism",
    "机关门": "Door",
    "门": "Door",
    "隐藏门": "Hidden Door",
    "可动砖块": "Movable Block",
    "压力机关": "Pressure Plate",
    "尖刺": "Spikes",
    "陷阱": "Trap",
    "光敏开关": "Light Sensor",
    "光源": "Light Source",
    "光源向下": "Light Source (Down)",
    "光源向上": "Light Source (Up)",
    "机械": "Machine",
    "控制台": "Console",
    "易碎墙体": "Fragile Wall",
    "种子": "Seed",
};

// longest terms first so "机关门" matches before "机关" (sorted once, not on every call)
const objectNameTerms = Object.keys(objectNames).sort((a, b) => b.length - a.length);

function currentLang()
{
    return (window.lang && window.lang.current) ? window.lang.current() : 'en';
}

function getText(key, vars)
{
    const code = currentLang();
    let text = (strings[code] && strings[code][key]) || strings.en[key] || key;

    if(vars)
    {
        Object.keys(vars).forEach(name =>
        {
            text = text.split('{' + name + '}').join(vars[name]);
        });
    }

    return text;
}

function pickLines(pack, key)
{
    const code = currentLang();
    const en = (pack.en && pack.en[key]) || [];
    const own = (pack[code] && pack[code][key]) || [];
    const count = Math.max(en.length, own.length);
    const lines = [];

    for(let i = 0; i < count; i++)
    {
        lines.push(own[i] || en[i] || '');
    }

    return lines;
}

function translateObjectName(name)
{
    if(!name || currentLang() === 'zh')
    {
        return name;
    }

    const term = objectNameTerms.find(t => name.startsWith(t));

    if(!term)
    {
        return name;
    }

    let rest = name.slice(term.length).replace('（', ' (').replace('）', ')');

    if(rest && !rest.startsWith(' '))
    {
        rest = ' ' + rest;
    }

    return objectNames[term] + rest;
}

window.Strings = strings;
window.getText = getText;
window.pickLines = pickLines;
window.translateObjectName = translateObjectName;