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

    let childDivs = container.querySelectorAll('div')

    childDivs.forEach(child => {
        child.style.display = 'none'
    })

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

    cardList.forEach((card, index) => {
        let cardName = card.trim()

        fetch(base + api + cardName.replace(/\s/g, "+"))
        .then(res => {
            return res.json()
        })
        .then(res => {
            if (res.status === 404)
            {
                if (errorMessage.style.display === "none") { errorMessage.style.display = "block" }

                let node = document.createElement("LI")
                let textnode = document.createTextNode(cardName)
                
                node.appendChild(textnode)                             
                errorMessage.appendChild(node) 
            } else if (res.status !== 400) {
                // sort cards by type in this order:
                // land, creature, enchantment, artifact, planeswalker, instant, sorcery
                let type = res.type_line

                if (type.includes("Land")) {
                    buildCheckbox(res, "Land")
                } else if (type.includes("Creature")) { 
                    buildCheckbox(res, "Creature")
                } else if (type.includes("Enchantment")) { 
                    buildCheckbox(res, "Enchantment")
                } else if (type.includes("Artifact")) {
                    buildCheckbox(res, "Artifact")
                } else if (type.includes("Planeswalker")) { 
                    buildCheckbox(res, "Planeswalker")
                } else if (type.includes("Instant")) {
                    buildCheckbox(res, "Instant")
                } else if (type.includes("Sorcery")) { 
                    buildCheckbox(res, "Sorcery")
                } else { 
                    throw new Error("Could not match a type to this card")
                }
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

    // give "for" for this label a unique id
    label.htmlFor = 'cb' + item.id

    // set label to card name
    label.innerHTML = item.name

    // give this checkbox a name that matches its label
    checkbox.name = 'cb' + item.id

    typeContainer.appendChild(checkContainerClone)
    progressBarListener(checkbox)
}

function buildTypeContainer(type) {
    let typeId = type + '-container'

    if (container.querySelector('#' + typeId) === null)
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