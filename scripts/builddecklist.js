const container = document.querySelector('#listcontainer')
const textbox = document.querySelector('#decklist')
const button = document.querySelector('#getlistbutton')
const errorMessage = document.querySelector('#errormessage')
const checkboxTemplate = document.querySelector('#checkboxtemplate')
const typeContainerTemplate = document.querySelector('#typecontainertemplate')

textbox.addEventListener('click', () => {
    if (textbox.value == textbox.innerHTML) {
        textbox.value = ''
    }
})

button.addEventListener('click', () => {                         
    while(errorMessage.firstChild) {
        errorMessage.removeChild(errorMessage.firstChild);
    }

    while(container.firstChild){
        container.removeChild(container.firstChild)
    }

    // clear any potentially existing errors
    errorMessage.style.display = 'none'
    errorMessage.innerHTML = "The following entries could not be found:";
    
    // process list of entered cards
    let cardList = textbox.value.split('\n')
    getCardData(cardList)

    // reset text in deck list textbox
    textbox.value = textbox.innerHTML
})

// TODO fix the name of this function 
function getCardData(cardList){
    const base = 'https://api.scryfall.com'
    const api = '/cards/named?fuzzy='

    cardList.forEach(card => {
        let cardName = card.trim()

        fetch(base + api + cardName.replace(/\s/g, "+"))
        .then(res => {
            return res.json()
        })
        .then(res => {
            if (res.status === 404)
            {
                errorMessage.style.display = errorMessage.style.display === "block" ? "none" : "block"

                let node = document.createElement("LI")
                let textnode = document.createTextNode(cardName)
                
                node.appendChild(textnode)                             
                errorMessage.appendChild(node) 
            } else if (res.status !== 400) {
                const cardType = res.type_line
                const types = ["Land", "Creature", "Enchantment", "Artifact", "Planeswalker", "Instant", "Sorcery"]

                let found = types.some(type => {
                    if(cardType.includes(type)){
                        buildCheckbox(res, type)
                        return true
                    }
                })
                if(!found) throw new Error("Could not match a type to this card") 
            }
        })
        .catch(e => {
            console.log(e)
        })
    })
}

function buildCheckbox(item, type) {
    let checkContainerClone = document.importNode(checkboxTemplate.content, true)
    let label = checkContainerClone.querySelector('label')
    let checkbox = checkContainerClone.querySelector('input[type=checkbox]')

    typeContainerId = buildTypeContainer(type)
    let typeContainer = document.querySelector('#' + typeContainerId)

    const labelText = "cb-" + item.id
    // give "for" for this label a unique id
    label.htmlFor = labelText

    // set label to card name
    label.innerHTML = item.name

    // give this checkbox a name that matches its label
    checkbox.name = labelText

    typeContainer.appendChild(checkContainerClone)
    progressBarListener(checkbox)
}

function buildTypeContainer(type) {
    let typeId = type + '-container'

    if (!container.querySelector('#' + typeId))
    {
        let typeContainerClone = document.importNode(typeContainerTemplate.content, true)
        let typeDiv = typeContainerClone.querySelector('div')
        let header = typeContainerClone.querySelector('h1')

        typeDiv.id = typeId
        header.innerHTML = type

        container.appendChild(typeContainerClone)
    }

    return typeId
}