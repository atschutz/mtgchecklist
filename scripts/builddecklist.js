const container = document.querySelector('#listcontainer')
const textbox = document.querySelector('#decklist')
const button = document.querySelector('#getlistbutton')
const template = document.querySelector('#checkboxtemplate')
const errorMessage = document.querySelector('#errormessage')

const landList = new Array()
const creatureList = new Array()
const enchantmentList = new Array()
const artifactList = new Array()
const planeswalkerList = new Array()
const instantList = new Array()
const sorceryList = new Array()

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
})

// get card data
function getCardData(cardName, id){
    const base = 'https://api.scryfall.com'
    const api = '/cards/named?fuzzy='
    let name = ""

    fetch(base + api + cardName.replace(/\s/g, "+"))
    .then(res => {
        return res.json()
    })
    .then(res => {
        // sort cards by type in this order:
        // land, creature, enchantment, artifact, planeswalker, instant, sorcery
        let type = res.type_line
        if (type.includes("Land")) { 
            landList.push(res) 
            console.log(res.name + " is a Land")
        } else if (type.includes("Creature")) { 
            creatureList.push(res) 
            console.log(res.name + " is a Creature")
        } else if (type.includes("Enchantment")) { 
            enchantmentList.push(res) 
            console.log(res.name + " is an Enchantment")
        } else if (type.includes("Artifact")) { 
            artifactList.push(res) 
            console.log(res.name + " is an Artifact")
        } else if (type.includes("Planeswalker")) { 
            planeswalkerList.push(res)
            console.log(res.name + " is a Planeswalker")
        } else if (type.includes("Instant")) { 
            instantList.push(res) 
            console.log(res.name + " is an Instant")
        } else if (type.includes("Sorcery")) { 
            sorceryList.push(res) 
            console.log(res.name + " is a Sorcery")
        } else { 
            throw new Error("Could not match a type to this card")
        }

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

            progressBarListener(checkbox)
        }
    })
    .catch(e => {
        //error handling
        console.log(e)
    })
}