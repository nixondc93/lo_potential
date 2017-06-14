function autorun() {
    $("form").validate({
        rules: {
            score: {
                required: true,
                range: [1, 12]
            },
            goal: {
                required: true,
                range: [1, 12]
            }
        },
        messages: {
            score: "Please Enter a Number Between 1 - 12",
            goal: "Please Enter a Number Between 1 - 12"
        }
    });
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;