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
        DOM(`slowdownNav`).style.display = isXUnlocked('slowdownNav') ? 'block' : 'none'
        DOM(`endNav`).style.display = isXUnlocked('endNav') ? 'block' : 'none'
        checkJAutos()

        //Initialize all Tabs
        initResets()
        initTubeHTML()
        initAutos()
        initJUPS()
    }
}