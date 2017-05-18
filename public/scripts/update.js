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
            xhrFields: {
                withCredentials: true
            },
            success: function (response) {
                // setTimeout(function(){
                    window.location.replace('/');
                // }, 5000);
            },
            error: function (xhr, status, error) {
                alert("An Error Occured\nStatus: ", status, "\nError: ", error);
            }
        });
    });
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;