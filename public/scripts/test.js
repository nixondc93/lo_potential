// function autorun() {

//     $('select').change(function (e) {
//         $('input[name=' + this.name + ']').val($(this).val())
//         if ($(this).attr('name').endsWith("score")) {
//             $('#score').text(parseInt($(this).val()) + parseInt(($('#score').text())))
//         } else {
//             $('#goal').text(parseInt($(this).val()) + parseInt(($('#goal').text())))
//         }

//         $('input[name=total_goal]').val($('#goal').text())
//         $('input[name=total_score]').val($('#score').text())
//     });

//     $("#contact_form").validate({
//         rules: {
//             firstName: "required",
//             lastName: "required",
//             email: {
//                 required: true,
//                 email: true
//             },
//         },
//         messages: {
//             firstname: "Please enter your first name",
//             lastname: "Please enter your last name",
//             email: "Please enter a valid email address"
//         },
//         submitHandler: function (form, e) {
//             e.preventDefault();

//             $.ajax({
//                 url: '/post',
//                 type: 'POST',
//                 data: $('form').serialize(),
//                 success: function (response) {
//                     $('select').val('');
//                     $('input').val('');
//                     $('.success').removeClass('hide');
//                     $('#score').html('0');
//                     $('#goal').html('0');
//                 },
//                 error: function (xhr, status, error) {
//                     console.log("Error: ", error);
//                     $('.error').removeClass('hide');
//                 }
//             });
//         }
//     });
// }
// if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
// else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
// else window.onload = autorun;