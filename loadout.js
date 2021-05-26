try {
    /*
(c) Copyright LeoDeveloper 2020 - 2021
Released under the MIT license at https://leodeveloper.pages.dev
Visit https://leodeveloper.pages.dev/license.html for more information.
*/

    // Dev note : V3 Only Script because Onetap removed fonts in v4, add your own font and then change the corresponding apis
    
    var COLORNAMES,
        COLORS,
        PRINTABLE,
        _,
        display_icons,
        drag,
        draw,
        enemycache,
        exceptions,
        i,
        in_warmup,
        index,
        key,
        len,
        moving,
        onDraw,
        on_cs_game_disconnected,
        on_item_equip,
        on_item_pickup,
        on_item_remove,
        on_player_death,
        position,
        priorities,
        priority_array,
        rel_start,
        screen,
        value,
        weapon,
        weaponcache,
        weaponname_icons

    screen = Render.GetScreenSize()

    UI.AddSliderInt('loadout_x', 0, screen[0])

    UI.AddSliderInt('loadout_y', 0, screen[1])

    position = [UI.GetValue('loadout_x'), UI.GetValue('loadout_y')]



    if (!position[0]) {
        position[0] = screen[0] - 200
    }

    if (!position[1]) {
        position[1] = screen[1] / 2 - 100
    }

    moving = false

    PRINTABLE = /[a-zA-Z0-9!"#$%&'()*+,-.\/:;<=>?@[\\\]^_`{|}~]/
    COLORNAMES = ['Yellow', 'Purple', 'Green', 'Blue', 'Orange']

    // Colors taken from : https://github.com/perilouswithadollarsign/cstrike15_src/blob/master/engine/baseclientstate.cpp#L56
    // && https://github.com/perilouswithadollarsign/cstrike15_src/blob/f82112a2388b841d72cb62ca48ab1846dfcc11c8/game/shared/shareddefs.h
    COLORS = [
        [240, 243, 32, 255],
        [190, 33, 222, 255],
        [28, 166, 0, 255],
        [92, 168, 255, 255],
        [255, 155, 37, 255],
    ]
    COLOR_CT = [153, 204, 255, 255]
    COLOR_T = [255, 178, 70, 255]
    DARKENCOLORS = [
        [128, 130, 7, 255],
        [95, 16, 111, 255],
        [13, 83, 0, 255],
        [0, 80, 173, 255],
        [146, 79, 0, 255],
    ]

    display_icons = {
        'glock 18': 'd',
        p2000: 'o',
        'dual berettas': 'b',
        p250: 'y',
        'five seven': 'c',
        'cz75 auto': 'Q',
        'usp s': 'P',
        'desert eagle': 'a',
        'r8 revolver': 'R',
        'tec 9': 'w',
        nova: 'B',
        xm1014: 'r',
        'mag 7': 't',
        'sawed off': 'v',
        negev: 'u',
        m249: 'i',
        mp9: 'A',
        mp7: 'z',
        'mp5 sd': 'p',
        'ump 45': 'q',
        p90: 'C',
        'pp bizon': 's',
        'mac 10': 'n',
        'ak 47': 'e',
        m4a4: 'l',
        'm4a1 s': 'm',
        famas: 'h',
        'galil ar': 'k',
        aug: 'f',
        'ssg 08': 'F',
        'sg 553': 'E',
        awp: 'g',
        'scar 20': 'D',
        g3sg1: 'j',
        'high explosive grenade': 'I',
        'smoke grenade': 'J',
        flashbang: 'H',
        'decoy grenade': 'L',
        molotov: 'K',
        'incendiary grenade': 'M',
        'zeus x27': 'x',
        'c4 explosive': 'N',
        'm9 bayonet': 'G',
        bayonet: 'G',
        'flip knife': 'G',
        'gut knife': 'G',
        karambit: 'G',
        'butterfly knife': 'G',
        'falchion knife': 'G',
        'navaja knife': 'G',
        'shadow daggers': 'G',
        'stiletto knife': 'G',
        'bowie knife': 'G',
        'huntsman knife': 'G',
        'talon knife': 'G',
        'ursus knife': 'G',
        'classic knife': 'G',
        'paracord knife': 'G',
        'survival knife': 'G',
        'nomad knife': 'G',
        'skeleton knife': 'G',
        knife: 'G',
        defuse_kit: 'U',
        c4: 'N',
        kevlar: 'S',
        kelvar_helmet: 'T',
    }

    exceptions = {
        'glock 18': 'glock',
        p2000: 'hkp2000',
        'dual berettas': 'elite',
        'cz75 auto': 'cz75a',
        'usp s': 'usp_silencer',
        'desert eagle': 'deagle',
        'r8 revolver': 'revolver',
        'pp bizon': 'bizon',
        'high explosive grenade': 'hegrenade',
        'decoy grenade': 'decoy',
        'incendiary grenade': 'incgrenade',
        'zeus x27': 'taser',
    }

    weaponname_icons = {}

    for (key in display_icons) {
        value = display_icons[key]
        weaponname_icons['weapon_' + (exceptions[key] ? exceptions[key] : key.replace(/ /g, ''))] = value
    }

    // ARMOR KNIFE TASER NADES PISTOL OTHER KIT BOMB -> Old Order
    // Newer Order : ARMOR TASER NADES PISTOL KNIFE OTHER KIT BOMB
    priority_array = [
        [display_icons.kevlar, display_icons.kelvar_helmet],
        [display_icons['zeus x27']],
        [display_icons.molotov, display_icons['incendiary grenade']],
        [display_icons['high explosive grenade']],
        [display_icons['smoke grenade']],
        [display_icons.flashbang],
        [display_icons['decoy grenade']],
        [display_icons['glock 18'], display_icons.p2000, display_icons['dual berettas'], display_icons.p250, display_icons['five seven'], display_icons['cz75 auto'], display_icons['usp s'], display_icons['desert eagle'], display_icons['r8 revolver'], display_icons['tec 9']],
        [display_icons.knife],
        [],
        [display_icons.defuse_kit],
        [display_icons.c4],
    ]

    priorities = {}

    for (_ in display_icons) {
        weapon = display_icons[_]
        priorities[weapon] = 9
    }

    for (index in priority_array) {
        value = priority_array[index]
        for (i = 0, len = value.length; i < len; i++) {
            weapon = value[i]
            priorities[weapon] = index
        }
    }

    weaponcache = {}

    enemycache = {}

    draw = function () {
        var active, enemies, font, height, icon, icons, j, k, l, len1, len2, len3, len4, m, money, name, player, ref, results, size, width, customColor
        if (!(Entity.IsValid(Entity.GetLocalPlayer()) || UI.IsMenuOpen())) {
            return
        }
        font = Render.AddFont('Segoe UI', 8, 600)
        height = 0
        // upper header
        // header

        Render.GradientRect(position[0], position[1], 100, 2, 1, [218, 160, 87, 255], [255, 223, 150, 255])
        Render.GradientRect(position[0] + 100, position[1], 100, 2, 1, [255, 223, 150, 255], [218, 160, 87, 255])
        Render.FilledRect(position[0], position[1] + 2, 200, 16, [38, 40, 52, 90])
        /*
        Render.GradientRect(position[0], position[1], 100, 2, 1, 
            (Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_iTeamNum') === 2 ? COLOR_CT : COLOR_T),
            (Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_iTeamNum') === 3 ? COLOR_CT : COLOR_T))
        Render.GradientRect(position[0] + 100, position[1], 100, 2, 1, 
            (Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_iTeamNum') === 3 ? COLOR_CT : COLOR_T),
            (Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_iTeamNum') === 2 ? COLOR_CT : COLOR_T))
        Render.FilledRect(position[0], position[1] + 2, 200, 16, 
                            [38, 40, 52, 90])*/
        text = 'loadout '
        if (Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_iTeamNum') === 2) text = text + '( CT )'
        else if (Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_iTeamNum') === 3) text = text + '( T )'

        //+ (Entity.GetProp(Entity.GetGameRulesProxy(), "CCSGameRulesProxy" ,"m_bIsValveDS") == 1 ? " (valve) " : " ")
        size = Render.TextSizeCustom(text, font)
        Render.StringCustom(position[0] + (200 - size[0]) / 2 + 1, position[1] + (18 - size[1]) / 2 + 1, 0, text, [0, 0, 0, 100], font)
        Render.StringCustom(position[0] + (200 - size[0]) / 2, position[1] + (18 - size[1]) / 2, 0, text, [239, 239, 239, 255], font)
        enemies = Entity.GetEnemies()
        for (j = 0, len1 = enemies.length; j < len1; j++) {
            player = enemies[j]
            enemycache[player] = true
        }
        for (player in enemycache) {
            _ = enemycache[player]
            player = parseInt(player) // keys always string
            if (enemies.indexOf(player) === -1 && Entity.IsEnemy(player)) {
                // just to be sure
                enemies.push(player)
            }
        }
        results = []
        for (k = 0, len2 = enemies.length; k < len2; k++) {
            player = enemies[k]
            if (!(Entity.GetProp(player, 'CCSPlayerResource', 'm_iHealth') > 0)) {
                continue
            }
            if (!Entity.IsDormant(player)) {
                icons = []
                ref = Entity.GetWeapons(player)
                for (l = 0, len3 = ref.length; l < len3; l++) {
                    weapon = ref[l]
                    icon = display_icons[Entity.GetName(weapon)]
                    if (icon) {
                        icons.push(icon)
                    }
                }
                if (icons.indexOf(display_icons[Entity.GetName(Entity.GetWeapon(player))]) >= 0) {
                    // JANK PROTECTION
                    weaponcache[player] = {
                        weapons: icons,
                        selected: display_icons[Entity.GetName(Entity.GetWeapon(player))],
                    }
                }
            }
            name = Entity.GetName(player)
            if (!PRINTABLE.exec(name)) {
                if (Entity.GetProp(player, 'CCSPlayerResource', 'm_iCompTeammateColor') >= 0) name = 'Enemy ' + COLORNAMES[Entity.GetProp(player, 'CCSPlayerResource', 'm_iCompTeammateColor')]
                else name = 'Enemy Player'
            }

            if (Entity.IsBot(player)) {
                name = 'BOT ' + name
            }

            name += " "

            width = 0
            customColor = [239, 239, 239, 255]
            if (!Entity.IsBot(player) && Entity.GetProp(player, 'CCSPlayerResource', 'm_iCompTeammateColor') >= 0) {
                customColor = COLORS[Entity.GetProp(player, "CCSPlayerResource", "m_iCompTeammateColor")]
                customCircleColor = DARKENCOLORS[Entity.GetProp(player, "CCSPlayerResource", "m_iCompTeammateColor")]
                //customColor = COLORS[k], customCircleColor = DARKENCOLORS[k]
                Render.FilledCircle(position[0] + 8, position[1] + height + 26, 4, customColor)
                Render.Circle(position[0] + 8, position[1] + height + 26, 4, customCircleColor)
                width = +18
            }

            Render.StringCustom(position[0] + width + 4, position[1] + height + 21, 0, name, [0, 0, 0, 100], font)
            Render.StringCustom(position[0] + width + 3, position[1] + height + 20, 0, name, [239, 239, 239, 255], font)
            width = width + Render.TextSizeCustom(name, font)[0]
            //
            money = Entity.GetProp(player, 'CCSPlayer', 'm_iAccount') + '$'
            Render.StringCustom(position[0] + width + 11, position[1] + height + 21, 0, money, [0, 0, 0, 100], font)
            Render.StringCustom(position[0] + width + 10, position[1] + height + 20, 0, money, [0, 144, 81, 255], font)
            //
            /*
        location = "; " + Entity.GetProp(player, "CCSPlayer", "m_szLastPlaceName")
        width    =  width + Render.TextSizeCustom(money, font)[0];
        Render.StringCustom(position[0] + width + 16, position[1] + height + 19, 0, location, [0, 0, 0, 100], font);
        Render.StringCustom(position[0] + width + 15, position[1] + height + 18, 0, location, [233, 233, 233, 255], font);*/
            //
            width = 0
            icons = weaponcache[player] ? weaponcache[player].weapons.slice() : []
            if (Entity.GetProp(player, 'CCSPlayer', 'm_bHasHelmet')) {
                icons.push(display_icons.kelvar_helmet)
            } else if (Entity.GetProp(player, 'CCSPlayerResource', 'm_iArmor') > 0) {
                icons.push(display_icons.kevlar)
            }
            if (Entity.GetProp(player, 'CCSPlayer', 'm_bHasDefuser')) {
                icons.push(display_icons.defuse_kit)
            }
            icons.sort(function (a, b) {
                return priorities[a] - priorities[b]
            })

            active = weaponcache[player] ? weaponcache[player].selected : void 0
            for (m = 0, len4 = icons.length; m < len4; m++) {
                icon = icons[m]
                if (icon === "G" && icon !== active) continue; // filter out knives
                Render.String(position[0] + width + 2, position[1] + height + 36, 0, icon, [0, 0, 0, 100], 5)
                Render.String(position[0] + width + 1, position[1] + height + 35, 0, icon, active === icon ? [255, 164, 1, 255] : [239, 239, 239, 255], 5)
                width += Render.TextSize(icon, 5)[0]

            }
            results.push((height += 36)) // was 32, changed to adapt filledcircle
        }
        //return results
    }

    rel_start = void 0

    drag = function () {
        var cursor, rel
        if (!(UI.IsMenuOpen() && Input.IsKeyPressed(0x01))) {
            return (rel_start = void 0)
        }
        cursor = Input.GetCursorPosition()
        rel = [cursor[0] - position[0], cursor[1] - position[1]]
        if (!rel_start && (rel[0] < 0 || rel[0] > 200 || rel[1] < 0 || rel[1] > 18)) {
            return
        }
        if (!rel_start) {
            rel_start = rel
        }
        position = [cursor[0] - rel_start[0], cursor[1] - rel_start[1]]
        UI.SetValue('loadout_x', position[0])
        return UI.SetValue('loadout_y', position[1])
    }

    in_warmup = false

    onDraw = function () {
        if (Entity.GetProp(Entity.GetGameRulesProxy(), 'CCSGameRulesProxy', 'm_bWarmupPeriod')) {
            in_warmup = true
        } else if (in_warmup) {
            enemycache = {}
            weaponcache = {}
            in_warmup = false
        }
        drag()
        return draw()
    }

    on_item_pickup = function () {
        var player
        player = Entity.GetEntityFromUserID(Event.GetInt('userid'))
        if (!Entity.IsEnemy(player)) {
            return
        }
        weapon = weaponname_icons['weapon_' + Event.GetString('item')]
        if (!weapon) {
            return
        }
        if (!weaponcache[player]) {
            weaponcache[player] = {
                weapons: [],
                selected: void 0,
            }
        }
        return weaponcache[player].weapons.push(weapon)
    }

    on_item_remove = function () {
        var player
        player = Entity.GetEntityFromUserID(Event.GetInt('userid'))
        if (!(weaponcache[player] && Entity.IsEnemy(player))) {
            return
        }
        weapon = weaponname_icons['weapon_' + Event.GetString('item')]
        if (!weapon) {
            return
        }
        index = weaponcache[player].weapons.indexOf(weapon)
        if (index >= 0) {
            return weaponcache[player].weapons.splice(index, 1)
        }
    }

    on_item_equip = function () {
        var player
        player = Entity.GetEntityFromUserID(Event.GetInt('userid'))
        if (!(weaponcache[player] && Entity.IsEnemy(player))) {
            return
        }
        weapon = weaponname_icons['weapon_' + Event.GetString('item')]
        if (!weapon) {
            return
        }
        return (weaponcache[player].selected = weapon)
    }

    on_player_death = function () {
        var player
        player = Entity.GetEntityFromUserID(Event.GetInt('userid'))
        if (!(weaponcache[player] && Entity.IsEnemy(player))) {
            return
        }
        return (weaponcache[player] = {
            weapons: [],
            selected: void 0,
        })
    }

    on_cs_game_disconnected = function () {
        enemycache = {}
        return (weaponcache = {})
    }

    Cheat.RegisterCallback('Draw', 'onDraw')

    Cheat.RegisterCallback('item_pickup', 'on_item_pickup')

    Cheat.RegisterCallback('item_remove', 'on_item_remove')

    Cheat.RegisterCallback('item_equip', 'on_item_equip')

    Cheat.RegisterCallback('player_death', 'on_player_death')

    Cheat.RegisterCallback('cs_game_disconnected', 'on_cs_game_disconnected')

    //'buytime_ended'

}
catch (e) {
    Cheat.Print(e.stack + "\n")
}
