function initAutos(){
    const container = DOM('automationContainer')
    for (let i = 0; i < resetData.length; i++) {
        let el = document.createElement('button')
        el.className = 'auto'
        el.id = `auto${i}`
        el.innerText = `Automatically perform Reset ${i+1}s without Resetting anything\n[${formatBool(data.autoEnabled[i], 'ED')}]`
        el.addEventListener("click", ()=>toggleAuto(i))
        el.style.display = isXUnlocked(`auto${i}`) ? 'block' : 'none'
        container.append(el)
    }
}

function toggleAuto(i){
    data.autoEnabled[i] = !data.autoEnabled[i]
    DOM(`auto${i}`).innerText = `Automatically perform Reset ${i+1}s without Resetting anything\n[${formatBool(data.autoEnabled[i], 'ED')}]`
}

function automateReset(i){
    if(data.autoEnabled[i] && resetData[i].currency().gte(getResetCost(i))){
        data.resets[i] = data.resets[i].plus(D(1))
        updateResetHTML(i)
    }
}

function automateAllResets(){
    for (let i = 0; i < resetData.length; i++) {
        automateReset(i)
    }
}
