$(document).ready(function () {
    
    // Restrict input to digits only
    $("#signupPhone").on("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Handle "Continue" login triggers
    $("#continueSignupBtn").click(function () {
        const phone = $("#signupPhone").val().trim();
        const phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(phone)) {
            $("#phoneError").fadeIn(150);
            return;
        }

        $("#phoneError").fadeOut(150);

        // Save session authentication state to localStorage
        const userData = {
            loggedIn: true,
            phone: phone
        };
        localStorage.setItem("meesho_user", JSON.stringify(userData));

        // Success Alert Box
        alert("Verification successful!\nLogged in as +91 " + phone);

        // Redirect back to root homepage
        window.location.href = "../../index.html";
    });
    
});
