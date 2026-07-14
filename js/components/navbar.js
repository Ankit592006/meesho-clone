$(document).ready(function () {

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Configure Profile Container and inject dropdown panel dynamically
    const profileContainer = $(".user:has(.fa-user)");
    profileContainer.attr("id", "profileBtnContainer");
    if ($("#profileDropdown").length === 0) {
        profileContainer.append(`<div id="profileDropdown" class="profile-dropdown"></div>`);
    }

    // Render profile dropdown initial structure
    renderProfileDropdown();

    if (isTouchDevice) {
        // Touch devices: Toggle menu on click/tap
        $(".nav-list").click(function (e) {
            e.stopPropagation();
            const category = $(this).data("menu");

            if ($("#megaMenu").is(":visible") && $(this).hasClass("active-menu")) {
                $("#megaMenu").hide();
                $(".nav-list").removeClass("active-menu");
            } else {
                $(".nav-list").removeClass("active-menu");
                $(this).addClass("active-menu");
                renderMenu(category);

                const navbarHeight = $(".full-nav").outerHeight() || 120;
                
                // Reposition mega menu dynamically on mobile touchscreens
                if ($(window).width() <= 992) {
                    $("#megaMenu").css({
                        "position": "fixed",
                        "top": navbarHeight + "px",
                        "left": "5%",
                        "transform": "none",
                        "width": "90%",
                        "max-height": "calc(100vh - " + (navbarHeight + 20) + "px)",
                        "overflow-y": "auto",
                        "box-shadow": "0 8px 16px rgba(0,0,0,0.15)"
                    });
                } else {
                    $("#megaMenu").css({
                        "position": "absolute",
                        "top": "126px",
                        "left": "50%",
                        "transform": "translateX(-50%)",
                        "width": "88%",
                        "max-height": "none",
                        "overflow-y": "visible"
                    });
                }
            }
        });

        // Close menu on document tap
        $(document).click(function (e) {
            if (!$(e.target).closest("#megaMenu, .nav-list").length) {
                $("#megaMenu").hide();
                $(".nav-list").removeClass("active-menu");
            }
        });
    } else {
        // Desktop mouse hover events for category megamenu
        let hideTimeout = null;

        $(".nav-list").mouseenter(function () {
            clearTimeout(hideTimeout);
            const category = $(this).data("menu");
            renderMenu(category);
        });

        $(".nav-list").mouseleave(function () {
            hideTimeout = setTimeout(function () {
                if (!$("#megaMenu:hover").length) {
                    $("#megaMenu").hide();
                }
            }, 100);
        });

        $("#megaMenu").mouseenter(function () {
            clearTimeout(hideTimeout);
        });

        $("#megaMenu").mouseleave(function () {
            $("#megaMenu").hide();
        });

        // Desktop mouse hover events for Profile Dropdown
        let profileHideTimeout = null;

        $(document).on("mouseenter", "#profileBtnContainer", function () {
            clearTimeout(profileHideTimeout);
            renderProfileDropdown();
            $("#profileDropdown").fadeIn(150);
        });

        $(document).on("mouseleave", "#profileBtnContainer", function () {
            profileHideTimeout = setTimeout(function () {
                if (!$("#profileDropdown:hover").length) {
                    $("#profileDropdown").fadeOut(150);
                }
            }, 150);
        });

        $(document).on("mouseenter", "#profileDropdown", function () {
            clearTimeout(profileHideTimeout);
        });

        $(document).on("mouseleave", "#profileDropdown", function () {
            $("#profileDropdown").fadeOut(150);
        });

        // Handle logout click
        $(document).on("click", "#logoutBtn", function () {
            localStorage.removeItem("meesho_user");
            renderProfileDropdown();
            $("#profileDropdown").fadeOut(150);
            window.location.reload();
        });
    }

});

// Render Profile Dropdown Content based on Login state
function renderProfileDropdown() {
    const user = JSON.parse(localStorage.getItem("meesho_user"));
    const isSubPage = window.location.pathname.includes("/pages/");
    const signupPath = isSubPage ? "../../pages/signup/index.html" : "pages/signup/index.html";

    let dropdownHtml = "";

    if (user && user.loggedIn) {
        dropdownHtml = `
            <h4>Hello User</h4>
            <p>+91 ${user.phone}</p>
            <ul class="profile-dropdown-menu">
                <li onclick="alert('My Orders loading...')"><i class="fa-solid fa-bag-shopping"></i> My Orders</li>
                <li id="logoutBtn" style="color: #e53e3e; font-weight: 600;"><i class="fa-solid fa-right-from-bracket" style="color: #e53e3e;"></i> Logout</li>
            </ul>
        `;
    } else {
        dropdownHtml = `
            <h4>Hello User</h4>
            <p>To access your Meesho account</p>
            <a href="${signupPath}" class="signup-btn">Sign Up</a>
            <ul class="profile-dropdown-menu">
                <li onclick="window.location.href='${signupPath}'"><i class="fa-solid fa-bag-shopping"></i> My Orders</li>
                <li onclick="alert('Please sign up to delete account')"><i class="fa-solid fa-trash-can"></i> Delete Account</li>
            </ul>
        `;
    }

    $("#profileDropdown").html(dropdownHtml);
}

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