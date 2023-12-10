function reveal(){
    if(data.number >= 1e5 && data.stage === 0){
        fade('reset1')
        ++data.stage
    }
}

function isXUnlocked(t){
    switch (t) {
        case 'reset0': return true
        case 'reset1': return data.stage > 0

        default: return true
    }
}