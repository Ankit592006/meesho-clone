function productGrid(productsList = products) {

    let html = `

        <div class="products-grid">

    `;

    productsList.forEach(function(product){

        html += productCard(product);

    });

    html += `

        </div>

    `;

    return html;

}