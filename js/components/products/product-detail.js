if (typeof adjustImagePath === "undefined") {
    window.adjustImagePath = function(path) {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
            return path;
        }
        if (window.location.pathname.includes("/pages/")) {
            return "../../" + path;
        }
        return path;
    };
}

function productDetailTemplate(product, index) {
    return `
        <div class="row g-4">
            <!-- Back Navigation -->
            <div class="col-12 mb-2">
                <button class="btn btn-sm btn-outline-secondary back-to-products-btn" onclick="window.location.hash='all'">
                    <i class="fa-solid fa-arrow-left me-1"></i> Back to Products
                </button>
            </div>

            <!-- Left Side: Images & Actions -->
            <div class="col-md-6 col-lg-5">
                <div class="card border-0 shadow-sm p-3">
                    <div class="text-center bg-light rounded p-4 mb-3" style="min-height: 400px; display: flex; align-items: center; justify-content: center;">
                        <img src="${adjustImagePath(product.image)}" id="mainDetailImage" alt="${product.title}" class="img-fluid rounded" style="max-height: 350px; object-fit: contain;">
                    </div>
                    
                    <!-- Thumbnails -->
                    <div class="d-flex gap-2 justify-content-center mb-3">
                        <img src="${adjustImagePath(product.image)}" class="img-thumbnail active-thumb detail-thumb" style="width: 60px; height: 60px; object-fit: cover; cursor: pointer; border-color: #9f2089;">
                        <!-- Mock additional thumbnails -->
                        <div class="bg-light rounded d-flex align-items-center justify-content-center detail-thumb" style="width: 60px; height: 60px; cursor: pointer; border: 1px solid #dee2e6;">
                            <i class="fa-solid fa-image text-muted"></i>
                        </div>
                        <div class="bg-light rounded d-flex align-items-center justify-content-center detail-thumb" style="width: 60px; height: 60px; cursor: pointer; border: 1px solid #dee2e6;">
                            <i class="fa-solid fa-image text-muted"></i>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="d-flex gap-3 mt-2">
                        <button class="btn btn-outline-dark btn-lg flex-fill py-3" style="font-weight: 600; border-color: #353543; font-size: 16px;" onclick="addToCartMock('${product.title.replace(/'/g, "\\'")}')">
                            <i class="fa-solid fa-cart-shopping me-2"></i> Add to Cart
                        </button>
                        <button class="btn btn-lg flex-fill py-3 text-white" style="background-color: rgb(159, 32, 137); font-weight: 600; font-size: 16px;" onclick="buyNowMock('${product.title.replace(/'/g, "\\'")}')">
                            <i class="fa-solid fa-bolt me-2"></i> Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Side: Product Description & Info -->
            <div class="col-md-6 col-lg-7">
                <!-- Title and Price Card -->
                <div class="card border-0 shadow-sm p-4 mb-3">
                    <h1 class="h3" style="color: #353543; font-weight: 600; line-height: 1.4;">${product.title}</h1>
                    
                    <div class="d-flex align-items-baseline gap-3 my-3">
                        <span class="fs-2 fw-bold text-dark">₹${product.price}</span>
                        <span class="text-decoration-line-through text-muted fs-5">₹${product.originalPrice}</span>
                        <span class="badge bg-success fs-6 px-2 py-1">${product.discount}</span>
                    </div>

                    <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="badge bg-success d-flex align-items-center gap-1 py-2 px-3 fs-6">
                            ${product.rating} <i class="fa-solid fa-star" style="font-size: 12px;"></i>
                        </span>
                        <span class="text-muted fs-6">${product.reviews} Ratings, 240 Reviews</span>
                    </div>
                    
                    <div class="text-muted mt-2 fs-6">
                        <i class="fa-solid fa-truck-fast text-success me-1"></i> Free Delivery | Cash on Delivery Available
                    </div>
                </div>

                <!-- Size Card -->
                <div class="card border-0 shadow-sm p-4 mb-3">
                    <h3 class="h6 mb-3 text-uppercase fw-bold" style="color: #353543; letter-spacing: 0.5px;">Select Size</h3>
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-secondary size-btn py-2 px-4" style="border-radius: 20px; font-weight: 500;">S</button>
                        <button class="btn btn-outline-secondary size-btn py-2 px-4 active" style="border-radius: 20px; font-weight: 500; border-color: #9f2089; color: #9f2089; background-color: rgba(159, 32, 137, 0.05);">M</button>
                        <button class="btn btn-outline-secondary size-btn py-2 px-4" style="border-radius: 20px; font-weight: 500;">L</button>
                        <button class="btn btn-outline-secondary size-btn py-2 px-4" style="border-radius: 20px; font-weight: 500;">XL</button>
                    </div>
                </div>

                <!-- Product Specifications Card -->
                <div class="card border-0 shadow-sm p-4 mb-3">
                    <h3 class="h6 mb-3 text-uppercase fw-bold" style="color: #353543; letter-spacing: 0.5px;">Product Details</h3>
                    <div class="row row-cols-2 g-3 fs-6">
                        <div><span class="text-muted">Color:</span> <span class="text-dark fw-normal">${product.color ? product.color.charAt(0).toUpperCase() + product.color.slice(1) : 'Multicolor'}</span></div>
                        <div><span class="text-muted">Category:</span> <span class="text-dark fw-normal">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span></div>
                        <div><span class="text-muted">Gender:</span> <span class="text-dark fw-normal">${product.gender ? product.gender.charAt(0).toUpperCase() + product.gender.slice(1) : 'Unisex'}</span></div>
                        <div><span class="text-muted">Material:</span> <span class="text-dark fw-normal">Premium Fabric</span></div>
                        <div><span class="text-muted">Return Policy:</span> <span class="text-dark fw-normal">7 Days Easy Return</span></div>
                        <div><span class="text-muted">Delivery:</span> <span class="text-dark fw-normal">Dispatched in 2-3 Days</span></div>
                    </div>
                </div>

                <!-- Supplier Info -->
                <div class="card border-0 shadow-sm p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h3 class="h6 mb-1 text-uppercase fw-bold text-muted">Shop Details</h3>
                            <h4 class="h5 text-dark mb-0 fw-bold">Fashnear Trendz Private Limited</h4>
                        </div>
                        <button class="btn btn-outline-primary btn-sm px-3" style="color: #9f2089; border-color: #9f2089;">
                            Visit Store
                        </button>
                    </div>
                    <div class="d-flex gap-4 mt-3 pt-3 border-top text-center fs-6">
                        <div>
                            <div class="fw-bold text-dark">4.0 ★</div>
                            <span class="text-muted" style="font-size: 13px;">Shop Rating</span>
                        </div>
                        <div>
                            <div class="fw-bold text-dark">23,109</div>
                            <span class="text-muted" style="font-size: 13px;">Followers</span>
                        </div>
                        <div>
                            <div class="fw-bold text-dark">1,248</div>
                            <span class="text-muted" style="font-size: 13px;">Products</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Add to Cart mock triggers (fallbacks)
if (typeof window.addToCartMock === "undefined") {
    window.addToCartMock = function(title) {
        alert(title + " added to Cart!");
    };
}
if (typeof window.buyNowMock === "undefined") {
    window.buyNowMock = function(title) {
        alert("Proceeding to Buy " + title + "!");
    };
}
