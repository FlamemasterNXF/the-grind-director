const controls = {
    "m": { pressed: false },
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    let uppercase = event.key.toUpperCase()
    if (controls[key] || controls[uppercase]) {
        controls[key].pressed = true;
    }
}, false);
document.addEventListener('keyup', (event) => {
    let key = event.key;
    let uppercase = event.key.toUpperCase()
    if (controls[key] || controls[uppercase]) {
        controls[key].pressed = false;
    }
}, false);
