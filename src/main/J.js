const jupData = [
    {
        desc: 'Increase J OBTAINING� base by 1',
        cost: () => D(10).pow(data.jup[0]),
        effect: () => D(1).times(data.jup[0])
    },
    {
        desc: 'Increase J OBTAINING� base by 10',
        cost: () => D(data.jup[1].plus(1)).times(D(10).pow(data.jup[1])).plus(9),
        effect: () => D(10).times(data.jup[1])
    },
    {
        desc: 'Double J OBTAINING�',
        cost: () => D(data.jup[2].plus(1)).times(D(20).pow(data.jup[2])).plus(99),
        effect: () => D(2).pow(data.jup[2])
    },
    {
        desc: 'SPLIT<br>Raise <b>J</b> gain to the 2nd Power but Half the Reset Bulk Amounts, Square Root the 4th Reset\'s Effect, Reset <b>J</b>, and REM�VE "Number"',
        cost: () => D(data.jup[3].plus(1)).times(D(100).pow(data.jup[3].pow(3))).plus(9999).pow(Decimal.max(1, D(100).times(Decimal.floor(data.jup[3].div(9))))),
        effect: () => data.slowdown ? D(1) : D(2).pow(data.jup[3])
    },
]

function initJUPS(){
    for (let i = 0; i < jupData.length; i++) {
        let container = i === 3 ? DOM('splitContainer') : DOM('jContainer')
        let el = document.createElement('button')
        el.className = 'jButton'
        el.id = `jup${i}`
        el.innerHTML = data.slowdown ? 'Forgotten.' : `${jupData[i].desc} ${i === 3 ? '' : `but REM�VE "Number"`}<br>Cost: ${format(jupData[i].cost())} J`
        el.addEventListener("click", ()=>buyJUP(i))
        if(i === 3){
            el.style.width = '40rem'
            el.style.height = '7rem'
        }
        container.append(el)
    }
    DOM(`jAuto`).innerHTML = `Automatically Purchase all <b>J</b> OBTAINING� without REM�VE "Number"<br>[${formatBool(data.jAuto, 'ED')}]`
    DOM(`splitAuto`).innerHTML = `Automatically SPLIT<br>[${formatBool(data.splitAuto, 'ED')}]`
}

function updateJHTML(){
    if(data.slowdown) DOM(`slowdown`).innerText = `Eternity Awaits.`
    DOM(`jNav`).innerText = data.slowdown ? `LOST` : `The J`
    DOM(`j`).innerHTML = data.slowdown ? `The Singularity Pushes Onwards to Infinity.`
        : `YOU HAVE <span style="font-size: 1.5rem">${format(data.j)}</span> J${data.jup[3].gt(0) ? `/${formatWhole(data.jup[3].plus(1))}` : ''}.<br><span style="font-size: 1rem; font-family: DosisLight">You are OBTAINING� ${format(jGain())}/s</span>`
}
function updateJUPHTML(i){
    DOM(`jup${i}`).innerHTML = data.slowdown ? 'Forgotten.' : `${jupData[i].desc} ${i === 3 ? '' : `but REM�VE "Number"`}<br>Cost: ${format(jupData[i].cost())} J`
}

function buyJUP(i){
    if(data.j.lt(jupData[i].cost())) return
    removeNumber()

    i === 3 ? data.j = D(1) : data.j = data.j.sub(jupData[i].cost())
    data.jup[i] = data.jup[i].plus(D(1))

    updateJUPHTML(i)
}

function toggleJAuto(){
    data.jAuto = !data.jAuto
    DOM(`jAuto`).innerHTML = `Automatically Purchase all <b>J</b> OBTAINING� without REM�VE "Number"<br>[${formatBool(data.jAuto, 'ED')}]`
}
function toggleSplitAuto(){
    data.splitAuto = !data.splitAuto
    DOM(`splitAuto`).innerHTML = `Automatically SPLIT<br>[${formatBool(data.splitAuto, 'ED')}]`
}

function automateJUP(i){
    if(data.jAuto && data.j.gte(jupData[i].cost())){
        data.jup[i] = data.jup[i].plus(D(1).plus(tubeMilestones[4].effect2()))
        updateJUPHTML(i)
    }
}

function automateSplits(){
    if(data.slowdown) return
    if(data.splitAuto){
        if(data.infinityTubes > 4){
            data.jup[3] = data.jup[3].plus(D(2).pow(getResetEffect(4)))
            return updateJUPHTML(3)
        }
        buyJUP(3)
    }
}

function automateJResets(){
    if(data.slowdown) return
    for (let i = 0; i < jupData.length-1; i++) {
        automateJUP(i)
    }
}

function checkJAutos(){
    DOM(`jAuto`).style.display = isXUnlocked('jAuto') ? 'block' : 'none'
    DOM(`splitAuto`).style.display = isXUnlocked('splitAuto') ? 'block' : 'none'
}

function removeNumber(){
    for (let i = 0; i < resetData.length; i++) {
        data.resets[i] = D(0)
        updateResetHTML(i)
    }
    data.number = D(0)
    data.numberRemoved = data.numberRemoved.plus(1)
}

let jGain = () => jupData[0].effect().plus(jupData[1].effect()).times(jupData[2].effect()).pow(jupData[3].effect())


