//Important Constants for Loading
const TABS = ["main", "finite", "settings"]

const uHTML = {
    update(){
        updateNumberHTML()
        updateJHTML()
        reveal()
    },
    load(){
        //Load Tab Displays
        for (let i = 0; i < TABS.length; i++) {
            DOM(`${TABS[i]}Page`).style.display = 'none'
        }
        switchTab('main')

        //Show and Hide things, based on data
        DOM(`finiteNav`).style.display = isXUnlocked('finiteNav') ? 'block' : 'none'
        DOM(`jNav`).style.display = isXUnlocked('jNav') ? 'block' : 'none'
        DOM(`jAuto`).style.display = isXUnlocked('jAuto') ? 'block' : 'none'
        DOM(`splitAuto`).style.display = isXUnlocked('splitAuto') ? 'block' : 'none'

        //Initialize all Tabs
        initResets()
        initTubeHTML()
        initAutos()
        initJUPS()
    }
}