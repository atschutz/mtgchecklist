const container = document.querySelector('#listcontainer')
const textbox = document.querySelector('#decklist')
const button = document.querySelector('#getlistbutton')
const template = document.querySelector('#checkboxtemplate')

textbox.addEventListener('click', () => {
    if (textbox.value == textbox.innerHTML) {
        textbox.value = ''
    }
})

button.addEventListener('click', () => {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let cardList = textbox.value.split('\n')

    cardList.forEach((card, index) => {
        card = card.trim()

        if (card !== ''){
            let clone = document.importNode(template.content, true)
            let label = clone.querySelector('label')
            let checkbox = clone.querySelector('input[type=checkbox]')
            
            label.htmlFor = 'cb' + index
            label.innerHTML = card

            checkbox.name = 'cb' + index

            console.log(label)
            console.log(checkbox)

            container.appendChild(clone)
        }
    })

    textbox.value = textbox.innerHTML

    progressBarListener()
})