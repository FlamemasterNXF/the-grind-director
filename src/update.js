//Important Constants for Loading
const TABS = ["main", "settings"]

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

        //Initialize all Tabs
        initResets()
    }
}