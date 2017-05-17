function autorun() {
    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: '/authenticate',
            type: 'POST',
            data: $('form').serialize(),
            success: function (response) {          
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.log("XHR: ", xhr, "\nStatus: ", status, "\nError: ", error);
            }
        });
    });
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;