/* 
    https://leodeveloper.pages.dev/csgo/onetap/v3rerun/runtime
    (c) Copyright LeoDeveloper 2020 - 2021
    Released under the MIT license at https://leodeveloper.pages.dev
    Visit https://leodeveloper.pages.dev/license.html for more information.
*/

(function () {
    return function () {
        var Angles, Entity, Material, RGBA, Reference, Vector2, Vector3, globals, globalthis, name, packer, realglobals, ref, results, shallowcopy, uielement_wrapper, value;
        shallowcopy = function (obj) {
            var name, nobj, value;
            nobj = {};
            for (name in obj) {
                value = obj[name];
                nobj[name] = value;
            }
            return nobj;
        };
        globalthis = this;
        realglobals = shallowcopy(globalthis);
        packer = function (value) {
            if (value.pack != null) {
                return value.pack();
            } else {
                return value;
            }
        };
        // Material Stuff
        Material = function (name) {
            this.name = name;
        };
        Material.prototype._get = function () {
            return realglobals.Material.Get(this.name);
        };
        Material.prototype.SetKeyValue = function (key, value) {
            return realglobals.Material.SetKeyValue(this._get(), key, value);
        };
        Material.prototype.Refresh = function () {
            return realglobals.Material.Refresh(this._get());
        };
        Material.prototype.Destroy = function () {
            return realglobals.Material.Destroy(this.name);
        };
        // Reference
        Reference = function (pathA, pathB, pathC, pathD) {
            this.path = [pathA, pathB, pathC, pathD];
        };
        Reference.prototype.GetValue = function () {
            return realglobals.UI.GetValue(this.path[0], this.path[1], this.path[2], this.path[3]);
        };
        Reference.prototype.GetString = function () {
            return realglobals.UI.GetString(this.path[0], this.path[1], this.path[2], this.path[3]);
        };
        Reference.prototype.GetColor = function () {
            return RGBA.unpack(realglobals.UI.GetColor(this.path[0], this.path[1], this.path[2], this.path[3]));
        };
        Reference.prototype.SetValue = function (value) {
            return realglobals.UI.SetValue(this.path[0], this.path[1], this.path[2], this.path[3], value);
        };
        Reference.prototype.SetEnabled = function (value) {
            return realglobals.UI.SetEnabled(this.path[0], this.path[1], this.path[2], this.path[3], value);
        };
        Reference.prototype.SetColor = function (rgba) {
            return realglobals.UI.SetColor(this.path[0], this.path[1], this.path[2], this.path[3], packer(rgba));
        };
        Reference.prototype.IsHotkeyActive = function () {
            return realglobals.UI.IsHotkeyActive(this.path[0], this.path[1], this.path[2], this.path[3]);
        };
        Reference.prototype.ToggleHotkey = function () {
            return realglobals.UI.ToggleHotkey(this.path[0], this.path[1], this.path[2], this.path[3]);
        };
        uielement_wrapper = function (func) {
            return function (name, arg1, arg2, arg3) {
                func(name, arg1, arg2, arg3);
                return new Reference("Misc", "JAVASCRIPT", "Script Items", name);
            };
        };
        // Entity stuff
        Entity = function (entityindex) {
            this.entityindex = entityindex;
        };
        Entity.prototype.IsTeammate = function () {
            return realglobals.Entity.IsTeammate(this.entityindex);
        };
        Entity.prototype.IsEnemy = function () {
            return realglobals.Entity.IsEnemy(this.entityindex);
        };
        Entity.prototype.IsBot = function () {
            return realglobals.Entity.IsBot(this.entityindex);
        };
        Entity.prototype.IsLocalPlayer = function () {
            return realglobals.Entity.IsLocalPlayer(this.entityindex);
        };
        Entity.prototype.IsValid = function () {
            return realglobals.Entity.IsValid(this.entityindex);
        };
        Entity.prototype.IsAlive = function () {
            return realglobals.Entity.IsAlive(this.entityindex);
        };
        Entity.prototype.IsDormant = function () {
            return realglobals.Entity.IsDormant(this.entityindex);
        };
        Entity.prototype.GetClassID = function () {
            return realglobals.Entity.GetClassID(this.entityindex);
        };
        Entity.prototype.GetClassName = function () {
            return realglobals.Entity.GetClassName(this.entityindex);
        };
        Entity.prototype.GetName = function () {
            return realglobals.Entity.GetName(this.entityindex);
        };
        Entity.prototype.GetWeapon = function () {
            return new Entity(realglobals.Entity.GetWeapon(this.entityindex));
        };
        Entity.prototype.GetWeapons = function () {
            var i, index, len, ref, results;
            ref = realglobals.Entity.GetWeapons(this.entityindex);
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                index = ref[i];
                results.push(new Entity(index));
            }
            return results;
        };
        Entity.prototype.GetRenderOrigin = function () {
            return Vector3.unpack(realglobals.Entity.GetRenderOrigin(this.entityindex));
        };
        Entity.prototype.GetRenderBox = function () {
            var array;
            array = realglobals.Entity.GetRenderBox(this.entityindex);
            return [array[0], Vector2.unpack(array[1]), Vector2.unpack(array[2])];
        };
        Entity.prototype.GetProp = function (classname, table, propname) {
            return realglobals.Entity.GetProp(this.entityindex, classname, table, propname);
        };
        Entity.prototype.SetProp = function (classname, table, propname, value) {
            return realglobals.Entity.SetProp(this.entityindex, classname, table, propname, value);
        };
        Entity.prototype.GetHitboxPositions = function (hitboxindex) {
            return Vector3.unpack(realglobals.Entity.GetHitboxPosition(this.entityindex, hitboxindex));
        };
        Entity.prototype.GetEyePosition = function () {
            return Vector3.unpack(realglobals.Entity.GetEyePosition(this.entityindex));
        };
        // Vectors/Angles
        Vector2 = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Vector2.prototype.pack = function () {
            return [this.x, this.y];
        };
        Vector2.unpack = function (array) {
            return new Vector2(array[0], array[1]);
        };
        Vector3 = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        Vector3.prototype.pack = function () {
            return [this.x, this.y, this.z];
        };
        Vector3.unpack = function (array) {
            return new Vector3(array[0], array[1], array[2]);
        };
        Angles = function (pitch, yaw, roll) {
            this.pitch = pitch;
            this.yaw = yaw;
            this.roll = roll;
        };
        Angles.prototype.pack = function () {
            return [this.pitch, this.yaw, this.roll];
        };
        Angles.unpack = function (array) {
            return new Angles(array[0], array[1], array[2]);
        };
        RGBA = function (r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        };
        RGBA.prototype.pack = function () {
            return [this.r, this.g, this.b, this.a];
        };
        RGBA.unpack = function (array) {
            return new RGBA(array[0], array[1], array[2], array[3]);
        };
        globals = {
            __reality: globalthis,
            __filename: realglobals.__filename,
            Reference: Reference,
            Entity: Entity,
            Vector2: Vector2,
            Vector3: Vector3,
            Angles: Angles,
            RGBA: RGBA,
            Globals: shallowcopy(realglobals.Globals),
            Sound: shallowcopy(realglobals.Sound),
            Cheat: shallowcopy(realglobals.Cheat),
            Local: shallowcopy(realglobals.Local),
            World: shallowcopy(realglobals.World),
            Input: {
                GetCursorPosition: function () {
                    return Vector2.unpack(realglobals.Input.GetCursorPosition);
                },
                IsKeyPressed: realglobals.Input.IsKeyPressed
            },
            Render: {
                String: function (x, y, align, text, color, size) {
                    if (size != null) {
                        return realglobals.Render.String(x, y, align, text, packer(color), size);
                    } else {
                        return realglobals.Render.String(x, y, align, text, packer(color)); // onetap doesn't like undefined as size
                    }
                },
                TextSize: function (text, size) {
                    return Vector2.unpack(realglobals.Render.TextSize(text, size));
                },
                Line: function (x1, y1, x2, y2, color) {
                    return realglobals.Render.Line(x1, y1, x2, y2, packer(color));
                },
                Rect: function (x, y, width, height, color) {
                    return realglobals.Render.Rect(x, y, width, height, packer(color));
                },
                FilledRect: function (x, y, width, height, color) {
                    return realglobals.Render.FilledRect(x, y, width, height, packer(color));
                },
                GradientRect: function (x, y, width, height, color1, color2) {
                    return realglobals.Render.FilledRect(x, y, width, height, packer(color1), packer(color2));
                },
                Circle: function (x, y, r, color) {
                    return realglobals.Render.Circle(x, y, r, packer(color));
                },
                Polygon: function (points, color) {
                    return realglobals.Render.Polygon(points, packer(color));
                },
                WorldToScreen: function (position) {
                    return Vector2.unpack(realglobals.Render.WorldToScreen(packer(position)));
                },
                AddFont: realglobals.Render.AddFont,
                FindFont: realglobals.Render.FindFont,
                StringCustom: function (x, y, align, text, color, font) {
                    return realglobals.Render.StringCustom(x, y, aligh, text, packer(color), font);
                },
                TexturedRect: realglobals.Render.TexturedRect,
                AddTexture: realglobals.Render.AddTexture,
                TextSizeCustom: realglobals.Render.TextSizeCustom,
                GetScreenSize: function () {
                    return Vector2.unpack(realglobals.Render.GetScreenSize());
                }
            },
            UI: {
                Reference: function (pathA, pathB, pathC, pathD) {
                    return new Reference(pathA, pathB, pathC, pathD);
                },
                IsMenuOpen: realglobals.UI.IsMenuOpen,
                AddCheckbox: uielement_wrapper(realglobals.UI.AddCheckbox),
                AddSliderInt: uielement_wrapper(realglobals.UI.AddSliderInt),
                AddSliderFloat: uielement_wrapper(realglobals.UI.AddSliderFloat),
                AddHotkey: uielement_wrapper(realglobals.UI.AddHotkey),
                AddLabel: uielement_wrapper(realglobals.UI.AddLabel),
                AddDropdown: uielement_wrapper(realglobals.UI.AddDropdown),
                AddMultiDropdown: uielement_wrapper(realglobals.UI.AddMultiDropdown),
                AddColorPicker: uielement_wrapper(realglobals.UI.AddColorPicker),
                AddTextbox: uielement_wrapper(realglobals.UI.AddTextbox)
            },
            Convar: shallowcopy(realglobals.Convar),
            Event: shallowcopy(realglobals.Event),
            Entities: {
                GetEntities: function () {
                    var i, index, len, ref, results;
                    ref = realglobals.Entity.GetEntities();
                    results = [];
                    for (i = 0, len = ref.length; i < len; i++) {
                        index = ref[i];
                        results.push(new Entity(index));
                    }
                    return results;
                },
                GetEntitiesByClassID: function (classid) {
                    var i, index, len, ref, results;
                    ref = realglobals.Entity.GetEntitiesByClassID(classid);
                    results = [];
                    for (i = 0, len = ref.length; i < len; i++) {
                        index = ref[i];
                        results.push(new Entity(index));
                    }
                    return results;
                },
                GetPlayers: function () {
                    var i, index, len, ref, results;
                    ref = realglobals.Entity.GetPlayers();
                    results = [];
                    for (i = 0, len = ref.length; i < len; i++) {
                        index = ref[i];
                        results.push(new Entity(index));
                    }
                    return results;
                },
                GetEnemies: function () {
                    var i, index, len, ref, results;
                    ref = realglobals.Entity.GetEnemies();
                    results = [];
                    for (i = 0, len = ref.length; i < len; i++) {
                        index = ref[i];
                        results.push(new Entity(index));
                    }
                    return results;
                },
                GetTeammates: function () {
                    var i, index, len, ref, results;
                    ref = realglobals.Entity.GetTeammates();
                    results = [];
                    for (i = 0, len = ref.length; i < len; i++) {
                        index = ref[i];
                        results.push(new Entity(index));
                    }
                    return results;
                },
                GetLocalPlayer: function () {
                    return new Entity(realglobals.Entity.GetLocalPlayer());
                },
                GetGameRulesProxy: function () {
                    return new Entity(realglobals.Entity.GetGameRulesProxy());
                },
                GetEntityFromUserID: function (userid) {
                    return new Entity(realglobals.Entity.GetEntityFromUserID(userid));
                }
            },
            Trace: {
                Line: function (entity, start, end) {
                    var array;
                    array = realglobals.Trace.Line(entity.entityindex, start, end);
                    return [new Entity(array[0]), array[1]];
                },
                Bullet: realglobals.Trace.Bullet
            },
            UserCMD: shallowcopy(realglobals.UserCMD),
            AntiAim: shallowcopy(realglobals.AntiAim),
            Exploit: shallowcopy(realglobals.Exploit),
            Ragebot: {
                GetTarget: function () {
                    return new Entity(realglobals.Ragebot.GetTarget());
                },
                IgnoreTarget: function (ent) {
                    return realglobals.Ragebot.IgnoreTarget(ent.entityindex);
                },
                ForceTarget: function (ent) {
                    return realglobals.Ragebot.ForceTarget(ent.entityindex);
                },
                ForceTargetSafety: function (ent) {
                    return realglobals.Ragebot.ForceTargetSafety(ent.entityindex);
                },
                ForceTargetHitchance: function (ent, hitchance) {
                    return realglobals.Ragebot.ForceTargetHitchance(ent.entityindex, hitchance);
                },
                ForceTargetMinimumDamage: function (ent, minimum_damage) {
                    return realglobals.Ragebot.ForceTargetMinimumDamage(ent.entityindex, minimum_damage);
                },
                ForceHitboxSafety: realglobals.Globals.ForceHitboxSafety
            },
            Materials: {
                Create: function (name) {
                    if (!realglobals.Material.Create(name)) {
                        return false;
                    }
                    return new Material(name);
                },
                Get: function (name) {
                    return new Material(name);
                }
            }
        };
        globals.Cheat.PrintColor = function (rgba, text) {
            return realglobals.Cheat.PrintColor(packer(rgba), text);
        };
        globals.Cheat._callbacks = [];
        globals.Cheat.RegisterCallback = function (name, func) {
            var callback_wrapper_func, full_callback;
            // This required hacking because onetap calls callback with a weird scope
            full_callback = "(function() { try { Cheat._callbacks[" + this._callbacks.length + "]() } catch (error) { Cheat.Print('[Onetap Re:Run] Error occured in " + name + " callback: \\n' + error.stack + '\\n') }})";
            this._callbacks.push(func);
            callback_wrapper_func = eval(full_callback);
            globalthis._callback_temp = callback_wrapper_func;
            realglobals.Cheat.RegisterCallback(name, "_callback_temp");
            return globalthis._callback_temp = void 0;
        };
        globals.Local.GetViewAngles = function () {
            return Angles.unpack(realglobals.Local.GetViewAngles());
        };
        globals.Local.SetViewAngles = function (angles) {
            return realglobals.Local.SetViewAngles(packer(angles));
        };
        globals.UserCMD.SetMovement = function (movement) {
            return realglobals.UserCMD.SetMovement(packer(movement));
        };
        globals.UserCMD.GetMovement = function () {
            return Vector3.unpack(realglobals.UserCMD.GetMovement);
        };
        globals.UserCMD.SetAngles = function (angles) {
            return realglobals.UserCMD.SetAngles(packer(angles));
        };
        ref = this;
        // overwrite globals now
        for (name in ref) {
            value = ref[name];
            this[name] = void 0;
        }
        results = [];
        for (name in globals) {
            value = globals[name];
            results.push(this[name] = value);
        }
        return results;
    };

}).call(this).call(this);

/*
    Author : unknowntrojan#2814
    Respected License Goes To The Owner
    MIT LICENSE
*/

const SCRIPT_TITLE = "damagehelper"
const SCRIPT_AUTHOR = "unknowntrojan"
const RETRACE_RATE = 4 // every 4 ticks

const keybind = UI.AddHotkey("Show Damage Possibilities");

if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function (value) {

            // Steps 1-2.
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            var O = Object(this);

            // Steps 3-5.
            var len = O.length >>> 0;

            // Steps 6-7.
            var start = arguments[1];
            var relativeStart = start >> 0;

            // Step 8.
            var k = relativeStart < 0 ?
                Math.max(len + relativeStart, 0) :
                Math.min(relativeStart, len);

            // Steps 9-10.
            var end = arguments[2];
            var relativeEnd = end === undefined ?
                len : end >> 0;

            // Step 11.
            var final = relativeEnd < 0 ?
                Math.max(len + relativeEnd, 0) :
                Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
                O[k] = value;
                k++;
            }

            // Step 13.
            return O;
        }
    });
}

const fovref = new Reference("Visual", "WORLD", "View", "Field of view");
const red = new RGBA(255, 255, 0, 255);

// 32 players
// 18 hitboxes each
// 1 tracebullet result each
const bulletresults = new Array(32).fill(new Array(18));

var lastbulletcount = 0;
var lasttickcount = 0;

Cheat.RegisterCallback("CreateMove", function () {
    lasttickcount = Globals.Tickcount();
});

Cheat.RegisterCallback("Draw", function () {
    // FPS safeguard
    if (Globals.Frametime() > Globals.TickInterval())
        return;
    var t0 = Date.now()
    const local = Entities.GetLocalPlayer();
    const enemies = Entities.GetEnemies();
    const fovic = fovref.GetValue();

    if (keybind.IsHotkeyActive()) {
        const localeye = local.GetEyePosition();      // origin
        const localview = Local.GetViewAngles();      // angles
        var didtrace = false;

        // get closest enemy to crosshair
        var lowestfov = 360;
        var lowest;
        for (e in enemies) {
            if (!enemies[e].IsValid() || !enemies[e].IsAlive() || enemies[e].IsLocalPlayer())
                continue;

            var fov;
            {
                var datapos = enemies[e].GetHitboxPositions(4);// destination

                var localview_ = localview.pack()
                var delta = [localeye.x - datapos.x, localeye.y - datapos.y, localeye.z - datapos.z]
                var ret_angle = [];
                ret_angle[0] = (Math.atan(delta[2] / Math.hypot(delta[0], delta[1]))) * (180 / Math.PI) - localview_[0];
                ret_angle[1] = (Math.atan(delta[1] / delta[0])) * (180 / Math.PI) - localview_[1];
                ret_angle[2] = 0;
                if (delta[0] >= 0.0)
                    ret_angle[1] += 180.0;

                var ang = ret_angle;
                ang[0] = Math.max(-89, Math.min(89, ang[0]))
                ang[1] %= 360;
                if (ang[1] > 180) {
                    ang[1] -= 360;
                }
                if (ang[1] < -180) {
                    ang[1] += 360;
                }
                ang[2] = 0;
                fov = Math.hypot(ang[0], ang[1]);
            }
            if (fov < lowestfov) {
                lowest = enemies[e];
                lowestfov = fov;
            }
        }

        if (lowestfov > fovic)
            return;

        var i = -1;
        var headpos = lowest.GetEyePosition();
        var headonscreen = Render.WorldToScreen(headpos);
        var a = local.GetEyePosition();
        var b = lowest.GetEyePosition();

        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dz = a.z - b.z;

        var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));

        while (i != 17) {
            i++;
            var po = lowest.GetHitboxPositions(i);
            var pos = Render.WorldToScreen(po);

            if (pos.x == NaN)
                continue;

            if (!local.GetWeapon().GetClassName().includes("CKnife")) {
                // trace only once every RETRACE_RATE ticks
                if (lastbulletcount + RETRACE_RATE < lasttickcount || lastbulletcount == 0) {
                    bulletresults[lowest.entityindex][i] = Trace.Bullet(local.entityindex, lowest.entityindex, localeye.pack(), po.pack())[1];
                    didtrace = true;
                }
                // trace.bullet return val:
                // entityid
                // damage
                // visible
                // hitgroup

                if (dist < 600)
                    Render.String(pos.x, pos.y, 1, bulletresults[lowest.entityindex][i].toString(), red, 2);
            }
        }
        if (dist > 600 && !local.GetWeapon().GetClassName().includes("CKnife")) { // Taser, Flash, Smoke, etc..?
            var highestdam = 0;
            for (d in bulletresults[lowest.entityindex]) {
                var x = bulletresults[lowest.entityindex][d];
                if (x > highestdam)
                    highestdam = x;
            }
            Render.String(headonscreen.x, headonscreen.y - 20, 1, highestdam.toString(), red, 2);
        }
    }
    if (didtrace)
        lastbulletcount = lasttickcount;

    var t1 = Date.now()
    if (t1 - t0 > 8) {
        Cheat.Print("[PERF] warning: draw took " + (t1 - t0).toString() + "ms\n")
    }

})