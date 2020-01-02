const checkBoxes = document.querySelectorAll('input[type=checkbox]')
const progressBar = document.querySelector('#progressbar')
const progressLabel = document.querySelector('#progresslabel')

checkBoxes.forEach(box => {
    box.addEventListener('change', () => {
        const checked = document.querySelectorAll('input:checked')
        const percent = Math.round(checked.length / checkBoxes.length * 100)
        const label = document.querySelector('label[for=' + box.name + ']')

        progressBar.style.width = percent + '%'
        progressLabel.innerHTML = percent + '% Complete'

        if (box.checked) {
            label.style.setProperty('text-decoration', 'line-through')
        } else {
            label.style.setProperty('text-decoration', '')
        }
    })
})