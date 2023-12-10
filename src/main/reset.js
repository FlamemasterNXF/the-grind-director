const resetData = [
    {
        costBase: D(10),
        costExponent: () => D(3).pow(resetData[0].scaling()),
        scaling: () => D(5).pow(Decimal.floor(data.resets[0].div(5))),
        eff: () => D(2).pow(data.resets[0]),
        currency: () => data.number,
        resetDesc: 'Number',
        desc: 'raise Number gain to the 2nd Power',
        costDesc: 'Number'
    },
    {
        costBase: D(1e5),
        costExponent: () => D(50),
        eff: () => D(3).pow(data.resets[1]),
        currency: () => data.number,
        resetDesc: 'Number and Reset 1',
        desc: 'raise Number gain to the 3rd Power',
        costDesc: 'Number'
    },
]

function initResets(){
    const container = DOM('resetContainer')
    for (let i = 0; i < resetData.length; i++) {
        let el = document.createElement('button')
        el.className = 'reset'
        el.id = `reset${i}`
        el.innerHTML = `Reset ${i+1} [${data.resets[i]}]<br>Reset ${resetData[i].resetDesc} but ${resetData[i].desc}<br>Cost: ${format(getResetCost(i))} ${resetData[i].costDesc}`
        el.addEventListener("click", ()=>reset(i))
        el.style.display = isXUnlocked(`reset${i}`) ? 'block' : 'none'
        container.append(el)
    }
}

function updateResetHTML(i){
    DOM(`reset${i}`).innerHTML = `Reset ${i+1} [${data.resets[i]}]<br>Reset ${resetData[i].resetDesc} but ${resetData[i].desc}<br>Cost: ${format(getResetCost(i))} ${resetData[i].costDesc}`
}

function reset(n){
    if(resetData[n].currency().lt(getResetCost(n))) return
    if(n > 0){
        for (let i = 0; i < n; i++) {
            data.resets[i] = D(0)
            updateResetHTML(i)
        }
    }

    data.number = D(0)
    data.resets[n] = data.resets[n].plus(1)

    updateResetHTML(n)
}

let getResetCost = (i) => data.resets[i].gt(0) ? resetData[i].costBase.pow((data.resets[i].times(resetData[i].costExponent()))) : resetData[i].costBase
let getResetEffect = (i) => Decimal.max(1, resetData[i].eff())