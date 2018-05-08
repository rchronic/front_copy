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

/**
 * create ingredient vvv
 */
$('#form-create-ingredient').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Create Ingredient', 'Are you sure? You are about to create the ingredient.',
        function(event, e) {
            bliss_log(this, "run!");
            if ($(event.target).attr('name') == 'submit') {
                // When click Submit Button
                $.ajax({
                    url: form.attr("action"),
                    type: form.attr("method"),
                    data: formData,
                    success: function(data) {
                        var res = parseJSON(data);

                        process_result(res, "$('#create-new-ingredient').modal('hide'); location.reload()", form[0]);
                        // $('##create-bed-type').modal('hide');

                        spinnerHide(modalInput);

                    },
                    error: function(err) {
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
}).on('submit', function(e) {
    e.preventDefault();
});

var is_trigger = 0;
$('#create-new-ingredient').on('show.bs.modal', function(e) {
    if (is_trigger == 0) {
        is_trigger = 1;
        bliss_log(this, "trigger create new ingredient");
        is_trigger = 0;
    }
})
/**
 * ^^^ create ingredient ^^^
 */

/**
 * vvv update ingredient vvv
 */
$('#form-update-ingredient').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Data Ingredient', 'Are you sure? You are about to edit the ingredient.',
        function(event, e) {
            bliss_log(this, "run!");
            if ($(event.target).attr('name') == 'submit') {
                // When click Submit Button
                $.ajax({
                    url: form.attr("action"),
                    type: form.attr("method"),
                    data: formData,
                    success: function(data) {
                        var res = parseJSON(data);

                        process_result(res, "location.reload()", form[0]);

                        spinnerHide(modalInput);

                    },
                    error: function(err) {
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
}).on('submit', function(e) {
    e.preventDefault();
});


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
                modal.find('input[name="ingredient_id"]').val(res.detail.id)
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
/**
 * ^^^ update ingredient ^^^
 */

 /**
  * vvv delete ingredient vvv
  */
 $('#delete-ingredient-list').on('show.bs.modal', function(e) {
    var modal = $('#' + e.currentTarget.id)
    ingredient_id = $(e.relatedTarget).attr("data-id");

    modal.find('input[name="ingredient_id"]').val(ingredient_id)
})

$('#form-delete-ingredient').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');
    spinnerShow(modalInput)

    $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: formData,
        success: function(data) {
            var res = JSON.parse(data);
            process_result(res, "location.reload()");

            spinnerHide(modalInput);

        },
        error: function(err) {
            showError(err);
            spinnerHide(modalInput);
        }
    });
}).on('submit', function(e) {
    e.preventDefault();
});
/**
 * ^^^ delete ingredient ^^^
 */