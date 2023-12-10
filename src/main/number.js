function updateNumberHTML(){
    DOM(`number`).innerHTML = `Your Number is <span style="font-size: 1.5rem">${format(data.number)}</span> and is growing by ${format(numberGain())}/s`
}

let numberGain = () => D(10).pow(getResetEffect(0)).pow(getResetEffect(1)).pow(getInfinityTubeEffect(0))
    .pow(getResetEffect(3)).pow(getInfinityTubeEffect(2)).pow(getInfinityTubeEffect(4)).pow(getResetEffect(4))