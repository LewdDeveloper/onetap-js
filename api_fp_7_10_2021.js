/* 
    version : 0.0.1
    * Functional Programming *
    date : 7/10/2021
	-- more info :
    otc3 : 18 objects (0->17)
*/
var apply = function () {
//#region start
var begin = performance.now()
var original = {}
var api = {
    Global: {
        Print() {
            return original.Global.Print.apply(void 0, arguments)
        },
        PrintChat() {
            return original.Global.PrintChat.apply(void 0, arguments)
        },
        PrintColor() {
            return original.Global.PrintColor.apply(void 0, arguments)
        },
        RegisterCallback() {
            return original.Global.RegisterCallback.apply(void 0, arguments)
        },
        ExecuteCommand() {
            return original.Global.ExecuteCommand.apply(void 0, arguments)
        },
        FrameStage() {
            return original.Global.FrameStage.apply(void 0, arguments)
        },
        Tickcount() {
            return original.Global.Tickcount.apply(void 0, arguments)
        },
        Tickrate() {
            return original.Global.Tickrate.apply(void 0, arguments)
        },
        TickInterval() {
            return original.Global.TickInterval.apply(void 0, arguments)
        },
        Curtime() {
            return original.Global.Curtime.apply(void 0, arguments)
        },
        Realtime() {
            return original.Global.Realtime.apply(void 0, arguments)
        },
        Frametime() {
            return original.Global.Frametime.apply(void 0, arguments)
        },
        Latency() {
            return original.Global.Latency.apply(void 0, arguments)
        },
        GetViewAngles() {
            return original.Global.GetViewAngles.apply(void 0, arguments)
        },
        SetViewAngles() {
            return original.Global.SetViewAngles.apply(void 0, arguments)
        },
        GetMapName() {
            return original.Global.GetMapName.apply(void 0, arguments)
        },
        IsKeyPressed() {
            return original.Global.IsKeyPressed.apply(void 0, arguments)
        },
        GetScreenSize() {
            return original.Global.GetScreenSize.apply(void 0, arguments)
        },
        GetCursorPosition() {
            return original.Global.GetCursorPosition.apply(void 0, arguments)
        },
        PlaySound() {
            return original.Global.PlaySound.apply(void 0, arguments)
        },
        PlayMicrophone() {
            return original.Global.PlayMicrophone.apply(void 0, arguments)
        },
        StopMicrophone() {
            return original.Global.StopMicrophone.apply(void 0, arguments)
        },
        GetUsername() {
            return original.Global.GetUsername.apply(void 0, arguments)
        },
        SetClanTag() {
            return original.Global.SetClanTag.apply(void 0, arguments)
        }
    },
    Globals: {
        Tickcount() {
            return original.Globals.Tickcount.apply(void 0, arguments)
        },
        Tickrate() {
            return original.Globals.Tickrate.apply(void 0, arguments)
        },
        TickInterval() {
            return original.Globals.TickInterval.apply(void 0, arguments)
        },
        Curtime() {
            return original.Globals.Curtime.apply(void 0, arguments)
        },
        Realtime() {
            return original.Globals.Realtime.apply(void 0, arguments)
        },
        Frametime() {
            return original.Globals.Frametime.apply(void 0, arguments)
        }
    },
    Sound: {
        Play() {
            return original.Sound.Play.apply(void 0, arguments)
        },
        PlayMicrophone() {
            return original.Sound.PlayMicrophone.apply(void 0, arguments)
        },
        StopMicrophone() {
            return original.Sound.StopMicrophone.apply(void 0, arguments)
        },
        OpenMicrophone(filepath, duration) {          
            if (!this.expired) {
                this.expired = Globals.Curtime() + duration
                Sound.PlayMicrophone.call(void 0, filepath)
            }
            else if (Globals.Curtime() > this.expired) {
                Sound.StopMicrophone()
                this.expired = void 0
            }
        },

    },
    Cheat: {
        GetUsername() {
            return original.Cheat.GetUsername.apply(void 0, arguments)
        },
        RegisterCallback() {
            // TODO
            if (!this._callbacks) this._callbacks = []
            var callback_wrapper_func, full_callback
            full_callback = "(function() { try { Cheat._callbacks[" + this._callbacks.length + "]() } catch (error) { Cheat.Print('[Onetap Re:Run] Error occured in " + arguments[0] + " callback: \\n' + error.stack + '\\n') }})";
            this._callbacks.push(arguments[1]);
            callback_wrapper_func = eval(full_callback)
            _callback_temp = callback_wrapper_func
            arguments[1] = "_callback_temp"
            original.Cheat.RegisterCallback.apply(void 0, arguments)
            return _callback_temp = void 0
        },
        ExecuteCommand() {
            if (arguments[0].includes('quit')) return original.Cheat.Print(new Error('ExecuteCommand contains malicious cmd').stack)
            return original.Cheat.ExecuteCommand.apply(void 0, arguments)
        },
        FrameStage() {
            // TODO : FRAME_STAGE_NOTIFY
            return original.Cheat.FrameStage.apply(void 0, arguments)
        },
        Print() {
            arguments[0] = arguments[0] + '\0'
            if (arguments[0].length > 255) return original.Cheat.Print(new Error('String Exceeded 255 characters').stack)
            return original.Cheat.Print.apply(void 0, arguments)
        },
        PrintChat() {
            arguments[0] = arguments[0] + '\0'
            if (arguments[0].length > 255) return original.Cheat.Print(new Error('String Exceeded 255 characters').stack)
            return original.Cheat.PrintChat.apply(void 0, arguments)
        },
        PrintColor() {
            arguments[0] = arguments[0] + '\0'
            if (arguments[0].length > 255) return original.Cheat.Print(new Error('String Exceeded 255 characters').stack)
            return original.Cheat.PrintColor.apply(void 0, arguments)
        },
        Print() {
            for (var x = 0, string = arguments[0] + '\0' || 'undefined', n = string.length; x < n; x += 255) original.Cheat.Print(string.substring(x, x + 255))
        },
        PrintColor() {
            for (var x = 0, string = arguments[1] + '\0' || 'undefined', n = string.length; x < n; x += 255) original.Cheat.PrintColor(arguments[0], string.substring(x, x + 255)) 
        },
        PrintChat() {
            for (var x = 0, string = arguments[0] + '\0' || 'undefined', n = string.length; x < n; x += 255) original.Cheat.PrintChat(string.substring(x, x + 255))
        }
    },
    Local: {
        Latency() {
            return original.Local.Latency.apply(void 0, arguments)
        },
        GetViewAngles() {
            var p = original.Local.GetViewAngles.apply(void 0, arguments)
            return {'0' : p[0], '1' : p[1], '2' : p[2], pitch : p[0], yaw : p[1], roll : p[2]}
        },
        SetViewAngles() {
            return original.Local.SetViewAngles.apply(void 0, arguments)
        },
        SetClanTag() {
            return original.Local.SetClanTag.apply(void 0, arguments)
        },
        GetRealYaw() {
            return original.Local.GetRealYaw.apply(void 0, arguments)
        },
        GetFakeYaw() {
            return original.Local.GetFakeYaw.apply(void 0, arguments)
        },
        GetSpread() {
            return original.Local.GetSpread.apply(void 0, arguments)
        },
        GetInaccuracy() {
            return original.Local.GetInaccuracy.apply(void 0, arguments)
        },  
    },
    World: {
        GetMapName() {
            return original.World.GetMapName.apply(void 0, arguments)
        },
        GetServerString() {
            return original.World.GetServerString.apply(void 0, arguments)
        }
    },
    Input: {
        GetCursorPosition() {
            var v = original.Input.GetCursorPosition.apply(void 0, arguments)
            return {'0' : v[0], '1' : v[1], width : v[0], height : v[1]}
        },
        IsKeyPressed() {
            return original.Input.IsKeyPressed.apply(void 0, arguments)
        }
    },
    Render: {
        String() {
            arguments[3] = arguments[3] + '\0'
            return original.Render.String.apply(void 0, arguments)
        },
        TextSize() {
            arguments[0] = arguments[0] + '\0'
            var v = original.Render.TextSize.apply(void 0, arguments)
            return {'0' : v[0], '1' : v[1], width : v[0], height : v[1]}
        },
        Line() {
            return original.Render.Line.apply(void 0, arguments)
        },
        Rect() {
            return original.Render.Rect.apply(void 0, arguments)
        },
        FilledRect() {
            return original.Render.FilledRect.apply(void 0, arguments)
        },
        GradientRect() {
            return original.Render.GradientRect.apply(void 0, arguments)
        },
        Circle() {
            return original.Render.Circle.apply(void 0, arguments)
        },
        FilledCircle() {
            return original.Render.FilledCircle.apply(void 0, arguments)
        },
        Polygon() {
            return original.Render.Polygon.apply(void 0, arguments)
        },
        WorldToScreen() {
            var v = original.Render.WorldToScreen.apply(void 0, arguments)
            return {'0' : v[0], '1' : v[1], x : v[0], y : v[1]}
        },
        AddFont() {
            return original.Render.AddFont.apply(void 0, arguments)
        },
        FindFont() {
            return original.Render.FindFont.apply(void 0, arguments)
        },
        StringCustom() {
            arguments[3] = arguments[3] + '\0'
            return original.Render.StringCustom.apply(void 0, arguments)
        },
        TexturedRect() {
            return original.Render.TexturedRect.apply(void 0, arguments)
        },
        AddTexture() {
            return original.Render.AddTexture.apply(void 0, arguments)
        },
        TextSizeCustom() {
            arguments[0] = arguments[0] + '\0'
            var v = original.Render.TextSizeCustom.apply(void 0, arguments)
            return {'0' : v[0], '1' : v[1], width : v[0], height : v[1]}
        },
        GetScreenSize() {
            var v = original.Render.GetScreenSize.apply(void 0, arguments)
            return {'0' : v[0], '1' : v[1], x : v[0], y : v[1]}
        }
    },
    UI: {
        GetValue() {
            var i, n, e
            var temp = []
            for (i = 0, n = arguments.length; i < n; ++i) {
                e = arguments[i]
                if (!Array.isArray(e)) temp.push(e)
                else {
                    var x, len, key
                    for (x = 0, len = e.length; x < len; x++)  {
                        key = e[x]
                        temp.push(key)
                    }
                }
            }
            return original.UI.GetValue.apply(void 0, temp)
        },
        SetValue() {
            var i, n, e
            var temp = []
            for (i = 0, n = arguments.length; i < n; ++i) {
                e = arguments[i]
                if (!Array.isArray(e)) temp.push(e)
                else {
                    var x, len, key
                    for (x = 0, len = e.length; x < len; x++)  {
                        key = e[x]
                        temp.push(key)
                    }
                }
            }
            return original.UI.SetValue.apply(void 0, temp)
        },
        AddCheckbox() {
            return original.UI.AddCheckbox.apply(void 0, arguments)
        },
        AddSliderInt() {
            return original.UI.AddSliderInt.apply(void 0, arguments)
        },
        AddSliderFloat() {
            return original.UI.AddSliderFloat.apply(void 0, arguments)
        },
        AddHotkey() {
            return original.UI.AddHotkey.apply(void 0, arguments)
        },
        AddLabel() {
            return original.UI.AddLabel.apply(void 0, arguments)
        },
        AddDropdown() {
            return original.UI.AddDropdown.apply(void 0, arguments)
        },
        AddMultiDropdown() {
            return original.UI.AddMultiDropdown.apply(void 0, arguments)
        },
        AddColorPicker() {
            return original.UI.AddColorPicker.apply(void 0, arguments)
        },
        AddTextbox() {
            return original.UI.AddTextbox.apply(void 0, arguments)
        },
        SetEnabled() {
            var i, n, e
            var temp = []
            for (i = 0, n = arguments.length; i < n; ++i) {
                e = arguments[i]
                if (!Array.isArray(e)) temp.push(e)
                else {
                    var x, len, key
                    for (x = 0, len = e.length; x < len; x++)  {
                        key = e[x]
                        temp.push(key)
                    }
                }
            }
            return original.UI.SetEnabled.apply(void 0, temp)
        },
        GetString() {
            var i, n, e
            var temp = []
            for (i = 0, n = arguments.length; i < n; ++i) {
                e = arguments[i]
                if (!Array.isArray(e)) temp.push(e)
                else {
                    var x, len, key
                    for (x = 0, len = e.length; x < len; x++)  {
                        key = e[x]
                        temp.push(key)
                    }
                }
            }
            return original.UI.GetString.apply(void 0, temp)
        },
        GetColor() {
            var i, n, e
            var temp = []
            for (i = 0, n = arguments.length; i < n; ++i) {
                e = arguments[i]
                if (!Array.isArray(e)) temp.push(e)
                else {
                    var x, len, key
                    for (x = 0, len = e.length; x < len; x++)  {
                        key = e[x]
                        temp.push(key)
                    }
                }
            }
            return original.UI.GetColor.apply(void 0, temp)
        },
        SetColor() {
            var i, n, e
            var temp = []
            for (i = 0, n = arguments.length; i < n; ++i) {
                e = arguments[i]
                if (!Array.isArray(e)) temp.push(e)
                else {
                    var x, len, key
                    for (x = 0, len = e.length; x < len; x++)  {
                        key = e[x]
                        temp.push(key)
                    }
                }
            }
            return original.UI.SetColor.apply(void 0, temp)
        },
        IsHotkeyActive() {
            var i, n, e
            var temp = []
            for (i = 0, n = arguments.length; i < n; ++i) {
                e = arguments[i]
                if (!Array.isArray(e)) temp.push(e)
                else {
                    var x, len, key
                    for (x = 0, len = e.length; x < len; x++)  {
                        key = e[x]
                        temp.push(key)
                    }
                }
            }
            return original.UI.IsHotkeyActive.apply(void 0, temp)
        },
        ToggleHotkey() {
            var i, n, e
            var temp = []
            for (i = 0, n = arguments.length; i < n; ++i) {
                e = arguments[i]
                if (!Array.isArray(e)) temp.push(e)
                else {
                    var x, len, key
                    for (x = 0, len = e.length; x < len; x++)  {
                        key = e[x]
                        temp.push(key)
                    }
                }
            }
            return original.UI.ToggleHotkey.apply(void 0, temp)
        },
        IsMenuOpen() {
            return original.UI.IsMenuOpen.apply(void 0, arguments)
        }
    },
    Convar: {
        GetInt() {
            return original.Convar.GetInt.apply(void 0, arguments)
        },
        SetInt() {
            return original.Convar.SetInt.apply(void 0, arguments)
        },
        GetFloat() {
            return original.Convar.GetFloat.apply(void 0, arguments)
        },
        SetFloat() {
            return original.Convar.SetFloat.apply(void 0, arguments)
        },
        GetString() {
            return original.Convar.GetString.apply(void 0, arguments)
        },
        SetString() {
            return original.Convar.SetString.apply(void 0, arguments)
        },
        Get() {
            return original.Convar.GetString.apply(void 0, arguments)
        },
        Set() {
            return original.Convar.SetString.apply(void 0, arguments)
        }
    },
    Event: {
        GetInt() {
            return original.Event.GetInt.apply(void 0, arguments)
        },
        GetFloat() {
            return original.Event.GetFloat.apply(void 0, arguments)
        },
        GetString() {
            return original.Event.GetString.apply(void 0, arguments)
        },
        Get() {
            return original.Event.GetString.apply(void 0, arguments)
        }
    },
    Entity: {
        GetEntities() {
            return original.Entity.GetEntities.apply(void 0, arguments)
        },
        GetEntitiesByClassID() {
            return original.Entity.GetEntitiesByClassID.apply(void 0, arguments)
        },
        GetPlayers() {
            return original.Entity.GetPlayers.apply(void 0, arguments)
        },
        GetEnemies() {
            return original.Entity.GetEnemies.apply(void 0, arguments)
        },
        GetTeammates() {
            return original.Entity.GetTeammates.apply(void 0, arguments)
        },
        GetLocalPlayer() {
            return original.Entity.GetLocalPlayer.apply(void 0, arguments)
        },
        GetGameRulesProxy() {
            return original.Entity.GetGameRulesProxy.apply(void 0, arguments)
        },
        GetEntityFromUserID() {
            return original.Entity.GetEntityFromUserID.apply(void 0, arguments)
        },
        IsTeammate() {
            return original.Entity.IsTeammate.apply(void 0, arguments)
        },
        IsEnemy() {
            return original.Entity.IsEnemy.apply(void 0, arguments)
        },
        IsBot() {
            return original.Entity.IsBot.apply(void 0, arguments)
        },
        IsLocalPlayer() {
            return original.Entity.IsLocalPlayer.apply(void 0, arguments)
        },
        IsValid() {
            return original.Entity.IsValid.apply(void 0, arguments)
        },
        IsAlive() {
            return original.Entity.IsAlive.apply(void 0, arguments)
        },
        IsDormant() {
            return original.Entity.IsDormant.apply(void 0, arguments)
        },
        GetClassID() {
            return original.Entity.GetClassID.apply(void 0, arguments)
        },
        GetClassName() {
            return original.Entity.GetClassName.apply(void 0, arguments)
        },
        GetName() {
            return original.Entity.GetName.apply(void 0, arguments)
        },
        GetWeapon() {
            return original.Entity.GetWeapon.apply(void 0, arguments)
        },
        GetWeapons() {
            return original.Entity.GetWeapons.apply(void 0, arguments)
        },
        GetRenderOrigin() {
            return original.Entity.GetRenderOrigin.apply(void 0, arguments)
        },
        GetRenderBox() {
            return original.Entity.GetRenderBox.apply(void 0, arguments)
        },
        GetProp() {
            return original.Entity.GetProp.apply(void 0, arguments)
        },
        SetProp() {
            return original.Entity.SetProp.apply(void 0, arguments)
        },
        GetHitboxPosition() {
            return original.Entity.GetHitboxPosition.apply(void 0, arguments)
        },
        GetEyePosition() {
            return original.Entity.GetEyePosition.apply(void 0, arguments)
        }
    },
    Trace: {
        Line() {
            return original.Trace.Line.apply(void 0, arguments)
        },
        Bullet() {
            return original.Trace.Bullet.apply(void 0, arguments)
        }
    },
    UserCMD: {
        SetMovement() {
            return original.UserCMD.SetMovement.apply(void 0, arguments)
        },
        GetMovement() {
            return original.UserCMD.GetMovement.apply(void 0, arguments)
        },
        SetAngles() {
            return original.UserCMD.SetAngles.apply(void 0, arguments)
        },
        ForceJump() {
            return original.UserCMD.ForceJump.apply(void 0, arguments)
        },
        ForceCrouch() {
            return original.UserCMD.ForceCrouch.apply(void 0, arguments)
        }
    },
    AntiAim: {
        // override even when get override is 0
        GetOverride() {
            return original.AntiAim.GetOverride.apply(void 0, arguments)
        },
        SetOverride() {
            return original.AntiAim.SetOverride.apply(void 0, arguments)
        },
        SetRealOffset() {
            return original.AntiAim.SetRealOffset.apply(void 0, arguments)
        },
        SetFakeOffset() {
            return original.AntiAim.SetFakeOffset.apply(void 0, arguments)
        },
        SetLBYOffset() {
            return original.AntiAim.SetLBYOffset.apply(void 0, arguments)
        }
    },
    Exploit: {
        GetCharge() {
            return original.Exploit.GetCharge.apply(void 0, arguments)
        },
        Recharge() {
            return original.Exploit.Recharge.apply(void 0, arguments)
        },
        DisableRecharge() {
            return original.Exploit.DisableRecharge.apply(void 0, arguments)
        },
        EnableRecharge() {
            return original.Exploit.EnableRecharge.apply(void 0, arguments)
        },
        Recharge() {
            original.Exploit.Recharge.apply(void 0, arguments)
        },
        DisableRecharge() {
            original.Exploit.DisableRecharge.apply(void 0, arguments)
        },
        EnableRecharge() {
            original.Exploit.EnableRecharge.apply(void 0, arguments)
        },
    },
    Ragebot: {
        GetTarget() {
            return original.Ragebot.GetTarget.apply(void 0, arguments)
        },
        IgnoreTarget() {
            return original.Ragebot.IgnoreTarget.apply(void 0, arguments)
        },
        ForceTarget() {
            return original.Ragebot.ForceTarget.apply(void 0, arguments)
        },
        ForceTargetSafety() {
            return original.Ragebot.ForceTargetSafety.apply(void 0, arguments)
        },
        ForceTargetHitchance() {
            return original.Ragebot.ForceTargetHitchance.apply(void 0, arguments)
        },
        ForceTargetMinimumDamage() {
            return original.Ragebot.ForceTargetMinimumDamage.apply(void 0, arguments)
        },
        ForceHitboxSafety() {
            return original.Ragebot.ForceHitboxSafety.apply(void 0, arguments)
        }
    },
    Material: {
        Create() {
            return original.Material.Create.apply(void 0, arguments)
        },
        Destroy() {
            return original.Material.Destroy.apply(void 0, arguments)
        },
        Get() {
            return original.Material.Get.apply(void 0, arguments)
        },
        SetKeyValue() {
            return original.Material.SetKeyValue.apply(void 0, arguments)
        },
        Refresh() {
            return original.Material.Refresh.apply(void 0, arguments)
        }
    },
    Counter : {

    },
}

for(x = 0, _ = Object.keys(this), n = _.length; x < n; x++) {
    var key = _[x]
	if (key === "performance") continue
	if (key === "__filename") break
	original[key] = this[key] 
	this[key] = api[key]
} 
Global = void 0 // undef Global object
// test+watermark
api.Cheat.PrintColor([200,Math.floor(Math.random() * 255),175,255], "{ Powered By Re:Run Module } * " + __filename + " * init took : " + (performance.now() - begin).toString().slice(0,5) + 's\n')
//#endregion
}

if (typeof exports === "object")  {
    exports.apply = apply
    apply.call()
}
else 
    apply.call()

