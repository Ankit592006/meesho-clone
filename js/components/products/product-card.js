
function adjustImagePath(path) {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
        return path;
    }
    if (window.location.pathname.includes("/pages/")) {
        return "../../" + path;
    }
    return path;
}

function productCard(product) {

    return `

        <div class="product-card">

            <div class="product-image">

                <img src="${adjustImagePath(product.image)}" alt="${product.title}">

                <span class="product-more">+3 More</span>

            </div>

            <div class="product-info">

                <p class="product-title">
                    ${product.title}
                </p>

                <div class="price-row">

                    <span class="current-price">
                        ₹${product.price}
                    </span>

                    <span class="old-price">
                        ₹${product.originalPrice}
                    </span>

                    <span class="discount">
                        ${product.discount}
                    </span>

                </div>

                <div class="rating-row">

                    <span class="rating-badge">

                        ${product.rating}
                        <i class="fa-solid fa-star"></i>

                    </span>

                    <span class="review-count">
                        ${product.reviews} Reviews
                    </span>

                </div>

            </div>

        </div>

    `;

}