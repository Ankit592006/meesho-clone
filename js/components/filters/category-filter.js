function buildFilters() {

    let html = "";

    filters.forEach(function(filter){

        html += `

            <div class="filter-item">

                <span>${filter}</span>

                <i class="fa-solid fa-angle-down"></i>

            </div>

        `;

    });

    return html;

}