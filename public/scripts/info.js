function autorun() {
    $("#contact_form").validate({
        rules: {
            firstName: "required",
            lastName: "required",
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            firstname: "Please enter your first name",
            lastname: "Please enter your last name",
            email: "Please enter a valid email address"
        }
        // submitHandler: function (form, e) {
            // $.ajax({
            //     url: '/user-data',
            //     type: 'POST',
            //     async: false,
            //     data: $('form').serialize(),
            //     success: function (response) {  
            //         window.location.replace('/test');
            //     },
            //     error: function (xhr, status, error) {
            //         console.log("Error: ", error);
            //         $('.error').removeClass('hide');
            //     }
            // });
        // }
    });
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;