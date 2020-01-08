const container = document.querySelector('#listcontainer')
const textbox = document.querySelector('#decklist')
const button = document.querySelector('#getlistbutton')
const template = document.querySelector('#checkboxtemplate')
const errorMessage = document.querySelector('#errormessage')

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
        getCardData(card, index)
    })

    textbox.value = textbox.innerHTML

    progressBarListener()
})

//get card data
function getCardData(cardName, id){
    const base = 'https://api.scryfall.com'
    const api = '/cards/named?fuzzy='
    let name = ""

    fetch(base + api + cardName.replace(/\s/g, "+"))
    .then(res => {
        return res.json()
    })
    .then(res => {
        //res is now a json!
        if (res.status === 404)
        {
            console.log(cardName + " not a card in getCardData")

            errorMessage.style.display = "block"

            let node = document.createElement("LI");
            let textnode = document.createTextNode(cardName);
            
            node.appendChild(textnode);                             
            errorMessage.appendChild(node); 
        } else {
            name = res.name

            console.log("we have " + name)

            let clone = document.importNode(template.content, true)
            let label = clone.querySelector('label')
            let checkbox = clone.querySelector('input[type=checkbox]')
            
            // give "for" for this label a unique id
            label.htmlFor = 'cb' + id

            // set label to card name
            label.innerHTML = name

            // give this checkbox a name that matches its label
            checkbox.name = 'cb' + id

            container.appendChild(clone)
        }
    })
    .catch(e => {
        //error handling
        console.log(e)
    })
}