$(document).ready(function () {

    // Popular hover
    $(".nav-list").mouseenter(function () {

    const category = $(this).data("menu");

    renderMenu(category);

});
    // Navbar aur menu dono se mouse bahar gaya
    $(".full-nav, #megaMenu").mouseleave(function () {
        $("#megaMenu").hide();
    });

});

function renderMenu(category){

    const menu = menuData[category];

    let html = `<div class="mega-wrapper">`;

    menu.forEach(column => {

        html += `
            <div class="mega-column">

                <h4>${column.title}</h4>
        `;

        column.items.forEach(item=>{

            html += `<a href="#">${item}</a>`;

        });

        html += `</div>`;

    });

    html += `</div>`;

    $("#megaMenu").html(html).show();

}