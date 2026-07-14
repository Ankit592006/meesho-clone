
$(document).ready(function () {

    console.log("Meesho Clone Started");

    // Render basic page shells (if elements exist on this page)
    if ($("#productsSection").length) {
        $("#productsSection").html(productsSection());
        $("#filtersPanelContainer").html(filtersPanel());
        $("#sortDropdownContainer").html(sortDropdown());
        $("#filtersContainer").html(buildFilters());
    }

    // ===========================================
    //             CART STATE CONTROLLER
    // ===========================================
    let cart = JSON.parse(localStorage.getItem("meesho_cart")) || [];

    function saveCart() {
        localStorage.setItem("meesho_cart", JSON.stringify(cart));
        updateCartUI();
    }

    function updateCartUI() {
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        let badge = $(".user i.fa-cart-plus").siblings(".cart-badge-nav");
        if (totalQty > 0) {
            if (badge.length === 0) {
                $(".user i.fa-cart-plus").parent().css("position", "relative");
                $(".user i.fa-cart-plus").after(`
                    <span class="cart-badge-nav" style="
                        position: absolute;
                        top: -8px;
                        right: -8px;
                        background: rgb(159, 32, 137);
                        color: white;
                        font-size: 11px;
                        font-weight: 700;
                        border-radius: 50%;
                        width: 18px;
                        height: 18px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1;
                    ">${totalQty}</span>
                `);
            } else {
                badge.text(totalQty).show();
            }
        } else {
            badge.hide();
        }

        // Render template items in cart drawer
        if ($("#cartDrawer").length) {
            $("#cartDrawer").html(cartDrawerTemplate(cart));
        }
    }

    // Expose Add to Cart function globally to connect product-detail buttons
    window.addToCartMock = function (title) {
        const product = products.find(p => p.title === title);
        if (product) {
            const existingIndex = cart.findIndex(item => item.title === title);
            if (existingIndex !== -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({
                    image: product.image,
                    title: product.title,
                    price: product.price,
                    quantity: 1
                });
            }
            saveCart();
            
            // Auto slide-open drawer for user feedback
            $("#cartBackdrop").fadeIn(200);
            $("#cartDrawer").addClass("open");
        }
    };

    window.buyNowMock = function (title) {
        window.addToCartMock(title);
    };

    window.clearCartState = function() {
        cart = [];
        saveCart();
        $("#cartBackdrop").fadeOut(200);
        $("#cartDrawer").removeClass("open");
    };

    // Open Cart Drawer
    $(document).on("click", ".user:has(.fa-cart-plus)", function (e) {
        e.preventDefault();
        $("#cartBackdrop").fadeIn(200);
        $("#cartDrawer").addClass("open");
    });

    // Close Cart Drawer
    $(document).on("click", "#closeCartBtn, #cartBackdrop", function () {
        $("#cartBackdrop").fadeOut(200);
        $("#cartDrawer").removeClass("open");
    });

    // Increment Quantity
    $(document).on("click", ".qty-plus", function () {
        const index = $(this).data("index");
        cart[index].quantity += 1;
        saveCart();
    });

    // Decrement Quantity
    $(document).on("click", ".qty-minus", function () {
        const index = $(this).data("index");
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        saveCart();
    });

    // Remove Item
    $(document).on("click", ".removeItemBtn", function () {
        const index = $(this).data("index");
        cart.splice(index, 1);
        saveCart();
    });

    // ===========================================
    //             FILTER STATE CONTROLLER
    // ===========================================
    let filterState = {
        gender: [],
        category: [],
        price: [],
        rating: "all",
        discount: "all",
        color: []
    };

    let lastHashWasProduct = false;
    const homeSections = $(".banner, .policy, .collection, .gold, .b-section, .brand-section, .trendz, #productsSection");

    // Collapsible Accordion Logic
    $(document).on("click", ".filter-item", function() {
        $(this).toggleClass("expanded");
        $(this).next(".filter-options").slideToggle(200);
    });

    // Reset Filters to initial state
    function resetFilters() {
        filterState = {
            gender: [],
            category: [],
            price: [],
            rating: "all",
            discount: "all",
            color: []
        };
        $(".filter-checkbox").prop("checked", false);
        $(".filter-radio[value='all']").prop("checked", true);
        $(".filters-header span").text("1000+ Products");
    }

    // Resolve URL path category mapping
    function getActiveCategory() {
        const path = window.location.pathname;
        const hash = window.location.hash.substring(1) || "all";
        const match = path.match(/\/pages\/([^\/]+)/);
        
        if (!match) return "all";
        
        const folder = match[1];
        if (folder === "women") {
            if (hash === "ethnic" || hash === "western" || hash === "lingerie") {
                return hash;
            }
            return ["ethnic", "western", "lingerie"];
        }
        if (folder === "popular") return "all";
        return folder; // men, kids, home, beauty, jewellery, bags
    }

    // Resolve redirection URL links dynamically
    function getCategoryUrl(category) {
        const isSubPage = window.location.pathname.includes("/pages/");
        if (category === "all") {
            return isSubPage ? "../../index.html" : "index.html";
        }
        if (category === "ethnic" || category === "western" || category === "lingerie") {
            return isSubPage ? `../women/index.html#${category}` : `pages/women/index.html#${category}`;
        }
        return isSubPage ? `../${category}/index.html` : `pages/${category}/index.html`;
    }

    // Run dynamic filtering based on active category path/hash and checkboxes
    function runFiltering() {
        const activeCat = getActiveCategory();
        let filtered = products;

        // 1. Base route category filter
        if (activeCat !== "all") {
            if (Array.isArray(activeCat)) {
                filtered = filtered.filter(p => activeCat.includes(p.category));
            } else {
                filtered = filtered.filter(p => p.category === activeCat);
            }
        }

        // 2. Gender criteria
        if (filterState.gender.length > 0) {
            filtered = filtered.filter(p => filterState.gender.includes(p.gender));
        }

        // 3. Category sidebar criteria
        if (filterState.category.length > 0) {
            filtered = filtered.filter(p => filterState.category.includes(p.category));
        }

        // 4. Price criteria range checks
        if (filterState.price.length > 0) {
            filtered = filtered.filter(p => {
                return filterState.price.some(range => {
                    if (range === "under-199") return p.price < 199;
                    if (range === "200-499") return p.price >= 200 && p.price <= 499;
                    if (range === "500-above") return p.price >= 500;
                    return false;
                });
            });
        }

        // 5. Ratings criteria
        if (filterState.rating !== "all") {
            const minRating = parseFloat(filterState.rating);
            filtered = filtered.filter(p => p.rating >= minRating);
        }

        // 6. Discount criteria
        if (filterState.discount !== "all") {
            const minDiscount = parseInt(filterState.discount);
            filtered = filtered.filter(p => p.discountVal >= minDiscount);
        }

        // 7. Color criteria
        if (filterState.color.length > 0) {
            filtered = filtered.filter(p => filterState.color.includes(p.color));
        }

        // Render updated products grid
        if ($("#productGridContainer").length) {
            $("#productGridContainer").html(productGrid(filtered));
        }

        // Update active count label in filters sidebar
        const countText = filtered.length === 1 ? "1 Product Found" : filtered.length + " Products Found";
        $(".filters-header span").text(countText);
    }

    // Checkbox and Radio Selection Change Listener
    $(document).on("change", ".filter-checkbox, .filter-radio", function() {
        const type = $(this).data("type");
        const val = $(this).val();

        if ($(this).hasClass("filter-checkbox")) {
            if ($(this).is(":checked")) {
                filterState[type].push(val);
            } else {
                filterState[type] = filterState[type].filter(item => item !== val);
            }
        } else if ($(this).hasClass("filter-radio")) {
            filterState[type] = val;
        }

        runFiltering();
    });

    // Define route dispatch handler
    function handleRoute() {
        const hash = window.location.hash.substring(1) || "";
        console.log("Routing hash:", hash);

        if (hash.startsWith("product-")) {
            const index = parseInt(hash.split("-")[1]);
            const product = products[index];

            if (product) {
                window.scrollTo(0, 0);
                homeSections.hide();
                $("#productDetailSection").html(productDetailTemplate(product, index)).show();
            }
            lastHashWasProduct = true;
        } else {
            $("#productDetailSection").hide();
            homeSections.show();

            // Clear checkboxes and search when returning from product details
            if (lastHashWasProduct) {
                resetFilters();
                lastHashWasProduct = false;
            }

            const activeCat = getActiveCategory();

            // Highlighting active nav links
            $(".nav-list").removeClass("active-nav");
            
            // Resolve which menu tag to highlight
            let highlightTag = activeCat;
            if (Array.isArray(activeCat)) highlightTag = "women";
            $(`.nav-list[data-menu="${highlightTag}"]`).addClass("active-nav");

            // Format heading dynamically based on active category
            let categoryLabel = activeCat;
            if (Array.isArray(activeCat)) {
                categoryLabel = "Women's Collection";
            } else if (activeCat === "all") {
                categoryLabel = "Products For You";
            } else if (activeCat === "ethnic") {
                categoryLabel = "Kurti, Saree & Lehenga Collection";
            } else if (activeCat === "western") {
                categoryLabel = "Women Western Collection";
            } else if (activeCat === "lingerie") {
                categoryLabel = "Lingerie Collection";
            } else if (activeCat === "men") {
                categoryLabel = "Men Collection";
            } else if (activeCat === "kids") {
                categoryLabel = "Kids & Toys Collection";
            } else if (activeCat === "home") {
                categoryLabel = "Home & Kitchen Collection";
            } else if (activeCat === "beauty") {
                categoryLabel = "Beauty & Health Collection";
            } else if (activeCat === "jewellery") {
                categoryLabel = "Jewellery & Accessories Collection";
            } else if (activeCat === "bags") {
                categoryLabel = "Bags & Footwear Collection";
            } else {
                categoryLabel = activeCat.charAt(0).toUpperCase() + activeCat.slice(1) + " Collection";
            }

            $(".products-heading h2").text(categoryLabel);

            // Execute filtering logic
            runFiltering();
        }
    }

    // Intercept card clicks to route to detail page
    $(document).on("click", ".product-card", function () {
        const title = $(this).find(".product-title").text().trim();
        const index = products.findIndex(p => p.title === title);
        if (index !== -1) {
            window.location.hash = "product-" + index;
        }
    });

    // Attach click listener on navbar category elements to redirect to separate pages
    $(".nav-list").click(function () {
        const category = $(this).data("menu");
        window.location.href = getCategoryUrl(category);
    });

    // Logo click redirects back to home root index.html
    $(".logo-title a").click(function (e) {
        e.preventDefault();
        const isSubPage = window.location.pathname.includes("/pages/");
        window.location.href = isSubPage ? "../../index.html" : "index.html";
    });

    // Bind route handler to browser navigation hash change events
    $(window).on("hashchange", handleRoute);

    // Initial load initializations
    updateCartUI();
    handleRoute();

});