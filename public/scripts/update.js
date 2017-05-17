function autorun() {

    $('.clearBtn').click(function(e){
        $('textarea').empty('');
    });

    $('textarea').change(function(e){
        var name = $(this).attr('name');
        $("input[name='" + name + "'").val($(this).val());
    
    });
    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: '/update',
            type: 'POST',
            data: $('form').serialize(),
            success: function (response) {          
                console.log(response);
                var url = $(location).attr("href");
                url = url.substr(0, (url.length - 7));
                console.log(url);
                 window.location.replace('/');
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