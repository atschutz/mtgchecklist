function progressBarListener(){
    const progressBar = document.querySelector('#progressbar')
    const progressLabel = document.querySelector('#progresslabel')
    const checkBoxes = document.querySelectorAll('input[type=checkbox]')

    progressBar.style.width = '0%'
    progressLabel.innerHTML = '0% Complete'

    checkBoxes.forEach((box) => {
        box.addEventListener('change', () => {
            const checked = document.querySelectorAll('input:checked')
            const label = document.querySelector('label[for=' + box.name + ']')
            const percent = Math.round(checked.length / checkBoxes.length * 100)
    
            progressBar.style.width = percent + '%'
            progressLabel.innerHTML = percent + '% Complete'
    
            if (box.checked) {
                label.style.setProperty('text-decoration', 'line-through')
            } else {
                label.style.setProperty('text-decoration', '')
            }
        })
    })
}