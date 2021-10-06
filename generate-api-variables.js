try 
{
    // local variables for API functions. 
    Cheat.Print("var ") // :)
    var mainArray = []
    var search = this
    mainArray = Object.keys(search)
    var round_elapsed_time = performance.now()
    for (i = 1; i < mainArray.length; i++) {
        if (performance.now() - round_elapsed_time > 50 || mainArray[i].includes("mainArray") || mainArray[i].includes("search"))
            break
        var v1, v2 = [], n2
        v1 = mainArray[i]
        var type = typeof search[mainArray[i]]
        if (type === "object") {
            var array = Object.getOwnPropertyNames(search[mainArray[i]])
            for (x = 0, len2 = array.length; x < len2; x++) 
                v2.push(array[x])             
        }
        for (x = 0, n2 = v2.length; x < n2; x++) {
            var o = v2[x].replace(/[A-Z]/g, function (m) { return "_" + m.toLowerCase();});
            Cheat.Print(v1.toLowerCase() + o + " = " + v1 + "." + v2[x])
            if (x < n2-1 || i < 18) Cheat.Print(", ") 
            // in otc3, [1] to [18] are the api exports
            // in otv4, idfk
        }
    }
}
catch(e) {  
    Cheat.Print(e.stack + "\n")
    UI.SetValue(__filename, 0)
}
