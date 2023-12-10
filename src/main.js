function mainLoop() {
    // Calculate diff and usableDiff
    if(data.lastTick === 0) data.lastTick = Date.now()
    let diff = data.offline ? Math.max((Date.now() - data.lastTick), 0) : 50
    // Used for Offline Progress
    let uDiff = diff/1000
    if(isNaN(uDiff)) uDiff = 50/1000

    data.number = data.number.plus(numberGain().times(uDiff))
    automateAllResets()

    // Check for hotkey usage
    //if (controls["m"].pressed) something()

    // Update HTML
    uHTML.update()
}


window.onload = function () {
    let extra = false
    try { extra = load() } catch(e){ console.log('New Save!\nIf you\'re seeing this, welcome :)') }
    console.log(extra)
    uHTML.load()

    if(extra) fixOldSavesP2()
}

window.setInterval(function () {
    mainLoop()
}, 50);
