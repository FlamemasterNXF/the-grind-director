function slowdown(){
    data.slowdown = true
    data.j = D(0)

    updateResetHTML(4)
    for (let i = 0; i < jupData.length; i++) {
        updateJUPHTML(i)
    }
    checkJAutos()
}