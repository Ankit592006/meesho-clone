function productGrid() {

    let html = `

        <div class="products-grid">

    `;

    products.forEach(function(product){

        html += productCard(product);

    });

    html += `

        </div>

    `;

    return html;

}