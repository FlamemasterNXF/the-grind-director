//Important Constants for Loading
const TABS = ["main", "finite", "settings"]

const uHTML = {
    update(){
        updateNumberHTML()
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

        //Initialize all Tabs
        initResets()
        initTubeHTML()
        initAutos()
    }
}