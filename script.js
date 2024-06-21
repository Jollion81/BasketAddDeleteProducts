fetch('products.json').then(function (res) {
    return res.json()
}).then(function (data) {
    const target = document.querySelector('.target')

    data.items.forEach(function (product) {
        target.innerHTML += `
            <div class="product">
                <h2>${product.name}</h2>
                <p>£${product.price}</p>
                <img src="${product.image}" />
                <button class="addToBasket" data-name="${product.name}">Add to basket</button>
            </div>
        `
    })

    const buttons = document.querySelectorAll('.addToBasket')

    let basket = []
    
    buttons.forEach(function (button) {
        button.addEventListener('click', function() {
            const productToAdd = button.dataset.name
            addToBasket(productToAdd, basket)
            displayBasket(basket)
        })
    })
})

function addToBasket(productToAdd, basket) {
    // If the product is already in the basket, do nothing
    // else add it
    if (!basket.includes(productToAdd)) {
        basket.push(productToAdd)
    }
}

function removeFromBasket(productToRemove, basket) {
    if (basket.includes(productToRemove)) {
        // remove it
        basket.splice(basket.indexOf(productToRemove), 1)
    }
}


function displayBasket(basket) {
    const basketDisplay = document.querySelector('.basket')

    basketDisplay.innerHTML = ''

    basket.forEach(function (product) {
        basketDisplay.innerHTML += `<li>${product} <button class="removeFromBasket" data-name="${product}">Remove</button></li>`
    })

    setupRemoveButtonEvents(basket)
}

function setupRemoveButtonEvents(basket) {
    const removeButtons = document.querySelectorAll('.removeFromBasket')

    removeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const productToRemove = button.dataset.name
            removeFromBasket(productToRemove, basket)
            displayBasket(basket)
        })
    })
}
