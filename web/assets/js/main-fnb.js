$(document).on('click', '.header-side li.sub-menu > a', function(e) {
    e.preventDefault();
    if ($(this).closest('li.sub-menu').hasClass('current')) {
        $(this).closest('li.sub-menu').removeClass('current')
        $(this).closest('li.sub-menu').find('ul').slideUp()
    }
    else {
        $('.header-side li.sub-menu').removeClass('current')
        $('.header-side li.sub-menu').find('ul').slideUp()
        $(this).closest('li.sub-menu').addClass('current')
        $(this).closest('li.sub-menu').find('ul').slideDown()
    }
})

var is_trigger = 0;

$('#edit-ingredient-list').on('show.bs.modal', function(e) {
    if(is_trigger == 0) {
        is_trigger = 1;
        var trid = $(e.relatedTarget).closest('tr')
        var modal = $('#' + e.currentTarget.id)

        csrfToken = $("input[name=_csrf").val();
        ingredient_id = $(e.relatedTarget).attr("data-id");
        
        $('.loading').fadeIn('slow')
        $.ajax({
            url: homeUrl + "fnb/edit_ingredient",
            type: "POST",
            data: "_csrf=" + csrfToken + "&ingredient_id=" + ingredient_id,
            success: function(data) {
                res = JSON.parse(data);
                modal.find('#nama_material').val(res.detail.nama_material)
                modal.find('#total_stok').val(res.detail.total_stok)
                modal.find('#satuan').val(res.detail.satuan)
                is_trigger = 0;
                $('.loading').fadeOut('slow')
            },
            error: function() {
                $('.loading').fadeOut('slow')
                aler("Something went wrong");
            }
        });
    }
})

$('#edit-ingredient-list').on('hidden.bs.modal', function(e) {
    var modal = $('#' + e.currentTarget.id)
    modal.find('input[type="hidden"], input[type="name"], input[type="number"], input[type="text"]').val('')
    modal.find('.option').removeClass('here')
    modal.find('.registration-box').removeAttr('on')
})