function autorun() {
    $("#contact_form").validate({
        rules: {

        },
        messages: {

        }
    });
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;