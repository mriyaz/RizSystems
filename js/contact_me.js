$(function () {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbyPzRJnuklV8fLqOG3pccLncsaULv4Vn7iO8T8129Mp8xJjODU0pnzB1EqigDhnMX4nZA/exec",
                type: "POST",
                dataType: "json",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function () {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function (e) {
                    console.log(e);
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// var form = document.getElementById("contactForm");
// async function handleSubmit(event) {
//     event.preventDefault();
//     var status = document.getElementById("success");
//     var data = new FormData(event.target);
//     fetch(event.target.action,
//         {
//             method: form.method,
//             body: data, headers: { 'Accept': 'application/json' }
//         })
//         .then(response => {
//             if (response.ok) {
//                 status.innerHTML = "<strong>Your message has been sent. </strong>"; form.reset()
//             }
//             else {
//                 response.json()
//                     .then(data => {
//                         if (Object.hasOwn(data, 'errors')) {
//                             status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
//                         }
//                         else {
//                             status.innerHTML = "Oops! There was a problem submitting your form"
//                         }
//                     })
//             }
//         })
//         .catch(error => { 
//             console.log(error);
//             status.innerHTML = "Oops! There was a problem submitting your form" });
// }
// form.addEventListener("submit", handleSubmit)

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
    $('#success').html('');
});
