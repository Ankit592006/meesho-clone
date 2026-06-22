
$(document).ready(function () {

    console.log("Meesho Clone Started");

    $("#productsSection").html(productsSection());

    $("#filtersPanelContainer").html(filtersPanel());

    $("#sortDropdownContainer").html(sortDropdown());

    $("#filtersContainer").html(buildFilters());

     $("#productGridContainer").html(productGrid());

});