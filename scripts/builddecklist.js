const container = document.querySelector('#listcontainer')
const textbox = document.querySelector('#decklist')
const button = document.querySelector('#getlistbutton')
const template = document.querySelector('#checkboxtemplate')

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
            label.innerHTML = card
            container.appendChild(clone)
        }
    })


//  // Clone the new row and insert it into the table
//  var tbody = document.querySelector("tbody");
//  var clone = document.importNode(template.content, true);
//  var td = clone.querySelectorAll("td");
//  td[0].textContent = "1235646565";
//  td[1].textContent = "Stuff";

//  tbody.appendChild(clone);

})