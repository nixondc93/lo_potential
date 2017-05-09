function autorun() {

    $('select').change(function (e) {
        $('input[name=' + this.name + ']').val($(this).val())
        if ($(this).attr('name').endsWith("score")) {
            $('#score').text(parseInt($(this).val()) + parseInt(($('#score').text())))
        } else {
            $('#goal').text(parseInt($(this).val()) + parseInt(($('#goal').text())))
        }

        $('input[name=total_goal]').val($('#goal').text())
        $('input[name=total_score]').val($('#score').text())
    });

    var count = 0;
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
        },
        submitHandler: function (form) {
            
            $(form).submit(function (e) {
                e.preventDefault();
                var data = $('#contact_form').serialize();
                count += 1;
                console.log('count: ',count);
                $.ajax({
                    url: 'https://www.tapapp.com/1755417/LeadImport/NewForm.aspx',
                    type: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': "*",
                    },
                    data: data,
                    dataType: 'json',
                    success: function (response) {          
                        $('select').val('');
                        $('input').val('');
                        var res = JSON.parse(response)
                    },
                    error: function (xhr, status) {
                        console.log(xhr, status);
                    }
                });
            });
        }
    });
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;