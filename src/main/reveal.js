function reveal(){
    if(data.number.gte(1e5) && data.stage === 0){
        fade('reset1')
        ++data.stage
    }
    if(data.number.gte(1e97) && data.stage === 1){
        fade('finiteNav')
        ++data.stage
    }
}

function isXUnlocked(t){
    switch (t) {
        case 'reset0': return true
        case 'reset1': return data.stage > 0

        case 'finiteNav' : return data.stage > 1

        default: return true
    }
}