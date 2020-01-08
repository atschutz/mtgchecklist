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

            container.appendChild(clone)
        }
    })

    textbox.value = textbox.innerHTML

    progressBarListener()
})

//get card data and prices
function getCardData(cardName){
    const base = 'https://api.scryfall.com';
    const api = '/cards/named?fuzzy=';
        
    fetch(base + api + cardName.replace(/\s/g, "+"))
    .then(res => {
        return res.json()
    })
    .then(res => {
        //res is now a json!
        if (res.status === 404)
        {

            throw new Error(item + " doesnt exist")
        } else {
            console.log(res.oracle_text)
        }
    })
    .catch(e => {
        //error handling
        console.log(e)
    })
}