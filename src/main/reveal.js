function reveal(){
    if(data.number.gte(1e5) && data.stage === 0){
        fade('reset1')
        ++data.stage
    }
    if(data.number.gte(1e97) && data.stage === 1){
        fade('finiteNav')
        ++data.stage
    }
    if(data.number.gte("1e746496") && data.stage === 2){
        fade('reset2')
        fade('auto0')
        ++data.stage
    }
    if(data.resets[1].gte(20) && data.stage === 3){
        fade('auto1')
        ++data.stage
    }
    if(data.resets[2].gte(9) && data.stage === 4){
        fade('auto2')
        fade('reset3')
        ++data.stage
    }
    if(data.resets[3].gte(20) && data.stage === 5){
        fade('auto3')
        ++data.stage
    }
}

function isXUnlocked(t){
    switch (t) {
        case 'reset0': return true
        case 'reset1': return data.stage > 0
        case 'reset2': return data.stage > 2
        case 'reset3': return data.stage > 4

        case 'auto0' : return data.stage > 2
        case 'auto1' : return data.stage > 3
        case 'auto2' : return data.stage > 4
        case 'auto3' : return data.stage > 5

        case 'finiteNav' : return data.stage > 1

        default: return false
    }
}