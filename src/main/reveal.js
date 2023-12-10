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
    if(data.infinityTubes > 3 && data.stage === 6){
        fade('jNav')
        ++data.stage
    }
    if(data.jup[3].gt(2) && data.stage === 7){
        fade('jAuto')
        ++data.stage
    }
    if(data.jup[3].gt(48) && data.stage === 8){
        fade('splitAuto')
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

        case 'jAuto' : return data.stage > 7
        case 'splitAuto' : return data.stage > 8

        case 'finiteNav' : return data.stage > 1
        case 'jNav' : return data.stage > 6

        default: return false
    }
}