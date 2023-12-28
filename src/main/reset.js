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
        costExponent: () => D(50).pow(resetData[1].scaling()),
        scaling: () => D(5).pow(Decimal.floor(data.resets[1].div(5))).pow(1/(2**data.resets[2].toNumber())),
        eff: () => D(3).pow(data.resets[1]),
        currency: () => data.number,
        resetDesc: 'Number and Reset 1',
        desc: 'raise Number gain to the 3rd Power',
        costDesc: 'Number'
    },
    {
        costBase: D("1e1000"),
        costExponent: () => D(1000).pow(resetData[2].scaling()),
        scaling: () => D(5).pow(Decimal.floor(data.resets[2].div(2))),
        //eff: () => D(3).pow(data.resets[2]),
        currency: () => data.number,
        resetDesc: 'Number and previous Resets',
        desc: 'Square Root Reset 2\'s Scaling',
        costDesc: 'Number'
    },
    {
        costBase: D("e1e1000"),
        costExponent: () => D("1e100").pow(resetData[3].scaling()),
        scaling: () => D(1e4).pow(Decimal.floor(data.resets[3].div(1))),
        eff: () => D(2).pow(data.resets[3]).pow(getResetEffect(4)).pow(D(1).div(jupData[3].effect())),
        currency: () => data.number,
        resetDesc: 'Number and previous Resets',
        desc: 'Raise the 2nd Infinity Tube Effect and Number to the 2nd Power',
        costDesc: 'Number'
    },
    {
        costBase: D("1e12"),
        costExponent: () => D(1.83).pow(resetData[4].scaling()),
        scaling: () => data.resets[4].gt(9) ? D(7).pow(Decimal.floor(data.resets[4].div(10))) : D(1),
        eff: () => D(2).pow(data.resets[4]),
        currency: () => data.number,
        resetDesc: 'Number and previous Resets',
        desc: 'Raise Number gain and the 4th Reset\'s Effect to the 2nd Power',
        costDesc: 'Number'
    },
]

function initResets(){
    const container = DOM('resetContainer')
    for (let i = 0; i < resetData.length; i++) {
        let el = document.createElement('button')
        el.className = 'reset'
        el.id = `reset${i}`
        el.innerHTML = `Reset ${i+1} [${formatWhole(data.resets[i])}]<br>Reset ${resetData[i].resetDesc} but ${resetData[i].desc}<br>Cost: ${format(getResetCost(i))} ${resetData[i].costDesc}`
        el.addEventListener("click", ()=>reset(i))
        el.style.display = isXUnlocked(`reset${i}`) ? 'block' : 'none'
        container.append(el)
    }
    updateResetHTML(4)
}

function updateResetHTML(i){
    DOM(`reset${i}`).innerHTML = `Reset ${i+1} [${formatWhole(data.resets[i])}]<br>Reset ${resetData[i].resetDesc} but ${resetData[i].desc}<br>Cost: ${format(getResetCost(i))} ${resetData[i].costDesc}`
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

let getResetCost = (i, amt=data.resets[i]) => data.resets[i].gt(0) ? resetData[i].costBase.pow((amt.times(resetData[i].costExponent()))) : resetData[i].costBase
let getResetEffect = (i) => Decimal.max(1, resetData[i].eff())
