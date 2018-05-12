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
 * INGREDIENTS
 * 
 * vvv create ingredient vvv
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




/**
 * CASH OPNAME
 * 
 * vvv  cash opname description vvv
 */
$('#show-cashopname-description').on('show.bs.modal', function(e) {

    csrfToken = $("input[name=_csrf]").val();
    cash_opname_id = $(e.relatedTarget).attr("data-id");
    $('.loading').fadeIn('slow')
    $.ajax({
        url: homeUrl + "fnb/cash_opname_description",
        type: "POST",
        data: "_csrf=" + csrfToken + "&cash_opname_id=" + cash_opname_id,
        success: function(data) {
            res = JSON.parse(data);
            bliss_log(this, res);
            var modal = $('#' + e.currentTarget.id)

            var date = new Date(res.tanggal);

            modal.find('div[for="date"]').text(formatTanggal(date))
            var teks = res.deskripsi;
            modal.find('div[for="description"]').html(teks)
            $('.loading').fadeOut('slow')
        },
        error: function() {
            $('.loading').fadeOut('slow')
            alert("Something went wrong");
        }
    });
})

function formatTanggal(date) {
    var monthNames = [
        "Januari", "Februari", "Maret",
        "April", "Mei", "Juni", "Juli",
        "Agustus", "September", "Oktober",
        "November", "Desember"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}





/**
 * CASHIER ANNOTATION
 * 
 * vvv  create cashier annotation vvv
 */
$('#form-create-cashier-annotation').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Create Cashier Annotation', 'Are you sure? You are about to create the cashier annotation.',
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

                        process_result(res, "$('#create-new-cashier-annotation').modal('hide'); location.reload()", form[0]);

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
$('#create-new-cashier-annotation').on('show.bs.modal', function(e) {
    if (is_trigger == 0) {
        is_trigger = 1;
        bliss_log(this, "trigger create new cashier annotation");
        is_trigger = 0;
    }
})
/**
 * ^^^ create cashier annotation ^^^
 */

 /**
 * vvv update cash opname real cash vvv
 */
$('#form-update-cashopname-real-cash').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Data Real Cash', 'Are you sure? You are about to edit the real cash.',
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
$('#edit-cashopname-real-cash').on('show.bs.modal', function(e) {
    if(is_trigger == 0) {
        is_trigger = 1;
        var trid = $(e.relatedTarget).closest('tr')
        var modal = $('#' + e.currentTarget.id)

        csrfToken = $("input[name=_csrf").val();
        cashier_annotation_id = $(e.relatedTarget).attr("data-id");
        
        $('.loading').fadeIn('slow')
        $.ajax({
            url: homeUrl + "fnb/edit_cashopname_real_cash",
            type: "POST",
            data: "_csrf=" + csrfToken + "&cashier_annotation_id=" + cashier_annotation_id,
            success: function(data) {
                res = JSON.parse(data);
                modal.find('input[name="cashier_annotation_id"]').val(res.detail.id)
                modal.find('#kas_asli').val(res.detail.kas_asli)
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

$('#edit-cashopname-real-cash').on('hidden.bs.modal', function(e) {
    var modal = $('#' + e.currentTarget.id)
    modal.find('input[type="hidden"], input[type="number"]').val('')
    modal.find('.option').removeClass('here')
    modal.find('.registration-box').removeAttr('on')
})
/**
 * ^^^ update cash opname real cash ^^^
 */

/**
 * vvv update cash opname description vvv
 */
$('#form-update-cashopname-description').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Data Description', 'Are you sure? You are about to edit the description.',
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
$('#edit-cashopname-description').on('show.bs.modal', function(e) {
    if(is_trigger == 0) {
        is_trigger = 1;
        var trid = $(e.relatedTarget).closest('tr')
        var modal = $('#' + e.currentTarget.id)

        csrfToken = $("input[name=_csrf").val();
        cashier_annotation_id = $(e.relatedTarget).attr("data-id");
        
        $('.loading').fadeIn('slow')
        $.ajax({
            url: homeUrl + "fnb/edit_cashopname_description",
            type: "POST",
            data: "_csrf=" + csrfToken + "&cashier_annotation_id=" + cashier_annotation_id,
            success: function(data) {
                res = JSON.parse(data);
                modal.find('input[name="cashier_annotation_id"]').val(res.detail.id)
                modal.find('#deskripsi').val(res.detail.deskripsi)
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

$('#edit-cashopname-description').on('hidden.bs.modal', function(e) {
    var modal = $('#' + e.currentTarget.id)
    modal.find('input[type="hidden"], textarea').val('')
    modal.find('.option').removeClass('here')
    modal.find('.registration-box').removeAttr('on')
})
/**
 * ^^^ update cash opname description ^^^
 */

/**
 * vvv update cash opname status vvv
 */
$('#form-update-cashopname-status').on('beforeSubmit', function(e) {
    var form = $(this);
    var formData = form.serialize();

    var modalInput = $(e.currentTarget).find('input[type=submit]');

    spinnerShow(modalInput)

    show_message_confirm('Edit Data Status', 'Are you sure? You are about to edit the status.',
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
$('#edit-cashopname-status').on('show.bs.modal', function(e) {
    if(is_trigger == 0) {
        is_trigger = 1;
        var trid = $(e.relatedTarget).closest('tr')
        var modal = $('#' + e.currentTarget.id)

        csrfToken = $("input[name=_csrf").val();
        cash_opname_id = $(e.relatedTarget).attr("data-id");
        
        $('.loading').fadeIn('slow')
        $.ajax({
            url: homeUrl + "fnb/edit_cashopname_status",
            type: "POST",
            data: "_csrf=" + csrfToken + "&cash_opname_id=" + cash_opname_id,
            success: function(data) {
                res = JSON.parse(data);
                modal.find('input[name="cash_opname_id"]').val(res.detail.id)
                modal.find('#status').val(res.detail.status)
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

$('#edit-cashopname-status').on('hidden.bs.modal', function(e) {
    var modal = $('#' + e.currentTarget.id)
    modal.find('input[type="hidden"], select').val('')
    modal.find('.option').removeClass('here')
    modal.find('.registration-box').removeAttr('on')
})
/**
 * ^^^ update cash opname status ^^^
 */