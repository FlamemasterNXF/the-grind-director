function switchTab(tab){
    data.nav.last = data.nav.current
    data.nav.current = tab
    DOM(`${data.nav.last}Page`).style.display = 'none'
    DOM(`${tab}Page`).style.display = 'flex'
}


let mainTab = "reset"
let finiteTab = "finite"
let settingsTab = "saving"

function switchSubtab(t, mode){
    if(!isTabUnlocked(t)) return

    // Special Main Rules
    if(mode === "main"){
        DOM(`${mainTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`
        mainTab = t
    }

    // Special Finite Rules
    if(mode === "finite"){
        DOM(`${finiteTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`
        finiteTab = t
    }

    // Special Settings Rules
    if(mode === "settings"){
        DOM(`${settingsTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`
        settingsTab = t
    }
}

function isTabUnlocked(t){
    switch (t) {
        case '': return true

        default: return true
    }
}