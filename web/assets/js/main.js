var csrfToken = $("input[name=_csrf]").val();
var showLog = true;
var showSource = true;
var showTrigger = true;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function functionName() {
    var funcName = arguments.callee.toString();
    funcName = funcName.substr('function '.length);
    funcName = funcName.substr(0, funcName.indexOf('('));
    return funcName;
}

function checkModalIsNotShow(modal) {
    if (modal.css("display") == "none") {
        // First time trigger
        return true;
    }
    else {
        // Second time trigger maybe cause by date picker trigger. This is Bug!
        return false;
    }
}

function bliss_log(ele, ...args) {
    //You can pass this array as parameters to another function
    if (showLog) {
        if (showSource) {
            console.log(ele, "- Log -", ...args);
        }
        else {
            console.log(...args);
        }
    }
}

function bliss_trigger(ele, ...args) {
    if (showTrigger) {
        console.log(ele, "- Trigger -", ...args);
    }
}

function pretty_date(strDate) {
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var date = new Date(strDate);
    return date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear();
}

function getDiffDays(date1, date2) { //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24; // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime(); // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms; // Convert back to days and return
    return Math.round(difference_ms / one_day);
}

function getDate(strDate) {
    return new Date(strDate);
}

function addDays(strDate, days) {
    var result = new Date(strDate);
    result.setDate(result.getDate() + days);
    return result;
}

function getPrettyDay(date) {
    var weekday = new Array(7);
    weekday[0] = "Monday";
    weekday[1] = "Tuesday";
    weekday[2] = "Wednesday";
    weekday[3] = "Thursday";
    weekday[4] = "Friday";
    weekday[5] = "Saturday";
    weekday[6] = "Sunday";
    return weekday[date.getDay()];
}

function getPrettyMonth(date) {
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return month[date.getMonth()];
}

function process_result(result, react = null, reset_form = null) {
    // console.log("result json", result);
    if (result.status > 0) {
        title = "Success!";
        if (result.title != null && result.title != "") {
            title = result.title;
        }
        show_message_2(title, result.message, react);
        if (reset_form != null)
            reset_form.reset();
    }
    else {
        if (result.error_code == "E1002") {
            // console.log("working! E1002");
            $("#session-expired").modal("show");
        }
        else {
            title = "Fail!";
            if (result.title != null && result.title != "") {
                title = result.title;
            }
            show_message(title, result.message);

        }
    }
}

function show_message(title, message, react = null) {
    // react = " function() { " + react + " }";
    $("#message-title").text(title);
    $("#message-result").html(message);
    $("#message-button").attr("onclick", react);
    $("#message-modal").modal("show");
}

function show_message_2(title, message, react) {
    $("#message-title-confirmed").text(title);
    $("#message-result-confirmed").html(message);
    $('#message-confirmed').modal('show');
    setTimeout(function(e) {
        $('#message-confirmed').modal('hide');
    }, 2000);
    setTimeout(react, 2000);
}

var execEvent;
// function show_message_confirm(title, message, targetIdentifier, passEvent)
function show_message_confirm(title, message, runEvent) {

    $("#message-title-confirm").text(title);
    $("#message-result-confirm").text(message);
    // $("#message-button-confirm").attr('for', targetIdentifier);
    $('#message-confirm').modal('show');

    if (execEvent != null) {
        $('#message-button-confirm, #message-button-cancel').unbind('click', execEvent);
    }
    execEvent = runEvent;
    $('#message-button-confirm, #message-button-cancel').bind('click', execEvent);

}

function spinnerHide(targetSubmit, submitValue = "Save") {
    targetSubmit.removeClass('spinner');
    targetSubmit.prop('disabled', false);
    targetSubmit.val(submitValue);
}

function spinnerShow(targetSubmit, submitValue = "") {
    targetSubmit.addClass('spinner');
    targetSubmit.prop('disabled', true);
    targetSubmit.val('');
}

function parseJSON(rawData) {
    try {
        json = JSON.parse(rawData);
        return json;
    }
    catch (err) {
        errorJson = {
            "status": 0,
            "type": 1,
            "title": "System Error",
            "message": "Please contact your developer to solve this problem.. <br>Error message: \"" + err + "\"<br>Origin: \"" + rawData + "\""
        }
        return process_result(errorJson);
    }
}

function showError(err = null) {
    errorJson = {
        "status": 0,
        "type": 1,
        "title": "System Error",
        "message": "Please contact your developer to solve this problem.. <br>Error message: \"" + err.statusText + "\" <br><br>" + err.responseText
    }
    console.log(err);
    process_result(errorJson);
}


function forceSelect(elem, val, use_label = false) {
    if (use_label) {
        label = val;
        elem.find('input[type="hidden"]').val(elem.find('.option:contains("' + label + '")').attr("value"));
        elem.find('.option:contains("' + label + '")').addClass('here');
        elem.find('input[type="text"]').val(elem.find('.option:contains("' + label + '")').text());
    }
    else {
        elem.find('input[type="hidden"]').val(val);
        elem.find('.option[value="' + val + '"]').addClass('here');
        elem.find('input[type="text"]').val(elem.find('.option[value="' + val + '"]').text());
    }
}

function removeForceSelect(elem) {
    elem.find('input').removeClass('selected')
    elem.find('input').val('')
    elem.find('.select').hide()
    console.log('dadasd')
}

function loadingShow() {
    $('.loading').fadeIn('slow');
}

function loadingHide() {
    $('.loading').fadeOut('slow');
}


function selectDateOption($now_val, $class, select_b, schedule) {
    if ($class == 'checkin') {
        $other_class = 'checkout'
    }
    else {
        $other_class = 'checkin'
    }

    this_c = $('#assignment-date .assignment-' + $class)
    others = $('#assignment-date .assignment-' + $other_class)
    before = $('#assignment-before').find('input')
    after = $('#assignment-after').find('input')
    active_check = others.find('.active').length

    $('#assignment-date').find('.datepicker-inline .day').removeClass('disable')

    // check before
    if (before.val() == '') {
        before.val($now_val)
    }
    else if (before.val() != '' && after.val() == '') {
        after.val($now_val)
        $('#assignment-date').find('.datepicker-inline .day').addClass('disable')

        // check active position
        if (active_check == 0) {
            var date_match = this_c.find('.day').filter(function() {
                return $(this).text() == before.val().split(' ')[0];
            });
            date_match.addClass('active')
            others.find('.active').removeClass('active')
            this_c.find('.old, .new').removeClass('active')
        }

        select_b.text(before.val() + ' - ' + after.val())
        schedule.text(before.val() + ' - ' + after.val())
    }
    else if (before.val() != '' && after.val() != '') {
        others.find('.active').removeClass('active')
        before.val($now_val)
        after.val('')
    }
}

function datepicker_day_point($this, $other, $week, $match, $status) {
    $('#assignment-date .assignment-' + $other).find('.datepicker-inline .day').removeClass('active')
    $('#assignment-date .assignment-' + $this + ', #assignment-date .assignment-' + $other).find('.datepicker-inline .day').addClass('disable')
    if ($status == '1') {
        $('#assignment-date').find('.assignment-' + $other).datepicker('update', $week)
        $('#assignment-date .assignment-' + $other).find('.datepicker-inline .day').addClass('disable')
        $('#assignment-date .assignment-' + $this + ', #assignment-date .assignment-' + $other).find('.datepicker-inline .active.day, .datepicker-inline .old.day, .datepicker-inline .new.day').removeClass('disable')
    }
    else {
        $('#assignment-date .assignment-' + $this).find('.datepicker-inline .active.day, .datepicker-inline .old.day, .datepicker-inline .new.day').removeClass('disable')
        var week_match = $('#assignment-date .assignment-' + $this).find('.day').filter(function() {
            return $(this).text() == $match;
        });
        week_match.removeClass('disable').addClass('active')
    }
}

//================================ end - global function ====================================== //


$('#message-button-confirm').on('click', function(event) {
    event.preventDefault();
    $('#message-confirm').modal('hide');
    // $('#message-confirmed').modal('show');
})

$('#message-confirmed').on('show.bs.modal', function(event) {
    // setTimeout(location.reload(), 30000); // 3 detik
})

$('#message-confirm, #message-confirmed').on('hidden.bs.modal', function(event) {
    // $("#message-button-confirm").removeAttr('for');
})




$(document).ready(function() {

    $('input[type="text"], input[type="password"], input[type="email"]').on('keyup focus', function() {
        if ($(this).closest(".clearfix")) {
            if (clearEle = $(this).closest(".clearfix").find(".clear")) {
                if ($(this).val().length > 0) {
                    clearEle.show();
                }
                else {
                    clearEle.hide();
                }
            }
        }
    });
    $('input[type="text"], input[type="password"], input[type="email"]').blur(function() {
        if ($(this).closest(".clearfix")) {
            if (clearEle = $(this).closest(".clearfix").find(".clear")) {
                if ($(event.currentTarget).attr("class") != "clear") {
                    clearEle.hide();
                }
            }
        }
    });
    $('.clickable').click(function() {
        var theid = $(this).attr('target');
        $('.float-box').hide();
        if ($(this).is('.active')) {
            $(this).removeClass('active');
            $(theid).hide();
        }
        else {
            $('.clickable').removeClass('active');
            checkLogs($(this).attr("target"));
            $(this).addClass('active');
            $(theid).show();
        }
    })

    function checkLogs(targetEle) {
        if (targetEle == "#button-logs") {
            if ($("#start").val() == 0) {
                $("#view-more").click();
            }
        }
    }

    $('._close').click(function() {
        var theid = $(this).attr('target');
        var theel = theid.replace('#', '.');
        $(theid).hide();
        $(theel).removeClass('active');
    })

    $('#session-expired input[type=submit]').click(function() {
        $("#session-expired").modal("hide");
        $("#your-session-expired").modal("show");
    });

    // change preview photo profile
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#image').attr('style', "background-image:url('" + e.target.result + "')");
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#input').change(function() {
        readURL(this);
    });


    function readIMG(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#image').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#input-src').change(function() {
        readIMG(this);
    });




    // change permission check when property more than 7, slide to prev must actived
    var byk = $('#propertys .props').length;
    var sli = $('.permission-slide').width();
    var pro = $('#propertys ul.props').width();
    var lim = pro * byk + 24;

    $('.permission-content .permission-right').css({
        'width': lim
    })

    if (lim >= sli) {
        $('.slide-next').addClass('active')
        $('.slide-next').attr('page', 0)
        $('.slide-prev').attr('page', 0)
    }
    // --end-- change permission check when property more than 7, slide to prev must actived


    // checking input has checked or not checked
    $('.permission-left input[type=checkbox]').each(function() {

        var list = $(this).closest('.sublist').attr('id');
        var indx = $(this).closest('li').index();

        // checking property if global has checked
        if ($(this).is(':checked')) {
            $('.permission-right li#' + list + ' ul>li:nth-child(' + parseInt(indx + 1) + ') input[type=checkbox]').prop('checked', true)
            $('.permission-right li#' + list + ' ul>li:nth-child(' + parseInt(indx + 1) + ') input[type=checkbox]').prop('readonly', true)
        }
        else {
            $('.permission-right li#' + list + ' ul>li:nth-child(' + parseInt(indx + 1) + ') input[type=checkbox]').prop('checked', false)
            $('.permission-right li#' + list + ' ul>li:nth-child(' + parseInt(indx + 1) + ') input[type=checkbox]').prop('readonly', false)
        }

        // if all property by index has checked, property index must be checked
        if ($('.permission-left #' + list + ' li input[type=checkbox]:checked').length == $('.permission-left #' + list + ' li input[type=checkbox]').length && $('.permission-left #' + list + ' li input[type=checkbox]:checked').length != 0) {
            $('.permission-list #' + list + ' strong input[type=checkbox]').prop('checked', true)
            $('.permission-list #' + list + ' strong input[type=checkbox]').prop('readonly', true)
        }

        // if all property has checked, GLOBAL must be checked
        if ($('.permission-list input[type=checkbox]:checked').length == $('.permission-list input[type=checkbox]').length) {
            $('#global-select').prop('checked', true);
            $('#global-select').prop('readonly', true);
        }
        else if ($('.permission-list input[type=checkbox]:checked').length != $('.permission-list input[type=checkbox]').length) {
            $('#global-select').prop('checked', false);
            $('#global-select').prop('readonly', false);
        }

    })

    // disable click when readonly exists
    $(document).on('click', 'input[type=checkbox]', function() {
        bliss_trigger("$(document).on('click', 'input[type=checkbox]', function(){");
        var ronly = $(this).attr('readonly')
        // console.log(ronly)
        if (typeof ronly !== typeof undefined && ronly !== false) {
            return false;
        }
        else {
            return true;
        }
    });


});

function checkField() {
    bliss_trigger("function checkField(){");
    var empty = false;
    if ($("#dynamicmodel-login_username").val() != "") {
        $('.auth-form input[type=submit]').removeAttr('disabled');
    }
}

$(window).on('load', function() {

    var last_show = null;
    var last_timer = null;
    $(document).on('mousedown', 'div.clear', function() {
        console.log(event);
        $(this).prev('input').val('');
        $(this).prev('textarea').val('');
        $('input[type=submit]').attr('disabled', 'disabled');
    });

    $('body').click(function(e) {
        bliss_trigger("$('body').click(function(e){ 486")
        if (last_show != null && last_show != e.target) {
            $(last_show).removeClass("opened");
            last_show = null;
        }
    });


    $(document).on('click', 'span.password', function() {
        var target = $(this).attr('target');

        if ($(target + ' #password').is('[type=password]')) {
            $(target + ' label').removeClass('_show').addClass('_hide');
            $(target + ' label > span.password').text('Hide');
            $(target + ' #password').attr('type', 'text');
        }
        else {
            $(target + ' label').removeClass('_hide').addClass('_show');
            $(target + ' label > span.password').text('Show');
            $(target + ' #password').attr('type', 'password');
        }
    });

    $(document).on('keyup', '.auth-form input', function() {
        var empty = false;
        $('.auth-form').find('input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (empty) {
            $('.auth-form').find('input[type=submit]').attr('disabled', 'disabled');
        }
        else {
            $('.auth-form').find('input[type=submit]').removeAttr('disabled');
        }
    });

    $(document).on('change', '.auth-form input', function() {
        var empty = false;
        $('.auth-form').find('input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (empty) {
            $('.auth-form').find('input[type=submit]').attr('disabled', 'disabled');
        }
        else {
            $('.auth-form').find('input[type=submit]').removeAttr('disabled');
        }
    });

    // handling 3x error login
    // $('#3x-error').modal('show');


    //////////////// USERS & PERMISSION ///////////////////
    $('.selection').each(function() {
        var sel = $(this).attr('id');
        var repl = sel.replace('sel', '');
        var here = $('.content-list ul.' + repl + '>li.here').text();
        var targ = $('.content-list #sel' + repl).text(here);
    })

    $(document).on('click', '.content-list li', function() {
        var teks = $(this).text();
        var ul = $(this).closest('ul').attr('class');

        var cond = $(this).closest('.content-list').attr('data-condition');
        if (cond == 'table_length') {
            if (teks == 'All') {
                magic.page.len(-1).draw();
            }
            else {
                magic.page.len(teks).draw();
            }
        }
        else if (cond == 'table_sorting') {
            var tval = $(this).attr('value');
            magic.order([tval, 'asc']).draw();
        }

        $('.content-list').find('#sel' + ul).text(teks);
        $('.content-list').find('ul.' + ul + ' li').removeClass('here');
        $(this).addClass('here');
        $('.list-table').hide();
        $('.selection').removeClass('opened');
    })

    $(document).on('click', '.property-option li', function(event) {
        $('.property-option li').removeClass('current');
        $(this).addClass('current');
        console.log("li ele", this);
        $(".add-user").text($(this).attr("property-name"));
        $("#profile").hide();
        $(".profile").removeClass('active');
        sendProperty($(this).attr("id"));
        event.preventDefault();
    })

    $(document).on('click', '.selection', function() {
        if ($(this).next('.list-table').is(':hidden')) {
            $('.list-table').hide();
            $(this).next('.list-table').show();
            $('.selection').removeClass('opened');
            $(this).addClass('opened');
        }
        else {
            $('.list-table').hide();
            $(this).next('.list-table').hide();
            $('.selection').removeClass('opened');
        }
    })

    $(document).on('click', '.table-button', function() {
        if ($(this).is('.opened')) {
            last_show = null;
            $('.table-button').removeClass('opened');
            $(this).removeClass('opened');
        }
        else {
            $('.table-button').removeClass('opened');
            $(this).addClass('opened');
            last_timer = this;
            setTimeout(function() {
                last_show = last_timer;
            }, 100)
        }
    })

    function sendProperty(propertyCode) {
        csrfToken = $("input[name=_csrf]").val();
        $.ajax({
            url: homeUrl + "admin/change_active_property",
            type: "POST",
            data: "_csrf=" + csrfToken + "&" + "property_code=" + propertyCode,
            success: function(data) {
                console.log("change property success");
            },
            error: function() {
                alert("Something went wrong");
            }
        });

    }

    function fillUserData(mods, userId) {
        csrfToken = $(mods + " input[name=_csrf]").val();
        $.ajax({
            url: homeUrl + "admin/get_user_data",
            type: "POST",
            data: "_csrf=" + csrfToken + "&" + "user_id=" + userId,
            success: function(data) {
                var res = JSON.parse(data);
                if (res.phone) {
                    $(mods + ' #phone input').val(res.phone);
                    $(mods + ' #username input').val(res.user_name);
                    $(mods + ' #email input').val(res.email);
                    for (var index = 0; index < res.positions.length; index++) {
                        var position = res.positions[index];
                        // console.log(position.label)
                        if (position.selected) {
                            $(mods + ' #position').find('input[type=text]').val(position.label);
                            $(mods + ' #position').find('.option[value="' + position.id + '"]').addClass('here');
                            $(mods + ' #position').find('input[type=hidden]').val(position.id);
                        }
                    }
                    for (var index = 0; index < res.roles.length; index++) {
                        var role = res.roles[index];
                        // console.log(role.label +' = '+ role.id)
                        if (role.selected) {
                            $(mods + ' #role').find('input[type=text]').val(role.label);
                            $(mods + ' #role').find('.option[value="' + role.id + '"]').addClass('here');
                            $(mods + ' #role').find('input[type=hidden]').val(role.id);
                        }
                    }
                    $(mods + ' input[type="checkbox"]').prop('checked', false);
                }
                // if ( res.code ) {
                //     console.log("result",res, "code", res.code);
                //     var propcode = res.code;
                //     for(n=1;n<=3;n++){
                //         var cod = propcode.substr(n-1, 1);
                //         $(mods + ' #property-code input.width-3:nth-child('+n+')').val(cod);
                //     }
                // }
                // else {
                //     element.val("000");
                // }

                $('.loading').fadeOut('slow')

            },
            error: function() {
                alert("Something went wrong");
            }
        });
    }

    $(document).on('click', '.permission-button li', function() {
        $('.table-button').removeClass('opened');

        var target = $(this).attr('modal-target');
        var targid = $(this).attr('target-id');

        if (target != null) {
            // var user   = $(this).closest('tr').attr('data-user');
            $(target).modal('show');
            if (target == '#edit-user') {
                $('.loading').fadeIn('slow')
                var trid = 'tr[data-user=user-' + targid + ']';
                var fullname = $(trid + ' td[data-fullname]').attr('data-fullname');
                var phone = $(trid + ' td[data-phone]').attr('data-phone');
                var employee = $(trid + ' td[data-employee]').attr('data-employee');
                var username = $(trid + ' td[data-username]').attr('data-username');
                var email = $(trid + ' td[data-email]').attr('data-email');
                var position = $(trid + ' td[data-position]').attr('data-position');
                var role = $(trid + ' td[data-role]').attr('data-role');
                var expirate = $(trid + ' td[data-expirate]').attr('data-expirate');
                var userid = $(trid + ' td[data-userid]').attr('data-userid');
                var mods = '.modal' + target;

                $(mods + ' #userid').val(userid);
                $(mods + ' #fullname input').val(fullname);
                $(mods + ' #employee input').val(employee);
                $(mods + ' #username input').val(username);
                $(mods + ' #email input').val(email);
                // $(mods+' #position .option[position="'+position+'"]').addClass('here');
                // $(mods+' #position input[type=hidden]').val(position);
                // $(mods+' #role .option[role="'+role+'"]').addClass('here');
                // $(mods+' #role input[type=hidden]').val(role);
                $(mods + ' input[type="checkbox"]').prop('checked', false);
                option_here();
                if (expirate == 'Never') {
                    $(mods + ' #never input[type=checkbox]').prop('checked', true); // checkbox checked
                }
                else {
                    $(mods + ' #expirate input').val(expirate); // yyyy-mm-dd
                }
                fillUserData(mods, userid);

                // $('.loading').fadeOut('slow')


            }
            else if (target == '#remove-user') {
                var trid = 'tr[data-user="user-' + targid + '"]';
                var userid = $(trid).find('td[data-userid]').attr('data-userid');
                var fullname = $(trid).find('td[data-fullname]').attr('data-fullname');

                $('.modal' + target).find('input#user-id').val(userid);
                $('.modal' + target).find('span.remove-name').text(fullname);
            }
        }
        else {
            window.location = homeUrl + "admin/change_permission?userid=" + targid;
        }
    })

    function option_here() {
        $('.option.here').each(function() {
            var teks = $(this).text();
            var tval = $(this).attr('value');
            var thid = $(this).closest('.clearfix').attr('id');
            $('#' + thid).find('input[type="text"]').val(teks);
            $('#' + thid).find('input[type="hidden"]').val(tval);
        })
    }

    $(document).on('click', '.select-input', function() {
        var thid = $(this).attr('id');
        var modl = $(this).closest('.modal').attr('id');
        if ($('#' + modl + ' #' + thid).find('.select').is(':visible')) {
            $('#' + modl + ' .select-input').find('input[type="text"]').removeClass('selected');
            $('#' + modl + ' .select-input').find('.select').slideUp('fast');
        }
        else {
            $('#' + modl + ' .select-input').find('input[type="text"]').removeClass('selected');
            $('#' + modl + ' .select-input').find('.select').slideUp('fast');
            $('#' + modl + ' #' + thid).find('.select').slideDown('fast');
            $('#' + modl + ' #' + thid).find('input').addClass('selected');
        }
        $('#' + modl + ' .select-input-sub').find('input[type="text"]').removeClass('selected');
        $('#' + modl + ' .select-input-sub').find('.select-sub').slideUp('fast');
    })

    $(document).on('click', '.select .option', function() {
        var teks = $(this).text();
        var tval = $(this).attr('value');
        var thid = $(this).closest('.clearfix').attr('id');
        var modl = $(this).closest('.modal').attr('id');
        $('#' + modl).find('#' + thid + ' input').val(teks)
        $('#' + modl).find('#' + thid + ' input[type="hidden"]').val(tval)
        $('#' + modl).find('#' + thid + ' .option').removeClass('here')
        $(this).addClass('here')
    })

    $(document).on('click', '#goup', function() {
        var container = $('.long-activity'),
            scrollTo = $('.long-activity ul li:first-child');
        container.animate({
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
        }, 'slow');
    });


    // USERS & PERMISSION datepicker & datatable
    $('.edit-datepicker').datepicker({
        container: '#edit-user #expirate',
        orientation: 'top left',
        leftArrow: '',
        rightArrow: '',
        autoclose: true
    });

    $('.new-datepicker').datepicker({
        container: '#new-user #new-expirate',
        orientation: 'top left',
        leftArrow: '<',
        rightArrow: '>',
        autoclose: true
    });

    var magic = $('#magic-table').DataTable({
        'paging': true,
        'ordering': true,
        'info': false,
        'language': {
            'zeroRecords': 'Sorry, we cannot help you to find what you’re looking for. Try another word may help us to help you :)'
        }
    });

    magic.page.len(12).draw();

    $('#magic-search').on('keyup', function() {
        magic.search(this.value).draw();
        var searc = magic.search(this.value).draw();
    });

    $(document).on('click', '.search-box .clear', function() {
        magic.search('').draw();
        magic.page.len(12).draw();
    });
    // USERS & PERMISSION datepicker & datatable

    $(document).on('change', '#never input', function() {
        if ($(this).is(':checked')) {
            $('#expirate').find('input').val('');
            $('#expirate').find('input').prop('disabled', true);
        }
        else {
            $('#expirate').find('input').prop('disabled', false);
        }
    })

    $(document).on('change', '#new-check', function() {
        if ($(this).is(':checked')) {
            $('#new-expirate').find('input').val('');
            $('#new-expirate').find('input').prop('disabled', true);
        }
        else {
            // $('#new-expirate input').val('');
            $('#new-expirate').find('input').prop('disabled', false);
        }
    })
    //////////////// USERS & PERMISSION ///////////////////



    //////////////// MANAGE ROLES ///////////////////
    $(document).on('click', '.checkbox-list li.sublist strong', function() {
        console.log("work 1");
        if ($(this).closest('li.sublist').is('.opened')) {
            $('.checkbox-list').find('li.sublist').removeClass('opened');
        }
        else {
            $('.checkbox-list').find('li.sublist').removeClass('opened');
            $(this).closest('li.sublist').addClass('opened');
        }
    })

    $(document).on('change', '.select-all', function() {
        console.log("work 2");
        if ($(this).is(':checked')) {
            $('.checkbox-list').find('input[type=checkbox]').prop('checked', true);
        }
        else {
            $('.checkbox-list').find('input[type=checkbox]').prop('checked', false);
        }
    });

    $(document).on('change', '.checkbox-list strong input[type=checkbox]', function() {
        console.log("work 3");
        var list = $(this).closest('.sublist').attr('id');
        if ($(this).is(':checked')) {
            $('li#' + list).find('input[type=checkbox]').prop('checked', true);
            // $('li#'+list+' input[type=checkbox]').prop('readonly', true);
        }
        else {
            $('li#' + list).find('input[type=checkbox]').prop('checked', false);
            // $('li#'+list+' input[type=checkbox]').prop('readonly', false);
        }
    });

    $(document).on('change', '.checkbox-list input[type=checkbox]', function() {
        console.log("work 4");

        // var modl = $(this).closest('.modal').find().attr('id');
        var modl = $(this).closest('.modal.in').attr('id');
        var list = $(this).closest('.sublist').attr('id');
        // console.log(list)

        if ($('#' + modl + ' #' + list + ' ul').find('input[type=checkbox]:checked').length == $('#' + modl + ' #' + list + ' ul').find('input[type=checkbox]').length && $('#' + modl + ' #' + list + ' ul').find('input[type=checkbox]:checked').length != 0) {
            $('#' + modl + ' #' + list + ' strong').find('input[type=checkbox]').prop('checked', true);
        }
        else if ($('#' + modl + ' #' + list + ' ul').find('input[type=checkbox]:checked').length != $('#' + modl + ' #' + list + ' ul').find('input[type=checkbox]').length) {
            $('#' + modl + ' #' + list + ' strong').find('input[type=checkbox]').prop('checked', false);
        }

        if (modl == 'edit-role') {
            modl = 'edit-role';
        }
        else {
            modl = 'new-role';
        }

        if ($('#' + modl + ' .checkbox-list strong').find('input[type=checkbox]:checked').length == $('#' + modl + ' .checkbox-list strong').find('input[type=checkbox]').length) {
            $('#' + modl + ' #select-all').prop('checked', true);
            // $('#'+modl+' #select-all').prop('readonly', true);
        }
        else if ($('#' + modl + ' .checkbox-list strong').find('input[type=checkbox]:checked').length != $('#' + modl + ' .checkbox-list strong').find('input[type=checkbox]').length) {
            $('#' + modl + ' #select-all').prop('checked', false);
            // $('#'+modl+' #select-all').prop('readonly', false);
        }
    });


    function select_all() {
        $('.select-all:checked').each(function() {
            $('.checkbox-list').find('input[type=checkbox]').prop('checked', true);
        });
    }

    $('#edit-profile').on('show.bs.modal', function(event) {
        var modal = $("#edit-profile");
        var user_id = modal.find('input[name="user_id"]').val();
        console.log("user id", user_id);
        $.ajax({
            url: homeUrl + "admin/get_user_data",
            type: "POST",
            data: "_csrf=" + csrfToken + "&" + "user_id=" + user_id,
            success: function(data) {
                user_data = JSON.parse(data);
                modal.find('input[name="full_name"]').val(user_data.full_name);
                modal.find('input[name="email"]').val(user_data.email);
                modal.find('input[name="user_name"]').val(user_data.user_name);
                modal.find('input[name="phone"]').val(user_data.phone);
            }
        });
    });

    $('#edit-role').on('show.bs.modal', function(event) {
        console.log("work!");
        $('.table-button').removeClass('opened');
        var targid = $(event.relatedTarget).attr('target-id')
        var trid = 'tr[data-role=role-' + targid + ']';
        var roles = $(trid + ' td[data-roles]').attr('data-roles');
        var mods = '.modal#edit-role';
        var permi = $(trid + ' td[data-permission]').attr('data-permission');
        var pisah = permi.split(',');
        var total = pisah.length;

        $('.select-all').prop('checked', false);
        $('.checkbox-list').find('input[type=checkbox]').prop('checked', false);
        $('.loading').fadeIn('slow')

        console.log("roles", $(mods + ' #roles input'), roles);
        $(mods + ' #roles input').val(roles);
        var role_id = $(trid).attr('role-id');
        console.log("role id ", role_id);
        $("#edit_role_id").val(role_id);
        csrfToken = $("input[name=_csrf]").val();
        $.ajax({
            url: homeUrl + "admin/get_role",
            type: "POST",
            data: "_csrf=" + csrfToken + "&" + "role_id=" + role_id,
            success: function(data) {
                var res = JSON.parse(data);
                console.log("result", res);

                $(res.services).each(function(key, service) {
                    $(service.modules).each(function(key2, module) {


                        // console.log("module", $(service.modules).length );
                        $(module.permissions).each(function(key3, permission) {
                            console.log("permission", permission, $('#prop_' + permission.id));
                            $('#prop_' + permission.id).prop('checked', permission.selected);
                        });
                    });
                    // console.log("service ", service);
                });

                return recalculate_checkbox_role('#edit-role');
                return 0;

                if (res.code) {
                    console.log("result", res, "code", res.code);
                    var propcode = res.code;
                    for (n = 1; n <= 3; n++) {
                        var cod = propcode.substr(n - 1, 1);
                        $(mods + ' #property-code').find('input.width-3:nth-child(' + n + ')').val(cod);
                    }
                }
                else {
                    element.val("000");
                }
            },
            error: function() {
                alert("Something went wrong");
            }
        });

        // $.each(pisah, function( index, value ) {
        //     if(value == '-'){
        //         $('.select-all').prop('checked', false);
        //         $('.checkbox-list input').prop('checked', false);
        //     }
        //     if(value == 0){
        //         $('.select-all').prop('checked', true);
        //         select_all()
        //     }
        //     if(value == 1){
        //         $('#manage-user').prop('checked', true);
        //         $('#_user input').prop('checked', true);
        //     }
        //     if(value == 2){
        //         $('#manage-property').prop('checked', true);
        //         $('#_property input').prop('checked', true);
        //     }
        //     if(value == 3){
        //         $('#manage-service').prop('checked', true);
        //         $('#_service input').prop('checked', true);
        //     }
        //     if(value == 4){
        //         $('#manage-others').prop('checked', true);
        //         $('#_others input').prop('checked', true);
        //     }
        // });
    })


    function recalculate_checkbox_role(id) {
        // hitung checked setelah pilih role
        console.log("trigger check checkbox");
        $(id + ' .checkbox-list li ul input[type=checkbox]').each(function() {

            var list = $(this).closest('.sublist').attr('id');
            var indx = $(this).closest('li').index();

            // if all property by index has checked, property index must be checked
            if ($(id + ' .checkbox-list #' + list + ' li').find('input[type=checkbox]:checked').length == $(id + ' .checkbox-list #' + list + ' li').find('input[type=checkbox]').length && $(id + ' .checkbox-list #' + list + ' li').find('input[type=checkbox]:checked').length != 0) {
                $(id + ' .checkbox-list #' + list + ' strong').find('input[type=checkbox]').prop('checked', true)
                // $(id+' .checkbox-list #'+list+' strong').find('input[type=checkbox]').prop('readonly', true)
            }

            if ($(id + ' .checkbox-list strong').find('input[type=checkbox]:checked').length == $(id + ' .checkbox-list strong').find('input[type=checkbox]').length) {
                $(id + ' #select-all').prop('checked', true);
                // $(id+' #select-all').prop('readonly', true);
            }
            else if ($(id + ' .checkbox-list strong').find('input[type=checkbox]:checked').length != $(id + ' .checkbox-list strong').find('input[type=checkbox]').length) {
                $(id + ' #select-all').prop('checked', false);
                // $(id+' #select-all').prop('readonly', false);
            }

        })
        // -- end --   hitung checked setelah pilih role

        $('.loading').fadeOut('slow')

    }


    $('#edit-role').on('hidden.bs.modal', function() {
        $('.checkbox-list li.sublist').removeClass('opened');
        $('.select-all').prop('checked', false);
        $('.checkbox-list input').prop('checked', false);
    })

    function getPropertyCode(mods, propertyId) {
        csrfToken = $(mods + " input[name=_csrf]").val();
        $.ajax({
            url: homeUrl + "admin/get_property_data",
            type: "POST",
            data: "_csrf=" + csrfToken + "&" + "property_id=" + propertyId,
            success: function(data) {
                var res = JSON.parse(data);
                if (res.code) {
                    console.log("result", res, "code", res.code);
                    var propcode = res.code;
                    for (n = 1; n <= 3; n++) {
                        var cod = propcode.substr(n - 1, 1);
                        $(mods + ' #property-code input.width-3:nth-child(' + n + ')').val(cod);
                    }
                }
                else {
                    element.val("000");
                }
            },
            error: function() {
                alert("Something went wrong");
            }
        });
    }

    // $('#session-expired').modal('show');
    // $('#your-session-expired').modal('show', {backdrop: 'static', keyboard: false});
    // $('#edit-profile').modal('show');
    // $('#change-password').modal('show');
    //////////////// MANAGE ROLES ///////////////////


    //////////////// PROPERTY ///////////////////
    $('#detail-property').on('show.bs.modal', function(event) {
        var targid = $(event.relatedTarget).attr('target-id')
        var mods = '.modal#detail-property';

        var propname = $('#box-' + targid + ' .row-title h4').text();
        var proptype = $('#box-' + targid + ' #property-type span').text();
        var propaddr = $('#box-' + targid + ' #property-address').text();
        var propcity = $('#box-' + targid + ' #property-city').text();
        var propcode = $('#box-' + targid + ' #property-code').text();
        $(mods + ' #property-name').text(propname)
        $(mods + ' #property-type').text(proptype)
        $(mods + ' #property-address').text(propaddr)
        $(mods + ' #property-city').text(propcity)
        $(mods + ' #property-code').text(propcode)
        $(mods + ' button.edit').attr('target-id', targid)
    })

    $('#edit-property').on('show.bs.modal', function(event) {
        var targid = $(event.relatedTarget).attr('target-id')
        var mods = '.modal#edit-property';

        // $(mods+' .modal-title').text(targid)
        var propid = $('#box-' + targid + ' #property-id').val();
        var propimag = $('#box-' + targid + ' #property-logo').attr('src');
        var propicon = $('#box-' + targid + ' #property-logo').attr('icon');
        var propname = $('#box-' + targid + ' .row-title h4').text();
        var proptype = $('#box-' + targid + ' #property-type span').text();
        var propaddr = $('#box-' + targid + ' #property-address').text();
        var propcity = $('#box-' + targid + ' #property-city').text();
        var propcode = getPropertyCode(mods, propid);
        var tval = $(mods + ' #property_type .select .option:contains("' + proptype + '")').attr('value');
        var tcit = $(mods + ' #city .select .option:contains("' + propcity + '")').attr('value');
        $(mods + ' #image').attr('src', propimag);
        $(mods + ' #current_icon').val(propicon);
        $(mods + ' #property_id').val(propid);
        $(mods + ' #property-name').val(propname);
        $(mods + ' #property_type input[readonly]').val(proptype);
        $(mods + ' #property_type .select .option:contains("' + proptype + '")').addClass('here');
        $(mods + ' #property_type input[type="hidden"]').val(tval);
        $(mods + ' #property-address').val(propaddr);
        $(mods + ' #city input[readonly]').val(propcity);
        $(mods + ' #city .select .option:contains("' + propcity + '")').addClass('here');
        $(mods + ' #city input[type="hidden"]').val(tcit);
    })
    $('#edit-property').on('hidden.bs.modal', function(event) {
        $('body').removeAttr('style');
        var mods = '.modal#edit-property';
        $(mods + ' #city .select .option').removeClass('here');
        $(mods + ' #property_type .select .option').removeClass('here');
        $(mods + ' .select-input .select').slideUp('fast');
        $(mods + ' input[readonly], ' + mods + ' input[disabled]').removeClass('selected');
    })



    $('.width-3').keyup(function() {
        if (this.value.length == this.maxLength) {
            $(this).next('.width-3').focus();
        }
    });


    ////////////// MODAL /////////////////

    $('.notif-content #settings').click(function() {
        event.preventDefault();
        $('#edit-profile').modal('show');
    });

    $('.button-profile .edit-profile').click(function() {
        event.preventDefault();
        $('#edit-profile').modal('show');
    });

    $('.button-profile .change-password').click(function() {
        event.preventDefault();
        $('#change-password').modal('show');
    });

    ////////////// AJAX //////////////////

    $('#photo-profile').on('change', function(e) {
        var form = $('#form-profile');
        var file = e.target.files[0];
        var data = new FormData(form[0]);
        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: data,
            async: false,
            success: function(data) {
                var res = JSON.parse(data);
                if (res.status) {
                    show_message("Success!", res.message, "location.reload();");
                    form[0].reset();
                }
                else {
                    show_message("Fail!", res.message);
                }
            },
            error: function() {
                alert("Something went wrong");
            },
            cache: false,
            contentType: false,
            processData: false
        });
        // var xhr = new XMLHttpRequest();
        // if ( xhr.upload ) {
        //     xhr.onreadystatechange = function(e) {
        //         if (xhr.readyState == 4) {
        //             xhr = null;
        //         }
        //     };
        //     xhr.open("POST", form.attr("action") + "?file_name=" + file.name, true);

        //     console.log("upload file name is ", file.name);
        //     xhr.setRequestHeader("X_FILENAME", file.name);
        //     xhr.send(file);
        // }
    });

    $('#view-more').on('click', function(e) {
        var form = $("#form-view-more");
        var formData = form.serialize();
        var new_log;
        var log_data;

        $('#view-more').text('');
        $('#view-more').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                if (res.status) {
                    for (num = 0; num < res.data.length; num++) {
                        log_data = res.data[num];
                        new_log = ' \
                            <li> \
                                <div class="thumb"> \
                                    <img src="' + homeUrl + 'assets/photo/' + log_data.icon + '" alt=""> \
                                </div> \
                                ' + log_data.text + '\
                                <div class="date">' + log_data.date + '</div> \
                            </li>';
                        $('.activity').append(new_log);
                    }
                    $('#start').val(parseInt($('#start').val()) + res.data.length);

                }
                else {
                    show_message("Fail!", res.message);
                }
                $('#view-more').removeClass('spinner');
                $('#view-more').text('View more');
            },
            error: function() {
                alert("Something went wrong");
                $('#view-more').removeClass('spinner');
                $('#view-more').text('View more');
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-login').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();

        $('#form-login input[type=submit]').val('');
        $('#form-login input[type=submit]').prop('disabled', true);
        $('#form-login input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = parseJSON(data);
                if (res.status == false) {
                    if (res.error_code == "E2001" || res.error_code == "E2003") {
                        show_message("Fail!", res.message);
                    }
                    else if (res.error_code == "E2002") {
                        $("#3x-error").modal("show");

                        // var diffDate = moment.utc(date.getTime().diff(moment(res.data.suspensionLimit,"YYYY-MM-DD HH:mm:ss"))).format("mm:ss")

                        var ReleaseStamp = Math.round(new Date(res.data.suspensionLimit).getTime() / 1000);
                        var CurrentStamp = Math.round(new Date().getTime() / 1000);
                        var diffDate = ReleaseStamp - CurrentStamp;
                        var minute = Math.floor(diffDate / 60);
                        var second = diffDate % 60;
                        console.log("Diff date", diffDate, minute, second);
                        $("#countdown").html(minute + " mins " + second + " secs");
                    }

                    $('#form-login input[type=submit]').removeClass('spinner');
                    $('#form-login input[type=submit]').prop('disabled', false);
                    $('#form-login input[type=submit]').val('Login');

                }
                else {
                    window.location = res.dashboard;
                }
            },
            error: function(e) {
                showError(e);
                $('#form-login input[type=submit]').removeClass('spinner');
                $('#form-login input[type=submit]').prop('disabled', false);
                $('#form-login input[type=submit]').val('Login');
            }

        });

    }).on('submit', function(e) {
        e.preventDefault();
        // $('#form-login input[type=submit]').removeClass('spinner');
        // $('#form-login input[type=submit]').prop('disabled', false);
        // $('#form-login input[type=submit]').val('Login');
    });

    $('#form-change-password').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();

        $('#form-change-password input[type=submit]').val('');
        $('#form-change-password input[type=submit]').prop('disabled', true);
        $('#form-change-password input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#change-password').modal('hide');", form[0]);

                $('#form-change-password input[type=submit]').removeClass('spinner');
                $('#form-change-password input[type=submit]').prop('disabled', false);
                $('#form-change-password input[type=submit]').val('Save');
            },
            error: function() {
                alert("Something went wrong");
                $('#form-change-password input[type=submit]').removeClass('spinner');
                $('#form-change-password input[type=submit]').prop('disabled', false);
                $('#form-change-password input[type=submit]').val('Save');
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-add-user').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();

        $('#form-add-user input[type=submit]').val('');
        $('#form-add-user input[type=submit]').prop('disabled', true);
        $('#form-add-user input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#new-user').modal('hide');", form[0]);

                $('#form-add-user input[type=submit]').removeClass('spinner');
                $('#form-add-user input[type=submit]').prop('disabled', false);
                $('#form-add-user input[type=submit]').val('Save');

            },
            error: function() {
                alert("Something went wrong");
                $('#form-add-user input[type=submit]').removeClass('spinner');
                $('#form-add-user input[type=submit]').prop('disabled', false);
                $('#form-add-user input[type=submit]').val('Save');
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-remove-user').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();
        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#remove-user').modal('hide');");
            },
            error: function() {
                alert("Something went wrong");
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-reset-password').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();
        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "window.location = '" + res.login + "'", form[0]);

            },
            error: function() {
                alert("Something went wrong");
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-forgot-password').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();

        $('#form-forgot-password input[type=submit]').val('');
        $('#form-forgot-password input[type=submit]').prop('disabled', true);
        $('#form-forgot-password input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "", form[0]);
                $('#form-forgot-password input[type=submit]').removeClass('spinner');
                $('#form-forgot-password input[type=submit]').prop('disabled', false);
                $('#form-forgot-password input[type=submit]').val('Send');
            },
            error: function() {
                alert("Something went wrong");
                $('#form-forgot-password input[type=submit]').removeClass('spinner');
                $('#form-forgot-password input[type=submit]').prop('disabled', false);
                $('#form-forgot-password input[type=submit]').val('Send');
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });



    $('#form-edit-profile').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();

        $('#form-edit-profile input[type=submit]').val('');
        $('#form-edit-profile input[type=submit]').prop('disabled', true);
        $('#form-edit-profile input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#edit-profile').modal('hide'); location.reload();");

                $('#form-edit-profile input[type=submit]').removeClass('spinner');
                $('#form-edit-profile input[type=submit]').prop('disabled', false);
                $('#form-edit-profile input[type=submit]').val('Save');

            },
            error: function() {
                alert("Something went wrong");
                $('#form-edit-profile input[type=submit]').removeClass('spinner');
                $('#form-edit-profile input[type=submit]').prop('disabled', false);
                $('#form-edit-profile input[type=submit]').val('Save');
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-edit-user-profile').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();

        $('#form-edit-user-profile input[type=submit]').val('');
        $('#form-edit-user-profile input[type=submit]').prop('disabled', true);
        $('#form-edit-user-profile input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#edit-user').modal('hide');");

                $('#form-edit-user-profile input[type=submit]').removeClass('spinner');
                $('#form-edit-user-profile input[type=submit]').prop('disabled', false);
                $('#form-edit-user-profile input[type=submit]').val('Save');

            },
            error: function() {
                alert("Something went wrong");
                $('#form-edit-user-profile input[type=submit]').removeClass('spinner');
                $('#form-edit-user-profile input[type=submit]').prop('disabled', false);
                $('#form-edit-user-profile input[type=submit]').val('Save');
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-add-property').on('beforeSubmit', function(e) {
        var form = $(this);
        var data = new FormData(form[0]);

        $('#form-add-property input[type=submit]').val('');
        $('#form-add-property input[type=submit]').prop('disabled', true);
        $('#form-add-property input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: data,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#new-property').modal('hide');");

                $('#form-add-property input[type=submit]').removeClass('spinner');
                $('#form-add-property input[type=submit]').prop('disabled', false);
                $('#form-add-property input[type=submit]').val('Save');

            },
            error: function() {
                alert("Something went wrong");
                $('#form-add-property input[type=submit]').removeClass('spinner');
                $('#form-add-property input[type=submit]').prop('disabled', false);
                $('#form-add-property input[type=submit]').val('Save');
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-edit-property').on('beforeSubmit', function(e) {
        var form = $(this);
        var data = new FormData(form[0]);
        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: data,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#edit-property').modal('hide');");
            },
            error: function() {
                alert("Something went wrong");
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-session-expired').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();
        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#your-session-expired').modal('hide');", form[0]);
            },
            error: function() {
                alert("Something went wrong");
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-change-permission').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();

        $('#form-change-permission input[type=submit]').val('');
        $('#form-change-permission input[type=submit]').prop('disabled', true);
        $('#form-change-permission input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "");

                $('#form-change-permission input[type=submit]').removeClass('spinner');
                $('#form-change-permission input[type=submit]').prop('disabled', false);
                $('#form-change-permission input[type=submit]').val('Save');

            },
            error: function() {
                alert("Something went wrong");
                $('#form-change-permission input[type=submit]').removeClass('spinner');
                $('#form-change-permission input[type=submit]').prop('disabled', false);
                $('#form-change-permission input[type=submit]').val('Save');
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-add-role').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();

        $('#form-add-role input[type=submit]').val('');
        $('#form-add-role input[type=submit]').prop('disabled', true);
        $('#form-add-role input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#add-role').modal('hide'); location.reload();");

                $('#form-add-role input[type=submit]').removeClass('spinner');
                $('#form-add-role input[type=submit]').prop('disabled', false);
                $('#form-add-role input[type=submit]').val('Save');

            },
            error: function() {
                alert("Something went wrong");
                $('#form-add-role input[type=submit]').removeClass('spinner');
                $('#form-add-role input[type=submit]').prop('disabled', false);
                $('#form-add-role input[type=submit]').val('Save');
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });

    $('#form-edit-role').on('beforeSubmit', function(e) {
        var form = $(this);
        var formData = form.serialize();

        $('#form-edit-role input[type=submit]').val('');
        $('#form-edit-role input[type=submit]').prop('disabled', true);
        $('#form-edit-role input[type=submit]').addClass('spinner');

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: formData,
            success: function(data) {
                var res = JSON.parse(data);
                process_result(res, "$('#edit-role').modal('hide');");

                $('#form-edit-role input[type=submit]').removeClass('spinner');
                $('#form-edit-role input[type=submit]').prop('disabled', false);
                $('#form-edit-role input[type=submit]').val('Save');

            },
            error: function() {
                alert("Something went wrong");
                $('#form-edit-role input[type=submit]').removeClass('spinner');
                $('#form-edit-role input[type=submit]').prop('disabled', false);
                $('#form-edit-role input[type=submit]').val('Save');
            }
        });
    }).on('submit', function(e) {
        e.preventDefault();
    });



    // change permission

    $('#option li.here').each(function() {
        console.log("Trigger 1");
        var id = $(this).closest('.select-control').attr('id')
        var txt = $(this).find('.text').text()
        $('#' + id + ' .index-title span').text(txt)
    })

    $('.select-control .index-title').click(function() {
        console.log("Trigger 2");
        var id = $(this).closest('.select-control').attr('id')
        if ($(this).is('.opened')) {
            $(this).removeClass('opened')
            $('#' + id + ' ul').slideUp('fast')
        }
        else {
            $('.select-control .index-title').removeClass('opened')
            $('.select-control ul').slideUp('fast')
            $(this).addClass('opened')
            $('#' + id + ' ul').slideDown('fast')
        }
    })

    $('#option li').click(function() {
        console.log("Trigger 3");
        var id = $(this).closest('.select-control').attr('id');
        var txt = $(this).find('.text').text();
        var service_id = $(this).attr("value");
        // var lue = $(this).attr('value')
        console.log("id", id);
        if (id != 'property') {
            $('#option li').removeClass('here');
            $(this).addClass('here');
            $('#' + id + ' .index-title span').text(txt);
            $('#role_id').val($(this).attr("value"));
            $('.select-control .index-title').removeClass('opened');
            $('.select-control ul#option').slideUp('fast');

            // console.log("service data", $('.services'));
            // console.log("service used", $('.'+service_id));
        }

        if (id == 'service') {
            $('.services').css("display", "none");
            $('.' + service_id).css("display", "block");
        }

        if (id == 'role') {

            $('.loading').fadeIn('slow')
            var role_id = $(this).attr("value");
            console.log("role id ", role_id, homeUrl);
            csrfToken = $("input[name=_csrf]").val();
            $.ajax({
                url: homeUrl + "admin/get_role",
                type: "POST",
                data: "_csrf=" + csrfToken + "&" + "role_id=" + role_id,
                success: function(data) {
                    var res = JSON.parse(data);
                    console.log("result", res);
                    $(res.services).each(function(key, service) {
                        $(service.modules).each(function(key2, module) {

                            // console.log("module", module);
                            $(module.permissions).each(function(key3, permission) {
                                // console.log("permission", permission, $('#prop_'+permission.id));
                                if (res.editable == false) {

                                    $("#global-select").prop('readonly', true);
                                    $(".prop").prop('readonly', true);
                                    $(".main-service").prop('readonly', true);

                                }
                                else {
                                    $("#global-select").prop('readonly', false);
                                    $(".prop").prop('readonly', false);
                                    $(".main-service").prop('readonly', false);
                                }

                                $('.prop_' + permission.id).prop('checked', permission.selected);

                                $('.prop_child_' + permission.id).prop('readonly', permission.selected).prop('checked', permission.selected);

                            });

                        });

                    });

                    recalculate_checkbox();

                    return 0;

                },
                error: function() {
                    alert("Something went wrong");
                }


            });
        }
    })


    function recalculate_checkbox() {
        // hitung checked setelah pilih role
        console.log("trigger check checkbox");
        $('.permission-left li ul input[type=checkbox]').each(function() {

            var list = $(this).closest('.sublist').attr('id');
            var indx = $(this).closest('li').index();

            // if all property by index has checked, property index must be checked
            if ($('.permission-left #' + list + ' li').find('input[type=checkbox]:checked').length == $('.permission-left #' + list + ' li').find('input[type=checkbox]').length && $('.permission-left #' + list + ' li').find('input[type=checkbox]:checked').length != 0) {
                $('.permission-left #' + list + ' strong').find('input[type=checkbox]').prop('checked', true)
                $('.permission-left #' + list + ' strong').find('input[type=checkbox]').prop('readonly', true)
            }
            else {
                $('.permission-left #' + list + ' strong').find('input[type=checkbox]').prop('checked', false)
                $('.permission-left #' + list + ' strong').find('input[type=checkbox]').prop('readonly', false)
            }

            if ($('.permission-left strong').find('input[type=checkbox]:checked').length == $('.permission-left strong').find('input[type=checkbox]').length) {
                $('#global-select').prop('checked', true);
                $('#global-select').prop('readonly', true);
            }
            else if ($('.permission-left strong').find('input[type=checkbox]:checked').length != $('.permission-left strong').find('input[type=checkbox]').length) {
                $('#global-select').prop('checked', false);
                $('#global-select').prop('readonly', false);
            }

        })
        // -- end --   hitung checked setelah pilih role

        $('.loading').fadeOut('slow')

    }



    $('#add-property li').click(function() {

        if (!$(this).find('.checkbox input').is(':checked')) {
            var propCode = $(this).attr("value");
            var byk = $('#propertys .props').length;
            var jlh = byk + 1;
            var jlh1 = byk + 2;
            var jlh2 = byk + 3;
            var jlh3 = byk + 4;
            var jlh4 = byk + 5;
            var jlh5 = byk + 6;
            var index = 0;

            var vlue = $(this).attr('value')
            var icon = $('ul#add-property li[value="' + vlue + '"] .icon').attr('style')
            var txts = $('ul#add-property li[value="' + vlue + '"] .text').text()

            var lprp = $('ul.props').last().attr('id')
            if (lprp === undefined) {
                var numb = 1;
            }
            else {
                var str = lprp.split('property')[1];
                var numb = parseInt(str) + 1;
            }

            // --- start --- add property
            $('#propertys').append('' +
                '<input type="hidden" name="properties[]" value="' + propCode + '" /> ' +
                '<ul id="property' + numb + '" class="props">' +
                '  <div class="permission-thumb">' +
                '      <div class="thumbs" style="' + icon + '" value="' + vlue + '"></div>' +
                '      <div class="thumb-title">' + txts + '</div>' +
                '  </div>');

            // hitung banyak li di _module_1
            $('.permission-list#permissions ul li.sublist').each(function() {

                var idsu = $(this).attr('id')

                if ($('.permission-left li.sublist#' + idsu).is('.opened')) {
                    var open = ' opened';
                }
                else {
                    var open = '';
                }

                $('#property' + numb).append('' +
                    '<li class="sublist' + open + '" id="' + idsu + '">' +
                    '    <strong></strong>' +
                    '    <ul>');

                $('.permission-list#permissions li#' + idsu + ' ul li').each(function() {
                    index++;
                    if ($(this).find('input').is(':checked')) {

                        $('#property' + numb + ' li#' + idsu + ' ul').append('' +
                            '<li>' +
                            '    <input type="checkbox" name="prop_' + propCode + '_' + index + '" value="1" id="prop_' + propCode + '_' + index + '" checked readonly>' +
                            '    <label for="prop_' + propCode + '_' + index + '" class="checkbox">' +
                            '        <span class="glyphicon glyphicon-ok"></span>' +
                            '    </label>' +
                            '</li>');

                        // console.log('ok')
                    }
                    else {
                        // console.log('no')

                        $('#property' + numb + ' li#' + idsu + ' ul').append('' +
                            '<li>' +
                            '    <input type="checkbox" name="prop_' + propCode + '_' + index + '" value="1" id="prop_' + propCode + '_' + index + '">' +
                            '    <label for="prop_' + propCode + '_' + index + '" class="checkbox">' +
                            '        <span class="glyphicon glyphicon-ok"></span>' +
                            '    </label>' +
                            '</li>');

                    }

                    $('#property' + numb + ' li#' + idsu).append('</ul>');

                })
            })

            $('#property' + numb).append('</ul>');
            // --- end --- add property


            var byk = $('#propertys .props').length;
            var sli = $('.permission-slide').width();
            var pro = $('#propertys ul.props').width();
            var lim = pro * byk;

            $('#propertys').animate({
                marginLeft: '24px'
            }, 'slow');

            $('.permission-content .permission-right').css({
                'width': lim
            })

            if (lim >= sli) {
                $('.slide-next').addClass('active')
                $('.slide-next').attr('page', 0)
                $('.slide-prev').attr('page', 0)
            }

            var pag = $(this).closest('.select-control').attr('id')
            $('#' + pag + ' .index-title').removeClass('opened')
            $('#' + pag + ' #add-property').slideUp('fast')

            $(this).find('.checkbox input').prop('checked', true)

        }

    })




    $('.permission-list li.sublist strong').click(function() {
        console.log("Trigger 5");
        var list = $(this).closest('li.sublist').attr('id')
        $('.permission-left #' + list).toggleClass('opened')
        $('.permission-right #' + list).toggleClass('opened')
    })

    $('#global-select').change(function() {
        console.log("Trigger 6");
        if ($(this).is(':checked')) {
            $('.permission-list input[type=checkbox]').prop('checked', true);
            $('.permission-list input[type=checkbox]').prop('readonly', true);
        }
        else {
            // $('.permission-list input[type=checkbox]').prop('checked', false);
            $('.permission-left input[type=checkbox]').prop('checked', false);
            $('.permission-right input[type=checkbox]').prop('readonly', false);
        }
    })

    $('.permission-list strong input[type=checkbox]').change(function() {
        console.log("Trigger 7");
        var perm = $(this).closest('.permission-list').attr('id');
        var list = $(this).closest('.sublist').attr('id');

        if (perm === 'permissions') {
            if ($(this).is(':checked')) {
                $('#' + perm + ' li#' + list + ' input[type=checkbox]').prop('checked', true);
            }
            else {
                $('#' + perm + ' li#' + list + ' input[type=checkbox]').prop('checked', false);
            }
        }
        else {
            var ulst = $(this).closest('.props').attr('id');
            if ($(this).is(':checked')) {
                $('#' + perm + ' #' + ulst + ' li#' + list + ' input[type=checkbox]').prop('checked', true);
            }
            else {
                $('#' + perm + ' #' + ulst + ' li#' + list + ' input[type=checkbox]').prop('checked', false);
            }
        }

    })



    $('.permission-left input[type=checkbox]').change(function() {
        var perm = $(this).closest('.permission-list').attr('id');
        var list = $(this).closest('li.sublist').attr('id');

        // deteksi global index atau global sub
        var liny = $(this).closest('li').attr('class');
        console.log(list)
        // console.log(perm)

        // this list index
        var indx = $(this).closest('li').index();

        // jika global sub, maka
        if (liny === undefined) {
            // checking.. if global has checked, property must be checked. if else, property still checked but must be readonly
            if ($(this).is(':checked')) {
                // checked property sub
                $('.permission-right li.sublist#' + list + ' ul li:nth-child(' + parseInt(indx + 1) + ') input[type=checkbox]').prop('readonly', true)
                $('.permission-right li.sublist#' + list + ' ul li:nth-child(' + parseInt(indx + 1) + ') input[type=checkbox]').prop('checked', true)
            }
            else {
                $('.permission-right li.sublist#' + list + ' ul li:nth-child(' + parseInt(indx + 1) + ') input[type=checkbox]').prop('readonly', false)
            }

        }
        else {

            if ($('#' + perm + ' #' + list + ' li input[type=checkbox]:checked').length == $('#' + perm + ' #' + list + ' li input[type=checkbox]').length && $('#' + perm + ' #' + list + ' li input[type=checkbox]:checked').length != 0) {
                $('.permission-list #' + list + ' input[type=checkbox]').prop('checked', true)
                $('.permission-right #' + list + ' strong input[type=checkbox]').prop('readonly', true)
                $('.permission-right li.sublist#' + list + ' ul li input[type=checkbox]:checked').prop('readonly', true)
            }
            else if ($('#' + perm + ' #' + list + ' li input[type=checkbox]:checked').length != $('#' + perm + ' #' + list + ' li input[type=checkbox]').length) {
                $('.permission-right #' + list + ' strong input[type=checkbox]').prop('readonly', false)
                $('.permission-right li.sublist#' + list + ' ul li input[type=checkbox]:checked').prop('readonly', false)
            }

        }

        if ($('#' + perm + ' #' + list + ' li input[type=checkbox]:checked').length == $('#' + perm + ' #' + list + ' li input[type=checkbox]').length && $('#' + perm + ' #' + list + ' li input[type=checkbox]:checked').length != 0) {
            $('.permission-list #' + list + ' input[type=checkbox]').prop('checked', true)
            $('.permission-right #' + list + ' strong input[type=checkbox]').prop('readonly', true)
            // $('#'+perm+' #'+list+' li strong input[type=checkbox]:checked').prop('readonly', true)
        }
        else if ($('#' + perm + ' #' + list + ' li input[type=checkbox]:checked').length != $('#' + perm + ' #' + list + ' li input[type=checkbox]').length) {
            $('.permission-left #' + list + ' strong input[type=checkbox]').prop('checked', false)
            $('.permission-right #' + list + ' strong input[type=checkbox]').prop('readonly', false)
        }


        if ($('.permission-list input[type=checkbox]:checked').length == $('.permission-list input[type=checkbox]').length) {
            $('#global-select').prop('checked', true);
        }
        else if ($('.permission-list input[type=checkbox]:checked').length != $('.permission-list input[type=checkbox]').length) {
            $('#global-select').prop('checked', false);
        }

    })

    $('.prop').change(function() {
        $('#role .index-title span').text("Custom");
        $('#role_id').val("false");
    });

    $(document).on('click', '.thumbs', function() {
        var ulid = $(this).closest('ul.props').attr('id')
        var vlue = $(this).attr('value')
        $('ul.props#' + ulid).remove()
        $('ul#add-property li[value="' + vlue + '"] input[type=checkbox]').prop('checked', false)

        // change permission check when property more than 7, slide to prev must actived
        var byk = $('#propertys .props').length;
        // var sli = $('.permission-slide').width();
        // var pro = $('#propertys ul.props').width();
        // var lim = pro*byk+24;

        // console.log(byk)
        // console.log(sli)
        // console.log(pro)
        // console.log(lim)

        if (byk == 7) {
            $('.slide-prev').removeClass('active')
            $('.slide-next').removeClass('active')
            $('.slide-next').attr('page', 0)
            $('.slide-prev').attr('page', 0)
            $('#propertys').animate({
                marginLeft: '24px'
            }, 'slow');
        }
    })


    $('.slider').click(function() {
        if ($(this).is('.active')) {

            var tid = $(this).attr('id')
            var container = $('#propertys')
            var byk = $('#propertys .props').length;
            var pro = $('#propertys ul.props').width();
            var sli = $('.permission-slide').width();
            var lim = pro * byk;
            var bat = lim - sli;
            var mor = byk - 7;

            var prv = $('.slide-prev').attr('page');
            var nex = $('.slide-next').attr('page');

            if (tid === '_next') {

                $('.slide-prev').addClass('active')

                var hit = 0;
                if (nex < mor) {
                    var hit = bat / mor;
                    $('.slide-next').attr('page', parseInt(nex) + 1)
                    $('.slide-prev').attr('page', parseInt(prv) - 1)
                }
                else if (nex == mor) {
                    $('.slide-next').removeClass('active')
                }

                container.animate({
                    marginLeft: '-=' + hit.toFixed(0) + 'px'
                }, 'slow');

            }
            else {


                $('.slide-next').addClass('active')

                var hit = 0;
                if (prv == 0) {
                    $('.slide-prev').removeClass('active')
                }
                else {
                    var hit = bat / mor;
                    $('.slide-prev').attr('page', parseInt(prv) + 1)
                    $('.slide-next').attr('page', parseInt(nex) - 1)
                }

                container.animate({
                    marginLeft: '+=' + hit.toFixed(0) + 'px'
                }, 'slow');
            }
        }

    })


})


$(window).on('load', function() {
    $('#form-login').find('.help-block').remove()
})

$(document).on('keydown', '.just-number', function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
