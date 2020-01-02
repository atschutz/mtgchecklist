const checkBoxes = document.querySelectorAll('input[type=checkbox]')
const progressBar = document.getElementById('progressbar')
const progressLabel = document.getElementById('progresslabel')

checkBoxes.forEach(box => {
    box.addEventListener('change', () => {
        let checked = document.querySelectorAll('input:checked')
        let percent = Math.round(checked.length / checkBoxes.length * 100)
        progressBar.style.width = percent + '%'
        progressLabel.innerHTML = percent + '% Complete'
    })
})