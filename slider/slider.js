document.querySelector('#slider').addEventListener('input', e => {
    const position = e.target.value
    document.querySelector('.fg-img').style.setProperty('width', `${position}%`)
    document.querySelector('.slider-handle').style.setProperty('left', `${position}%`)
})