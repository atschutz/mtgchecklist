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
    while(errorMessage.firstChild) {
        errorMessage.removeChild(errorMessage.firstChild);
    }

    // clear any potentially existing errors
    errorMessage.style.display = "none"
    errorMessage.innerHTML = "The following cards could not be found:"

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
        if (res.status === 404)
        {
            if (errorMessage.style.display = "none") errorMessage.style.display = "block"

            let node = document.createElement("LI");
            let textnode = document.createTextNode(cardName);
            
            node.appendChild(textnode);                             
            errorMessage.appendChild(node); 
        } else if (res.status !== 400) {
            name = res.name

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