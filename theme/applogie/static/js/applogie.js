$(window).bind("load", function() {
    $('#app-carousel-1,#app-carousel-3,#app-carousel-5').carousel({
        interval: 2500
    });
    $('#app-carousel-2,#app-carousel-4,#app-carousel-6').carousel({
        interval: 3500
    });
    var current_path = window.location.pathname.split('/').pop();
    console.log("NOW IN "+current_path);
    //highlight solution menu
    if( current_path.match(/^(finance.html|operations.html|it.html)$/) ){
        $('#solutions-menu').addClass( "active" );
    }
    //highlight product menu
    else if( current_path.match(/^(how-it-works.html|features.html)$/) ){
        $('#product-menu').addClass( "active" );
    }
    //highlight resource menu
    else if( current_path.match(/^(blogs.html)$/) ){
        $('#resource-menu').addClass( "active" );
    }
    //highlight pricing menu
    else if( current_path.match(/^(pricing.html)$/) ){
        $('#pricing-menu').addClass( "active" );
    }
    //highlight about menu
    else if( current_path.match(/^(about.html)$/) ){
        $('#about-menu').addClass( "active" );
    } else {
        // do nothing
    }
    $('#id_hubspot_applogie').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) {
            console.info("Invalid");
        } else {
            console.info("Valid");
            var form = $('#id_hubspot_applogie');
            e.preventDefault();
				var seconds = new Date().getTime();
				$('[name="timestamp"]').val(seconds);
				$('[name="startTime"]').val(seconds);
				$('[name="endTime"]').val(seconds);
				var formData = self.getFormData(form);
				console.log(JSON.stringify(formData));
				$.ajax({
					type: 'POST',
					crossDomain: true,
					headers: {
						"content-type": "application/json",
						"cache-control": "no-cache"
					},
					datatype: 'json',
					url: $(form).attr('action'),
					data: JSON.stringify(formData),
					success: function(result) {
                        console.info("Submitted",JSON.stringify(result));
                        if( current_path.match(/^(blogs.html)$/) ){
                            swal("Thank you!", "Thank you for subscribing to Applogie's bi-weekly Newsletter", "success");
                        } else{
                            swal("Thank you!", "Your message has been successfully sent. We will contact you soon!", "success");     
                        } 
                        $(form).find(":input:not([type=hidden])").val('');
					},
					error: function (req, status, err) {
						console.info('Something went wrong', status, err);
						swal("Sorry!", "Something went wrong. Please try again.", 'Danger');
					}
                });
            }
    });
    //IE fix for images
    objectFitImages();
 });

 function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}