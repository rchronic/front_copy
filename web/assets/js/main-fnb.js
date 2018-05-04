$(document).on('click', '.header-side li.sub-menu > a', function(e){
	e.preventDefault();
	if( $(this).closest('li.sub-menu').hasClass('current') ){
		$(this).closest('li.sub-menu').removeClass('current')
		$(this).closest('li.sub-menu').find('ul').slideUp()
	}else{
		$('.header-side li.sub-menu').removeClass('current')
		$('.header-side li.sub-menu').find('ul').slideUp()
		$(this).closest('li.sub-menu').addClass('current')
		$(this).closest('li.sub-menu').find('ul').slideDown()
	}
})

// Input Checkbox
function check_all_checkbox(checkbox_index, $cond){
    bliss_trigger('function check_all_checkbox(checkbox_index, $cond){')
	if( $cond == true ){
		$('#'+checkbox_index).find('.checkbox-button input[type="checkbox"]').prop('checked', true)
	}else{
		$('#'+checkbox_index).find('.checkbox-button input[type="checkbox"]').prop('checked', false)
	}
}
function check_all_sub_checkbox(checkbox_index, $cond){
    bliss_trigger('function check_all_sub_checkbox(checkbox_index, $cond){')
	if( $cond == true ){
		$('#'+checkbox_index).find('.checkbox-button-sub input[type="checkbox"]').prop('checked', true)
	}else{
		$('#'+checkbox_index).find('.checkbox-button-sub input[type="checkbox"]').prop('checked', false)
	}
}
function count_sub_checkbox(checkbox_index){
    bliss_trigger('function count_sub_checkbox(checkbox_index){');
	return $('#'+checkbox_index).find('.checkbox-button-sub').length
}
function count_sub_checkbox_checked(checkbox_index){
    bliss_trigger('function count_sub_checkbox_checked(checkbox_index){');
	return $('#'+checkbox_index).find('.checkbox-button-sub input[type="checkbox"]:checked').length
}

$(document).on('change', '.checkbox-button-sub input[type="checkbox"]', function(e){
    bliss_trigger("$(document).on('change', '.checkbox-button-sub input[type=\"checkbox\"]', function(e){");
	e.preventDefault()
	var checkbox_index = $(this).closest('.checkbox-index').attr('id')
	if( parseInt(count_sub_checkbox(checkbox_index)) == parseInt(count_sub_checkbox_checked(checkbox_index)) ){
		check_all_checkbox(checkbox_index, true)
	}else{
		check_all_checkbox(checkbox_index, false)
	}

})
$(document).on('change', '.checkbox-button input[type="checkbox"]', function(e){
    bliss_trigger("$(document).on('change', '.checkbox-button input[type=\"checkbox\"]', function(e){")
	e.preventDefault()
	var checkbox_index = $(this).closest('.checkbox-index').attr('id')
	if( $(this).is(':checked')  ){
		check_all_sub_checkbox(checkbox_index, true)
	}else{
		check_all_sub_checkbox(checkbox_index, false)
	}
})
//-> end - Input Checkbox


// Get Image on Input File
function get_image_src(input, photo_id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = function (e) {
            $('label[for="'+photo_id+'"]').attr('style', 'background-image:url(\''+e.target.result+'\')')
            $('label[for="'+photo_id+'"]').addClass('active')
            var nom = $('.photo-frame:last-child label').attr('for').split('-')
            var num = parseInt(nom[1]) + 1;
            $('#photo-box').append(''
				+'<div class="photo-frame">'
				+'	<label for="photo-'+num+'">'
				+'		<input type="file" name="photo[]" id="photo-'+num+'">'
				+'		<input type="hidden" name="is_cover[]" class="cover-input" value="0" />'
				+'	</label>'
				+'	<div class="photo-hover">'
				+'		<span class="make-cover">Make Cover Photo</span>'
				+'		<span class="delete">Delete</span>'
				+'	</div>'
				+'</div>'
			+'');

        }
        reader.readAsDataURL(input.files[0])
    }
}

$(document).on('change', '.photo-frame input[type="file"]', function(e){
    bliss_trigger("$(document).on('change', '.photo-frame input[type=\"file\"]', function(e){")
	var photo_id = $(this).attr('id')
    get_image_src(this, photo_id);
})

$(document).on('click', '.photo-hover span', function(){
    bliss_trigger("$(document).on('click', '.photo-hover span', function(){");
	// var the_class = $(this).attr('class')
	var the_class = $(this).attr('class')
	if(the_class == 'make-cover'){
		$(".make-cover").show();
		$(".cover-input").val(0);
		$(this).closest(".photo-frame").find(".cover-input").val(1);
		$(this).hide();
		bliss_log( this, "value cover",$(this).closest(".photo-frame").find(".cover-input").val());
		// $('#make-cover').modal('show')
		bliss_log( this, 'make cover');
	}else{
		$(this).closest('.photo-frame').remove()
	}
})

$('#delete-room-type').on('show.bs.modal', function (event) {
    bliss_trigger("$('#delete-room-type').on('show.bs.modal', function (event) {");
	var id    = $(event.relatedTarget).attr("data-id");
    var modal = '.modal#delete-room-type';
    $(modal).find('input[name="room_type_id"]').val(id)
    bliss_log( this, "delete work", id);
})

	// $('#create-room-type').modal('show')
	// $('#edit-room-type').modal('show')
	// $('#edited-room-type').modal('show')
	// $('#delete-room-type').modal('show')
	// $('#deleted-room-type').modal('show')




$(document).on('click', '.room-list-hover span[class="view"]', function(){
    bliss_trigger("$(document).on('click', '.room-list-hover span[class=\"view\"]', function(){");
	// var the_class = $(this).attr('class')

    csrfToken = $("input[name=_csrf]").val();
    room_type_id = $(this).attr("data-id");
    $.ajax({
        url: homeUrl + "hotel/room_type_detail",
        type: "POST",
        data: "_csrf=" + csrfToken + "&" + "room_type_id="+room_type_id,
        success: function (data) {
        	res = JSON.parse(data);

		    var features = "";
		    for( index=0; index < res.features.length; index++ ) {
		    	feature = res.features[index];
		    	features += "<li>"+feature.label+"</li>";
		    }

		    myslide = [];
		    mythumbs = [];
		    for( index=0; index < res.pictures.length; index++ ) {
		    	picture = res.pictures[index];
		    	myslide.push('  <div class="swiper-slide" style="background-image:url('+homeUrl+'assets/photo/room_type/'+picture.label+')">'
				            +'    <div class="swiper-content">'
				            +'      <h3 class="bold">'+res.label+'</h3>'
				            +'      <ul>'
				            +'        '+features
				            +'      </ul>'
				            +'      <p>'+res.description+'</p>'
				            +'    </div>'
				            +'  </div>');

		    	// mythumbs.push('<div class="swiper-slide" style="background-image:url('+homeUrl+'assets/photo/room_type/'+picture.label+')"></div>')
		    	mythumbs.push('<div class="swiper-slide" style="background-image:url('+homeUrl+'assets/slider/1.jpg);"></div>')

			}

			galleryTop.appendSlide(myslide);
			galleryThumbs.appendSlide(mythumbs);
        },
        error: function () {
            alert("Something went wrong");
        }
    });

	var the_class = $(this).attr('class')
	if(the_class == 'view'){

	$(document).find('.image-slider').addClass('active')
	    var galleryTop = new Swiper('.gallery-top', {
	      spaceBetween: 10,
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	    });
	    var galleryThumbs = new Swiper('.gallery-thumbs', {
	      spaceBetween: 15,
	      centeredSlides: true,
	      freeMode: true,
	      slidesPerView: 'auto',
	      touchRatio: 0.2,
	      slideToClickedSlide: true,
	    });

	    galleryTop.controller.control = galleryThumbs;
	    galleryThumbs.controller.control = galleryTop;
				// galleryTop.appendSlide([
		  //           '  <div class="swiper-slide" style="background-image:url(assets/slider/1.jpg)">'
		  //           +'    <div class="swiper-content">'
		  //           +'      <h3 class="bold">Deluxe Room</h3>'
		  //           +'      <ul>'
		  //           +'        <li>Double Bed</li>'
		  //           +'        <li>Sofa Bed</li>'
		  //           +'        <li>AC (Air Conditioner)</li>'
		  //           +'        <li>Wi-Fi</li>'
		  //           +'        <li>Towel</li>'
		  //           +'        <li>Free Welcome Drink</li>'
		  //           +'      </ul>'
		  //           +'      <p>Deluxe Room welcome guests looking for a spacious, elegant room. With one king or two double beds, a couch, armchair and working desk the room features a smart design with ample space.</p>'
		  //           +'    </div>'
		  //           +'  </div>',

		  //           '  <div class="swiper-slide" style="background-image:url(assets/slider/2.jpg)">'
		  //           +'    <div class="swiper-content">'
		  //           +'      <h3 class="bold">Deluxe Room</h3>'
		  //           +'      <ul>'
		  //           +'        <li>Double Bed</li>'
		  //           +'        <li>Sofa Bed</li>'
		  //           +'        <li>AC (Air Conditioner)</li>'
		  //           +'        <li>Wi-Fi</li>'
		  //           +'        <li>Towel</li>'
		  //           +'        <li>Free Welcome Drink</li>'
		  //           +'      </ul>'
		  //           +'      <p>Deluxe Room welcome guests looking for a spacious, elegant room. With one king or two double beds, a couch, armchair and working desk the room features a smart design with ample space.</p>'
		  //           +'    </div>'
		  //           +'  </div>',

		  //           '  <div class="swiper-slide" style="background-image:url(assets/slider/3.jpg)">'
		  //           +'    <div class="swiper-content">'
		  //           +'      <h3 class="bold">Deluxe Room</h3>'
		  //           +'      <ul>'
		  //           +'        <li>Double Bed</li>'
		  //           +'        <li>Sofa Bed</li>'
		  //           +'        <li>AC (Air Conditioner)</li>'
		  //           +'        <li>Wi-Fi</li>'
		  //           +'        <li>Towel</li>'
		  //           +'        <li>Free Welcome Drink</li>'
		  //           +'      </ul>'
		  //           +'      <p>Deluxe Room welcome guests looking for a spacious, elegant room. With one king or two double beds, a couch, armchair and working desk the room features a smart design with ample space.</p>'
		  //           +'    </div>'
		  //           +'  </div>',

		  //           '  <div class="swiper-slide" style="background-image:url(assets/slider/4.jpg)">'
		  //           +'    <div class="swiper-content">'
		  //           +'      <h3 class="bold">Deluxe Room</h3>'
		  //           +'      <ul>'
		  //           +'        <li>Double Bed</li>'
		  //           +'        <li>Sofa Bed</li>'
		  //           +'        <li>AC (Air Conditioner)</li>'
		  //           +'        <li>Wi-Fi</li>'
		  //           +'        <li>Towel</li>'
		  //           +'        <li>Free Welcome Drink</li>'
		  //           +'      </ul>'
		  //           +'      <p>Deluxe Room welcome guests looking for a spacious, elegant room. With one king or two double beds, a couch, armchair and working desk the room features a smart design with ample space.</p>'
		  //           +'    </div>'
		  //           +'  </div>',

		  //           '  <div class="swiper-slide" style="background-image:url(assets/slider/5.jpg)">'
		  //           +'    <div class="swiper-content">'
		  //           +'      <h3 class="bold">Deluxe Room</h3>'
		  //           +'      <ul>'
		  //           +'        <li>Double Bed</li>'
		  //           +'        <li>Sofa Bed</li>'
		  //           +'        <li>AC (Air Conditioner)</li>'
		  //           +'        <li>Wi-Fi</li>'
		  //           +'        <li>Towel</li>'
		  //           +'        <li>Free Welcome Drink</li>'
		  //           +'      </ul>'
		  //           +'      <p>Deluxe Room welcome guests looking for a spacious, elegant room. With one king or two double beds, a couch, armchair and working desk the room features a smart design with ample space.</p>'
		  //           +'    </div>'
		  //           +'  </div>',
				// ]);
				// galleryThumbs.appendSlide([
				//    '<div class="swiper-slide" style="background-image:url(assets/slider/1.jpg)"></div>',
				//    '<div class="swiper-slide" style="background-image:url(assets/slider/2.jpg)"></div>',
				//    '<div class="swiper-slide" style="background-image:url(assets/slider/3.jpg)"></div>',
				//    '<div class="swiper-slide" style="background-image:url(assets/slider/4.jpg)"></div>',
				//    '<div class="swiper-slide" style="background-image:url(assets/slider/5.jpg)"></div>',
				// ]);

			}else{
				// $(this).closest('.photo-frame').remove()
			}

})
$(document).on('click', '.slider-close', function(){
    bliss_trigger("$(document).on('click', '.slider-close', function(){");
	var galleryTop = new Swiper('.gallery-top')
	var galleryThumbs = new Swiper('.gallery-thumbs')
	galleryTop.removeAllSlides();
	galleryThumbs.removeAllSlides();

	$(this).closest('.image-slider').removeClass('active')
})

$(document).bind('click', '.image-slider', function(e){
    bliss_trigger("$(document).bind('click', '.image-slider', function(e){");
	if( e.target.className.split(' ')[1] == undefined ){
	}else{
		if( $(e.target).hasClass('swiper-button-white') || $(e.target).hasClass('swiper-slide-active') ){
			e.preventDefault();
		}else{
			var galleryTop = new Swiper('.gallery-top')
			var galleryThumbs = new Swiper('.gallery-thumbs')
			galleryTop.removeAllSlides();
			galleryThumbs.removeAllSlides();
			$('.image-slider').removeClass('active')
		}
	}
})


$('#edit-bed-type').on('show.bs.modal', function (event) {
	var id    = $(event.relatedTarget).closest('.bed-list-box').find('.edit').attr("data-id")
    var title = $(event.relatedTarget).closest('.bed-list-box').find('.bed-detail h2').text()
    var adult = $(event.relatedTarget).closest('.bed-list-box').find('.bed-detail #adult b').text()
    var child = $(event.relatedTarget).closest('.bed-list-box').find('.bed-detail #children b').text()
    var modal = '.modal#edit-bed-type';
    $(modal).find('#bed_id').val(id)
    $(modal).find('#type-name').val(title)
	forceSelect( $(modal).find('#adult'), adult)
	forceSelect( $(modal).find('#children'), child)
})

$('#delete-bed-type').on('show.bs.modal', function (event) {
	bliss_log( this, "Remove Trigger Work!");
	var id    = $(event.relatedTarget).closest('.bed-list-box').find('.delete').attr("data-id")
    var modal = '.modal#delete-bed-type';
    $(modal).find('#bed_id').val(id)
})

$('#edit-bed-type').on('hidden.bs.modal', function (event) {
    var modal = '.modal#edit-bed-type';
    $(modal).find('.select').hide()
    $(modal).find('.select-input input').removeClass('selected')
    $(modal).find('.option').removeClass('here')
})

$('#delete-list').on('show.bs.modal', function (event) {
	bliss_log( this, "Remove Trigger Work!");
	var id    = $(event.relatedTarget).attr("data-id");
    var modal = '.modal#delete-list';
    $(modal).find('input[name="room_id"]').val(id);
})

$('#delete-prep-list').on('show.bs.modal', function (event) {
	bliss_log( this, "Remove Trigger Work!");
	var id    = $(event.relatedTarget).attr("data-id");
    var modal = '.modal#delete-prep-list';
    $(modal).find('input[name="prep_id"]').val(id);
})

//Delete Menu List
$('#delete-menu-list').on('show.bs.modal', function (event) {
	bliss_log( this, "Remove Trigger Work!");
	var id    = $(event.relatedTarget).attr("data-id");
    var modal = '.modal#delete-menu-list';
    $(modal).find('input[name="menu_id"]').val(id);
})
//Delete Menu List


// $('#create-bed-type').modal('show')
// $('#created-bed-type').modal('show')
// $('#edit-bed-type').modal('show')
// $('#edited-bed-type').modal('show')
// $('#delete-bed-type').modal('show')
// $('#deleted-bed-type').modal('show')

var search_selected = "";
$(document).on('input', '#input-add', function(){
	// var hasremove = $(this).closest('.input-group').find('.input-remove').length
	$("#suggestions").show();
	search_selected = "";
	var typing = $(this).val().length;
	search_key = $(this).val().toUpperCase();
    ul = document.getElementById("suggestions");
    li = ul.getElementsByTagName('li');

    for (index = 0; index < li.length; index++) {
    	ele = li[index];

		if (ele.innerHTML.toUpperCase().indexOf(search_key) > -1) {
            li[index].style.display = "";
        } else {
            li[index].style.display = "none";
        }
	}

	if( typing > 0 ){
		$('#button-add').removeClass('disable')
	}else{
		// $(this).closest('.input-group').find('.input-remove').remove()
		$('#button-add').addClass('disable')
	}
});

$(document).on('click', '#suggestions li', function(){
	$("#input-add").val($(this).text());
	search_selected = $(this).attr("id");
	$("#suggestions").hide();
});

$(document).on('click', '#button-add', function(e){
	if( $(this).hasClass('disable') ){
		e.preventDefault();
	}else{
	var _value = $('#input-add').val()
	$('#input-add').val('')
	$('input.button-save').prop('disabled', false)
	$(this).addClass('disable')
	var count_input =  $('#attributes-room').find('.input-group:last-child').attr('for')
	// bliss_log( this, count_input)
	if( count_input == undefined ){
		var _for = 1
	}else{
		var _for = parseInt(count_input) + 1
	}
	var room_attr =  $('#attributes-room').attr('for')
	$('#attributes-room').append(''
		+'<div class="input-box input-group" for="'+_for+'">'
		+'  <input type="hidden" name="code[]" value="'+search_selected+'">'
		+'  <input type="hidden" name="origin[]" value="">'
		+'	<input type="text" class="attr-label" placeholder="Type the room '+room_attr+'" name="label[]" value="'+_value+'" required>'
		+'	<div class="button-group button-delete" data-toggle="modal" data-target="#delete-room-attribute" for="'+room_attr+'"></div>'
		+'	<div class="clearfix"></div>'
		+'</div>');
	}
})

$(".attr-label").on("change keyup", function (event) {
	$('input.button-save').prop('disabled', false);
})

$('#delete-room-attribute').on('show.bs.modal', function (event) {
    var _for = $(event.relatedTarget).attr('for')
    if( _for == 'policy' ){
    	var title = 'Delete Room Policy'
    	var _body = 'room policy'
    }else if( _for == 'feature' ){
    	var title = 'Delete Room Feature'
    	var _body = 'room feature'
    }else if( _for == 'view' ){
    	var title = 'Delete Room View'
    	var _body = 'room view'
    }

    var modal = '.modal#delete-room-attribute';
    $(modal).find('h4.modal-title').text(title)
    $(modal).find('.modal-body span').text(_body)

    var i_for = $(event.relatedTarget).closest('.input-group').attr('for')
    $(modal).find('.modal-footer input[type="submit"]').attr('for',i_for)
})
$('#deleted-room-attribute').on('show.bs.modal', function (event) {
	var i_for = $(event.relatedTarget).attr('for')
	$('#attributes-room').find('.input-group[for="'+i_for+'"] .attr-label').val("");
	$('#attributes-room').find('.input-group[for="'+i_for+'"]').hide()
	if( $('#attributes-room').find('.input-group').length == 0 ){
		$('input.button-save').prop('disabled', true)
	}
	else {
		$('input.button-save').prop('disabled', false)
	}

	var _for = $('#attributes-room').attr('for')
    if( _for == 'policy' ){
    	var title = 'Room Policy Successfully Deleted'
    	var _body = 'Room policy'
    }else if( _for == 'feature' ){
    	var title = 'Room Feature Successfully Deleted'
    	var _body = 'Room feature'
    }else if( _for == 'view' ){
    	var title = 'Room View Successfully Deleted'
    	var _body = 'Room view'
    }

    var modal = '.modal#deleted-room-attribute';
    $(modal).find('h4.modal-title').text(title)
    $(modal).find('.modal-body span').text(_body)
})

$(document).on('click', '#save-attribute', function(e){
	e.preventDefault()
	$('#edit-room-attribute').modal('show')
})
$('#edit-room-attribute').on('show.bs.modal', function (event) {
    var _for = $('#attributes-room').attr('for')
    if( _for == 'policy' ){
    	var title = 'Edit Room Policy'
    	var _body = 'room policy'
    }else if( _for == 'feature' ){
    	var title = 'Edit Room Feature'
    	var _body = 'room feature'
    }else if( _for == 'view' ){
    	var title = 'Edit Room View'
    	var _body = 'room view'
    }
    var modal = '.modal#edit-room-attribute';
    $(modal).find('h4.modal-title').text(title)
    $(modal).find('.modal-body span').text(_body)
    $(modal).find('.modal-footer .save-data').attr("data-attribute", _for);
})
$('#deleted-room-attribute').on('hidden.bs.modal', function (event) {
	$('body').removeAttr('style')
})
$('#edited-room-attribute').on('show.bs.modal', function (event) {
	var _for = $('#attributes-room').attr('for')
    if( _for == 'policy' ){
    	var title = 'Room Policy Successfully Edited'
    	var _body = 'Room policy'
    }else if( _for == 'feature' ){
    	var title = 'Room Feature Successfully Edited'
    	var _body = 'Room feature'
    }else if( _for == 'view' ){
    	var title = 'Room View Successfully Edited'
    	var _body = 'Room view'
    }
    var modal = '.modal#edited-room-attribute';
    $(modal).find('h4.modal-title').text(title)
    $(modal).find('.modal-body span').text(_body)
})
$('#edited-room-attribute').on('hidden.bs.modal', function (event) {
	$('body').removeAttr('style')
})

$(document).on('click', '.input-remove', function(e){
	$(this).closest('.input-group').find('input').val('')
	var remove = $(this).attr('id')
	if( remove == 'button-remove' ){
		$('#button-add').addClass('disable')
		$('#input-add').val('')
	}
	// $(this).val()
})
$(document).on('input', '#attributes-room input', function(){
	var hasremove = $(this).closest('.input-group').find('.input-remove').length
	var typing = $(this).val().length

	if(!hasremove == 1){
		if( typing == 1 ){
			$(this).closest('.input-group').append('<div class="input-remove"></div>')
		}
	}
})
$(document).on('focus', '#attributes-room input', function(){
	var hasremove = $(this).closest('.input-group').find('.input-remove').length
	var typing = $(this).val().length
	if(!hasremove == 1){
		if(!typing == 0){
			$(this).closest('.input-group').find('input').after('<div class="input-remove"></div>')
		}
	}

})


// // ROOM LIST
// $('#view-list').on('show.bs.modal', function (event) {
// 	var now = $(event.relatedTarget).attr('for')
// 	var trid = $('tr'+now)
// 	var room_no = trid.find('td[data-room-no]').attr('data-room-no')
// 	var room_floor = trid.find('td[data-floor]').attr('data-floor')
// 	var room_type = trid.find('td[data-room-type]').attr('data-room-type')
// 	var room_view = trid.find('td[data-view]').attr('data-view')
// 	var room_bed = trid.find('td[data-bed]').attr('data-bed')
// 	var room_port = trid.find('td[data-port]').attr('data-port')
// 	var room_nac = trid.find('td[data-nac]').attr('data-nac')
// 	var room_timezone = trid.find('td[data-timezone]').attr('data-timezone')
// 	var modal = $('.modal#view-list')
// 	modal.find('div[for="room-no"]').text(room_no)
// 	modal.find('div[for="room-floor"]').text(room_floor)
// 	modal.find('div[for="room-type"]').text(room_type)
// 	modal.find('div[for="room-view"]').text(room_view)
// 	modal.find('div[for="room-bed"]').text(room_bed)
// 	modal.find('div[for="room-port"]').text(room_port)
// 	modal.find('div[for="room-nac"]').text(room_nac)
// 	modal.find('div[for="room-timezone"]').text(room_timezone)
// })
//
// MENU LIST
$('#view-list').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var menu_no = trid.find('td[data-id]').attr('data-id')
	var menu_name = trid.find('td[data-name]').attr('data-name')
	var menu_type = trid.find('td[data-type]').attr('data-type')
	var menu_price = trid.find('td[data-price]').attr('data-price')
	var menu_duration = trid.find('td[data-duration]').attr('data-duration')
	var room_port = trid.find('td[data-port]').attr('data-port')
	var room_nac = trid.find('td[data-nac]').attr('data-nac')
	var room_timezone = trid.find('td[data-timezone]').attr('data-timezone')
	var modal = $('.modal#view-list')
	modal.find('div[for="menu-no"]').text(menu_no)
	modal.find('div[for="menu-name"]').text(menu_name)
	modal.find('div[for="menu-type"]').text(menu_type)
	modal.find('div[for="menu-price"]').text(menu_price)
	modal.find('div[for="menu-duration"]').text(menu_duration)
	modal.find('div[for="room-port"]').text(room_port)
	modal.find('div[for="room-nac"]').text(room_nac)
	modal.find('div[for="room-timezone"]').text(room_timezone)
})

// PREP List
$('#view-prep-list').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var prep_no = trid.find('td[data-id]').attr('data-id')
	var prep_name = trid.find('td[data-name]').attr('data-name')
	var prep_desc = trid.find('td[data-description]').attr('data-description')
	var modal = $('.modal#view-prep-list')
	modal.find('div[for="prep-no"]').text(prep_no)
	modal.find('div[for="prep-name"]').text(prep_name)
	modal.find('div[for="prep-desc"]').text(prep_desc)
})

// Ingredients List
$('#view-ingredients-list').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var ingredient_no = trid.find('td[data-id]').attr('data-id')
	var ingredient_name = trid.find('td[data-name]').attr('data-name')
	var ingredient_stock = trid.find('td[data-stock]').attr('data-stock')
	var ingredient_satuan = trid.find('td[data-satuan]').attr('data-satuan')
	var modal = $('.modal#view-ingredients-list')
	modal.find('div[for="ingredient-no"]').text(ingredient_no)
	modal.find('div[for="ingredient-name"]').text(ingredient_name)
	modal.find('div[for="ingredient-stock"]').text(ingredient_stock)
	modal.find('div[for="ingredient-satuan"]').text(ingredient_satuan)
})

// // Remove Ingredient
// $('#delete-ingredient-list').on('show.bs.modal', function (event) {
// 	bliss_log( this, "Remove Trigger Work!");
// 	var id    = $(event.relatedTarget).attr("data-id");
//     var modal = '.modal#delete-ingredient-list';
//     $(modal).find('input[name="ingredient_id"]').val(id);
// })

var bed_type_option = "";
$('#create-list').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var modal = $('.modal#create-list')
	bliss_log( this, "work!");
    csrfToken = $("input[name=_csrf]").val();
    room_type_id = $(this).attr("data-id");

	$('.loading').fadeIn('slow')
    $.ajax({
        url: homeUrl + "hotel/room_create_content",
        type: "POST",
        data: "_csrf=" + csrfToken,
        success: function (data) {
        	res = JSON.parse(data);
        	bliss_log( this, res);
        	for ( index= 0 ; index < res.room_views.length; index++ ) {
        		room_view = res.room_views[index];
        		modal.find('#room-view .select').append("<div class='option' value='"+room_view.id+"'>"+room_view.label+"</div>");
        	}
        	for ( index= 0 ; index < res.room_types.length; index++ ) {
        		room_type = res.room_types[index];
        		modal.find('#room-type .select').append("<div class='option' value='"+room_type.id+"'>"+room_type.label+"</div>");
        	}
        	for ( index= 0 ; index < res.bed_types.length; index++ ) {
        		bed_type = res.bed_types[index];
        		modal.find('#room-bed-1 .select').append("<div class='option' value='"+bed_type.id+"'>"+bed_type.label+"</div>");
        	}

        	for ( index= 0 ; index < res.locks[1].fields.length; index++ ) {
        		hotel_lock_field = res.locks[1].fields[index];
	        	if ( hotel_lock_field.type == "input" ) {
	        		modal.find("#room-lock .hotel-lock").append(
	            '<label for="'+hotel_lock_field.name+'">'+hotel_lock_field.label+' <i></i></label> \
	            <div class="clearfix"> \
	                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
	                <input type="text" name="'+hotel_lock_field.name+'" placeholder="Enter '+hotel_lock_field.label+'" class="" required> \
	                <div class="clear"></div> \
	                <div class="error">Please fill the '+hotel_lock_field.label+' box above</div> \
	            </div>'
	        		);
        		}
        		else if ( hotel_lock_field.type == "dropdown" ) {
        			bliss_log( this, "this is drop down");
        			field_option = "";
        			for ( option_no = 0 ; option_no < hotel_lock_field.value.length ; option_no++ ) {
        				field_option += "<div class='option' value='"+nac_field.value[option_no].id+"'>"+nac_field.value[option_no].label+"</div>"
        			}
        			bliss_log( this, "field Option", field_option);
	        		modal.find("#room-lock .nac").append('<label for="">'+ hotel_lock_field.label +'</label> \
		              <div class="clearfix select-input" id="'+hotel_lock_field.label.replace(" ","_").toLowerCase()+'"> \
		                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
		                <input type="text" name="'+hotel_lock_field.name+'" required="" placeholder="Select the ' + hotel_lock_field.label.toLowerCase() +'" disabled class=""> \
		                <div class="arrow"></div> \
		                <div class="select" style="display: none;" class="'+hotel_lock_field.name+'"> \
		                  <!-- Beri class here untuk option yang match --> \
		                  ' + field_option + ' \
		                </div>\
		                <input type="hidden" name="'+hotel_lock_field.name+'" required="" id="select" class="selected">\
		                <div class="error">Please fill the room view box above</div>\
		              </div>');
        		}
        	}

        	for ( index= 0 ; index < res.locks[2].fields.length; index++ ) {
        		nac_field = res.locks[2].fields[index];
        		if ( nac_field.type == "input" ) {
	        		modal.find("#room-lock .nac").append(
	            '<label for="'+nac_field.name+'">'+nac_field.label+' <i></i></label> \
	            <div class="clearfix"> \
	                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
	                <input type="text" name="'+nac_field.name+'" placeholder="Enter '+nac_field.label+'" class="" required> \
	                <div class="clear"></div> \
	                <div class="error">Please fill the '+nac_field.label+' box above</div> \
	            </div>'
	        		);
        		}
        		else if ( nac_field.type == "dropdown" ) {
        			bliss_log( this, "this is drop down");
        			field_option = "";
        			for ( option_no = 0 ; option_no < nac_field.value.length ; option_no++ ) {
        				field_option += "<div class='option' value='"+nac_field.value[option_no].id+"'>"+nac_field.value[option_no].label+"</div>"
        			}
        			bliss_log( this, "field Option", field_option);
	        		modal.find("#room-lock .nac").append('<label for="'+nac_field.label.replace(" ","_").toLowerCase()+'">'+ nac_field.label +'</label> \
		              <div class="clearfix select-input" id="'+nac_field.label.replace(" ","_").toLowerCase()+'"> \
		                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
		                <input type="text" name="'+nac_field.name+'" required="" placeholder="Select the ' + nac_field.label.toLowerCase() +'" disabled class=""> \
		                <div class="arrow"></div> \
		                <div class="select '+nac_field.name+'" style="display: none;"> \
		                  <!-- Beri class here untuk option yang match --> \
		                  ' + field_option + ' \
		                </div>\
		                <input type="hidden" name="'+nac_field.name+'" required="" id="select" class="selected">\
		                <div class="error">Please fill the room view box above</div>\
		              </div>');
        		}
        	}

        	bed_type_option = $('#room-bed-1 .select').html();
			modal.find('.hotel-lock').hide()
			modal.find('.nac').hide()
			$('#room-lock input[type="radio"]').prop('checked', false);
			$('#room-lock input[type="radio"][value="0"]').prop('checked', true);

			$('.loading').fadeOut('slow')

        },
        error: function () {
			$('.loading').fadeOut('slow')
            alert("Something went wrong");
        }
    });
})

$('#create-list').on('hidden.bs.modal', function (event) {
	var modal = $('.modal')
	modal.find('input[type="text"]').removeClass('selected')
	modal.find('.select').hide()
	modal.find('.option').remove()
	modal.find('input[type="text"], input[type="hidden"]').val('')
})

$(document).on('change', '#room-lock input[type="radio"]', function(){
	checkRoomLock($(this))
})


function checkRoomLock($this){
	if( $this.val() == '2' ){
		$this.closest('#room-lock').find('.hotel-lock').hide('fast')
		$this.closest('#room-lock').find('.hotel-lock input').attr('disabled', true)
		$this.closest('#room-lock').find('.nac').fadeIn('slow')
		$this.closest('#room-lock').find('.nac input').attr('disabled', false);
	}
	if( $this.val() == '1' ){
		$this.closest('#room-lock').find('.nac').hide('fast')
		$this.closest('#room-lock').find('.nac input').attr('disabled', true);
		$this.closest('#room-lock').find('.hotel-lock').fadeIn('slow')
		$this.closest('#room-lock').find('.hotel-lock input').attr('disabled', false)
	}
	if( $this.val() == '0' ){
		$this.closest('#room-lock').find('.hotel-lock').hide()
		$this.closest('#room-lock').find('.hotel-lock input').attr('disabled', true)
		$this.closest('#room-lock').find('.nac').hide()
		$this.closest('#room-lock').find('.nac input').attr('disabled', true);
	}
}




// $('#create-room-list').modal('show')
// $('#created-room-list').modal('show')

$('#edit-list').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var room_id = $('tr'+now).attr('data-id');
	var room_no = trid.find('td[data-room-no]').attr('data-room-no')
	var room_floor = trid.find('td[data-floor]').attr('data-floor')
	var get_room_view = trid.find('td[data-view]').attr('data-view')
	var get_room_type = trid.find('td[data-room-type]').attr('data-room-type')
	var room_bed = trid.find('td[data-bed]').attr('data-bed')
	var room_lock = trid.find('td[data-lock]').attr('data-lock')


	// var room_port = trid.find('td[data-port]').attr('data-port')
	// var room_nac = trid.find('td[data-nac]').attr('data-nac')
	// var room_timezone = trid.find('td[data-timezone]').attr('data-timezone')
	var room_lock = trid.find('td[data-lock]').attr('data-lock')

	var modal = $('#'+event.currentTarget.id)
	modal.find('input[name="room_id"]').val(room_id);
    csrfToken = $("input[name=_csrf]").val();
    room_type_id = $(this).attr("data-id");

	$('.loading').fadeIn('slow')
    $.ajax({
        url: homeUrl + "hotel/room_edit_content",
        type: "POST",
        data: "_csrf=" + csrfToken + "&room_id="+room_id,
        success: function (data) {
        	res = JSON.parse(data);
        	room_detail = res.detail_content;
        	room_content = res.create_content;

        	for ( index= 0 ; index < room_content.room_views.length; index++ ) {
        		room_view = room_content.room_views[index];
        		if(room_detail.view == room_view.label){
        			modal.find('#room-view .select').append("<div class='option here' value='"+room_view.id+"'>"+room_view.label+"</div>");
        			modal.find('#room-view input[type="text"][name="view_id"]').val(room_view.label);
        			modal.find('#room-view input[type="hidden"][name="view_id"]').val(room_view.id);
        		}else{
        			modal.find('#room-view .select').append("<div class='option' value='"+room_view.id+"'>"+room_view.label+"</div>");
        		}
        	}
        	for ( index= 0 ; index < room_content.room_types.length; index++ ) {
        		room_type = room_content.room_types[index];
        		bliss_log( this, "room type", room_detail.type, room_type.label);
        		if(room_detail.type == room_type.label){
	        		modal.find('#room-type .select').append("<div class='option here' value='"+room_type.id+"'>"+room_type.label+"</div>");
	        		modal.find('#room-type input[type="text"][name="type_id"]').val(room_type.label);
					modal.find('#room-type input[type="hidden"][name="type_id"]').val(room_type.id);
        		}else{
	        		modal.find('#room-type .select').append("<div class='option' value='"+room_type.id+"'>"+room_type.label+"</div>");
        		}
        	}

        	for ( index= 0 ; index < room_content.locks[1].fields.length; index++ ) {
        		hotel_lock_field = room_content.locks[1].fields[index];
	        	if ( hotel_lock_field.type == "input" ) {
	        		modal.find("#room-lock .hotel-lock").append(
	            '<label for="'+hotel_lock_field.name+'">'+hotel_lock_field.label+' <i></i></label> \
	            <div class="clearfix"> \
	                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
	                <input type="text" name="'+hotel_lock_field.name+'" placeholder="Enter '+hotel_lock_field.label+'" class="" required> \
	                <div class="clear"></div> \
	                <div class="error">Please fill the '+hotel_lock_field.label+' box above</div> \
	            </div>'
	        		);
        		}
        		else if ( hotel_lock_field.type == "dropdown" ) {
        			bliss_log( this, "this is drop down");
        			field_option = "";
        			for ( option_no = 0 ; option_no < hotel_lock_field.value.length ; option_no++ ) {
        				field_option += "<div class='option' value='"+nac_field.value[option_no].id+"'>"+nac_field.value[option_no].label+"</div>"
        			}
        			bliss_log( this, "field Option", field_option);
	        		modal.find("#room-lock .nac").append('<label for="">'+ hotel_lock_field.label +'</label> \
		              <div class="clearfix select-input" id="'+hotel_lock_field.label.replace(" ","_").toLowerCase()+'"> \
		                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
		                <input type="text" name="'+hotel_lock_field.name+'" required="" placeholder="Select the ' + hotel_lock_field.label.toLowerCase() +'" disabled class=""> \
		                <div class="arrow"></div> \
		                <div class="select" style="display: none;" class="'+hotel_lock_field.name+'"> \
		                  <!-- Beri class here untuk option yang match --> \
		                  ' + field_option + ' \
		                </div>\
		                <input type="hidden" name="'+hotel_lock_field.name+'" required="" id="select" class="selected">\
		                <div class="error">Please fill the room view box above</div>\
		              </div>');
        		}
        	}

        	for ( index= 0 ; index < room_content.locks[2].fields.length; index++ ) {
        		nac_field = room_content.locks[2].fields[index];
        		if ( nac_field.type == "input" ) {
	        		modal.find("#room-lock .nac").append(
	            '<label for="'+nac_field.name+'">'+nac_field.label+' <i></i></label> \
	            <div class="clearfix"> \
	                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
	                <input type="text" name="'+nac_field.name+'" placeholder="Enter '+nac_field.label+'" class="" required> \
	                <div class="clear"></div> \
	                <div class="error">Please fill the '+nac_field.label+' box above</div> \
	            </div>'
	        		);
        		}
        		else if ( nac_field.type == "dropdown" ) {
        			bliss_log( this, "this is drop down");
        			field_option = "";
        			for ( option_no = 0 ; option_no < nac_field.value.length ; option_no++ ) {
        				field_option += "<div class='option' value='"+nac_field.value[option_no].id+"'>"+nac_field.value[option_no].label+"</div>"
        			}
        			bliss_log( this, "field Option", field_option);
	        		modal.find("#room-lock .nac").append('<label for="'+nac_field.label.replace(" ","_").toLowerCase()+'">'+ nac_field.label +'</label> \
		              <div class="clearfix select-input" id="'+nac_field.label.replace(" ","_").toLowerCase()+'"> \
		                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
		                <input type="text" name="'+nac_field.name+'" required="" placeholder="Select the ' + nac_field.label.toLowerCase() +'" disabled class=""> \
		                <div class="arrow"></div> \
		                <div class="select '+nac_field.name+'" style="display: none;"> \
		                  <!-- Beri class here untuk option yang match --> \
		                  ' + field_option + ' \
		                </div>\
		                <input type="hidden" name="'+nac_field.name+'" required="" id="select" class="selected">\
		                <div class="error">Please fill the room view box above</div>\
		              </div>');
        		}
        	}
        	for ( index= 0 ; index < room_content.bed_types.length; index++ ) {
        		bed_type = room_content.bed_types[index];
        		bed_type_option += "<div class='option' value='"+bed_type.id+"'>"+bed_type.label+"</div>";
        	}

			bed_types = room_detail.bed;
			bliss_log( this, "bed type", bed_types);
			for( bed_no =0 ; bed_no < bed_types.length; bed_no++ ) {
		    	var bed_index = bed_no+1;
				modal.find('#bed-type-boss').append(''
				+'        <div id="bed-type-box" for="'+bed_index+'">'
				+'              <div class="clearfix select-input" id="edit-room-bed-'+bed_index+'" style="width: 60%;float: left;">'
				+'                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
				+'                <input type="text" name="room_bed" required="" placeholder="Select bed type" disabled class="">'
				+'                <div class="arrow"></div>'
				+'                <div class="select bed_option" style="display: none;">'
				+'                  <!-- Beri class here untuk option yang match -->'
				+					bed_type_option
				+'                </div>'
				+'                <input type="hidden" name="room_bed[]" required="" id="select" class="selected">'
				+'                <div class="error">Please fill the box above</div>'
				+'              </div>'
				+'              <div class="clearfix select-input" id="edit-room-bed-qty-'+bed_index+'" style="width: 25%;float: left;margin-left: 4%;">'
				+'                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
				+'                <input type="text" name="room_bed_qty" required="" placeholder="1" disabled class="">'
				+'                <div class="arrow"></div>'
				+'                <div class="select bed_qty" style="display: none;">'
				+'                  <!-- Beri class here untuk option yang match -->'
				+'                  <div class="option" value="1">1</div>'
				+'                  <div class="option" value="2">2</div>'
				+'                  <div class="option" value="3">3</div>'
				+'                  <div class="option" value="4">4</div>'
				+'                </div>'
				+'                <input type="hidden" name="room_bed_qty[]" required="" id="select" class="selected">'
				+'                <div class="error">Please fill the box above</div>'
				+'              </div>'
				+'              <div class="clearfix" style="width: 8%;float: left;margin-left: 3%;">'
				+'                <div class="minus-list">-</div>'
				+'              </div>'
				+'        </div>'
				+'')
				bliss_log( this, modal.find('#bed-type-boss').find('div[for="'+bed_index+'"]').find('.bed_option .option').filter('[value="'+bed_types[bed_no].id+'"]').attr("value"));
				modal.find('#bed-type-boss').find('div[for="'+bed_index+'"]').find('.bed_option').filter('[value="'+bed_types[bed_no].id+'"]').addClass("here");
				modal.find('#bed-type-boss').find('div[for="'+bed_index+'"]').find('.bed_qty').filter('[value="'+bed_types[bed_no].qty+'"').addClass("here");
				modal.find('#bed-type-boss').find('div[for="'+bed_index+'"]').find('input[type="text"][name="room_bed"]').val(bed_types[bed_no].label);
				modal.find('#bed-type-boss').find('div[for="'+bed_index+'"]').find('input[type="hidden"][name="room_bed[]"]').val(bed_types[bed_no].id);
				modal.find('#bed-type-boss').find('div[for="'+bed_index+'"]').find('input[type="text"][name="room_bed_qty"]').val(bed_types[bed_no].qty);
				modal.find('#bed-type-boss').find('div[for="'+bed_index+'"]').find('input[type="hidden"][name="room_bed_qty[]"]').val(bed_types[bed_no].qty);
			}

			var active_field = null;
			var lock_class_list = ["none","hotel-lock","nac"];
			var lock_class = null;
			for( index = 0; index < room_detail.lock.length; index++ ) {
				bliss_log( this, "room detail", room_detail.lock[index]);
				if ( room_detail.lock[index].selected ) {
					checkRoomLock(modal.find('#room-lock input[value="'+index+'"]'))
					modal.find('#room-lock input[value="'+index+'"]').prop('checked', true)
					active_field = room_detail.lock[index].fields;
					lock_class = lock_class_list[index];
				}
			}

			// checkRoomLock(modal.find('#room-lock input[value="'+room_detail.lock+'"]'))

			modal.find('#room-number').val(room_detail.label)
			modal.find('#room-floor').val(room_detail.floor)
			// modal.find('#room-type input[type="text"]').val(room_detail.type)
			// modal.find('#room-view input[type="text"]').val(room_detail.view)

			for( index =0; index < active_field.length ; index++ ) {
				if ( active_field[index].type == "input")
					modal.find('.'+lock_class+' input[name="'+active_field[index].name+'"]').val(active_field[index].value)
				else if ( active_field[index].type == "dropdown" ) {
					for ( no = 0 ; no < active_field[index].value.length; no++ ) {
						if ( active_field[index].value[no].selected ) {
							bliss_log( this, "option list", modal.find("."+lock_class).find('.'+active_field[index].name+' .option'));
							modal.find("."+lock_class).find('.'+active_field[index].name+' .option').filter('[value="'+active_field[index].value[no].id+'"]').addClass("here");
							modal.find("."+lock_class).find('input[type="text"][name="'+active_field[index].name+'"]').val(active_field[index].value[no].label);
							modal.find("."+lock_class).find('input[type="hidden"][name="'+active_field[index].name+'"]').val(active_field[index].value[no].id);
						}
					}
				}
			}

			$('.loading').fadeOut('slow')
        },
        error: function () {
			$('.loading').fadeOut('slow')
            alert("Something went wrong");
        }
    });
})

$('#edit-list').on('hidden.bs.modal', function (event) {
	var modal = $('#'+event.currentTarget.id)
	modal.find('input[type="text"]').removeClass('selected')
	modal.find('.select').hide()
	modal.find('.option').remove()
	modal.find('.option').removeClass('here')
	modal.find('input[type="text"]').val()
	modal.find('input[type="hidden"]').val()
	modal.find('#bed-type-box').remove()
	modal.find('#room-lock .hotel-lock label').remove()
	modal.find('#room-lock .hotel-lock div').remove()
	modal.find('#room-lock .nac label').remove()
	modal.find('#room-lock .nac div').remove()

})
// $('#edit-room-list').modal('show')
// $('#edited-room-list').modal('show')

$('#delete-list').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var room_id = trid.find('td[data-id]').attr('data-id')
	var modal = $('.modal#delete-list')
	modal.find('#id_room_list').val(room_id)
})
// $('#deleted-room-list').modal('show')


$('.modal').on('hidden.bs.modal', function (event) {
	$('body').removeAttr('style')
})


$(window).on('load', function(){

})






// =========================================== room management ==========================================
$('#change-room-control').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var room_id = trid.find('td[data-id]').attr('data-id')
	var room_name = trid.find('td[data-name]').attr('data-name')
	var room_type = trid.find('td[data-room-type]').attr('data-room-type')
	var room_no = trid.find('td[data-room-no]').attr('data-room-no')
	var room_booking = trid.find('td[data-booking]').attr('data-booking')
	var room_status = trid.find('td[data-status]').attr('data-status')
	var room_remaks = trid.find('td[data-remaks]').attr('data-remaks')
	var room_start = trid.find('td[data-start]').attr('data-start')
	var room_end = trid.find('td[data-end]').attr('data-end')

	var modal = $('.modal#change-room-control')
	modal.find('#room-type-number').val(room_type+' - '+room_no)
	modal.find('#room-booking').val(room_booking)
	modal.find('#room-current').val(room_status)
	// modal.find('#room-new input').val(room_status)
	// modal.find('#room-new .option[value="'+room_status+'"]').addClass('here')
	forceSelect( modal.find('#room-new'), room_status )
	modal.find('.room-datepicker-start').val(room_start)
    modal.find('.room-datepicker-start').datepicker({
        container: '#change-room-control #start-date',
        orientation: 'top left',
        autoclose: true,
    });
	modal.find('#room-datepicker-end').val(room_end)
    modal.find('#room-datepicker-end').datepicker({
        container: '#change-room-control #end-date',
        orientation: 'top left',
        autoclose: true,
    });
	modal.find('#remaks').val(room_remaks)
})
$('#change-room-control').on('hidden.bs.modal', function (event) {
	var modal = $('.modal')
	modal.find('input[type="text"]').removeClass('selected')
	modal.find('.select').hide()
})

$('#room-view-list').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var room_id = trid.find('td[data-id]').attr('data-id')
	var room_name = trid.find('td[data-name]').attr('data-name')
	var room_type = trid.find('td[data-room-type]').attr('data-room-type')
	var room_no = trid.find('td[data-room-no]').attr('data-room-no')
	var room_booking = trid.find('td[data-booking]').attr('data-booking')
	var room_status = trid.find('td[data-status]').attr('data-status')
	var room_remaks = trid.find('td[data-remaks]').attr('data-remaks')
	var room_start = trid.find('td[data-start]').attr('data-start')
	var room_end = trid.find('td[data-end]').attr('data-end')

	var modal = $('.modal#room-view-list')
	modal.find('div[for="room-type-number"]').text(room_type+' - '+room_no)
	modal.find('div[for="room-booking"]').text(room_booking)
	modal.find('div[for="room-status"]').text(room_status)
	modal.find('div[for="room-start"]').text(room_start)
	modal.find('div[for="room-end"]').text(room_end)
	modal.find('div[for="room-remaks"]').text(room_remaks)
})

// $('#change-room-status').modal('show')

$('#guest-view').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var room_id = trid.find('td[data-id]').attr('data-id')
	var room_name = trid.find('td[data-name]').attr('data-name')
	var room_order = trid.find('td[data-order]').attr('data-order')
	var room_type = trid.find('td[data-room-type]').attr('data-room-type')
	var room_no = trid.find('td[data-room-no]').attr('data-room-no')
	var room_created = trid.find('td[data-created]').attr('data-created')
	var room_desc = trid.find('td[data-desc]').attr('data-desc')

	var modal = $('.modal#guest-view')
	modal.find('div[for="room-type-number"]').text(room_type+' - '+room_no)
	modal.find('div[for="room-name"]').text(room_name)
	modal.find('div[for="room-order"]').text(room_order)
	modal.find('div[for="room-created"]').text(room_created)
	modal.find('div[for="room-desc"]').text(room_desc)
})


// $('#guest-create').modal('show')


$('.modal').on('hidden.bs.modal', function (event) {
	$('body').removeAttr('style')
})


// =========================================== room management ==========================================



// =========================================== room front desk ==========================================
// $('#add-additional-confirm').modal('show')

$('#view-additional').on('show.bs.modal', function (event) {
	var now = $(event.relatedTarget).attr('for')
	var trid = $('tr'+now)
	var _name = trid.find('td[data-name]').attr('data-name')

	var modal = $('.modal#view-additional')
	modal.find('span[id="user-name"]').text(_name)

})

	// DATATABLE
    var modal_magic = $('#magic-modal').DataTable( {
        'paging':   true,
        'ordering': true,
        'info':     false,
        'language': {
            'zeroRecords': 'Sorry, we cannot help you to find what youâ€™re looking for. Try another word may help us to help you :)'
        }
    } );

        modal_magic.page.len( 12 ).draw();

    $('.selection_modal').each(function(){
        var sel  = $(this).attr('id');
        var repl = sel.replace('sel','');
        var here = $('.content-list_modal ul.'+repl+'>li.here').text();
        var targ = $('.content-list_modal #sel'+repl).text(here);
    })

    $('.content-list_modal li').click(function(){
        var teks = $(this).text();
        var ul   = $(this).closest('ul').attr('class');

        var cond = $(this).closest('.content-list_modal').attr('data-condition');
        if( cond == 'table_length' ){
            if( teks == 'All' ){
                modal_magic.page.len( -1 ).draw();
            }else{
                modal_magic.page.len( teks ).draw();
            }
        }else if( cond == 'table_sorting' ){
            var tval = $(this).attr('value');
            modal_magic.order([tval, 'asc']).draw();
        }

        $('.content-list_modal #sel'+ul).text(teks);
        $('.content-list_modal ul.'+ul+' li').removeClass('here');
        $(this).addClass('here');
            $('.list-table_modal').hide();
            $('.selection_modal').removeClass('opened');
    })

    $('.selection_modal').click(function(){
        if( $(this).next('.list-table_modal').is(':hidden') ){
            $('.list-table_modal').hide();
            $(this).next('.list-table_modal').show();
            $('.selection_modal').removeClass('opened');
            $(this).addClass('opened');
        }else{
            $('.list-table_modal').hide();
            $(this).next('.list-table_modal').hide();
            $('.selection_modal').removeClass('opened');
        }
    })


// $(document).on('click', 'body', function(){
// 	if( $('.report-button').hasClass('active') ){
// 		$('.button-list').slideUp()
// 		$('.report-button').removeClass('active')
// 	}
// })

    var last_show = null;
    $('body').click(function(e){
        if ( last_show != null && last_show != e.target ) {
            $(last_show).removeClass("active");
            last_show = null;
        }
    });

$('#view-additional').on('hidden.bs.modal', function (event) {
	$('#magic-modal').DataTable().page.len(12).draw();
    var sel  = $('.selection_modal').attr('id');
    var repl = sel.replace('sel','');
    $('.content-list_modal #sel'+repl).text('12');
})

$(document).on('click', '.report-button', function(){
	if( $(this).hasClass('active') ){
		last_show = null;
		$('.button-list').slideUp()
		$('.report-button').removeClass('active')
	}else{
		$('.button-list').slideUp()
		$('.report-button').removeClass('active')
		$(this).addClass('active')
		$(this).find('.button-list').slideDown()
	}
})

// $('#reconciliate').modal('show')

$(document).on('click', '.index-details', function(){
	if( $(this).hasClass('opened') ){
		$(this).removeClass('opened')
	}else{
		$(this).addClass('opened')
	}
})
$(document).on('click', '.select-details .option', function(){
	$('.index-details').html( $(this).html() )
	$('.index-details').removeClass('opened')
	$('.select-details .option').removeClass('selected')
	$(this).addClass('selected')
})


    function option_detail_here(){
        $('.option-form.here').each(function(){
            var teks = $(this).text();
            var tval = $(this).attr('value');
            var thid = $(this).closest('.clearfix').attr('id');
                $('#'+thid).find('input[type="text"]').val(teks);
                $('#'+thid).find('input[type="hidden"]').val(tval);
        })
    }

    $(document).on('click', '.detail-form .select-input', function(){
        var thid = $(this).attr('id');
        if( $('#'+thid).hasClass('active') ){
            $('.select-input').find('input[type="text"]').removeClass('selected');
            $('.select-input').find('.select-form').slideUp('fast');
            $('#'+thid).removeClass('active')
        }else{
            $('.select-input').removeClass('active')
            $('#'+thid).addClass('active')
            $('.select-input').find('input[type="text"]').removeClass('selected');
            $('.select-input').find('.select-form').slideUp('fast');
            $('#'+thid+' .select-form').slideDown('fast');
            $('#'+thid+' input').addClass('selected');
        }
    })

    $(document).on('click', '.detail-form .select-form .option-form', function(){
        var teks = $(this).text();
        var tval = $(this).attr('value');
        var thid = $(this).closest('.clearfix').attr('id');
            $('.detail-form #'+thid).find('input').val(teks)
            $('.detail-form #'+thid).find('input[type="hidden"]').val(tval)
            $('.detail-form #'+thid).find('.option-form').removeClass('here');
            $(this).addClass('here');

    	var n = thid.split('-')[2];
        if( teks == 'EDC' ){

        	$('.payment-box#payment-'+n).find('#target-payment').append(''
		        +' 		<div id="payment-target-'+n+'">'
		        +''
				+'			<div class="col-sm-6" style="padding-left: 0;padding-right: 50px;">'
				+'	          <div class="auth-form detail-form">'
				+'				<label for="">Card Type</label>'
				+'				<div class="clearfix select-input" id="payment-card-'+n+'">'
				+'					<!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
				+'					<input type="text" name="room_no" required="" placeholder="Select the card type" disabled="" class="">'
				+'					<div class="arrow"></div>'
				+'					<div class="select-form" style="display: none;">'
				+'					  <!-- Beri class here untuk option yang match -->'
				+'					  <div class="option-form" value="224">224</div>'
				+'					  <div class="option-form" value="225">225</div>'
				+'					  <div class="option-form" value="226">226</div>'
				+'					  <div class="option-form" value="227">227</div>'
				+'					</div>'
				+'					<input type="hidden" name="room_no" required="" id="select-form" class="selected" value="224">'
				+'					<div class="error">Please fill the box above</div>'
				+'				</div>'
				+''
				+'			  </div>'
				+'			</div>'
				+'			<div class="col-sm-6" style="padding-left: 50px;padding-right: 0;">'
				+'	          <div class="auth-form detail-form">'
				+''
				+'				<label for="">Bank Issuer</label>'
				+'				<div class="clearfix select-input" id="payment-bank-'+n+'">'
				+'					<!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
				+'					<input type="text" name="room_no" required="" placeholder="Select the bank issuer" disabled="" class="">'
				+'					<div class="arrow"></div>'
				+'					<div class="select-form" style="display: none;">'
				+'					  <!-- Beri class here untuk option yang match -->'
				+'					  <div class="option-form" value="224">224</div>'
				+'					  <div class="option-form" value="225">225</div>'
				+'					  <div class="option-form" value="226">226</div>'
				+'					  <div class="option-form" value="227">227</div>'
				+'					</div>'
				+'					<input type="hidden" name="room_no" required="" id="select-form" class="selected" value="224">'
				+'					<div class="error">Please fill the box above</div>'
				+'				</div>'
				+''
				+'			  </div>'
				+'			</div>'
				+''
				+'			<div class="col-sm-4" style="padding-left: 0px;padding-right: 25px;">'
				+'	          <div class="auth-form detail-form">'
				+''
				+'				<label for="">Card Holder Name</label>'
				+'				<div class="clearfix select-input">'
				+'	                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
				+'	                <input type="text" name="amount" required="" placeholder="Enter the card holder name" class="" id="amount">'
				+'	                <div class="clear"></div>'
				+'	                <div class="error">Please fill the box above</div>'
				+'	            </div>'
				+'	          </div>'
				+'	        </div>'
				+''
				+'			<div class="col-sm-4" style="padding-left: 25px;padding-right: 25px;">'
				+'	          <div class="auth-form detail-form">'
				+''
				+'				<label for="">Card Number</label>'
				+'				<div class="clearfix select-input">'
				+'	                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
				+'	                <input type="text" name="amount" required="" placeholder="Enter card number" class="" id="amount">'
				+'	                <div class="clear"></div>'
				+'	                <div class="error">Please fill the box above</div>'
				+'	            </div>'
				+'	          </div>'
				+'	        </div>'
				+''
				+'			<div class="col-sm-4" style="padding-left: 25px;padding-right: 0;">'
				+'	          <div class="auth-form detail-form">'
				+''
				+'				<label for="">Batch</label>'
				+'				<div class="clearfix select-input">'
				+'	                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
				+'	                <input type="text" name="amount" required="" placeholder="Enter batch" class="" id="amount">'
				+'	                <div class="clear"></div>'
				+'	                <div class="error">Please fill the box above</div>'
				+'	            </div>'
				+'	          </div>'
				+'	        </div>'
				+''
				+'	    </div>'
				+'');

        }else{

        	$('#payment-target-'+n).remove()

        }

    })

	$(window).on('load', function(){
		$('.select-details').find('.option[value="'+ $('.index-details').text() +'"]').addClass('selected')
		option_detail_here()
	})


$(document).on('click', '#add-payment', function(){
	var n = 1
	if( $('#payment').find('.payment-box').length > 0 ){
		var n = parseInt( $('#payment').find('.payment-box:last-child').attr('id').split('-')[1] ) + 1
	}
	$('#payment').append(''
		+'	<div class="payment-box" id="payment-'+n+'">'
		+''
		+'		<div class="title-w-button">'
		+'		<h5 class="bold">'
		+'			Add Payment'
		+'			<div class="pull-right">'
		+'				<button id="delete-payment" class="hero-button delete">Delete Payment '+n+'</button>'
		+'			</div>'
		+'		</h5>'
		+'		</div>'
		+'    	    	<div class="clearfix" style="margin-top:15px;" id="target-payment">'
		+''
		+'			<div class="col-sm-6" style="padding-left: 0;padding-right: 50px;">'
		+'	          <div class="auth-form detail-form">'
		+''
		+'				<label for="">Payment Method</label>'
		+'				<div class="clearfix select-input" id="payment-method-'+n+'">'
		+'					<!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
		+'					<input type="text" name="room_no" required="" placeholder="Select the payment method" disabled="" class="">'
		+'					<div class="arrow"></div>'
		+'					<div class="select-form" style="display: none;">'
		+'					  <!-- Beri class here untuk option yang match -->'
		+'					  <div class="option-form" value="EDC">EDC</div>'
		+'					  <div class="option-form" value="Cash">Cash</div>'
		+'					</div>'
		+'					<input type="hidden" name="room_no" required="" id="input-payment-'+n+'" class="selected" value="224">'
		+'					<div class="error">Please fill the box above</div>'
		+'				</div>'
		+''
		+'			  </div>'
		+'			</div>'
		+'			<div class="col-sm-6" style="padding-left: 50px;padding-right: 0;">'
		+'	          <div class="auth-form detail-form">'
		+''
		+'				<label for="">Amount</label>'
		+'				<div class="clearfix select-input">'
		+'	                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
		+'	                <input type="text" name="amount" required="" placeholder="Enter the amount" class="" id="amount">'
		+'	                <div class="clear"></div>'
		+'	                <div class="error">Please fill the box above</div>'
		+'	            </div>'
		+''
		+'			  </div>'
		+'			</div>'
		+''
		+'	</div>'
		+'');
})


$(document).on('click', '#delete-payment', function(){
	$(this).closest('.payment-box').remove()
})

// $('#cannot-checkout').modal('show')
// $('#checkout-guest').modal('show')

    var magic_front = $('#magic-table-departures').DataTable( {
        'paging':   true,
        'ordering': true,
        'info':     false,
        'language': {
            'zeroRecords': 'Sorry, we cannot help you to find what you\'re looking for. Try another word may help us to help you :)'
        }
    } );

    $('#magic-search-departures').on('keyup', function () {
        magic_front.search( this.value ).draw();
        var searc = magic_front.search( this.value ).draw();
    } );

        magic_front.page.len( 12 ).draw();

    $(document).on('click', '#content-list-type li', function(){
        var teks = $(this).attr('value');
            if( teks == 'All' ){
                magic_front.page.len( -1 ).draw();
            }else{
		        // magic_front.columns( 5 ).search( teks ).draw();
		        magic_front.search( teks ).draw();
            }

        $('.content-list-type #sel_filter').text(teks);
        $('.content-list-type ul._filter li').removeClass('here');
        $(this).addClass('here');
            $('.list-table').hide();
            $('.selection').removeClass('opened');
    })

    $(document).on('click', '#content-list-length li', function(){
        var teks = $(this).attr('value');
            if( teks == 'All' ){
                magic_front.page.len( -1 ).draw();
            }else{
                magic_front.page.len( teks ).draw();
            }
    })

	$(document).on('click', 'body', function(){
		if( $('.select-check-date').find('.datepicker').selector != ".select-check-date .datepicker" ){
			$('.select-check-date').removeClass('checked')
            bliss_log( this, "trigger hide di body bro");
            bliss_log( this, "trigger hide di body bro");
		}else{
			// $('.select-check-date').addClass('checked')
            // bliss_log( this, "trigger show di body bro");
		}
	})

	$(document).on('click', '.select-check-date input', function(){
        bliss_log(this, "$(document).on('click', '.select-check-date input', function(){");
		if( $(this).closest('.select-check-date').hasClass('checked') ){
			$(this).closest('.select-check-date').removeClass('checked')
    		$('.select-datepicker').datepicker('hide')
            bliss_log("trigger .select-check-date input");
		}else{
			$(this).closest('.select-check-date').addClass('checked')
    		$('.select-datepicker').datepicker('show')
		}
	})

    $('.select-datepicker').datepicker({
        container: '.select-check-date',
        orientation: 'bottom left',
        format: 'd M yyyy',
        autoclose: true
    });

    $(document).on('change', '.select-datepicker', function(){
        bliss_log( this, "$(document).on('change', '.select-datepicker', function(){");
    	$(this).closest('.select-check-date').find('b').text( this.value )
		$(this).closest('.select-check-date').removeClass('checked')

	    // columns(2) == check-in
	    magic_front.columns( 2 ).search( this.value, true, false ).draw();
	    // https://datatables.net/reference/api/column().search()
    })


// ============================================
// 					arrival
// ============================================
// $('#edit-guest_arrival_save').modal('show')

$('#edit-guest_arrival').on('show.bs.modal', function (event) {
	var trid = $('table#edit-guest')
	var first_name = trid.find('td[for="first-name"]').text()
	var last_name = trid.find('td[for="last-name"]').text()
	var id_number = trid.find('td[for="id-number"]').text()
	var phone_number = trid.find('td[for="phone"]').text()
	var email = trid.find('td[for="email"]').text()
	var address = trid.find('td[for="address"]').text()
	var postage_code = trid.find('td[for="postage"]').text()
	var country = trid.find('td[for="country"]').text()
	var birth = trid.find('td[for="birth"]').text()

	var modal = $('.modal#edit-guest_arrival')
	modal.find('#first-name').val(first_name)
	modal.find('#last-name').val(last_name)
	modal.find('#id-number').val(id_number)
	modal.find('#phone-number').val(phone_number)
	modal.find('#email').val(email)
	modal.find('#address').val(address)
	modal.find('#postage-code').val(postage_code)
	forceSelect(modal.find('#country'), country)
	// modal.find('#country input').val(country)
	// modal.find('#country .option[value="'+country+'"]').addClass('here')
	modal.find('.datepicker-birth').val(birth)
    modal.find('.datepicker-birth').datepicker({
        container: '.modal #birth',
        orientation: 'top left',
        format: 'd M yyyy',
        autoclose: true,
    });
})

///////// FORM AJAX ///////////

$('#form-create-bed-type').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Create Bed Type', 'Are you sure? You are about to create bed type',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#create-bed-type').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-edit-bed-type').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Bed Type', 'Are you sure? You are about to edit bed type',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#edit-bed-type').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-remove-bed-type').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

                spinnerHide(modalInput);

        },
        error: function (err) {
                showError(err);
                spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-remove-room-type').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

                spinnerHide(modalInput);

        },
        error: function (err) {
                showError(err);
                spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
	bliss_log( this, "trigger");
    e.preventDefault();
});

$('#form-remove-room').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

                spinnerHide(modalInput);

        },
        error: function (err) {
                showError(err);
                spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
	bliss_log( this, "trigger");
    e.preventDefault();
});

$('#form-remove-prep').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

                spinnerHide(modalInput);

        },
        error: function (err) {
                showError(err);
                spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
	bliss_log( this, "trigger");
    e.preventDefault();
});

//Delete Menu
$('#form-remove-menu').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

                spinnerHide(modalInput);

        },
        error: function (err) {
                showError(err);
                spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
	bliss_log( this, "trigger");
    e.preventDefault();
});
//Delete Menu

$('#form-create-room').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Create Room List', 'Are you sure? You are about to create room list',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#create-list').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
	bliss_log( this, "trigger");
    e.preventDefault();
});

$('#form-edit-room').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Room List', 'Are you sure? You are about to edit room list',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#edit-list').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
	bliss_log( this, "trigger");
    e.preventDefault();
});


$(document).on('click', '.save-data', function (event) {
	bliss_log( this, "work!");
	var attr = $(this).attr("data-attribute");
    var form = $("#form-update-room-"+attr);
    var formData = form.serialize();

    $(this).val('');
    $(this).prop('disabled', true);
    $(this).addClass('spinner');

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()", form[0]);
            $(this).removeClass('spinner');
            $(this).prop('disabled', false);
            $(this).val('Save');
        },
        error: function () {
            alert("Something went wrong");
            $(this).removeClass('spinner');
            $(this).prop('disabled', false);
            $(this).val('Save');
        }
    });
})

$('#form-create-room-type').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Create Room Type', 'Are you sure? You are about to create room type',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button

    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#create-room-type').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-edit-room-type').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Room Type', 'Are you sure? You are about to edit room type',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button

    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#edit-room-type').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-remove-payment-setting').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

	            spinnerHide(modalInput);

        },
        error: function (err) {
	            showError(err);
	            spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-create-payment-setting').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Create Payment', 'Are you sure? You are about to create the payment',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button

    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#create-payment').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-edit-payment-setting').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Payment', 'Are you sure? You are about to edit the payment',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button

    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#update-payment').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-edit-pricing-parameter').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Update Pricing Parameters', 'Are you sure? You are about to update the pricing parameters.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

function getNewPriceList(ele) {
    bliss_log( this, "get new list");
    var form = $(ele).closest("form");
    var formData = form.serialize();
    console.log(form, "work!");
    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            var newContent = "";
            newContent += ' <thead>                                                     \
                				<tr>                                                    \
                					<td colspan="8">                                    \
                						<span class="cal-prev" id="cal-move"></span>    \
                						<span id="text">'+ pretty_date(res[0].start_date) +' - '+ pretty_date(res[0].end_date) +'</span>  \
                						<span class="cal-next" id="cal-move"></span>    \
                					</td>                                               \
                				</tr>                                                   \
                			</thead>';
            for ( room_type_index=0; room_type_index < res.length; room_type_index++ )
            {
                room_data = res[room_type_index];
                newContent += ' <tbody class="tbody"> \
                                    <tr class="index"> \
 		                                <td>'+ room_data.label +'</td> \
                                        ';
                totalDays = getDiffDays(getDate(res[0].start_date), getDate(res[0].end_date) );
                bliss_log(this, "total Days", totalDays);
                for (dateIndex = 1; dateIndex <= totalDays; dateIndex++) {
                    newDate = addDays(res[0].start_date, dateIndex);
                    newContent += "<td>"+ getPrettyDay(newDate) +"\n<br />"+ newDate.getDate() +" "+ getPrettyMonth(newDate) +"</td>\n";
                }
                newContent += '</tr>';
                newContent += '<tr class="list"';
			// 		<td>SUN<br />1 Aug</td>
			// 		<td>MON<br />2 Aug</td>
			// 		<td class="today">TUE<br />3 Aug</td>
			// 		<td>WED<br />4 Aug</td>
			// 		<td>THU<br />5 Aug</td>
			// 		<td>FRI<br />6 Aug</td>
			// 		<td>SAT<br />7 Aug</td>
			// 	</tr>
			// <?php for($x=1;$x<4;$x++){ ?>
			// 	<tr class="list">
			// 		<td>Tier <?php echo $x ?></td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td class="today">IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 	</tr>
			// <?php } ?>
			// </tbody>
            //
			// <tbody class="tbody">
			// 	<tr class="index">
			// 		<td>Premiere Room</td>
			// 		<td>SUN<br />1 Aug</td>
			// 		<td>MON<br />2 Aug</td>
			// 		<td class="today">TUE<br />3 Aug</td>
			// 		<td>WED<br />4 Aug</td>
			// 		<td>THU<br />5 Aug</td>
			// 		<td>FRI<br />6 Aug</td>
			// 		<td>SAT<br />7 Aug</td>
			// 	</tr>
            //
			// <?php for($x=1;$x<4;$x++){ ?>
			// 	<tr class="list">
			// 		<td>Tier <?php echo $x ?></td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td class="today">IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 		<td>IDR<br />5,000,000</td>
			// 	</tr>
			// <?php } ?>
            //
			// </tbody>
            // $(".table-calendar")
            }
            // console.log(newContent);
        },
        error: function (err) {
	        showError(err);
        }
    });
}

$('#form-create-price-master').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)
    show_message_confirm('Create Master Price', 'Are you sure? You are about to create master price.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                $.ajax({
                    url: form.attr("action"),
                    type: form.attr("method"),
                    data: formData,
                    success: function (data) {
                        var res = JSON.parse(data);
                        process_result(res, "location.reload()");

                        spinnerHide(modalInput);

                    },
                    error: function (err) {
                        showError(err);
                        spinnerHide(modalInput);
                    }
                });
            }
            else {
                // When click Cancel button
                spinnerHide(modalInput);
            }
        }
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-upload-price-master').on('beforeSubmit', function(e) {
    var form = $(this);
    var data = new FormData(form[0]);

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)
    show_message_confirm('Upload Master Price', 'Are you sure? You are about to upload master price.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                $.ajax({
                    url: form.attr("action"),
                    type: form.attr("method"),
                    data: data,
                    async: false,
                    success: function (data) {
                        var res = JSON.parse(data);
                        process_result(res, "location.reload()");
                        spinnerHide(modalInput);

                    },
                    error: function (err) {
                        showError(err);
                        spinnerHide(modalInput);
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }
            else {
                // When click Cancel button
                spinnerHide(modalInput);
            }
        }
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-remove-price-request').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

	            spinnerHide(modalInput);

        },
        error: function (err) {
	            showError(err);
	            spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-update-price-request').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Update Price', 'Are you sure? You are about to update the price.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#price-man-update').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});


$('#form-create-partner').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Create Partner', 'Are you sure? You are about to create the partner.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#create-new-partner').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-update-partner').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Data Partner', 'Are you sure? You are about to edit the partner.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#price-man-update').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-remove-partner').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

	            spinnerHide(modalInput);

        },
        error: function (err) {
	            showError(err);
	            spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-create-voucher').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Create New Voucher', 'Are you sure? You are about to create the voucher.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#create-new-voucher').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});


$('#form-update-voucher').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Voucher', 'Are you sure? You are about to edit the voucher.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#mark-request-edit').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-remove-voucher').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Delete Voucher', 'Are you sure? You are about to delete the voucher.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-create-marketplace').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Create Marketplace', 'Are you sure? You are about to create marketplace.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#create-new-marketplace').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-update-marketplace').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Marketplace', 'Are you sure? You are about to edit marketplace.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "$('#edit-marketplace').modal('hide'); location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-remove-marketplace').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Delete Marketplace', 'Are you sure? You are about to delete marketplace.',
        function(event, e){
            bliss_log( this, "run!");
    		if( $(event.target).attr('name') == 'submit' ){
                // When click Submit Button
    		    $.ajax({
    		        url: form.attr("action"),
    		        type: form.attr("method"),
    		        data: formData,
    		        success: function (data) {
    		            var res = parseJSON(data);

    		            process_result(res, "location.reload()", form[0]);
    					// $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

    		        },
    		        error: function (err) {
                        showError(err);
    		            spinnerHide(modalInput);
    		        }
    		    });
    		}else{
                // When click Cancel button
                spinnerHide(modalInput);
    		}
    	}
    );
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-create-additional-charge').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

	            spinnerHide(modalInput);

        },
        error: function (err) {
	            showError(err);
	            spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-update-additional-charge').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

                spinnerHide(modalInput);

        },
        error: function (err) {
                showError(err);
                spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
    e.preventDefault();
});

$('#form-remove-additional-charge').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

            spinnerHide(modalInput);

        },
        error: function (err) {
            showError(err);
            spinnerHide(modalInput);
        }
    });
}).on('submit', function(e){
    e.preventDefault();
});


function processRequest(requestType, idNumber = null) {
	bliss_log( this, requestType,idNumber);

    var form = $("#form-price-request");
    var formData = form.serialize() + "&action=" + requestType + "&single=" + idNumber;

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function (data) {
            var res = JSON.parse(data);
            process_result(res, "$('location.reload()");

        },
        error: function () {
            alert("Something went wrong");
        }
    });
}




// ==================== PRICE =========================================

	// require moment.js & datetimepicker.js
	$(document).on('focus', '.datetime', function(){
		var id = $(this).attr('id')
	    $('#'+id).datetimepicker({
	    	format: 'HH:mm:ss'
	    });
	});

	//-> pricing-parameter
	// $('#update-pricing-parameters').modal('show')

	//-> price-management
	$('#create-additional-charge').on('show.bs.modal', function (event) {

		csrfToken = $("input[name=_csrf]").val();
		var modal = $('.modal#create-additional-charge');
		modal.find(".auth-form").html("");
	    $.ajax({
	        url: homeUrl + "hotel/additional_charge_create_content",
	        type: "POST",
	        data: "_csrf=" + csrfToken,
	        success: function (data) {
	        	res = JSON.parse(data);
				bliss_log( this, res);
	        	form = modal.find(".auth-form");
	        	for ( index = 0 ; index < res.length; index++ ) {
	        		if ( res[index].type == "input" ) {
			            form.append('\
					          <label for="">'+res[index].label+'</label> \
					          <div class="clearfix"> \
					            <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
					            <input type="text" name="'+res[index].name+'" required="" placeholder="Enter '+ res[index].label.toLowerCase() +'" class=""> \
					            <div class="clear"></div> \
					            <div class="error">Please fill the box above</div> \
					          </div>\
			        		');
	        		}
					else if ( res.type = "dropdown" ) {
						select_option = "";
						for ( option_no = 0; option_no < res[index].value.length ; option_no++ ) {
							select_option += '<div class="option" value="'+ res[index].value[option_no].id+'">'+res[index].value[option_no].label+'</div>';
						}
						form.append('\
							<label for="">'+res[index].label+'</label> \
				              <div class="clearfix select-input" id="charge-type"> \
				                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
				                <input type="text" name="'+res[index].name+'" required="" placeholder="Enter '+res[index].label.toLowerCase()+'" disabled class=""> \
				                <div class="arrow"></div> \
				                <div class="select" style="display: none;"> \
				                  <!-- Beri class here untuk option yang match --> '
								  + select_option +
				                '</div> \
				                <input type="hidden" name="'+res[index].name+'" required="" id="select" class="selected"> \
				                <div class="error">Please fill the box above</div> \
				              </div>\
						  ')
					}
	        	}
	        	bliss_log( this, res);
				$('.loading').fadeOut('slow')

	        },
	        error: function () {
				$('.loading').fadeOut('slow')
	            alert("Something went wrong");
	        }
	    });


		// modal.find('div[for="room-type"]').text(_type)

	})

	//-> additional-charge
	$('#update-additional').on('show.bs.modal', function (event) {
		var modal = $('.modal#update-additional');
		var _tr = $(event.relatedTarget).closest('tr');
		var data_id = "";
		var data_value = "";
		csrfToken = $("input[name=_csrf]").val();
		modal.find(".auth-form").html("");
		modal.find(".auth-form").append('<input type="hidden" name="charge_id" value="'+_tr.attr("code")+'" />');
	    $.ajax({
	        url: homeUrl + "hotel/additional_charge_create_content",
	        type: "POST",
	        data: "_csrf=" + csrfToken,
	        success: function (data) {
	        	res = JSON.parse(data);
				bliss_log( this, res);
	        	form = modal.find(".auth-form");
	        	for ( index = 0 ; index < res.length; index++ ) {
					bliss_log( this, 'data-'+res[index].name, _tr.find('td[data-'+res[index].name+']').attr('data-'+res[index].name));
	        		if ( res[index].type == "input" ) {
			            form.append('\
					          <label for="">'+res[index].label+'</label> \
					          <div class="clearfix"> \
					            <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
					            <input type="text" name="'+res[index].name+'" required="" placeholder="Enter '+ res[index].label.toLowerCase() +'" class="" value="'+_tr.find('td[data-'+res[index].name+']').attr('data-'+res[index].name)+'"> \
					            <div class="clear"></div> \
					            <div class="error">Please fill the box above</div> \
					          </div>\
			        		');
	        		}
					else if ( res.type = "dropdown" ) {
						select_option = "";
						class_here = "";
						for ( option_no = 0; option_no < res[index].value.length ; option_no++ ) {
							if ( res[index].value[option_no].label == _tr.find('td[data-'+res[index].name+']').attr('data-'+res[index].name) ) {
								data_id = res[index].value[option_no].id;
								data_value = res[index].value[option_no].label;
								bliss_log( this, "work",data_id,data_value)
								class_here = " here";
							}
							select_option += '<div class="option'+class_here+'" value="'+ res[index].value[option_no].id+'">'+res[index].value[option_no].label+'</div>';
						}
						form.append('\
							<label for="">'+res[index].label+'</label> \
				              <div class="clearfix select-input" id="charge-type"> \
				                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
				                <input type="text" name="'+res[index].name+'" required="" placeholder="Enter '+res[index].label.toLowerCase()+'" disabled value="'+data_value+'" class=""> \
				                <div class="arrow"></div> \
				                <div class="select" style="display: none;"> \
				                  <!-- Beri class here untuk option yang match --> '
								  + select_option +
				                '</div> \
				                <input type="hidden" name="'+res[index].name+'" required="" value="'+data_id+'" id="select" class="selected"> \
				                <div class="error">Please fill the box above</div> \
				              </div>\
						  ')
					}
	        	}
	        	bliss_log( this, res);
				$('.loading').fadeOut('slow')

	        },
	        error: function () {
				$('.loading').fadeOut('slow')
	            alert("Something went wrong");
	        }
	    });
	})


	$('#delete-additional').on('show.bs.modal', function (event) {
		var _tr = $(event.relatedTarget).closest('tr');
		var modal = $(".modal#delete-additional");
		modal.find('input[name="charge_id"]').val(_tr.attr("code"));
	})

	// $('#rename-confirm-additional').modal('show')
	// $('#create-confirm-additional').modal('show')
	// $('#create-confirm-payment').modal('show')
	// $('#update-confirm-payment').modal('show')

	//-> payment-settings
	// TO DO FIX SELECT OPTION AFTER AJAX
	$('#create-payment').on('show.bs.modal', function (event) {
		var payment_select = $('#payment-select');
		option_list = payment_select.find('.option')
		if ( option_list.length == 0 ) {
	        csrfToken = $("input[name=_csrf]").val();
	        $.ajax({
	            url: homeUrl + "hotel/payment_method_list",
	            type: "POST",
	            data: "_csrf=" + csrfToken,
	            success: function (data) {
	            	payment_method = JSON.parse(data).type_suggestions;
	            	for( index = 0; index < payment_method.length; index++) {
	            		payment_select.append('<div class="option" value="'+payment_method[index].id+'">'+payment_method[index].label+'</div>');
	            	}
	            	bliss_log( this, payment_method)
	            },
	            error: function () {
	                alert("Something went wrong");
	            }
	        });
		}
	})

	$('#update-payment').on('show.bs.modal', function (event) {
		var payment_select = $('#payment-update-select');
		option_list = payment_select.find('.option')
		// if ( option_list.length == 0 ) {
	        csrfToken = $("input[name=_csrf]").val();
	        $('.loading').fadeIn()
	        $.ajax({
	            url: homeUrl + "hotel/payment_method_list",
	            type: "POST",
	            data: "_csrf=" + csrfToken,
	            success: function (data) {
					var trid = $(event.relatedTarget).closest('tr')
					bliss_log( this, trid);
					var _name = trid.find('td[data-name]').attr('data-name')
					var _type = trid.find('td[data-type]').attr('data-type')
					// bliss_log( this, _name,_type)

					var modal = $('.modal#update-payment')
					modal.find('#payment-name').val(_name)
					modal.find('#payment-type input[type="text"]').val(_type)
					modal.find('input[name="payment_id"]').val(trid.attr("code"));
					bliss_log( this, trid.attr("code"));
					// modal.find('#payment-type .option[value="'+_type+'"]').addClass('here')
	            	payment_method = JSON.parse(data).type_suggestions;
	            	for( index = 0; index < payment_method.length; index++) {
	            		if( _type == payment_method[index].label ){
		            		payment_select.append('<div class="option here" value="'+payment_method[index].id+'">'+payment_method[index].label+'</div>');
							modal.find('#payment-type input[type="hidden"]').val(payment_method[index].id)
		            		bliss_log( this, payment_method[index].label)
	            		}else{
		            		payment_select.append('<div class="option" value="'+payment_method[index].id+'">'+payment_method[index].label+'</div>');
	            		}
	            	}
			        $('.loading').fadeOut('fast')
	            },
	            error: function () {
			        $('.loading').fadeOut('fast')
	                alert("Something went wrong");
	            }
	        });
		// }
		// else {
		// 	var trid = $(event.relatedTarget).closest('tr')
		// 	var _name = trid.find('td[data-name]').attr('data-name')
		// 	var _type = trid.find('td[data-type]').attr('data-type')

		// 	var modal = $('.modal#update-payment')
		// 	modal.find('#payment-name').val(_name)
		// 	modal.find('#payment-type input').val(_type)
		// 	modal.find('#payment-type .option[value="'+_type+'"]').addClass('here')
		// }
	})

	$('#update-payment').on('hidden.bs.modal', function (event) {
		var modal = $('.modal#update-payment')
		modal.find('#payment-name').val('')
		modal.find('#payment-type input').val('')
		modal.find('#payment-type .option').remove()
		modal.find('#payment-type .option').removeClass('here')
	})

	$('#delete-payment').on('show.bs.modal', function (event) {
		var trid = $(event.relatedTarget).closest('tr')
		var _code = trid.attr('code')
		var modal = $('.modal#delete-payment')
		modal.find('#payment_id').val(_code);
	})


	//-> price-management
	$('#price-man-view').on('show.bs.modal', function (event) {
		var trid = $(event.relatedTarget).closest('tr')
		var _type = trid.find('td[data-type]').attr('data-type')
		var _tier = trid.find('td[data-tier]').attr('data-tier')
		var _price = trid.find('td[data-price]').attr('data-price')
		var _start = trid.find('td[data-start]').attr('data-start')
		var _end = trid.find('td[data-end]').attr('data-end')
		var _rate = trid.find('td[data-rate]').attr('data-rate')
		var _request = trid.find('td[data-request]').attr('data-request')
		var _date = trid.find('td[data-date]').attr('data-date')
		var _public = trid.find('td[data-public]').attr('data-public')

		var modal = $('.modal#price-man-view')
		modal.find('div[for="room-type"]').text(_type)
		modal.find('div[for="tier"]').text(_tier)
		modal.find('div[for="rate"]').text(_rate)
		modal.find('div[for="room-start"]').text(_start)
		modal.find('div[for="room-end"]').text(_end)
		modal.find('div[for="price"]').text(_price)
		modal.find('div[for="public"]').text(_public)
		modal.find('div[for="requested"]').html(_request+', <br>'+_date)

	})

	$('#price-man-update').on('show.bs.modal', function (event) {
		var trid = $(event.relatedTarget).closest('tr')
		var request_id = $(event.relatedTarget).attr("data-id")
		var _type = trid.find('td[data-type]').attr('data-type')
		var _tier = trid.find('td[data-tier]').attr('data-tier')
		var _price = trid.find('td[data-price]').attr('data-price')
		var _start = trid.find('td[data-start]').attr('data-start')
		var _end = trid.find('td[data-end]').attr('data-end')
		var _rate = trid.find('td[data-rate]').attr('data-rate')
		// var _request = trid.find('td[data-request]').attr('data-request')
		// var _date = trid.find('td[data-date]').attr('data-date')
		// var _public = trid.find('td[data-public]').attr('data-public')
		// var _plan = trid.find('td[data-plan]').attr('data-plan')

		var modal = $('.modal#price-man-update')
		modal.find('input[name="price_request_id"]').val(request_id)
		forceSelect(modal.find('#room-type'), _type)
		forceSelect(modal.find('#tier'), _tier)
		forceSelect(modal.find('#rate'), _rate)
		modal.find('#room-price').val(_price)
		modal.find('#start-date').val(_start)
		modal.find('#end-date').val(_end)
		modal.find('#date-here').val(_start+' - '+_end)
		// if(_public == 'Yes'){
		// 	modal.find('#breakfast').prop('checked', true)
		// }
		// modal.find('#rate-plan input').val(_plan)
		// modal.find('#rate-plan .option[value="'+_plan+'"]').addClass('here')
	})

	$('#price-man-update').on('hidden.bs.modal', function(e) {
		$('#'+e.currentTarget.id).find('input').val('')
		$('#'+e.currentTarget.id).find('input').removeClass('selected')
		$('#'+e.currentTarget.id).find('.option').removeClass('here')
		$('#'+e.currentTarget.id).find('.select').slideUp()
	})

	$('#price-man-delete').on('show.bs.modal', function (event) {
		id = $(event.relatedTarget).attr("data-id");
		var modal = $('.modal#price-man-delete');
		modal.find("#request-id").val(id);
	})

	$('#price-man-view-request').on('show.bs.modal', function (event) {
		var trid = $(event.relatedTarget).closest('tr')
		var _type = trid.find('td[data-type]').attr('data-type')
		var _tier = trid.find('td[data-tier]').attr('data-tier')
		var _price = trid.find('td[data-price]').attr('data-price')
		var _start = trid.find('td[data-start]').attr('data-start')
		var _end = trid.find('td[data-end]').attr('data-end')
		var _rate = trid.find('td[data-rate]').attr('data-rate')
		var _request = trid.find('td[data-request]').attr('data-request')
		var _date = trid.find('td[data-date]').attr('data-date')
		var _public = trid.find('td[data-public]').attr('data-public')
		var _status = trid.find('td[data-status]').attr('data-status')

		var modal = $('.modal#price-man-view-request')
		modal.find('div[for="room-type"]').text(_type)
		modal.find('div[for="tier"]').text(_tier)
		modal.find('div[for="rate"]').text(_rate)
		modal.find('div[for="room-start"]').text(_start)
		modal.find('div[for="room-end"]').text(_end)
		modal.find('div[for="price"]').text(_price)
		modal.find('div[for="public"]').text(_public)
		modal.find('div[for="requested"]').html(_request+', <br>'+_date)
		modal.find('div[for="status"]').text(_status)

	})



	$('#price-man-view-logs').on('show.bs.modal', function (event) {
		var trid = $(event.relatedTarget).closest('tr')
		var _type = trid.find('td[data-type]').attr('data-type')
		var _tier = trid.find('td[data-tier]').attr('data-tier')
		var _price = trid.find('td[data-price]').attr('data-price')
		var _start = trid.find('td[data-start]').attr('data-start')
		var _end = trid.find('td[data-end]').attr('data-end')
		var _rate = trid.find('td[data-rate]').attr('data-rate')
		var _request = trid.find('td[data-request]').attr('data-request')
		var _date = trid.find('td[data-date]').attr('data-date')
		var _date_ = trid.find('td[data-date-approve]').attr('data-date-approve')
		var _public = trid.find('td[data-public]').attr('data-public')
		var _status = trid.find('td[data-status]').attr('data-status')
		var _approve = trid.find('td[data-approve]').attr('data-approve')

		var modal = $('.modal#price-man-view-logs')
		modal.find('div[for="room-type"]').text(_type)
		modal.find('div[for="tier"]').text(_tier)
		modal.find('div[for="rate"]').text(_rate)
		modal.find('div[for="room-start"]').text(_start)
		modal.find('div[for="room-end"]').text(_end)
		modal.find('div[for="price"]').text(_price)
		modal.find('div[for="public"]').text(_public)
		modal.find('div[for="requested"]').html(_request+', <br>'+_date)
		modal.find('div[for="status"]').text(_status)

		if(_status == 'Approved'){
			modal.find('#approve').text('Approved By')
		}else if(_status == 'Rejected'){
			modal.find('#approve').text('Rejected By')
		}

		modal.find('div[for="approved"]').html(_approve+', <br>'+_date_)

	})

	// $('#update-price').modal('show')


	// $(document).on('click', 'body', function(){
	// 	if( $('.datetime-box').is(':visible') ){
	// 		$('.select-date-time').removeClass('checked')
	// 		$('.datetime-box').hide()
	// 	}else{
	// 		$('.select-date-time').addClass('checked')
	// 		$('.datetime-box').show()
	// 	}
	// })


	$(document).on('click', '.datetime-button', function(){
		if( $(this).closest('.select-date-time').hasClass('checked') ){
            bliss_log( this, "trigger hide bro");
            getNewPriceList(this);
			$(this).closest('.select-date-time').removeClass('checked')
            $('#assignment-date').find('.datetime-box').removeAttr('active')
			$(this).closest('.select-date-time').find('.datetime-box').hide()
    		$(this).closest('.select-date-time').find('.datetime-calendar').datepicker('hide')
    		$(this).closest('.select-date-time').find('.datetime-calendar-end').datepicker('hide')
		}else{
            bliss_log( this, "trigger show bro");
			$(this).closest('.select-date-time').addClass('checked')
			$(this).closest('.select-date-time').find('.datetime-box').show()
			$(this).closest('.select-date-time').find('.datetime-box-end').show()

    		if( ( $(this).closest('.select-date-time').find('.datetime-calendar').find('.disable').length > 0) || ( $(this).closest('.select-date-time').find('.datetime-calendar-end').find('.disable').length > 0) ){
				$(this).closest('.select-date-time').find('.datetime-calendar-end').find('.day').addClass('disable')
				$(this).closest('.select-date-time').find('.datetime-calendar-end').find('.active').removeClass('disable')
				$(this).closest('.select-date-time').find('.datetime-calendar-end').find('.enable').removeClass('disable')
    		}else{

	    		$(this).closest('.select-date-time').find('.datetime-calendar').datepicker()

	    		if( $(this).closest('.select-date-time').find('.select-date-time').find('b').text() == 'Click Here' ){
		    		$(this).closest('.select-date-time').find('.datetime-calendar-end').datepicker('setDate','+1m')
		    		$(this).closest('.select-date-time').find('.datetime-calendar-end').find('.active').removeClass('active')
		    		$(this).closest('.select-date-time').find('.calendar-end-datetime').val('')
	    		}
    		}
  //   		// $('.datetime-calendar-end').datepicker('setStartDate','+1w')
		}
	})

    $('.calendar-datetime').datepicker({
        container: '.datetime-calendar',
        orientation: 'bottom left',
        format: 'd M yyyy',
        autoclose: false
    });

    $('.calendar-end-datetime').datepicker({
        container: '.datetime-calendar-end',
        orientation: 'bottom left',
        format: 'd M yyyy',
        autoclose: false,
    });

    $(document).on('change', '.select-datetime', function(){
    	$(this).closest('.select-date-time').find('b').text( this.value )
		$(this).closest('.select-date-time').removeClass('checked')
        bliss_log( this, "remove class");
	    // columns(2) == check-in
	    magic_front.columns( 2 ).search( this.value, true, false ).draw();
	    // https://datatables.net/reference/api/column().search()
    })

	function daysInMonth(month,year) {
	    return new Date(year, month, 0).getDate();
	}



    $(document).on('change','.start-assignment', function(e){
		select_b = $('#assignment-date').find('b')
		schedule = $('.table-calendar thead td').find('span#text')
		checkin = $(e.currentTarget).val()
		selectDateOption(checkin, 'checkin', select_b, schedule)
    })

    $(document).on('change','.end-assignment', function(e){
		select_b = $('#assignment-date').find('b')
		schedule = $('.table-calendar thead td').find('span#text')
		checkout = $(e.currentTarget).val()
		selectDateOption(checkout, 'checkout', select_b, schedule)
    })


	// $(document).on('change', '.checkbox-date input', function(){
	// 	if( $(this).val() == 0 ){
	// 		// start & end date
	// 		bliss_log( this, 'start & end date')
	// 	}else{
	// 		// start date
	// 		bliss_log( this, 'start date')
	// 	}
	// })


function slideCalendar(schedule, select_b, check_class){
	cal_left = schedule.text().split('-')[0].trim()
	cal_right = schedule.text().split('-')[1].trim()
	month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	if( check_class == 'cal-next' ){
		var date_a = new Date(cal_right)
			month_before = month[date_a.getMonth()]
		var date_b = date_a.setTime(date_a.getTime() + (6 * 24 * 60 * 60 * 1000))
		var w_date = new Date(date_b)
		var seminggu_plus = w_date.getDate() +' '+ month[w_date.getMonth()] +' '+ w_date.getFullYear()
			schedule.text(cal_right+' - '+seminggu_plus)
			select_b.text(cal_right+' - '+seminggu_plus)
		if( month_before != month[w_date.getMonth()] ){ status = '1' }else{ status = '0' }
			$('#assignment-date').find('.assignment-checkin').datepicker('update', cal_right)
			datepicker_day_point('checkin', 'checkout', seminggu_plus, w_date.getDate(), status)
	}else{
		var date_a = new Date(cal_left)
			month_before = month[date_a.getMonth()]
		var date_b = date_a.setTime(date_a.getTime() - (6 * 24 * 60 * 60 * 1000))
		var w_date = new Date(date_b)
		var seminggu_minus = w_date.getDate() +' '+ month[w_date.getMonth()] +' '+ w_date.getFullYear()
			schedule.text(seminggu_minus+' - '+cal_left)
			select_b.text(seminggu_minus+' - '+cal_left)
		if( month_before != month[w_date.getMonth()] ){ status = '1' }else{ status = '0' }
			$('#assignment-date').find('.assignment-checkin').datepicker('update', seminggu_minus)
			datepicker_day_point('checkin', 'checkout', cal_left, parseInt(cal_left.split(' ')[0]), status)
	}
}

	$(document).on('click', '#cal-move', function(e){
		e.preventDefault()
		select_b = $('#assignment-date').find('b')
		schedule = $('.table-calendar thead td').find('span#text')
		slideCalendar(schedule, select_b, $(e.currentTarget).attr('class'))
	})


	$(document).on('click', 'tr.index td:first-child', function(){
		if( $(this).closest('.tbody').hasClass('opened') ){
			$(this).closest('.tbody').removeClass('opened')
		}else{
			$(this).closest('.tbody').addClass('opened')
		}
	})


	$('.tbody .index td').each(function(){
		if( $(this).attr('class') == 'today' ){
			for(var i = 1; i < $(this).index();i++ ){
				$('.tbody .list').find('td:eq('+parseInt(i)+')').addClass('before')
				// bliss_log( this, i)
			}
		}
	})

	// $('#price-master-upload').modal('show')

	$(document).on('change', '#files', function(){
		str = $(this).val()
		filenam = str.substring(str.lastIndexOf('\\'));
		$('input[type="text"]').val(filenam.replace('\\',''));
		if(str.length > 0){
			$('input[type="submit"]').prop('disabled', false)
		}else{
			$('input[type="submit"]').prop('disabled', true)
		}
 	})

	$('.new-price-box').on('mousewheel DOMMouseScroll', function(event){
		event.preventDefault();

    if (event.type == 'mousewheel') {
        // scrollTo = (e.originalEvent.wheelDelta * -1);
        // alert("w"+e.originalEvent.wheelDelta);
		var new_price = $('.new-price').height();
		if( event.originalEvent.wheelDelta > 0 ){
			$('.new-price-box').animate({ scrollTop: '-=210px' }, 250);
		}else{
			$('.new-price-box').animate({ scrollTop: '+=210px' }, 250);
		}

		// bliss_log( this, event.originalEvent.wheelDelta)

    }
    else if (event.type == 'DOMMouseScroll') {
		var new_price = $('.new-price').height();
		if( event.originalEvent.detail > 0 ){
			$('.new-price-box').animate({ scrollTop: '-=210px' }, 250);
		}else{
			$('.new-price-box').animate({ scrollTop: '+=210px' }, 250);
		}
		// bliss_log( this, event.originalEvent.detail)

        // scrollTo = 40 * e.originalEvent.detail;
        // alert("d"+e.originalEvent.detail);
    }

		// bliss_log( this, event.originalEvent.deltaY)
		// bliss_log( this, new_price)

	})

	$(document).on('click', '#delete-new-price', function(){
		$(this).closest('.new-price').remove()
	})

    var room_code_div = "";
	function addNewPrice(n){
        if ( room_code_div == "" ) {
            room_data = JSON.parse(price_master_room_code);
            bliss_log(this, room_data);
            for( index = 0; index < room_data.length; index++ ) {
                room_data[index]
                room_code_div += '          <div class="option" value="'+room_data[index].value+'">'+room_data[index].label+'</div>';
            }
        }
		$('.new-price-box').append(''
        +'<div class="new-price">'
        +'  <div class="title-w-button">'
        +'    <h5 class="bold">'
        +'      <span>Price '+n+'</span>'
        +'      <div class="pull-right">'
        +'        <button id="delete-new-price" class="hero-button delete">Delete Price '+n+'</button>'
        +'      </div>'
        +'    </h5>'
        +'  </div>'
        +''
        +'  <div class="col-sm-4" style="padding-left: 0">'
        +'    <label for="">Room Type</label>'
        +'      <div class="clearfix select-inputs" id="room-type-'+n+'">'
        +'        <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
        +'        <input type="text" name="room_code[]" required="" placeholder="Select room type" disabled class="">'
        +'        <div class="arrow"></div>'
        +'        <div class="select" style="display: none;">'
        +'          <!-- Beri class here untuk option yang match -->'
        +           room_code_div
        +'        </div>'
        +'        <input type="hidden" name="room_code[]" required="" id="select" class="selected">'
        +'        <div class="error">Please fill the box above</div>'
        +'      </div>'
        +'  </div>'
		+''
        +'  <div class="col-sm-4">'
        +'    <label for="">Tier</label>'
        +'      <div class="clearfix select-inputs" id="tier-'+n+'">'
        +'        <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
        +'        <input type="text" name="tier[]" required="" placeholder="Select tier" disabled class="">'
        +'        <div class="arrow"></div>'
        +'        <div class="select" style="display: none;">'
        +'          <!-- Beri class here untuk option yang match -->'
        +'          <div class="option" value="1">1</div>'
        +'          <div class="option" value="2">2</div>'
        +'          <div class="option" value="3">3</div>'
        +'          <div class="option" value="4">4</div>'
        +'          <div class="option" value="5">5</div>'
        +'          <div class="option" value="6">6</div>'
        +'          <div class="option" value="7">7</div>'
        +'          <div class="option" value="8">8</div>'
        +'        </div>'
        +'        <input type="hidden" name="tier[]" required="" id="select" class="selected">'
        +'        <div class="error">Please fill the box above</div>'
        +'      </div>'
        +'  </div>'
        +''
        +'  <div class="col-sm-4" style="padding-right: 0">'
        +'    <label for="">Occupancy Rate</label>'
        +'      <div class="clearfix">'
        +'        <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
        +'        <input type="text" name="occupancy[]" required="" placeholder="Enter occupancy rate" class="">'
        +'        <div class="error">Please fill the box above</div>'
        +'      </div>'
        +'  </div>'
        +''
        +'  <div class="col-sm-4" style="padding-left: 0">'
        +'    <label for="">Start & End Date</label>'
        +'      <div class="clearfix select-cal" id="start-end-'+n+'">'
        +'        <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
        +'        <input type="text" name="start_end[]" required="" readonly placeholder="Select start or end date" id="date-here">'
        +'        <div class="arrow"></div>'
        +'        <div class="calendar-date">'
        +'          <div class="datetime-calendar" id="date-start" data-date-format="d M yyyy" style="padding-right:10px;">'
        +'            <h4 class="bold" style="padding-bottom: 10px;">Start Date</h4>'
        +'            <hr class="zero">'
        +'            <input type="hidden" name="start_end[]" required="" readonly class="calendar-datepicker-'+n+'" id="start-date">'
        +'          </div>'
        +'          <div class="datetime-calendar-end" id="date-end" data-date-format="d M yyyy" style="padding-left:10px;">'
        +'            <h4 class="bold" style="padding-bottom: 10px;">End Date</h4>'
        +'            <hr class="zero">'
        +'            <input type="hidden" name="start_end[]" required="" readonly class="calendar-datepicker-end-'+n+'" id="end-date">'
        +'          </div>'
        +'        </div>'
        +'        <div class="error">Please fill the box above</div>'
        +'      </div>'
        +'  </div>'
        +''
        +'  <div class="col-sm-4">'
        +'    <label for="">Price</label>'
        +'      <div class="clearfix">'
        +'        <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
        +'        <input type="text" name="price[]" required="" placeholder="Enter price" class="">'
        +'        <div class="error">Please fill the box above</div>'
        +'      </div>'
        +'  </div>'
        +''
        +'  <div style="margin-top: 20px;clear: both;"></div>'
        +'</div> <!-- .new-price -->'
		+'')
	}

	$(document).on('click', '#add-new-price', function(){
		if( $('.new-price').length < 1 ){
			var n = 1
		}else{
			var n = parseInt( $('.new-price:last-child h5.bold').find('span').text().split(' ')[1] ) + 1
		}
		addNewPrice(n)
	})

	$(document).on('click', '.new-price-box .select-inputs', function(){
		if( $(this).find('.select').is(':visible') ){
			$('.new-price-box').find('.select').slideUp()
		}else{
			$('.new-price-box').find('.select').slideUp()
			$(this).find('.select').slideDown()
		}
	})

	$(document).on('click', '.new-price-box .option', function(){
		$(this).closest('.select-inputs').find('input').val( $(this).attr('value') )
		$(this).closest('.select-inputs').find('.option').removeClass('here')
		$(this).addClass('here')
	})

	$(document).on('click', '.select-cal', function(){
		$(this).find('.calendar-date').show()
	    $(this).find('#date-start').datepicker('show')
	    $(this).find('#date-end').datepicker('show')
	})

	$(document).on('change', '.select-cal input', function(){
		var start = $(this).closest('.calendar-date').find('#start-date').val()
		var end   =	$(this).closest('.calendar-date').find('#end-date').val()
		if( (start != '' ) && (end != '') ){
				$(this).closest('.calendar-date').hide()
			}else{
				$(this).closest('.calendar-date').show()
		}
		$(this).closest('.select-cal').find('#date-here').val(start + ' - ' + end)
	})

	$('#create-price-master').on('hidden.bs.modal', function(e){
		$('#'+e.currentTarget.id).find('input[type="text"]').val('')
		$('#'+e.currentTarget.id).find('input[type="hidden"]').val('')
		$('#'+e.currentTarget.id).find('.option').removeClass('here')
		$('#'+e.currentTarget.id).find('#date-start').datepicker('destroy')
		$('#'+e.currentTarget.id).find('#date-end').datepicker('destroy')
		$('#'+e.currentTarget.id).find('.calendar-date').hide()
		$('#'+e.currentTarget.id).find('.new-price').remove()
	})

    $('#create-price-master').on('show.bs.modal', function(e){
        if( $('.new-price').length < 1 ){
            addNewPrice(1);
        }
    });


	$(document).on('click', '.minus-list', function(){
		$(this).closest('#bed-type-box').remove()
	})

	$(document).on('click', '.add-list', function(){
		var theid = $(this).closest('.modal').attr('id')
		if( $('#'+theid).find('#bed-type-box').length < 1 ){
			var n = 1
		}else{
			var n = parseInt( $('#'+theid).find('#bed-type-box:last-child').attr('for') ) + 1
		}
		$('#'+theid).find('#bed-type-boss').append(''
			+'    <div id="bed-type-box" for="'+n+'">'
			+'          <div class="clearfix select-input" id="room-bed-'+n+'" style="width: 60%;float: left;">'
			+'            <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
			+'            <input type="text" name="room_bed" required="" placeholder="Select bed type" disabled class="">'
			+'            <div class="arrow"></div>'
			+'            <div class="select" style="display: none;">'
			+'              <!-- Beri class here untuk option yang match -->'
			+'              '+bed_type_option
			+'            </div>'
			+'            <input type="hidden" name="room_bed[]" required="" id="select" class="selected">'
			+'            <div class="error">Please fill the box above</div>'
			+'          </div>'
			+'          <div class="clearfix select-input" id="room-bed-qty-'+n+'" style="width: 25%;float: left;margin-left: 4%;">'
			+'            <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya -->'
			+'            <input type="text" name="room_bed_qty" required="" placeholder="1" disabled class="">'
			+'            <div class="arrow"></div>'
			+'            <div class="select" style="display: none;">'
			+'              <!-- Beri class here untuk option yang match -->'
			+'              <div class="option" value="1">1</div>'
			+'              <div class="option" value="2">2</div>'
			+'              <div class="option" value="3">3</div>'
			+'              <div class="option" value="4">4</div>'
			+'            </div>'
			+'            <input type="hidden" name="room_bed_qty[]" required="" id="select" class="selected" value="1">'
			+'            <div class="error">Please fill the box above</div>'
			+'          </div>'
			+'          <div class="clearfix" style="width: 8%;float: left;margin-left: 3%;">'
			+'            <div class="minus-list">-</div>'
			+'          </div>'
			+'    </div>'
			+'')
	})

	$(document).on('click', '#bed-type-box .option, #payment-type .option, #create-list .option', function(){
		$(this).closest('.select-input').find('input[type="hidden"]').val( $(this).attr('value') )
		$(this).closest('.select-input').find('input[type="text"]').val( $(this).text() )
		$(this).closest('.select-input').find('.option').removeClass('here')
		$(this).addClass('here')
	})

	$(document).on('change', '#td-checkbox input[type="checkbox"]', function(){
        bliss_trigger("$(document).on('change', '#td-checkbox input[type=\"checkbox\"]', function(){")
		var all_checkbox = parseInt( $('table').find('.td-checkbox').length )
		var all_checked = $('table').find('.td-checkbox input[type="checkbox"]:checked').length
		if( $(this).is(':checked') ){
			bliss_log( this, all_checkbox)
			bliss_log( this, all_checked)
			if( all_checkbox == all_checked ){
				$('#select-all-price').prop('checked', true)
			}else{
				$('#select-all-price').prop('checked', false)
			}
		}else{
			bliss_log( this,  'no checked')
			$('#select-all-price').prop('checked', false)
		}
	})
	$(document).on('change', '#select-all-price', function(){
        bliss_trigger("$(document).on('change', '#select-all-price', function(){");
		if( $(this).is(':checked') ){
			$('table').find('.td-checkbox input[type="checkbox"]').prop('checked', true)
		}else{
			$('table').find('.td-checkbox input[type="checkbox"]').prop('checked', false)
		}
	})

	$(document).bind('click', '#table-options .table-button', function(e){
		if( $('#table-options .button-list').is(':visible') ){
			$('.confirm-price-management').fadeIn()
		}else{
			$('.confirm-price-management').fadeOut()
		}
	})


	$(document).bind('click', 'body', function(e){
		// $( 'input'+e.target.className ).slideUp()

		// bliss_log( this,  $(this).find('.select').attr('style') )
	})


	$(document).on('click', '.select-start-end', function(e){
		e.preventDefault()
		$(this).find('.calendar-date').show()
	    $(this).find('#date-price-start').datepicker('update')
	    $(this).find('#date-price-end').datepicker('update')
	})

    $('#date-price-start').datepicker()
    $('#date-price-end').datepicker()

    $(document).on('change', '.calendar-date input[type="hidden"]', function(e){
    	if( e.target.id == 'start-date' ){
    		$('#date-here').val( $(this).val()+' - '+$('#date-price-end').find('#end-date').val() )
    	}
    	if( e.target.id == 'end-date' ){
    		$('#date-here').val( $('#date-price-start').find('#start-date').val()+' - '+$(this).val() )
    	}
    })

	$(document).bind('click', '.select-start-end .calendar-date', function(e){
		if( $(e.data).is(':visible') ){
			var attr = $('.select-start-end').find('.calendar-date').attr('boom')
			$('.select-start-end').find('.calendar-date').attr('boom','yes')
			if( typeof attr !== typeof undefined && attr !== false ){
				$('.select-start-end').find('.calendar-date').removeAttr('boom')
				$(e.data).fadeOut()
			}
		}
	})


    var is_trigger = 0;
	$('#create-new-partner').on('show.bs.modal', function (e) {
        if ( is_trigger == 0 ) {
            is_trigger = 1;
            $('#create-new-partner').find('.registration-box').datepicker();

    		if ( $("#create-new-partner").find("#bank-name .select .option").length == 0 ) {
    		    csrfToken = $("input[name=_csrf]").val();
    			$('.loading').fadeIn('slow')
    		    $.ajax({
    		        url: homeUrl + "hotel/partner_create_content",
    		        type: "POST",
    		        data: "_csrf=" + csrfToken,
    		        success: function (data) {
                        is_trigger = 0;
    		        	res = JSON.parse(data);
    		        	var list_bank = "";
    		        	for ( index = 0 ; index < res.bank_list.length ; index++ ) {
    		        		bank = res.bank_list[index];
    						$("#create-new-partner").find("#bank-name .select").append('<div class="option" value="'+bank.id+'">'+bank.label+'</div>')
    		        	}
    					$('.loading').fadeOut('slow')
    		        },
    		        error: function () {
                        is_trigger = 0;
    					$('.loading').fadeOut('slow')
    		            alert("Something went wrong");
    		        }
    		    });
    		}
	        bliss_log( this, "trigger create new partner");
        }
	})

	$('#edit-partner-list').on('show.bs.modal', function (e) {
        if ( is_trigger == 0 ) {
            is_trigger = 1;
    		var trid = $(e.relatedTarget).closest('tr')
    		var modal = $('#'+e.currentTarget.id)

    	    csrfToken = $("input[name=_csrf]").val();
    	    partner_id = $(e.relatedTarget).attr("data-id");
    		$('.loading').fadeIn('slow')
    	    $.ajax({
    	        url: homeUrl + "hotel/partner_edit_content",
    	        type: "POST",
    	        data: "_csrf=" + csrfToken + "&partner_id=" + partner_id,
    	        success: function (data) {
    	        	res = JSON.parse(data);
                    var list_bank = "";
                    modal.find("#bank-name .select").html("");
                    for ( index = 0 ; index < res.content.bank_list.length ; index++ ) {
                        bank = res.content.bank_list[index];
                        if ( bank.label == res.detail.bank ) {
                            modal.find("#bank-name .select").append('<div class="option here" value="'+bank.id+'">'+bank.label+'</div>')
                            modal.find('#bank-name input[type="hidden"]').val(bank.id)
                            modal.find('#bank-name input[type="text"]').val(bank.label)
                        }
                        else {
                            modal.find("#bank-name .select").append('<div class="option" value="'+bank.id+'">'+bank.label+'</div>')
                        }
                    }

    	        	var _person = 'dasda';
    				var bulan = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    				var tanggal = new Date(res.detail.join_date);
    				var _date = tanggal.getDate()+' '+bulan[tanggal.getMonth()]+' '+tanggal.getFullYear();

    			    modal.find('.registration-box').datepicker('update', _date)
    			    modal.find('#registration-input').val(_date)
    				modal.find('input[name="partner_id"]').val(res.detail.id)
    				modal.find('#email').val(res.detail.email)
    				modal.find('#partner').val(res.detail.name)
    				modal.find('#legal').val(res.detail.legal_name)
    				modal.find('#phone').val(res.detail.phone)
    				modal.find('#beneficiary').val(res.detail.beneficiary)
    				modal.find('#address').val(res.detail.address)
    				// modal.find('#bank-name input').val(res.detail.bank)
    				// modal.find('#bank-name .option[value="'+res.detail.bank+'"]').addClass('here')
    				modal.find('#account').val(res.detail.account_number)
    				modal.find('#branch').val(res.detail.branch)
                    modal.find('#discount input[type="hidden"]').val(res.detail.discount)
                    modal.find('#discount input[type="text"]').val(res.detail.discount+'%')
    				modal.find('#commission input[type="hidden"]').val(res.detail.commission)
                    modal.find('#commission input[type="text"]').val(res.detail.commission+'%')
    				modal.find('#commission .option[value="'+res.detail.commission+'"]').addClass('here')
                    is_trigger = 0;
    				$('.loading').fadeOut('slow')

    	        },
    	        error: function () {
    				$('.loading').fadeOut('slow')
    	            alert("Something went wrong");
    	        }
    	    });
        }
	})

	$('#delete-partner-list').on('show.bs.modal', function (e) {
		var modal = $('#'+e.currentTarget.id)
		partner_id = $(e.relatedTarget).attr("data-id");

		modal.find('input[name="partner_id"]').val(partner_id)
	})

	$(document).on('change', '.registration-date', function(e){
		$(this).closest('.modal').find('#registration-input').val( $(this).val() )
		$(this).closest('.modal').find('.registration-box').slideUp('fast')
		$(this).closest('.modal').find('.registration-box').removeAttr('on')
	})

	$(document).on('click', '.registration-button', function(){
		if( $(this).closest('.modal').find('.registration-box').is(':visible') ){
			$(this).closest('.modal').find('.registration-box').slideUp('fast')
		}else{
			$(this).closest('.modal').find('.registration-box').slideDown('fast')
		}
	})

	$(document).bind('click', '#edit-partner-list', function(e){
		if( $('.registration-box').is(':visible') ){
			var attr = $('#edit-partner-list').find('.registration-box').attr('on')
			$('#edit-partner-list').find('.registration-box').attr('on','yes')
			if( typeof attr !== typeof undefined && attr !== false ){
				$('#edit-partner-list').find('.registration-box').removeAttr('on')
				$('#edit-partner-list').find('.registration-box').slideUp('fast')
			}
		}
	})

	$('#edit-partner-list').on('hidden.bs.modal', function (e) {
		var modal = $('#'+e.currentTarget.id)
			modal.find('input[type="hidden"], input[type="text"], input[type="email"], textarea').val('')
			modal.find('.option').removeClass('here')
			modal.find('.registration-box').removeAttr('on')
	})

	// $('#create-partner-confirm').modal('show')

	$('#view-partner-list').on('show.bs.modal', function (e) {

	    csrfToken = $("input[name=_csrf]").val();
	    partner_id = $(e.relatedTarget).attr("data-id");
		$('.loading').fadeIn('slow')
	    $.ajax({
	        url: homeUrl + "hotel/partner_detail",
	        type: "POST",
	        data: "_csrf=" + csrfToken + "&partner_id=" + partner_id,
	        success: function (data) {
	        	res = JSON.parse(data);
	        	bliss_log( this, res);
				var modal = $('#'+e.currentTarget.id)
					modal.find('div[for="partner"]').text(res.name)
					modal.find('div[for="legal"]').text(res.legal_name)
					modal.find('div[for="person"]').text(res.beneficiary)
					modal.find('div[for="email"]').text(res.email)
				    modal.find('div[for="registration"]').text(res.join_date)
					modal.find('div[for="phone"]').text(res.phone)
					modal.find('div[for="address"]').text(res.address)
					modal.find('div[for="bank-name"]').text(res.bank)
					modal.find('div[for="account"]').text(res.account_number)
					modal.find('div[for="branch"]').text(res.branch)
					modal.find('div[for="discount"]').text(res.discount)
					modal.find('div[for="commission"]').text(res.commission)
				$('.loading').fadeOut('slow')

	        },
	        error: function () {
				$('.loading').fadeOut('slow')
	            alert("Something went wrong");
	        }
	    });


	})

	$(document).on('click', '.voucherAction', function(e){
	    var this_id = '.voucherAction[data-id="'+$(this).attr("data-id")+'"]';
	    bliss_log( this, "collect data", this_id, $(this_id),$(this_id).attr("data-id") ,$(this_id).attr("action"));
	    show_message_confirm(capitalizeFirstLetter($(this).attr("action")) +' Voucher', 'Are you sure? You are about to '+$(this).attr("action") +' the voucher.', this_id)

		$('#message-button-confirm').bind('click', function(event, e){
			if( $(event.target).attr('for') == this_id ){
			    $.ajax({
			        url: homeUrl + "hotel/decide_voucher",
			        type: "POST",
			        data: "_csrf=" + csrfToken + "&voucher_id=" + $(this_id).attr("data-id") + "&action=" + $(this_id).attr("action"),
			        success: function (data) {
			        	res = JSON.parse(data);
			        	process_result(res, "location.reload()");
			        },
			        error: function () {
						$('.loading').fadeOut('slow')
			            alert("Something went wrong");
			        }
			    });
			}
		});
	});


	$('#mark-voucher-view').on('show.bs.modal', function (e) {
	    csrfToken = $("input[name=_csrf]").val();
	    voucher_id = $(e.relatedTarget).attr("data-id");
        loadingShow();
	    $.ajax({
	        url: homeUrl + "hotel/voucher_detail",
	        type: "POST",
	        data: "_csrf=" + csrfToken + "&voucher_id=" + voucher_id,
	        success: function (data) {
	        	res = JSON.parse(data);
	        	bliss_log( this, res);
				var modal = $('#'+e.currentTarget.id)
					modal.find('div[for="voucher-code"]').text(res.voucher_code)
					modal.find('div[for="voucher-type"]').text(res.voucher_type)
					modal.find('div[for="discount-type"]').text(res.discount_type)
					modal.find('div[for="discount"]').text(res.discount)
				    modal.find('div[for="total-voucher"]').text(res.total_used + "/" + res.total_voucher)
					modal.find('div[for="room-type"]').text(res.room_type)
					modal.find('div[for="start-date"]').text(res.start_date)
					modal.find('div[for="end-date"]').text(res.end_date)
					modal.find('div[for="registered-date"]').text(res.registration_date)
					modal.find('div[for="registered-by"]').text(res.register_by)
                    loadingHide();

	        },
	        error: function () {
                loadingHide();
	            alert("Something went wrong");
	        }
	    });
	})

	$('#create-new-voucher').on('show.bs.modal', function (e) {
        bliss_trigger("$('#create-new-voucher').on('show.bs.modal', function (e) {");
        var modal = $('#'+e.currentTarget.id)
        if ( checkModalIsNotShow(modal) )  {
            loadingShow();
            csrfToken = $("input[name=_csrf]").val();
            $.ajax({
                url: homeUrl + "hotel/voucher_create_content",
                type: "POST",
                data: "_csrf=" + csrfToken,
                success: function (data) {
                    res = JSON.parse(data);
                    bliss_log( this, res);
                    $("#voucher-type .select").html("");
                    for ( vtIndex = 0; vtIndex < res.voucher_type.length; vtIndex++) {
                        $("#voucher-type .select").append('<div class="option" value="'+res.voucher_type[vtIndex].id+'">'+res.voucher_type[vtIndex].label+'</div>')
                    }
                    // $(".round-radio").html("");
                    for ( dtIndex = 0; dtIndex < res.discount_type.length; dtIndex++) {
                        discountContent = ""
                        discountContent += '<div class="col-sm-6 zero"> \
                                                <input type="radio" name="discount_type" value="'+res.discount_type[dtIndex].id+'" id="'+res.discount_type[dtIndex].id+'"> \
                                                <label for="'+res.discount_type[dtIndex].id+'"> '+res.discount_type[dtIndex].label+'</label> \
                                            </div>';
                        $(".round-radio").append(discountContent);
                    }
                    $(".checkbox-wrap").html("");
                    for ( rtIndex = 0; rtIndex < res.room_type.length; rtIndex++) {
                        roomTypeContent = ' <div class="checkbox-button-sub"> \
                                                <input type="checkbox" name="room_type[]" id="room_'+res.room_type[rtIndex].id+'" value="'+res.room_type[rtIndex].id+'"> \
                                                <label for="room_'+res.room_type[rtIndex].id+'" class="checkbox"><span class="glyphicon glyphicon-ok"></span></label> \
                                                <span class="title"> '+res.room_type[rtIndex].label+'</span> \
                                            </div>';
                        $(".checkbox-wrap").append(roomTypeContent);
                    }
                    loadingHide();
                },
                error: function (err) {
                    loadingHide();
                    showError(err);
                }
            });
            bliss_log(this, e, $(this).css("display"));
	       setTimeout(function() { modal.find('.start-date-box').datepicker(); modal.find('.end-date-box').datepicker(); console.log("trigger after timer") }, 300);

        }
	})

	$(document).on('change', '.start-date-date', function(e){
		$(this).closest('.modal').find('#start-date-input').val( $(this).val() )
		$(this).closest('.modal').find('.start-date-box').slideUp()
		$(this).closest('.modal').find('.start-date-box').removeAttr('on')
	})

	$(document).on('click', '.start-date-button', function(){
		if( $(this).closest('.modal').find('.start-date-box').is(':visible') ){
			$(this).closest('.modal').find('.start-date-box').slideUp()
		}else{
			$(this).closest('.modal').find('.end-date-box').slideUp()
			$(this).closest('.modal').find('.start-date-box').slideDown()
		}
	})

	$(document).on('change', '.end-date-date', function(e){
		$(this).closest('.modal').find('#end-date-input').val( $(this).val() )
		$(this).closest('.modal').find('.end-date-box').slideUp()
		$(this).closest('.modal').find('.end-date-box').removeAttr('on')
	})

	$(document).on('click', '.end-date-button', function(){
		if( $(this).closest('.modal').find('.end-date-box').is(':visible') ){
			$(this).closest('.modal').find('.end-date-box').slideUp()
		}else{
			$(this).closest('.modal').find('.start-date-box').slideUp()
			$(this).closest('.modal').find('.end-date-box').slideDown()
		}
	})

	// $('#create-voucher-confirm').modal('show')

	$('#mark-voucher-delete').on('show.bs.modal', function (e) {
		var trid = $(e.relatedTarget).closest('tr')
		var _id = trid.find('td[data-id]').attr('data-id')

		var modal = $('#'+e.currentTarget.id)
			modal.find('#id-voucher').val(_id)
	})

	$('#mark-request-view').on('show.bs.modal', function (e) {
	    csrfToken = $("input[name=_csrf]").val();
	    voucher_id = $(e.relatedTarget).attr("data-id");
		$('.loading').fadeIn('slow')
	    $.ajax({
	        url: homeUrl + "hotel/voucher_detail",
	        type: "POST",
	        data: "_csrf=" + csrfToken + "&voucher_id=" + voucher_id,
	        success: function (data) {
	        	res = JSON.parse(data);
	        	bliss_log( this, res);
				var modal = $('#'+e.currentTarget.id)
					modal.find('div[for="voucher-code"]').text(res.voucher_code)
					modal.find('div[for="voucher-type"]').text(res.voucher_type)
					modal.find('div[for="discount-type"]').text(res.discount_type)
					modal.find('div[for="discount"]').text(res.discount)
				    modal.find('div[for="total-voucher"]').text(res.total_used + "/" + res.total_voucher)
					modal.find('div[for="room-type"]').text(res.room_type)
					modal.find('div[for="start-date"]').text(res.start_date)
					modal.find('div[for="end-date"]').text(res.end_date)
					modal.find('div[for="registered-date"]').text(res.registration_date)
					modal.find('div[for="registered-by"]').text(res.register_by)
					modal.find('div[for="status"]').text(res.status)
				$('.loading').fadeOut('slow')

	        },
	        error: function () {
				$('.loading').fadeOut('slow')
	            alert("Something went wrong");
	        }
	    });
	})

	// $('#mark-voucher-edit').modal('show')

	$('#mark-request-edit').on('show.bs.modal', function (e) {
        bliss_trigger("$('#create-new-voucher').on('show.bs.modal', function (e) {");
        var modal = $('#'+e.currentTarget.id)
        if ( checkModalIsNotShow(modal) )  {
            loadingShow();
            csrfToken = $("input[name=_csrf]").val();
            $.ajax({
                url: homeUrl + "hotel/voucher_edit_content",
                type: "POST",
                data: "_csrf=" + csrfToken +"&voucher_id="+$(e.relatedTarget).attr("data-id"),
                success: function (data) {
                    res = JSON.parse(data);
                    bliss_log( this, res);
                    $("#voucher-type .select").html("");
                    for ( vtIndex = 0; vtIndex < res.content.voucher_type.length; vtIndex++) {
                        $("#voucher-type .select").append('<div class="option" value="'+res.content.voucher_type[vtIndex].id+'">'+res.content.voucher_type[vtIndex].label+'</div>')
                    }
                    // $(".round-radio").html("");
                    for ( dtIndex = 0; dtIndex < res.content.discount_type.length; dtIndex++) {
                        discountContent = ""
                        discountContent += '<div class="col-sm-6 zero"> \
                                                <input type="radio" name="discount_type" value="'+res.content.discount_type[dtIndex].id+'" id="edit-'+res.content.discount_type[dtIndex].id+'"> \
                                                <label for="edit-'+res.content.discount_type[dtIndex].id+'"> '+res.content.discount_type[dtIndex].label+'</label> \
                                            </div>';
                        $(".round-radio").append(discountContent);
                    }
                    // $(".checkbox-wrap").html("");
                    for ( rtIndex = 0; rtIndex < res.content.room_type.length; rtIndex++) {
                        roomTypeContent = ' <div class="checkbox-button-sub"> \
                                                <input type="checkbox" name="room_type[]" id="edit-room_'+res.content.room_type[rtIndex].id+'" value="'+res.content.room_type[rtIndex].id+'"> \
                                                <label for="edit-room_'+res.content.room_type[rtIndex].id+'" class="checkbox"><span class="glyphicon glyphicon-ok"></span></label> \
                                                <span class="title"> '+res.content.room_type[rtIndex].label+'</span> \
                                            </div>';
                        $(".checkbox-wrap").append(roomTypeContent);
                    }
        			modal.find('.start-date-box').datepicker('update', res.detail.start_date)
        			modal.find('.end-date-box').datepicker('update', res.detail.end_date)
        			modal.find('#voucher-code').val(res.detail.voucher_code)
        			forceSelect(modal.find('#voucher-type'), res.detail.voucher_type, true)
        			modal.find('#discount-type label:contains("'+res.detail.discount_type+'")').closest(".zero").find('input[type="radio"]').prop('checked', true)
        			modal.find('#discount').val(res.detail.discount)
        		    modal.find('#total-voucher').val(res.detail.total_voucher)
        			modal.find('#start-date-input').val(res.detail.start_date)
        			modal.find('#end-date-input').val(res.detail.end_date)
                    console.log("room type", res.detail.room_type);
                    // room_type = JSON.parse(res.detail.room_type);
                    // for ( rtIndex =0 ; rtIndex < room_type ; rtIndex++ ) {
                    //     console.log(room_type[rtIndex],room_type[rtIndex][2]);
        			//     $('.checkbox-wrap input[value="'+room_type[rtIndex][1]+'"]').prop('checked', true)
                    // }
                    loadingHide();
                },
                error: function (err) {
                    loadingHide();
                    showError(err);
                }
            });
            bliss_log(this, e, $(this).css("display"));
	       setTimeout(function() { modal.find('.start-date-box').datepicker(); modal.find('.end-date-box').datepicker(); console.log("trigger after timer") }, 300);

        }
	})


	$('#mark-logs-view').on('show.bs.modal', function (e) {
	    csrfToken = $("input[name=_csrf]").val();
	    voucher_id = $(e.relatedTarget).attr("data-id");
		$('.loading').fadeIn('slow')
	    $.ajax({
	        url: homeUrl + "hotel/voucher_detail",
	        type: "POST",
	        data: "_csrf=" + csrfToken + "&voucher_id=" + voucher_id,
	        success: function (data) {
	        	res = JSON.parse(data);
	        	bliss_log( this, res);
				var modal = $('#'+e.currentTarget.id)
					modal.find('div[for="voucher-code"]').text(res.voucher_code)
					modal.find('div[for="voucher-type"]').text(res.voucher_type)
					modal.find('div[for="discount-type"]').text(res.discount_type)
					modal.find('div[for="discount"]').text(res.discount)
				    modal.find('div[for="total-voucher"]').text(res.total_used + "/" + res.total_voucher)
					modal.find('div[for="room-type"]').text(res.room_type)
					modal.find('div[for="start-date"]').text(res.start_date)
					modal.find('div[for="end-date"]').text(res.end_date)
					modal.find('div[for="registered-date"]').text(res.registration_date)
					modal.find('div[for="registered-by"]').text(res.register_by)
					modal.find('div[for="status"]').text(res.status)
					// modal.find('div[for="last-used"]').text(_used)
					// modal.find('#status-cond').text(_status+' By')
					// modal.find('div[for="status-cond"]').html(_admin+',<br />'+_datetime)
				$('.loading').fadeOut('slow')

	        },
	        error: function () {
				$('.loading').fadeOut('slow')
	            alert("Something went wrong");
	        }
	    });
	})


	$(document).on('click', '#marketplace-setting', function(){
		$('.marketplace-overlay').fadeOut()
		// $('.marketplace-overlay').removeAttr('on')
		$(this).closest('.marketing-marketplace').find('.marketplace-overlay').fadeIn()
	})

	$(document).bind('click', '.marketplace-overlay', function(event){
		if( $('.marketplace-overlay').is(':visible') ){
			// if( $(event.target).attr('class') != 'edit' || $(event.target).attr('class') != 'delete' ){
			if( $(event.target).attr('class') == 'marketplace-overlay' ){
				// var attr = $('.marketing-marketplace').find('.marketplace-overlay').attr('on')
				// $(event.target.parentElement).closest('.marketing-marketplace').find('.marketplace-overlay').attr('on','yes')
			// if( $('.marketplace-overlay').is(':visible') ){
				// if( typeof attr !== typeof undefined && attr !== false ){
					// $('.marketplace-overlay').removeAttr('on')
				$('.marketplace-overlay').fadeOut()
				// }
			}
		}
	})

	// $('#create-marketplace-confirm').modal('show')

	$('#delete-marketplace').on('show.bs.modal', function(e){
		$('.marketplace-overlay').fadeOut()
		$('#'+e.currentTarget.id).find('#id-marketplace').val( $(e.relatedTarget).data('id') )
	})

	$('#marketplace-view').on('show.bs.modal', function(e){
		$('.marketplace-overlay').fadeOut()
		var targ = $(e.relatedTarget).closest('.room-detail')
		var modal = $('#'+e.currentTarget.id)

	    csrfToken = $("input[name=_csrf]").val();
	    marketplace_id = $(e.relatedTarget).attr("data-id");
		$('.loading').fadeIn('slow')
	    $.ajax({
	        url: homeUrl + "hotel/marketplace_detail",
	        type: "POST",
	        data: "_csrf=" + csrfToken + "&marketplace_id=" + marketplace_id,
	        success: function (data) {
	        	res = JSON.parse(data);
	        	bliss_log( this, res);
				modal.find('#marketplace-name').text(res.name )
				modal.find('#hotel-id').text( res.hotel_id )
				modal.find('#username').text( res.username )
				modal.find('#password').text( res.password )
				var room_type_text = "";
				for ( index = 0; index < res.room_type.length ; index++ ) {
					room_type_text += res.room_type[index].label + " (" + res.room_type[index].room_id + ") </br>";
				}
				modal.find('#room-type-id').html(room_type_text)
				$('.loading').fadeOut('slow')

	        },
	        error: function () {
				$('.loading').fadeOut('slow')
	            alert("Something went wrong");
	        }
	    });

			modal.find('#marketplace-name').text( targ.find('#marketplace-name').text() )
			modal.find('#hotel-id').text( targ.find('#hotel-id').text() )
			modal.find('#username').text( targ.find('#username').text() )
			modal.find('#password').text( targ.find('#password').text() )
			if( targ.find('#room-type-id').text().split(',').length > 1 ){
				modal.find('#room-type-id').html( targ.find('#room-type-id').text().replace(/,/g,'<br>') )
			}else{
				modal.find('#room-type-id').text( targ.find('#room-type-id').text() )
			}
	})

	$('#create-new-marketplace').on('show.bs.modal', function(e){
		$('.marketplace-overlay').fadeOut()
		var modal = $('#'+e.currentTarget.id)
		// modal.find('input[type=text], input[type=password]').val('')
	    csrfToken = $("input[name=_csrf]").val();
		if ( modal.find(".marketplace-box input").length == 0  ) {
			$('.loading').fadeIn('slow')
		    $.ajax({
		        url: homeUrl + "hotel/marketplace_create_content",
		        type: "POST",
		        data: "_csrf=" + csrfToken,
		        success: function (data) {
		        	res = JSON.parse(data);
		        	for( index =0; index < res.room_list.length; index++ ) {
		        		var room = res.room_list[index];
		        		modal.find(".marketplace-box").append(
					        	'<div class="clearfix" style="margin-bottom: 5px;"> \
				                    <div class="col-sm-5 zero" style="line-height: 40px;">'
				                        +room.label+'\
				                        <input type="hidden" name="room_id[]" value="'+room.id+'"> \
				                    </div> \
				                    <div class="col-sm-7 zero" for="Standard Room">\
				                        <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
				                        <input type="text" name="room_code[]" placeholder="Enter room type ID" class=""> \
				                        <div class="clear"></div> \
				                        <div class="error">Please fill the box above</div> \
				                    </div> \
				                </div>');
		        	}

					$('.loading').fadeOut('slow')

		        },
		        error: function () {
					$('.loading').fadeOut('slow')
		            alert("Something went wrong");
		        }
		    });
		}
	})

	$('#edit-marketplace').on('show.bs.modal', function(e){
		$('.marketplace-overlay').fadeOut()
		var targ = $(e.relatedTarget).closest('.marketing-marketplace')
		var modal = $('#'+e.currentTarget.id)

	    csrfToken = $("input[name=_csrf]").val();
	    marketplace_id = $(e.relatedTarget).attr("data-id");
		$('.loading').fadeIn('slow')
	    $.ajax({
	        url: homeUrl + "hotel/marketplace_edit_content",
	        type: "POST",
	        data: "_csrf=" + csrfToken + "&marketplace_id=" + marketplace_id,
	        success: function (data) {
	        	res = JSON.parse(data);
	        	if ( modal.find(".marketplace-box input").length == 0 ) {
		        	for( index =0; index < res.content.room_list.length; index++ ) {
		        		room = res.content.room_list[index];
		        		modal.find(".marketplace-box").append(' \
					        	<div class="clearfix" style="margin-bottom: 5px;"> \
				                    <div class="col-sm-5 zero" style="line-height: 40px;"> \
				                        '+room.label+' \
				                        <input type="hidden" value="'+room.id+'" name="room_id[]" />\
				                    </div> \
				                    <div class="col-sm-7 zero" for="Standard Room">   \
				                        <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
				                        <input type="text" name="room_code[]" placeholder="Enter room type ID" class=""> \
				                        <div class="clear"></div> \
				                        <div class="error">Please fill the box above</div> \
				                    </div> \
				                </div>');
		        	}
	        	}
	        	detail = res.detail;
	        	modal.find('input[name="marketplace_id"]').val( $(e.relatedTarget).attr("data-id"));
				modal.find('#marketplace-name').val( detail.name )
				modal.find('#hotel-id').val( detail.hotel_id )
				modal.find('#username').val( detail.username )
				modal.find('#password').val( detail.password )
				for(index = 0; index < detail.room_type.length; index++){
					if ( modal.find('.marketplace-box').find('input[name="room_id[]"][value="'+detail.room_type[index].id+'"]').length > 0 ) {
						modal.find('.marketplace-box').find('input[name="room_id[]"][value="'+detail.room_type[index].id+'"]').closest('.clearfix').find('input[name="room_code[]"]').val(detail.room_type[index].room_id);
					}
				}
				$('.loading').fadeOut('slow')

	        },
	        error: function () {
				$('.loading').fadeOut('slow')
	            alert("Something went wrong");
	        }
	    });

	})

	$('#delete-marketplace').on('show.bs.modal', function (e) {
		var modal = $('#'+e.currentTarget.id)
		marketplace_id = $(e.relatedTarget).attr("data-id");

		modal.find('input[name="marketplace_id"]').val(marketplace_id)
	})

	// $('#edit-marketplace-confirm').modal('show')

    $(document).on('keyup change', '.modal .auth-form input, .modal .auth-form textarea', function(event) {
        var formid = $(event.currentTarget).closest('.modal').attr('id')
        check_submit_disabled_modal(formid)
    });

    $(document).on('click', '.modal .option', function(event) {
        var formid = $(event.currentTarget).closest('.modal').attr('id')
        check_submit_disabled_modal(formid)
    });

    function check_submit_disabled_modal(formid){
        bliss_trigger("check_submit_disabled_modal");
        var empty = false;
        $('#'+formid).find('input[type="text"], input[type="email"], input[type="hidden"], textarea').each(function() {
            // bliss_log( this, this, $(this).val());
            if ($(this).val() == '' && $(this).attr("name") != "submit") {
                empty = true;
            }
        })
        if (empty) {
            $('#'+formid).find('input[type="submit"]').prop('disabled', true);
        } else {
            $('#'+formid).find('input[type="submit"]').prop('disabled', false);
        }
    }

// str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
//     return letter.toUpperCase();
// });



	$(document).on('click', '.reservationAction', function(e){
	    var this_id = '.reservationAction[data-id="'+$(this).attr("data-id")+'"]';
	    bliss_log( this, "collect data", this_id, $(this_id),$(this_id).attr("data-id") ,$(this_id).attr("action"));
	    show_message_confirm(capitalizeFirstLetter($(this).attr("action")) +' Reservation', 'Are you sure? You are about to '+$(this).attr("action") +' the reservation.', this_id)

		$('#message-button-confirm').bind('click', function(event, e){
			if( $(event.target).attr('for') == this_id ){
			   //  $.ajax({
			   //      url: homeUrl + "hotel/decide_voucher",
			   //      type: "POST",
			   //      data: "_csrf=" + csrfToken + "&voucher_id=" + $(this_id).attr("data-id") + "&action=" + $(this_id).attr("action"),
			   //      success: function (data) {
			   //      	res = JSON.parse(data);
			   //      	process_result(res, "location.reload()");
			   //      },
			   //      error: function () {
						// $('.loading').fadeOut('slow')
			   //          alert("Something went wrong");
			   //      }
			   //  });
			}
		});
	});

	$(document).on('click', '.reservationResendAction', function(e){
	    var this_id = '.reservationResendAction[data-id="'+$(this).attr("data-id")+'"]';
	    bliss_log( this, "collect data", this_id, $(this_id),$(this_id).attr("data-id") ,$(this_id).attr("action"));
	    show_message_confirm(capitalizeFirstLetter($(this).attr("action")) +' Reservation Request', 'Are you sure? You are about to '+$(this).attr("action") +' the request.', this_id)

		$('#message-button-confirm').bind('click', function(event, e){
			if( $(event.target).attr('for') == this_id ){
			   //  $.ajax({
			   //      url: homeUrl + "hotel/decide_voucher",
			   //      type: "POST",
			   //      data: "_csrf=" + csrfToken + "&voucher_id=" + $(this_id).attr("data-id") + "&action=" + $(this_id).attr("action"),
			   //      success: function (data) {
			   //      	res = JSON.parse(data);
			   //      	process_result(res, "location.reload()");
			   //      },
			   //      error: function () {
						// $('.loading').fadeOut('slow')
			   //          alert("Something went wrong");
			   //      }
			   //  });
			}
		});
	});


	$('#reservation-view').on('show.bs.modal', function(e){
		var modal = $('#'+e.currentTarget.id)

	    status_cond = $(e.relatedTarget).attr("for");

		if( status_cond == undefined ){

	    // csrfToken = $("input[name=_csrf]").val();
	 //    reservation_id = $(e.relatedTarget).attr("data-id");
		// $('.loading').fadeIn('slow')
	 //    $.ajax({
	 //        url: homeUrl + "hotel/marketplace_detail",
	 //        type: "POST",
	 //        data: "_csrf=" + csrfToken + "&marketplace_id=" + marketplace_id,
	 //        success: function (data) {
	 //        	res = JSON.parse(data);
	 //        	bliss_log( this, res);

			modal.find('#guest-name').text('guest')
			modal.find('#change-type').text('guest')
			modal.find('#booking-date').text('guest')
			modal.find('#assignment-period').text('guest')
			modal.find('#prev-room').text('guest')
			modal.find('#new-room').text('guest')
			modal.find('#date-time').text('guest')
			modal.find('#requested').text('guest')
			modal.find('#reason').text('guest')

		// 		$('.loading').fadeOut('slow')

	 //        },
	 //        error: function () {
		// 		$('.loading').fadeOut('slow')
	 //            alert("Something went wrong");
	 //        }
	 //    });

		}else if( status_cond == 'logs' ){
			modal.find('#guest-name').text('guest')
			modal.find('#change-type').text('guest')
			modal.find('#booking-date').text('guest')
			modal.find('#assignment-period').text('guest')
			modal.find('#prev-room').text('guest')
			modal.find('#new-room').text('guest')
			modal.find('#date-time').text('guest')
			modal.find('#requested').text('guest')
			modal.find('#reason').text('guest')
			modal.find('#status').removeClass('hidden')
			modal.find('#status-title').text('Approved'+' By')
			modal.find('#status-text').text('Admin123')
		}else if( status_cond == 'requests' ){
			modal.find('#guest-name').text('guest')
			modal.find('#change-type').text('guest')
			modal.find('#booking-date').text('guest')
			modal.find('#assignment-period').text('guest')
			modal.find('#prev-room').text('guest')
			modal.find('#new-room').text('guest')
			modal.find('#date-time').text('guest')
			modal.find('#requested').text('guest')
			modal.find('#reason').text('guest')
		}

	})


	$('#reservation-edit').on('show.bs.modal', function(e){
		// $('.marketplace-overlay').fadeOut()
		// var targ = $(e.relatedTarget).closest('.marketing-marketplace')
		var modal = $('#'+e.currentTarget.id)

	    // csrfToken = $("input[name=_csrf]").val();
	    reservation_id = $(e.relatedTarget).attr("data-id");
		// $('.loading').fadeIn('slow')
	 //    $.ajax({
	 //        url: homeUrl + "hotel/marketplace_edit_content",
	 //        type: "POST",
	 //        data: "_csrf=" + csrfToken + "&marketplace_id=" + marketplace_id,
	 //        success: function (data) {
	 //        	res = JSON.parse(data);
	 //        	if ( modal.find(".marketplace-box input").length == 0 ) {
		//         	for( index =0; index < res.content.room_list.length; index++ ) {
		//         		room = res.content.room_list[index];
		//         		modal.find(".marketplace-box").append(' \
		// 			        	<div class="clearfix" style="margin-bottom: 5px;"> \
		// 		                    <div class="col-sm-5 zero" style="line-height: 40px;"> \
		// 		                        '+room.label+' \
		// 		                        <input type="hidden" value="'+room.id+'" name="room_id[]" />\
		// 		                    </div> \
		// 		                    <div class="col-sm-7 zero" for="Standard Room">   \
		// 		                        <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
		// 		                        <input type="text" name="room_code[]" placeholder="Enter room type ID" class=""> \
		// 		                        <div class="clear"></div> \
		// 		                        <div class="error">Please fill the box above</div> \
		// 		                    </div> \
		// 		                </div>');
		//         	}
	 //        	}
	 //        	detail = res.detail;
	 //        	modal.find('input[name="marketplace_id"]').val( $(e.relatedTarget).attr("data-id"));
		// 		modal.find('#marketplace-name').val( detail.name )
		// 		modal.find('#hotel-id').val( detail.hotel_id )
		// 		modal.find('#username').val( detail.username )
		// 		modal.find('#password').val( detail.password )
		// 		for(index = 0; index < detail.room_type.length; index++){
		// 			if ( modal.find('.marketplace-box').find('input[name="room_id[]"][value="'+detail.room_type[index].id+'"]').length > 0 ) {
		// 				modal.find('.marketplace-box').find('input[name="room_id[]"][value="'+detail.room_type[index].id+'"]').closest('.clearfix').find('input[name="room_code[]"]').val(detail.room_type[index].room_id);
		// 			}
		// 		}
		// 		$('.loading').fadeOut('slow')

	 //        },
	 //        error: function () {
		// 		$('.loading').fadeOut('slow')
	 //            alert("Something went wrong");
	 //        }
	 //    });

    		tanggal = '27 Aug 2018 - 2 Sep 2018';
			bulan = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

			d_start = tanggal.split('-')[0].trim()
			d_end = tanggal.split('-')[1].trim()

			d_start_day = d_start.split(' ')[0]
			d_start_mon = $.inArray(d_start.split(' ')[1] , bulan)
			d_start_yer = d_start.split(' ')[2]
			d_end_day = d_end.split(' ')[0]
			d_end_mon = $.inArray(d_end.split(' ')[1] , bulan)
			d_end_yer = d_end.split(' ')[2]

		period = 'Apply to all dates';
		if( period == 'Select Manually' ){
			modal.find('#datetime-button').addClass('datetime-button')
	    }
    	modal.find('.datetime-calendar').datepicker('update', d_start_mon+'/'+d_start_day+'/'+d_start_yer );
    	modal.find('.datetime-calendar-end').datepicker('update', d_end_mon+'/'+d_end_day+'/'+d_end_yer );

    	modal.find('input[name="reservation_id"]').val(reservation_id);
    	modal.find('#current-room').val('Standard Room - 2');
			forceSelect(modal.find('#change-type'), 'Upgrade')
    	modal.find('#new-room input').val('Premiere Room - 2');

			opt_here = 'Premiere Room - 2';
	    	room_class = opt_here.split('-')[0].split(' ')[0].trim()
	    	room = opt_here.split('-')[0].split(' ')[1].trim()
	    	room_no = opt_here.split('-')[1]
    	modal.find('#new-room .options[value="'+room_class+'"]').addClass('index');
    	modal.find('#new-room .option-sub[value="'+room_class+' - '+room+room_no+'"]').addClass('here');
			forceSelect(modal.find('#assignment-period'), period)
    	modal.find('#date-time b').text('27 Aug 2018 - 2 Sep 2018');
    	modal.find('#date-time input.calendar-datetime').val(tanggal.split('-')[0].trim());
    	modal.find('#date-time input.calendar-end-datetime').val(tanggal.split('-')[1].trim());
	})

	$('#reservation-edit').on('hidden.bs.modal', function(event){
		var modal = $('#'+event.currentTarget.id)
		modal.find('input[type="text"]').removeClass('selected')
		modal.find('.select, .select-sub').hide()
		// modal.find('.option, .options, .option-sub').remove()
		modal.find('.options').removeClass('index')
		modal.find('.option, .option-sub').removeClass('here')
		modal.find('input[type="text"]').val()
		modal.find('input[type="hidden"]').val()

		modal.find('.select-date-time').removeClass('checked')
		modal.find('.datetime-box').hide()
		modal.find('.datetime-calendar').datepicker('hide')
		modal.find('.datetime-calendar-end').datepicker('hide')
		modal.find('#datetime-button').removeClass('datetime-button')
		modal.find('#date-time').addClass('readonly')

	})


$(document).on('click', '#assignment-period .option', function(event){
	var modal = $('#'+$(event.currentTarget).closest('.modal').attr('id'))
    bliss_trigger( this, "$(document).on('click', '#assignment-period .option', function(event){");
	if( event.target.innerHTML == 'Select Manually' ){
		modal.find('#datetime-button').addClass('datetime-button')
		modal.find('#date-time').removeClass('readonly')
	}else{
		modal.find('.select-date-time').removeClass('checked')
		modal.find('.datetime-box').hide()
		modal.find('.datetime-calendar').datepicker('hide')
		modal.find('.datetime-calendar-end').datepicker('hide')
		modal.find('#datetime-button').removeClass('datetime-button')
		modal.find('#date-time').addClass('readonly')
	}
})



$('#form-reservation-edit').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    var this_id = '#'+e.currentTarget.id
    show_message_confirm('Allocate Room', 'Are you sure want to move the booking to all this guest reservation dates?', this_id);

	$('#message-button-confirm, #message-button-cancel').bind('click', function(event, e){
		if( $(event.target).attr('for') == this_id ){

		    $.ajax({
		        url: form.attr("action"),
		        type: form.attr("method"),
		        data: formData,
		        success: function (data) {
		            var res = JSON.parse(data);

		            process_result(res, "$('#reservation-edit').modal('hide'); location.reload()", form[0]);
					// $('##reservation-edit').modal('hide');

		            spinnerHide(modalInput);

		        },
		        error: function (err) {
		                showError(err);
		                spinnerHide(modalInput);
		        }
		    });

		}else{
            spinnerHide(modalInput);
		}
	})


}).on('submit', function(e){
    e.preventDefault();
});



    // function options_here(){
    //     $('.option-sub.here').each(function(){
    //         var teks = $(this).text();
    //         var tval = $(this).attr('value');
    //         var thid = $(this).closest('.clearfix').attr('id');
    //             $('#'+thid).find('input[type="text"]').val($(this).prevAll('.options:first').text()+' '+teks.split(' ')[0]+' - '+teks.split(' ')[1]);
    //             $('#'+thid).find('input[type="hidden"]').val($(this).prevAll('.options:first').text()+' '+tval.split(' ')[0]+' - '+tval.split(' ')[1]);
    //     })
    // }

    $(document).on('click', '.select-input-sub', function(){
        bliss_trigger(this, "$(document).on('click', '.select-input-sub'");
        var thid = $(this).attr('id');
        var modl = $(this).closest('.modal').attr('id');
        if( $('#'+modl+' #'+thid).find('.select-sub').is(':visible') ){
            $('#'+modl+' .select-input-sub').find('input[type="text"]').removeClass('selected');
            $('#'+modl+' .select-input-sub').find('.select-sub').slideUp('fast');
        }else{
            $('#'+modl+' .select-input-sub').find('input[type="text"]').removeClass('selected');
            $('#'+modl+' .select-input-sub').find('.select-sub').slideUp('fast');
            $('#'+modl+' #'+thid).find('.select-sub').slideDown('fast');
            $('#'+modl+' #'+thid).find('input').addClass('selected');
        }
            $('#'+modl+' .select-input').find('.select').slideUp('fast');

			$('#'+modl).find('.select-date-time').removeClass('checked')
			$('#'+modl).find('.datetime-box').hide()
			$('#'+modl).find('.datetime-calendar').datepicker('hide')
			$('#'+modl).find('.datetime-calendar-end').datepicker('hide')
    })


    $(document).on('click', '.select-sub .option-sub', function(){
        var teks = $(this).text();
        var tval = $(this).attr('value');
        var thid = $(this).closest('.clearfix').attr('id');
        var modl = $(this).closest('.modal').attr('id');
            $('#'+modl).find('#'+thid+' input').val($(this).prevAll('.options:first').text()+' '+teks.split(' ')[0]+' - '+teks.split(' ')[1])
            $('#'+modl).find('#'+thid+' input[type="hidden"]').val($(this).prevAll('.options:first').text()+' '+tval.split(' ')[0]+' - '+tval.split(' ')[1])
            $('#'+modl).find('#'+thid+' .option-sub').removeClass('here')
            $('#'+modl).find('#'+thid+' .options').removeClass('index')
            $(this).prevAll('.options:first').addClass('index')
            $(this).addClass('here')
    })

    $(document).on('click', '#form-reservation-edit .select-input', function(){
        bliss_trigger(this, "$(document).on('click', '#form-reservation-edit .select-input', function(){");
        var modl = $(this).closest('.modal').attr('id');
			$('#'+modl).find('.select-date-time').removeClass('checked')
			$('#'+modl).find('.datetime-box').hide()
			$('#'+modl).find('.datetime-calendar').datepicker('hide')
			$('#'+modl).find('.datetime-calendar-end').datepicker('hide')
    })

    $(document).bind('change', function(event){
        bliss_trigger(this, "$(document).bind('change', function(event){");
    	formid = $(event.target.form)[0]
    	if( $(formid).attr('id') == 'form-reservation-edit' ){
	    	calendars = $(event.target).attr('class')
	    	if( calendars == 'calendar-end-datetime' || calendars == 'calendar-datetime' ){
	        	var modal = $(event.target.form)
				modal.find('.select-date-time').removeClass('checked')
				modal.find('.datetime-box').hide()
				modal.find('.datetime-calendar').datepicker('hide')
				modal.find('.datetime-calendar-end').datepicker('hide')
		        check_submit_disabled_modal(modal[0].id)
		        // bliss_log( this, modal[0].id)

		        if(calendars == 'calendar-datetime'){

		        	date = new Date( modal.find('.calendar-datetime').val() )
					var res = date.setTime(date.getTime() + (6 * 24 * 60 * 60 * 1000));

					var d = new Date(res);
					var month = d.getMonth() + 1;
					var day = d.getDate();

					var output = (month < 10 ? '0' : '') +month+ '/' +
					    (day < 10 ? '0' : '') +day+'/'+
					    d.getFullYear();

		        	modal.find('.calendar-end-datetime').val(output)
		        }else if(calendars == 'calendar-end-datetime'){

		        	date = new Date( modal.find('.calendar-end-datetime').val() )
					var res = date.setTime(date.getTime() + (6 * 24 * 60 * 60 * 1000));

					var d = new Date(res);
					var month = d.getMonth() + 1;
					var day = d.getDate();

					var output = (month < 10 ? '0' : '') +month+ '/' +
					    (day < 10 ? '0' : '') +day+'/'+
					    d.getFullYear();

		        	date2 = new Date( output )
					var res2 = date2.setTime(date2.getTime() - (6 * 24 * 60 * 60 * 1000));

					var d2 = new Date(res2);
					var month2 = d2.getMonth() + 1;
					var day2 = d2.getDate();

					var output2 = (month2 < 10 ? '0' : '') +month2+ '/' +
					    (day2 < 10 ? '0' : '') +day2+'/'+
					    d2.getFullYear();

		        	modal.find('.calendar-datetime').val(output2)
		        	modal.find('.calendar-end-datetime').val(output)
		        }

	    	}
    	}
    })


$(document).on('click', '.datetime-button', function(event){
    var modal = $(this).closest('.modal').attr('id');
	$('#'+modal).find('input[type="text"]').removeClass('selected')
	$('#'+modal).find('.select, .select-sub').hide()
})


	$('#reservation-guest-view').on('show.bs.modal', function(e){
		var modal = $('#'+e.currentTarget.id)

	    // csrfToken = $("input[name=_csrf]").val();
	 //    guest_id = $(e.relatedTarget).attr("data-id");
		// $('.loading').fadeIn('slow')
	 //    $.ajax({
	 //        url: homeUrl + "hotel/marketplace_detail",
	 //        type: "POST",
	 //        data: "_csrf=" + csrfToken + "&marketplace_id=" + marketplace_id,
	 //        success: function (data) {
	 //        	res = JSON.parse(data);
	 //        	bliss_log( this, res);

			modal.find('#personal-title').text('Mr')
			modal.find('#name').text('Iman Gandakusuma')
			modal.find('#id-type').text('KTP')
			modal.find('#id-number').text('6171010101900001')
			modal.find('#email').text('william22@gmail.com')
			modal.find('#phone-number').text('081234567890')
			modal.find('#address').text('Jalan Kemakmuran no 32')
			modal.find('#country').text('Indonesia')
			modal.find('#city').text('Jakarta')

		// 		$('.loading').fadeOut('slow')

	 //        },
	 //        error: function () {
		// 		$('.loading').fadeOut('slow')
	 //            alert("Something went wrong");
	 //        }
	 //    });


	})


	$('#reservation-guest-edit').on('show.bs.modal', function(e){
		var modal = $('#'+e.currentTarget.id)

	    // csrfToken = $("input[name=_csrf]").val();
	    guest_id = $(e.relatedTarget).attr("data-id");
		// $('.loading').fadeIn('slow')
	 //    $.ajax({
	 //        url: homeUrl + "hotel/marketplace_detail",
	 //        type: "POST",
	 //        data: "_csrf=" + csrfToken + "&marketplace_id=" + marketplace_id,
	 //        success: function (data) {
	 //        	res = JSON.parse(data);
	 //        	bliss_log( this, res);

			modal.find('input[name="guest_id"]').val(guest_id)
			forceSelect(modal.find('#personal-title'), 'Mr')
			modal.find('#first-name').val('Iman')
			modal.find('#last-name').val('Gandakusuma')
			forceSelect(modal.find('#id-type'), 'KTP')
			modal.find('#id-number').val('6171010101900001')
			modal.find('#email').val('william22@gmail.com')
			modal.find('#phone-number').val('081234567890')
			modal.find('#address').val('Jalan Kemakmuran no 32')
			forceSelect(modal.find('#country'), 'Indonesia')
			forceSelect(modal.find('#city'), 'Bali')


		// 		$('.loading').fadeOut('slow')

	 //        },
	 //        error: function () {
		// 		$('.loading').fadeOut('slow')
	 //            alert("Something went wrong");
	 //        }
	 //    });


	})


$('#form-reservation-guest-edit').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    var this_id = '#'+e.currentTarget.id
    show_message_confirm('Edit Guest Data', 'Are you sure? You are about to edit guest data', this_id);

	$('#message-button-confirm, #message-button-cancel').bind('click', function(event, e){
		if( $(event.target).attr('for') == this_id ){

		    $.ajax({
		        url: form.attr("action"),
		        type: form.attr("method"),
		        data: formData,
		        success: function (data) {
		            var res = JSON.parse(data);

		            process_result(res, "$('#reservation-guest-edit').modal('hide'); location.reload()", form[0]);
					// $('##reservation-edit').modal('hide');

		            spinnerHide(modalInput);

		        },
		        error: function (err) {
		                showError(err);
		                spinnerHide(modalInput);
		        }
		    });

		}else{
			spinnerHide(modalInput);
		}
	})


}).on('submit', function(e){
    e.preventDefault();
});




$(window).on('load', function(){
	if( $('#reservation-datetime')[0] ){
		var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
		var date1 = new Date()
			day1 = date1.getDate()
			mon1 = date1.getMonth()
			year1 = date1.getFullYear()
		var days = date1.setTime(date1.getTime() + (1 * 24 * 60 * 60 * 1000))
		var date2 = new Date(days)

		var day_start = day1 +' '+ month[mon1] +' '+ year1
		var day_end = date2.getDate() +' '+ month[date2.getMonth()] +' '+ date2.getFullYear()

		// default set date (today - tomorrow)
		$('.reservation-datetime').find('b').text( day_start +' - '+ day_end )
		$('#reservation-checkin').val(day_start)
		$('#reservation-checkout').val(day_end)
	}
})



$(document).bind('change', function(event){
	// check id exist
	if( $('#reservation-datetime')[0] ){

		if( $('#reservation-checkin').val() != '' ){
			if( $('#reservation-checkout').val() == '' ){
				var date_a = new Date($('#reservation-checkin').val())
				var date_b = date_a.setTime(date_a.getTime() + (1 * 24 * 60 * 60 * 1000))
				var besox = new Date(date_b)
				var besok = besox.getDate() +' '+ month[besox.getMonth()] +' '+ besox.getFullYear()
				$('.reservation-checkout').datepicker('update', besok)
				$('.reservation-datetime').find('b').text( $('#reservation-checkin').val() +' - '+ besok )
			}else{
				$('.reservation-datetime').find('b').text( $('#reservation-checkin').val() +' - '+ $('#reservation-checkout').val() )
			}
		}

		if( $('#reservation-checkout').val() != '' ){
			if( $('#reservation-checkin').val() == '' ){
				var date_a = new Date($('#reservation-checkout').val())
				var date_b = date_a.setTime(date_a.getTime() - (1 * 24 * 60 * 60 * 1000))
				var kemarix = new Date(date_b)
				var kemarin = kemarix.getDate() +' '+ month[kemarix.getMonth()] +' '+ kemarix.getFullYear()
				$('.reservation-checkin').datepicker('update', kemarin )
				$('.reservation-datetime').find('b').text( kemarin +' - '+ $('#reservation-checkout').val() )
			}else{
				$('.reservation-datetime').find('b').text( $('#reservation-checkin').val() +' - '+ $('#reservation-checkout').val() )
			}
		}

	}

})

$(document).on('click', '.reservation-datetime', function(){
	$(this).toggleClass('checked')
	$(this).find('.datetime-box').toggle()
	$('.reservation-checkin').datepicker()
	$('.reservation-checkout').datepicker()
})

$(document).on('click', '.select-input', function(e){
	var id_room = $('.select-input#room')
	var id_adult = $('.select-input#adult')
	var id_child = $('.select-input#child')
	var id_all = $('.select-input#room, .select-input#adult, .select-input#child')
	var res_submit = $('#submit-reservation')

		res_submit.prop('disabled', true)

	if( $(this).attr('id') == 'room' ){
		adult = 0
		if( id_adult.find('input').val() != '' ){
			adult = id_adult.find('input').val()
		}
		child = 0
		if( id_child.find('input').val() != '' ){
			child = id_child.find('input').val()
		}
		guests = parseInt(adult) + parseInt(child)
		if( parseInt( $(this).find('input').val() ) > guests ){
			res_submit.prop('disabled', true)
			id_all.find('input#nah').addClass('border-red')
			$('.reservation-notif').show()
		}else{
			res_submit.prop('disabled', false)
			id_all.find('input#nah').removeClass('border-red')
			$('.reservation-notif').hide()
		}
	}
	if( $(this).attr('id') == 'adult' ){
		room = 0
		if( id_room.find('input').val() != '' ){
			room = id_room.find('input').val()
		}
		child = 0
		if( id_child.find('input').val() != '' ){
			child = id_child.find('input').val()
		}
		guests = parseInt($(this).find('input').val()) + parseInt(child)
		if( parseInt(room) > guests ){
			res_submit.prop('disabled', true)
			id_all.find('input#nah').addClass('border-red')
			$('.reservation-notif').show()
		}else{
			res_submit.prop('disabled', false)
			id_all.find('input#nah').removeClass('border-red')
			$('.reservation-notif').hide()
		}
	}
	if( $(this).attr('id') == 'child' ){
		room = 0
		if( id_room.find('input').val() != '' ){
			room = id_room.find('input').val()
		}
		adult = 0
		if( id_adult.find('input').val() != '' ){
			adult = id_child.find('input').val()
		}
		guests = parseInt(adult) + parseInt($(this).find('input').val())
		if( parseInt(room) > guests ){
			res_submit.prop('disabled', true)
			id_all.find('input#nah').addClass('border-red')
			$('.reservation-notif').show()
		}else{
			res_submit.prop('disabled', false)
			id_all.find('input#nah').removeClass('border-red')
			$('.reservation-notif').hide()
		}
	}
})

    var res_magic = $('#magic-table-reservation').DataTable( {
        'paging':   true,
        'ordering': true,
        'info':     false,
        'language': {
            'zeroRecords': 'Sorry, we cannot help you to find what you’re looking for. Try another word may help us to help you :)'
        }
    } );
	res_magic.page.len( 5 ).draw();

    $('#magic-search').on('keyup', function () {
        res_magic.search( this.value ).draw();
        var searc = res_magic.search( this.value ).draw();
    } );

    $(document).on('click', '.search-box .clear', function(){
        res_magic.search('').draw();
        res_magic.page.len( 12 ).draw();
    });

    $(document).on('click', '.content-list li', function(){
        var teks = $(this).text();
        var ul   = $(this).closest('ul').attr('class');
        var cond = $(this).closest('.content-list').attr('data-condition');
        if( cond == 'table_length_reservation' ){
            if( teks == 'All' ){
                res_magic.page.len( -1 ).draw();
            }else{
                res_magic.page.len( teks ).draw();
            }
        }
        $('.content-list').find('#sel'+ul).text(teks);
        $('.content-list').find('ul.'+ul+' li').removeClass('here');
        $(this).addClass('here');
            $('.list-table').hide();
            $('.selection').removeClass('opened');
    })

	$(document).on('click', '.create-step-option li', function(e){
		e.preventDefault()
		$('.reservation-step-box').slideUp()
		$('.reservation-step-box#reservation-'+$(this).attr('id')).slideDown()
		$('#magic-table-reservation').css({'width':'100%'})
		$('.create-step-option').find('li').removeClass('current')
		$(this).addClass('current')
	})

	$(window).on('load', function(e){
		var step_id = $('.create-step-option').find('li.current').attr('id')
		var aid = $('.reservation-step-box#reservation-'+ step_id).length
		for(var indx = 0; indx < aid; indx++){
			$('.reservation-step-box#reservation-'+step_id).slideDown()
		}
		var sub_step_id = $('.create-step#sub-reservation').find('li.current').attr('id')
		var sid = $('.subres-step-box#subres-'+ sub_step_id).length
		for(var indx = 0; indx < sid; indx++){
			$('.subres-step-box#subres-'+sub_step_id).slideDown()
		}
		$('#magic-table-reservation').css({'width':'100%'})
	})


	$(document).bind('click', '.add-charge-box .option-form', function(event){
		if( $(event.target).attr('value') == 'Airport Pickup' ){

			var select_id = $(event.target).closest('.select-input').attr('id')
			var res_f = select_id.split('-')[0]
			var res_n = select_id.split('-')[2]

			$(event.target).closest('.add-charge-box').find('#selection-add').html('')
			$(event.target).closest('.add-charge-box').find('#selection-add').append('\
				<div class="col-sm-4 selection-add" id="'+res_f+'-pickup-'+res_n+'"> \
		            <div class="clearfix select-input" id="'+res_f+'-pickup-'+res_n+'"> \
		                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
		                <input type="text" name="pickup_1" required="" placeholder="Select" disabled class="" id=""> \
		                <div class="arrow"></div> \
		                <div class="select-form"> \
		                  <!-- Beri class here untuk option yang match --> \
		                    <div class="option-form" value="1">1</div> \
		                    <div class="option-form" value="2">2</div> \
		                </div> \
		                <input type="hidden" name="pickup_1" required="" id="select-form" class="selected"> \
		                <div class="error">Please fill the box above</div> \
		            </div> \
				</div> \
				\
				<div class="col-sm-2 zero"> \
					<div class="remove-charge"></div> \
				</div> \
			');

		}else if( $(event.target).attr('value') == 'F&B' ){

			var select_id = $(event.target).closest('.select-input').attr('id')
			var res_f = select_id.split('-')[0]
			var res_n = select_id.split('-')[2]

			$(event.target).closest('.add-charge-box').find('#selection-add').html('')
			$(event.target).closest('.add-charge-box').find('#selection-add').append('\
				<div class="col-sm-4 selection-add" id="'+res_f+'-fnb-'+res_n+'"> \
					<div class="col-sm-6" style="padding-left:0"> \
			            <div class="clearfix"> \
			                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
			                <input type="text" name="amount" required="" placeholder="Amount" class="just-number" id="amount"> \
			                <!-- <div class="clear"></div> --> \
			                <!-- <div class="error">Please fill the box above</div> --> \
			            </div> \
					</div> \
					<div class="col-sm-6 zero"> \
			            <div class="clearfix"> \
			                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
			                <input type="text" name="invoice_number" required="" placeholder="Invoice Number" class="" id="invoice-number"> \
			                <!-- <div class="clear"></div> --> \
			                <!-- <div class="error">Please fill the box above</div> --> \
			            </div> \
					</div> \
				</div> \
				\
				<div class="col-sm-2 zero"> \
					<div class="remove-charge"></div> \
				</div> \
			');

		}
	})

	$(document).on('click', '#add-another-charge', function(){

		var res_f = $(this).closest('.reservation-step-box').attr('id').split('-')[2]
		var num = 1
		if( $(this).closest('.reservation-step-box').find('#another-charge').find('.add-charge-box').length > 0 ){
			var num = parseInt( $('#another-charge').find('.add-charge-box:last-child .select-input').attr('id').split('-')[2] ) + 1
		}

		$(this).closest('.reservation-step-box').find('#another-charge').append(' \
			<div class="col-sm-12 zero add-charge-box"> \
				\
				<div class="col-sm-3"> \
		            <div class="clearfix select-input" id="'+res_f+'-addcharge-'+num+'"> \
		                <!-- JIKA ERROR, ADDCLASS invalid pada input, otomatis akan muncul notif error nya --> \
		                <input type="text" name="add_charge_1" required="" placeholder="Select" disabled class="" id=""> \
		                <div class="arrow"></div> \
		                <div class="select-form"> \
		                  <!-- Beri class here untuk option yang match --> \
		                    <div class="option-form" value="Airport Pickup">Airport Pickup</div> \
		                    <div class="option-form" value="F&B">F&B</div> \
		                </div> \
		                <input type="hidden" name="add_charge_1" required="" id="select-form" class="selected"> \
		                <div class="error">Please fill the box above</div> \
		            </div> \
				</div> \
				\
				<div id="selection-add"></div> \
			</div> \
		')
	})

	$(document).on('click', '.remove-charge', function(){
		$(this).closest('.add-charge-box').remove()
	})

$(window).on('load', function(){

	$('.schedule-table').find('label').each(function(e, index){
		var lebar_box = $(index).closest('li').width() + 20
		var tinggi_box = $(index).closest('li').height()
		var dday = parseInt($(index).attr('dday'))
		if( dday > 1 ){
			$(index).css({
							'width': (lebar_box * dday) - 20 +'px',
							'top': (tinggi_box / 2) - 10 +'px'
						})
		}else{
			$(index).css({
							'width': lebar_box-20 +'px',
							'height': tinggi_box+'px',
							'line-height': tinggi_box-20 +'px'
						})
		}
	})

})

	$(document).on('click', '.cancelBooking', function(e){
        bliss_trigger( this, "$(document).on('click', '.cancelBooking', function(e){");
	    var this_id = '.cancelBooking[data-id="'+$(this).attr("data-id")+'"]';
	    bliss_log( this, "collect data", this_id, $(this_id),$(this_id).attr("data-id") ,'cancel');
	    show_message_confirm('Cancel Booking', 'Are you sure? You are about to cancel the booking.', this_id)

		$('#message-button-confirm').bind('click', function(event, e){
			if( $(event.target).attr('for') == this_id ){
			   //  $.ajax({
			   //      url: homeUrl + "hotel/decide_voucher",
			   //      type: "POST",
			   //      data: "_csrf=" + csrfToken + "&voucher_id=" + $(this_id).attr("data-id") + "&action=" + $(this_id).attr("action"),
			   //      success: function (data) {
			   //      	res = JSON.parse(data);
			   //      	process_result(res, "location.reload()");
			   //      },
			   //      error: function () {
						// $('.loading').fadeOut('slow')
			   //          alert("Something went wrong");
			   //      }
			   //  });
			}
		});
	});

$(document).on('click', '#reservation-calendar', function(e){
	$('.date-checkin').datepicker()
	$('.date-checkout').datepicker()
})

$(document).bind('click', '.datetime-box', function(e){
    bliss_trigger( this, "$(document).bind('click', '.datetime-box', function(e){");
	if( $(e.data).is(':visible') ){
		var attr = $('#reservation-datetime').find('.datetime-box').attr('active')
		$('#reservation-datetime').find('.datetime-box').attr('active','yes')
		if( typeof attr !== typeof undefined && attr !== false ){
			$('#reservation-datetime').find('.datetime-box').removeAttr('active')
			$(e.data).hide()
			$(e.data).closest('.reservation-datetime').removeClass('checked')
            bliss_log(this, "trigger hide datetime-box");
		}
	}
})

$(document).bind('click', '#reservation-date .datetime-box', function(e){
    bliss_trigger( this, "$(document).bind('click', '#reservation-date .datetime-box', function(e){");
	if( $(e.data).is(':visible') ){
		var attr = $('#reservation-date').find('.datetime-box').attr('active')
		$('#reservation-date').find('.datetime-box').attr('active','yes')
		if( typeof attr !== typeof undefined && attr !== false ){
			$('#reservation-date').find('.datetime-box').removeAttr('active')
			$(e.data).hide()
			$(e.data).closest('.select-date-time').removeClass('checked')
		}
	}
})


$(document).bind('change', function(){
	// check id exist
	if( $('#reservation-date')[0] ){
		_reservation = $('#magic-table-reservation').DataTable()
		select_b = $('.select-date-time').find('b')
		checkin = $('.checkin-date').val()
		checkout = $('.checkout-date').val()
		if( checkout == '' ){
			select_b.text( checkin+' - ' )
			_reservation.columns(3).search( checkin, true, false ).draw();
		}else{
			select_b.text( checkin+' - '+checkout )
			_reservation.columns(3).search( checkin, true, false ).draw();
			_reservation.columns(4).search( checkout, true, false ).draw();
		}
		if( checkin == '' ){
			select_b.text( ' - '+checkout )
			_reservation.columns(4).search( checkout, true, false ).draw();
		}else{
			select_b.text( checkin+' - '+checkout )
			_reservation.columns(3).search( checkin, true, false ).draw();
			_reservation.columns(4).search( checkout, true, false ).draw();
		}
	}
})



$(document).on('click', '.schedule-wrap-toggle', function(e){
	$(this).toggleClass('active')
	$('#list-'+$(this).attr('id')).toggle()
	$('.schedule-table-list#list-'+$(this).attr('id')).find('label').each(function(e, index){
		var lebar_box = $(index).closest('li').width() + 20
		var tinggi_box = $(index).closest('li').height()
		var dday = parseInt($(index).attr('dday'))
		if( dday > 1 ){
			$(index).css({
							'width': (lebar_box * dday) - 20 +'px',
							'top': (tinggi_box / 2) - 10 +'px'
						})
		}else{
			$(index).css({
							'width': lebar_box-20 +'px',
							'height': tinggi_box+'px',
							'line-height': tinggi_box-20 +'px'
						})
		}
	})
})

$(document).on('click', '#assignment-calendar', function(e){
	$('.assignment-checkin').datepicker()
	$('.assignment-checkout').datepicker()
})

$(document).on('click', '.price-master-content', function(e){
    bliss_trigger(this, "$(document).on('click', '.price-master-content', function(e){");
    console.log("trigger visible");
	var attr = $('#assignment-date').find('.datetime-box').attr('active')
	$('#assignment-date').find('.datetime-box').attr('active','yes')
	if( typeof attr !== typeof undefined && attr !== false ){
		$('#assignment-date').find('.datetime-box').removeAttr('active')
        $('#assignment-date').find('.datetime-box').hide()
		$('#assignment-date').removeClass('checked')
        getNewPriceList(this);
        bliss_log( this, "trigger hide box .datetime-box");
	}
})


	$('.checkin-assignment').on('change', function(e){
		select_b = $('#assignment-date').find('b')
		schedule = $('.schedule-head-date').find('span#text')
		checkin = $(e.currentTarget).val()
		selectDateOption(checkin, 'checkin', select_b, schedule)
	})


	$(window).on('load', function(){
		$('#assignment-date .assignment-checkout').datepicker('setDate','+1m')
		$('#assignment-date').find('.active').removeClass('active')
		checkin = $('#assignment-date .assignment-checkin')
		checkout = $('#assignment-date .assignment-checkout')
		select_b = $('#assignment-date').find('b')
		schedule = $('.schedule-head-date, .table-calendar thead td').find('span#text')

		// set date default +6 day
		var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var now = new Date()
			today_day = now.getDate()
			today_month = month[now.getMonth()]
			today = today_day +' '+ today_month +' '+ now.getFullYear()
		var week = new Date( now.setTime(now.getTime() + (6 * 24 * 60 * 60 * 1000)) )
			weekend_day = week.getDate()
			weekend_month = month[week.getMonth()]
			weekend = weekend_day +' '+ weekend_month +' '+ week.getFullYear()

			$('#assignment-date').find('.datepicker-inline .day').addClass('disable')
		if(today_month == weekend_month){
			checkin.datepicker('update',today)
			checkin.find('.datepicker-inline .day').addClass('disable')
			var checkin_weekend_active = checkin.find('.datepicker-inline').find('.day').filter(function() {
			    return $(this).text() == weekend_day;
			});
			checkin_weekend_active.removeClass('disable').addClass('active')
		}else if(today_month != weekend_month){
			checkin.datepicker('update',today)
			checkout.datepicker('update',weekend)
			$('#assignment-date').find('.datepicker-inline .day').addClass('disable')
			$('#assignment-date .datepicker-inline').find('.active').removeClass('disable')
		}
			checkin.find('.datepicker-inline').find('.new, .old').removeClass('active')

			select_b.text(today+' - '+weekend)
			schedule.text(today+' - '+weekend)
			$('#assignment-before').find('input').val(today)
			$('#assignment-after').find('input').val(weekend)

	})


	$('.checkout-assignment').on('change', function(e){
		select_b = $('#assignment-date').find('b')
		schedule = $('.schedule-head-date').find('span#text')
		checkout = $(e.currentTarget).val()
		selectDateOption(checkout, 'checkout', select_b, schedule)
	})


	$(document).on('click', '#schedule-move', function(e){
		e.preventDefault()
		select_b = $('#assignment-date').find('b')
		schedule = $('.schedule-head-date').find('span#text')
		slideCalendar(schedule, select_b, $(e.currentTarget).attr('class'))
	})

	$('#allocate-room').on('show.bs.modal', function(e){
		var modal = $('#'+e.currentTarget.id)
	    the_id = $(e.relatedTarget).attr("data-id")
	})


$('#form-allocate-room').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

	reason = $(e.currentTarget).find('#provide-reason .option.here').attr('value')
    if( reason != 'Same Type' ){
		$('.modal#provide-reason-room').find('.auth-form label').text(reason +' Reason')
		$('.modal#provide-reason-room').find('.modal-title').text('Provide Reason to '+reason+' Room')
		$('#provide-reason-room').modal('show')
    }

    // var this_id = '#'+e.currentTarget.id
    // show_message_confirm('Allocate Room', 'Are you sure? You are about to move the booking', this_id);

	$('#message-button-confirm, #message-button-cancel').bind('click', function(event, e){
		if( $(event.target).attr('for') == this_id ){

		   //  $.ajax({
		   //      url: form.attr("action"),
		   //      type: form.attr("method"),
		   //      data: formData,
		   //      success: function (data) {
		   //          var res = JSON.parse(data);

		   //          process_result(res, "$('#reservation-guest-edit').modal('hide'); location.reload()", form[0]);
					// // $('##reservation-edit').modal('hide');

					// spinnerHide(modalInput);

		   //      },
		        // error: function (err) {
		        //         showError(err);
		        //         spinnerHide(modalInput);
		        // }
		   //  });

		}else{
            spinnerHide(modalInput);
		}
	})


}).on('submit', function(e){
    e.preventDefault();
});




$('#form-upgrade-room').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    var this_id = '#'+e.currentTarget.id
    show_message_confirm('Allocation Successfully Submitted', 'This allocation has been sent to the authorized person for approval!', this_id);

	$('#message-button-confirm, #message-button-cancel').bind('click', function(event, e){
		if( $(event.target).attr('for') == this_id ){

		   //  $.ajax({
		   //      url: form.attr("action"),
		   //      type: form.attr("method"),
		   //      data: formData,
		   //      success: function (data) {
		   //          var res = JSON.parse(data);

		   //          process_result(res, "$('#reservation-guest-edit').modal('hide'); location.reload()", form[0]);
					// // $('##reservation-edit').modal('hide');

					// spinnerHide(modalInput);

		   //      },
		        // error: function (err) {
		        //         showError(err);
		        //         spinnerHide(modalInput);
		        // }
		   //  });

		}else{
            spinnerHide(modalInput);
		}
	})

}).on('submit', function(e){
    e.preventDefault();
});



$(document).on('mouseover', '.chart-round', function(event){
	tinggi_detail = $(event.currentTarget).find('.chart-detail').height() / 2
	$(event.currentTarget).find('.chart-detail span').css({'top':tinggi_detail - 7})
	$(event.currentTarget).find('.chart-detail').css({'top':-tinggi_detail})
})

$(document).on('click', '#chart-room li', function(event){
	bliss_log( this, $(event.currentTarget).attr('value'))
})
