let cartItems = [];

function addToCart() {
    const selectedItem = document.getElementById("itemSelect").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    const itemDetails = {
        name: selectedItem,
        quantity: quantity,
        price: getItemPrice(selectedItem)
    };

    cartItems.push(itemDetails);
    updateCart();
}

function removeItem(index) {
    const removeQuantity = parseInt(prompt("Enter quantity to remove", "1"));

    if (!isNaN(removeQuantity) && removeQuantity > 0) {
        if (removeQuantity >= cartItems[index].quantity) {
            cartItems.splice(index, 1);
        } else {
            cartItems[index].quantity -= removeQuantity;
        }

        updateCart();
    }
}

function updateCart() {
    const cartList = document.getElementById("cartList");
    const totalPriceElement = document.getElementById("totalPrice");
    let totalPrice = 0;

    cartList.innerHTML = "";

    cartItems.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} x ${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "btn btn-danger btn-sm ml-2";
        removeButton.onclick = function () {
            removeItem(index);
        };

        listItem.appendChild(removeButton);
        cartList.appendChild(listItem);

        cartList.appendChild(document.createElement("hr"));

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function getItemPrice(item) {
    switch (item) {
        case "Tapsilog":
            return 95;
        case "Liemposilog":
            return 105;
        case "Baconsilog":
            return 90;
        case "Hotsilog":
            return 85;
        default:
            return 0;
    }
}