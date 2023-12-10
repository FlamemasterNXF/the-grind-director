let tubeMilestones = [
    {
        req: 1e97,
        currency: () => data.number,
        effect: () => 3,
        desc: 'Raise Number gain to the 3rd Power',
        currencyName: 'Number'
    },
    {
        req: 7,
        currency: () => data.resets[2],
        effect: () => data.resets[0].plus(1).pow(getResetEffect(3)),
        desc: 'You may now Bulk Automate Reset 2 if you can afford at least one Reset 2, and each Reset 1 increases the Reset 2 Bulk Automate Amount by 1',
        currencyName: 'Reset 3'
    },
    {
        req: D("ee27393100"),
        currency: () => data.number,
        effect: () => D("e1e100").pow(data.resets[2]),
        desc: 'Reset 3 now raises Number gain to the e1e100th power',
        currencyName: 'Number'
    },
    {
        req: D("eee1e308"),
        currency: () => data.number,
        effect: () => 2,
        desc: 'Unlock the J',
        currencyName: 'Number'
    },
    {
        req: Infinity,
        currency: () => data.number,
        effect: () => 2,
        desc: '???',
        currencyName: '???'
    },
]

function initTubeHTML() {
    const container = DOM('tubeMilestoneContainer')
    for (let i = 0; i < tubeMilestones.length; i++) {
        let el = document.createElement('t')
        el.className = 'tubeMilestone'
        el.id = `tubeMilestone${i}`
        el.innerText = `Upon your ${i+1}${i===0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} Entry: ${tubeMilestones[i].desc}`
        el.style.color = data.infinityTubes > i ? 'darkgoldenrod' : 'gray'
        container.append(el)
    }
    updateInfinityTubeHTML()
}

function updateInfinityTubeHTML(){
    DOM(`tubeButton`).innerHTML = `<b>ENTER THE INFINITY TUBE</b><br>Reset all of your Resets and your Number in pursuit of Infinity.<br>Requires ${format(tubeMilestones[data.infinityTubes].req)} ${tubeMilestones[data.infinityTubes].currencyName}`
    DOM(`tubes`).innerText = `You have Entered the Infinity Tube ${data.infinityTubes} Times`
}

function enterInfinityTube(){
    if(tubeMilestones[data.infinityTubes].currency().lt(tubeMilestones[data.infinityTubes].req)) return
    for (let i = 0; i < resetData.length; i++) {
        data.resets[i] = D(0)
        updateResetHTML(i)
    }
    data.number = D(0)
    ++data.infinityTubes

    DOM(`tubeMilestone${data.infinityTubes-1}`).style.color = 'darkgoldenrod'
    updateInfinityTubeHTML()
}

let getInfinityTubeEffect = (i) => data.infinityTubes > i ? tubeMilestones[i].effect() : 1