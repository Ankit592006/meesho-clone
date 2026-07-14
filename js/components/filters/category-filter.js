function buildFilters() {
    return `
        <!-- Gender Filter -->
        <div class="filter-group">
            <div class="filter-item" data-filter="gender">
                <span>Gender</span>
                <i class="fa-solid fa-angle-down"></i>
            </div>
            <div class="filter-options" style="display: none;">
                <label><input type="checkbox" class="filter-checkbox" data-type="gender" value="men"> Men</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="gender" value="women"> Women</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="gender" value="kids"> Kids</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="gender" value="unisex"> Unisex</label>
            </div>
        </div>

        <!-- Category Filter -->
        <div class="filter-group">
            <div class="filter-item" data-filter="category">
                <span>Category</span>
                <i class="fa-solid fa-angle-down"></i>
            </div>
            <div class="filter-options" style="display: none;">
                <label><input type="checkbox" class="filter-checkbox" data-type="category" value="ethnic"> Kurti, Saree & Lehenga</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="category" value="western"> Women Western</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="category" value="men"> Men</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="category" value="kids"> Kids & Toys</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="category" value="home"> Home & Kitchen</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="category" value="beauty"> Beauty & Health</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="category" value="jewellery"> Jewellery & Accessories</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="category" value="bags"> Bags & Footwear</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="category" value="popular"> Popular</label>
            </div>
        </div>

        <!-- Price Filter -->
        <div class="filter-group">
            <div class="filter-item" data-filter="price">
                <span>Price</span>
                <i class="fa-solid fa-angle-down"></i>
            </div>
            <div class="filter-options" style="display: none;">
                <label><input type="checkbox" class="filter-checkbox" data-type="price" value="under-199"> Under ₹199</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="price" value="200-499"> ₹200 - ₹499</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="price" value="500-above"> ₹500 & Above</label>
            </div>
        </div>

        <!-- Rating Filter -->
        <div class="filter-group">
            <div class="filter-item" data-filter="rating">
                <span>Rating</span>
                <i class="fa-solid fa-angle-down"></i>
            </div>
            <div class="filter-options" style="display: none;">
                <label><input type="radio" name="rating-filter" class="filter-radio" data-type="rating" value="4.0"> 4.0 ★ & Above</label>
                <label><input type="radio" name="rating-filter" class="filter-radio" data-type="rating" value="3.5"> 3.5 ★ & Above</label>
                <label><input type="radio" name="rating-filter" class="filter-radio" data-type="rating" value="all" checked> All Ratings</label>
            </div>
        </div>

        <!-- Discount Filter -->
        <div class="filter-group">
            <div class="filter-item" data-filter="discount">
                <span>Discount</span>
                <i class="fa-solid fa-angle-down"></i>
            </div>
            <div class="filter-options" style="display: none;">
                <label><input type="radio" name="discount-filter" class="filter-radio" data-type="discount" value="30"> 30% & Above</label>
                <label><input type="radio" name="discount-filter" class="filter-radio" data-type="discount" value="10"> 10% & Above</label>
                <label><input type="radio" name="discount-filter" class="filter-radio" data-type="discount" value="all" checked> All Discounts</label>
            </div>
        </div>

        <!-- Color Filter -->
        <div class="filter-group">
            <div class="filter-item" data-filter="color">
                <span>Color</span>
                <i class="fa-solid fa-angle-down"></i>
            </div>
            <div class="filter-options" style="display: none;">
                <label><input type="checkbox" class="filter-checkbox" data-type="color" value="black"> Black</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="color" value="blue"> Blue</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="color" value="white"> White</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="color" value="pink"> Pink</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="color" value="red"> Red</label>
                <label><input type="checkbox" class="filter-checkbox" data-type="color" value="green"> Green</label>
            </div>
        </div>
    `;
}