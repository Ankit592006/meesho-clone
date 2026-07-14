function cartDrawerTemplate(cartItems) {
    let itemsHtml = "";
    let subtotal = 0;

    if (cartItems.length === 0) {
        itemsHtml = `
            <div class="cart-empty">
                <i class="fa-solid fa-cart-shopping"></i>
                <p class="fs-5 fw-bold mb-1">Your cart is empty</p>
                <p class="text-small">Add items to get started!</p>
            </div>
        `;
    } else {
        cartItems.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            itemsHtml += `
                <div class="cart-item" data-index="${index}">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="qty-controls">
                            <button class="qty-btn qty-minus" data-index="${index}">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn qty-plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="cart-remove-btn removeItemBtn" data-index="${index}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        });
    }

    // Summary Footer
    let footerHtml = "";
    if (cartItems.length > 0) {
        footerHtml = `
            <div class="cart-summary">
                <div class="summary-row">
                    <span>Product Charges</span>
                    <span>₹${subtotal}</span>
                </div>
                <div class="summary-row">
                    <span>Delivery Charges</span>
                    <span class="text-success">FREE</span>
                </div>
                <div class="summary-row total">
                    <span>Order Total</span>
                    <span>₹${subtotal}</span>
                </div>
                <button class="checkout-btn" onclick="checkoutMock()">
                    Process to Checkout
                </button>
            </div>
        `;
    } else {
        footerHtml = `
            <div class="cart-summary">
                <button class="checkout-btn bg-secondary" disabled style="box-shadow: none; cursor: default;">
                    Cart Empty
                </button>
            </div>
        `;
    }

    return `
        <div class="cart-header">
            <h3>Shopping Cart</h3>
            <button class="cart-close-btn" id="closeCartBtn">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="cart-items-container">
            ${itemsHtml}
        </div>
        ${footerHtml}
    `;
}

function checkoutMock() {
    alert("Checkout Successful! Thank you for shopping with Meesho Clone!");
    if (window.clearCartState) {
        window.clearCartState();
    }
}
