/*  Onetap-JS (Api Verison 3+)
    
    Title : Custom Bomb Timer
    Author : Monotonized#6495
    Description : Skeet bomb timer indicator

    (c) Copyright LewdDeveloper 2020 - 2021
    MIT LICENSE
*/

//#region : User Interface && Api Implementation

Render.String = Render.StringCustom // :eyes:

var DigitString = function (num, digit) {
    if (isNaN(digit)) digit = 1
    var v = Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit)
    return v * 10 % 10 === 0 ? v = v + ".0s" : v + "s"
}

//#endregion

// alternative solution for checking planting bombsite name (update this for me thanks)
const a_site_array = [425, 333, 79, 262, 154, 94, 281, 204, 92, 152, 301, 454]
const b_site_array = [426, 422, 504, 314, 405, 536, 282, 205, 97, 153, 302, 455]
var begin_when, site, userid, sitename
var Draw 

Draw = function() {
    var font, font2
    var width, height, position, x, y, align, thickness, long
    var plant_timer, until_planted, until_defused, until_blow, defuse_timer, explode_timer, sitename
    var entityindex = [], a1 = [], a2 = [], i, len, i1, i2, len1, len2
    var defuser, local_player, player_armor , distance_from_c4, player_pos, bomb_pos, health, new_hp, armor
    local_player = Entity.GetLocalPlayer()

    // Iterate entity array ( better performance than Entity.GetEntitiesByClassID(classid) )
    for (i = 0, entityindex = Entity.GetEntities(), len = entityindex.length; i < len; i++) {
        // CC4
        if (Entity.GetClassID(entityindex[i]) === 34) {
            // Returns true if the bomb is being placed in the bomb site, otherwise false
            Entity.GetProp(entityindex[i], "CC4", "m_bStartedArming")
                 ? a1.push(entityindex[i])
                 : void null 
        }
        // CPlantedC4
        else if (Entity.GetClassID(entityindex[i]) === 129) {
            // Returns true if the bomb is planted by GameRulesProxy
            Entity.GetProp(Entity.GetGameRulesProxy(), "CCSGameRulesProxy", "m_bBombPlanted")
            // Returns true if the bomb is ticking, otherwise false
            && Entity.GetProp(entityindex[i], "CPlantedC4", "m_bBombTicking") 
            // Returns true if the bomb is defused, otherwise false               
            && !Entity.GetProp(entityindex[i], "CPlantedC4", "m_bBombDefused")               
                ? a2.push(entityindex[i])
                : void null 
        }
    }

    len1 = a1.length
    len2 = a2.length
    //if ( len1 < 1 && len2 < 1 ) return

    width  = Render.GetScreenSize()[0]
    height = Render.GetScreenSize()[1]
    position = [ 40, 0 ]
    align = 0, thickness = 15
    x = position[0] , y = position[1]
    font = Render.AddFont("Segoe UI", 20, 600) 
    font2 = Render.AddFont("Segoe UI", 18, 600) 

    if (len1 > 0) {
        i1 = 0
        // until_planted = Math.max( Entity.GetProp(plantingc4ent[i2], "CC4", "m_fArmedTime") - Globals.Curtime() , 0 ) // this doesn't work
        plant_timer = 3 + Globals.TickInterval() - Globals.Tickrate() * 0.00045 // close enough, if you need percision go createmove
        until_planted = Math.max( plant_timer - Global.Curtime() + begin_when, 0 )

        //#region drawing
        long = height - Math.min(height, height * (Globals.Curtime() - begin_when) / plant_timer)

        Render.FilledRect( 0, 0, thickness, height, [32, 32, 32, 150] ) // background
        Render.FilledRect( 0, long, thickness, height, [ 108, 195, 18, 255 ] ) // planting progress bar
 
        if ( Entity.GetProp(a1[i1], "CC4","m_hOwner") !== local_player) {
            Render.String( x + 1, y + 1, align, this.sitename + '' , [ 32, 32, 32, 255 ], font ) // outline effect
            Render.String( x, y, align, this.sitename + '' , [ 108, 195, 18, 255 ], font ) // globalThis.sitename 
            y += 30
        }
        Render.String( x + 1, y + 1, align, Math.round(until_planted * 100) / 100  + '' , [ 32, 32, 32, 255 ], font ) // outline effect
        Render.String( x, y, align, Math.round(until_planted * 100) / 100  + '' , [ 108, 195, 18, 255 ], font )
        //#endregion
    }

    if (len2 > 0) { 
        i2 = 0
        until_blow    = Math.max( Entity.GetProp(a2[i2], "CPlantedC4", "m_flC4Blow") - Globals.Curtime(), 0 ) 
        explode_timer = Entity.GetProp(a2[i2], "CPlantedC4", "m_flTimerLength")  || Convar.GetFloat("mp_c4timer")
        defuser       = Entity.GetProp(a2[i2], "CPlantedC4", "m_hBombDefuser")   | 0 // force number conversion
        until_defused = Math.max( Entity.GetProp(a2[i2], "CPlantedC4", "m_flDefuseCountDown") - Globals.Curtime() , 0)
        defuse_timer  = Entity.GetProp(a2[i2], "CPlantedC4", "m_flDefuseLength") | 0
        sitename      = Entity.GetProp(a2[i2], "CPlantedC4", "m_nBombSite") === 0 ? "A" : "B"
   
        //#region drawing
        var Color  = [108, 195, 18, 255]
        var Color2 = [238, 238, 238, 255]
        // todo : i am too lazy to write if... else if.. else here
        until_blow < 15 ? Color = [196, 255, 3, 255] : void 0
        until_blow < 10 ? Color = [230, 235, 145, 255] : void 0
        Entity.GetProp(local_player, 'CCSPlayer', 'm_iTeamNum') === 3 && until_blow < 10 && !Entity.GetProp(local_player, 'CCSPlayer', 'm_bHasDefuser') ? Color = [255, 1, 1, 255] : void 0
        until_blow < 5  ? Color = [255, 1, 1, 255]  : void 0

        y = position[1] 
        //Render.FilledRect(0, 0, 15, height, [32, 32, 32, 150]) // background
        Render.FilledRect( 0, -1 + height - Math.min(height, height * until_blow / explode_timer) , thickness + 1, height, [32, 32, 32, 150] ) // outline effect 
        Render.FilledRect( 0, height - Math.min(height, height * until_blow / explode_timer) , thickness, height, Color ) 
        Render.String( x + 1, y + 1, align, sitename + ' -', [ 32, 32, 32, 255 ], font ) // outline effect
        Render.String( x, y, align, sitename + ' -', [ 108, 195, 18, 255 ], font )
        x += 45
        Render.String( x + 1, y + 1, align, DigitString(until_blow) + '', [ 32, 32, 32, 255 ], font ) // outline effect
        Render.String( x, y, align, DigitString(until_blow) + '', Color, font )

        // CCSPlayer
        if (Entity.GetClassID(defuser) === 40) {
            until_defused < until_blow ? Color2 = [77, 166, 255, 255] : Color2 = [175, 0, 42, 255]
            x = position[0]
            if (until_defused < until_blow) {
            Render.FilledRect( 15, -1 + height - Math.min(height, height * until_defused / explode_timer), thickness + 2, height, [32, 32, 32, 150] ) // outline effect 
            Render.FilledRect( 16, height - Math.min(height, height * until_defused / explode_timer) , thickness, height, Color2 ) 
        }
            //y += 30
            //Render.String( x, y, align, Entity.GetName(defuser) + '', Color2, font) 
            y += 30
            Render.String( x + 1, y + 1, align, "D : " + DigitString(until_defused) + '', [ 32, 32, 32, 255 ], font) // outline effect
            Render.String( x, y, align, "D : " + DigitString(until_defused) + '', Color2, font) // todo : dark blue when candefuse, and red when cantdefuse (opposite for teams)
        }

        //#endregion

        // -> Note : I'm too lazy so i am only making check for damage dealt to local player only.
        // todo : check damage dealt to spectated player
        if (!Entity.IsAlive(local_player)) return // :eyes:

        player_pos       = Entity.GetRenderOrigin(local_player)
        player_armor     = Entity.GetProp(local_player, "CCSPlayerResource", "m_iArmor") | 0
        bomb_pos         = Entity.GetRenderOrigin(a2[i2])
        
        // Explosion damage dealt to the player Using Casual Hacker's Mathlab (unknowncheats) 
        // "thanks" leed for js implementation
        distance_from_c4 = Math.sqrt(Math.pow(player_pos[0] - bomb_pos[0], 2) + Math.pow(player_pos[1] - bomb_pos[1], 2) + Math.pow(player_pos[2] - bomb_pos[2], 2))
        health = 450.7 * Math.exp(Math.abs((distance_from_c4 - 75.68) / 789.2) * -Math.abs((distance_from_c4 - 75.68) / 789.2))
        armor  = 0

        if (player_armor > 0) {
            new_hp = health * 0.5
            armor = health * 0.5 - new_hp * 0.5
            if (armor > player_armor) {
                armor = player_armor * 2
                new_hp = health - armor
            }
            health = new_hp
        }

        health = Math.max( Math.round(health), 0)
        armor  = Math.max( armor > 0.3 ? Math.ceil(armor) : Math.round(armor), 0)

        //#region drawing
        x = 35
        y = height * 0.65
        if (health > 0) {
            if (health > Entity.GetProp(local_player, "CCSPlayerResource", "m_iHealth")) {
                Render.String(x + 1, y + 40 + 1, align, "LETHAL", [ 32, 32, 32, 255 ], font) // outline effect
                Render.String(x, y + 40, align, "LETHAL", [255, 1, 1, 255], font)
            }
            else {
                Render.String(x + 1, y + 1, align, "- " + health + " HP", [ 32, 32, 32, 255 ], font2) // outline effect
                Render.String(x, y, align, "- " + health + " HP", [230, 235, 145, 255], font2)
                if (armor > 0) {
                    y += 24
                    Render.String(x + 1, y + 1, align, "- " + armor + " AP", [ 32, 32, 32, 255 ], font2) // outline effect
                    Render.String(x, y, align, "- " + armor + " AP", [238, 238, 238, 255], font2)
                }
            }
        }
        //#endregion
    }
}



Cheat.RegisterCallback("Draw", "Draw")

bomb_beginplant = function() {
     begin_when = Globals.Curtime()
     site       = Event.GetInt("site")
     userid     = Event.GetString("userid")
     sitename   = a_site_array.indexOf(sitename) > -1 ? "A" : b_site_array.indexOf(sitename) > -1 ? "B" : Entity.GetProp(Entity.GetEntityFromUserID(userid) ,"CCSPlayer", "m_szLastPlaceName")
     Cheat.Print(__filename + " (info) : siteid " + site + "\n")
}

Cheat.RegisterCallback("bomb_beginplant", "bomb_beginplant")