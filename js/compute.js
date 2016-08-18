var num = 0;
var MAN = 2;
var WOMAN = 1;
var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var ENTER = 13;
$(document).ready(function() {
    $('button#create-form').click(function() {
        create_form();
    });

    // 表格移動
    form_moving_event();

    $('button#gender-limit1').click(function() {

        if ($(this).text().indexOf('無') > 0) {
            $(this).html('性別限制：各性別至少<input class="in-btn" type="text" id="gender-numerator1">分之<input class="in-btn" id="gender-fraction1" type="text">以上');
            $(this).addClass("btn-info");
        }

    });


    $('button#gender-limit1').dblclick(function() {

        if ($(this).text().indexOf('至少') > 0) {
            $(this).html('性別限制：無');
            $(this).removeClass("btn-info");
        }

    })


    $('button#position-limit').click(function() {

        if ($(this).text().indexOf('無') > 0) {
            $(this).html('職位限制：每滿<input class="in-btn" type="text" id="position-numerator">人 應有<input class="in-btn" type="text" id="position-fraction">位一般人員');
            $(this).addClass("btn-info");
        }

    });

    $('button#position-limit').dblclick(function() {

        if ($(this).text().indexOf('一般') > 0) {
            $(this).html('職位限制：無');
            $(this).removeClass("btn-info");
        }

    });

})

function create_form() {
    $('div#candidate').html("");
    num = get_total_people();
    for (var i = 0; i < num; i++) {
        $('div#candidate').append('\
                <div class="container">\
                    <div class="row num' + i + '">\
                        <div class="col-md-2 col-sm-2 col-xs-3">\
                            <input class="form-control vote " id="index' + i + '1"  type="text" placeholder="票數">\
                        </div>\
                        <div class="col-md-2 col-sm-2  col-xs-3">\
                            <input class="form-control name" id="index' + i + '2"  type="text" placeholder="姓名">\
                        </div>\
                        <div class="col-md-1 col-sm-1  col-xs-2">\
                            <button class="btn gender btn-primary" id="index' + i + '3">男</button>\
                        </div>\
                        <div class="col-md-1 col-sm-1  col-xs-2">\
                            <button class="btn position" id="index' + i + '4">一般</button>\
                        </div>\
                    </div>\
                </div>');
    };
    form_button_event();
}

function form_moving_event() {
    $("div#candidate").on("keydown", function(evt) {
        var tabIndex = $(":focus").attr('id');
        var tabIndexInt = parseInt(tabIndex.slice(5));
        switch (evt.which) {
            // To Do: Need to Refactor
            case UP:
                if (tabIndexInt - 10 > 10) {
                    $("#index" + String(tabIndexInt - 10)).focus();
                } else if (tabIndexInt - 10 > 0) {
                    $("#index0" + String(tabIndexInt - 10)).focus();
                } else {
                    $("#total-people").focus();
                }
                break;
            case DOWN:
                if (tabIndexInt + 10 < num * 10) {
                    $("#index" + String(tabIndexInt + 10)).focus();
                } else {
                    $("#gender-limit1").focus();
                }

                break;
            case LEFT:
                if (tabIndexInt % 10 == 1) { //bound
                    $("#" + tabIndex).focus();
                } else {
                    if (tabIndexInt > 10)
                        $("#index" + String(tabIndexInt - 1)).focus();
                    else
                        $("#index0" + String(tabIndexInt - 1)).focus();
                }
                break;
            case RIGHT:
                if (tabIndexInt % 10 == 4) { //bound
                    $("#" + tabIndex).focus();
                } else {
                    if (tabIndexInt > 10) {
                        $("#index" + String(tabIndexInt + 1)).focus();
                    } else {
                        $("#index0" + String(tabIndexInt + 1)).focus();
                    }
                }
        }
    })

    $("input#total-people").on("keydown", function(evt) {
        switch (evt.which) {
            case ENTER:
                create_form();
                break;
            case DOWN:
                if (num != 0)
                    $("#index01").focus();
                else
                    $("button#gender-limit1").focus();
                break;
            case RIGHT:
                $("#create-form").focus();
                break;
        }
    });
    $("button#create-form").on("keydown", function(evt) {
        switch (evt.which) {
            case DOWN:
                $("#index01").focus();
                break;
            case LEFT:
                $("#total-people").focus();
                break;
        }
    });
    $("button#gender-limit1").on("keydown", function(evt) {
        switch (evt.which) {
            case UP:
                var temp = num - 1;
                if (temp > -1)
                    $("#index" + temp + '1').focus();
                else
                    $("#total-people").focus();
                break;
            case DOWN:
                $("#position-limit").focus();
                break;
        }
    });

    $("button#position-limit").on("keydown", function(evt) {
        switch (evt.which) {
            case UP:
                $("#gender-limit1").focus();
                break;
            case DOWN:
                $("#need-people").focus();
                break;

        }
    });
    $("input#need-people").on("keydown", function(evt) {
        switch (evt.which) {
            case UP:
                $("#position-limit").focus();
                break;
            case RIGHT:
                $("#compute").focus();
        }
    });
    $("#compute").on("keydown", function(evt) {
        switch (evt.which) {
            case UP:
                $("#position-limit").focus();
                break;
            case LEFT:
                $("#need-people").focus();
        }
    });
}

function get_total_people() {
    return parseInt($('input#total-people').val());
}

function get_needed_people_amount() {
    return parseInt($('input#need-people').val());
}

function PeopleArray(num) {

    function sort_ascending_order_in_votes(a, b) {
        return b.votes - a.votes;
    }

    var p_array = Array(num);
    for (var i = 0; i < num; i++) {
        p_array[i] = People(i);
    }
    p_array.sort(sort_ascending_order_in_votes);
    return p_array;
}

function People(i) {

    function get_votes(num) {
        return parseInt($('div.num' + num).children('div').children("input.vote").val());
    }

    function get_name(num) {
        return $('div.num' + num).children('div').children("input.name").val();
    }

    function get_gender(num) {
        return $('div.num' + num).children('div').children("button.gender").text();
    }

    function get_position(num) {
        return $('div.num' + num).children('div').children("button.position").text();
    }

    return {
        'votes': get_votes(i),
        'name': get_name(i),
        'gender': get_gender(i),
        'position': get_position(i),
        'selected': false,
        'num': i
    }

}



function get_total_woman() {
    var total = 0
    for (var i = 0; i < num; i++) {

        if ($('div.num' + i).children('div').children("button.gender").text() === '女') {
            total++;
        }

    }
    return total;
}

function get_total_man() {
    var total = 0
    for (var i = 0; i < num; i++) {

        if ($('div.num' + i).children('div').children("button.gender").text() === '男') {
            total++;
        }

    }
    return total;
}


function get_gender_limit(input_i) {
    var gender_total = 0;
    if (input_i === MAN) {
        gender_total = get_total_man();
    } else {
        gender_total = get_total_woman();
    }
    var limit = get_limit('gender', 1);
    var total = get_total_people();
    var need_amount = get_needed_people_amount();

    if (gender_total / total < limit)
        return Math.ceil(need_amount * gender_total / total);
    else
        return Math.ceil(need_amount * limit);
}

function get_position_limit() {
    var limit = get_at_least_needed('position');
    return limit;
}

function compute() {
    var p = PeopleArray(num);
    var gender_limit_man = get_gender_limit(MAN);
    var gender_limit_woman = get_gender_limit(WOMAN);
    var gender_chosen_woman = 0;
    var gender_chosen_man = 0;
    var position_limit = get_position_limit();
    var position_chosen = 0;
    var need_amount = get_needed_people_amount();
    var total_chosen = 0;


    // position priority
    for (var i = 0; i < num && need_amount > total_chosen && position_limit > position_chosen; i++) {
        if (!p[i].selected && p[i].position === '一般') {
            p[i].selected = true;
            total_chosen++;
            position_chosen++;
            if (p[i].gender === '女') {
                gender_chosen_woman++;
            } else if (p[i].gender === '男') {
                gender_chosen_man++;
            }
        }
    }

    // gender priority
    for (var i = 0; i < num && need_amount > total_chosen && gender_limit_woman > gender_chosen_woman; i++) {
        if (!p[i].selected && p[i].gender === '女') {
            p[i].selected = true;
            total_chosen++;
            gender_chosen_woman++;
            if (p[i].position === '一般') {
                position_chosen++;
            }
        }
    }

    for (var i = 0; i < num && need_amount > total_chosen && gender_limit_man > gender_chosen_man; i++) {
        if (!p[i].selected && p[i].gender === '男') {
            p[i].selected = true;
            total_chosen++;
            gender_chosen_man++;
            if (p[i].position === '一般') {
                position_chosen++;
            }
        }
    }



    // left 
    for (var i = 0; i < num && need_amount > total_chosen; i++) {
        if (!p[i].selected) {
            p[i].selected = true;
            total_chosen++;
        }
    }

    // clear 
    $('div#result').html('');

    // show the result
    for (var i = 0; i < num; i++) {
        if (p[i].selected) {
            var gender_class = 'btn-primary';
            if(p[i].gender == '女'){
                gender_class = "btn-danger";
            }
            var position_class = '';
            if (p[i].position == '行政') {
                position_class = "btn-warning";
            }

            $('div#result').append(
                '\
                    <div class="container">\
                        <div class="row">\
                            <div class="col-md-2 col-sm-2 col-xs-3">\
                                ' + p[i].votes + '\
                            </div>\
                            <div class="col-md-2 col-sm-2  col-xs-3">\
                                    ' + p[i].name + '\
                            </div>\
                            <div class="col-md-1 col-sm-1  col-xs-2">\
                                <button class="btn '+gender_class+' ">' + p[i].gender + '</button>\
                            </div>\
                            <div class="col-md-1 col-sm-1  col-xs-2">\
                                <button class="btn '+position_class+' ">' + p[i].position + '</button>\
                            </div>\
                        </div>\
                    </div>')
        }
    }
}




function get_limit(type, input_i) {
    var i = input_i;
    if (i === 0) {
        i = '';
    }

    var n = parseInt($('button#' + type + '-limit' + i).children('input#' + type + '-numerator' + i).val());
    var f = parseInt($('button#' + type + '-limit' + i).children('input#' + type + '-fraction' + i).val());
    ans = f / n;
    if (ans !== ans || ans >= 1) {
        ans = 0;
    }

    return ans;
}

function get_at_least_needed(type) {
    var n = parseInt($('button#' + type + '-limit').children('input#' + type + '-numerator').val());
    var f = parseInt($('button#' + type + '-limit').children('input#' + type + '-fraction').val());
    var need_amount = get_needed_people_amount();
    return Math.floor(need_amount / n) * f;
}


function form_button_event() {

    $('button.gender').click(function() {
        if ($(this).text() === '男') {
            $(this).html('女');
            $(this).addClass("btn-danger");
            $(this).removeClass("btn-primary");
        } else if ($(this).text() === '女') {
            $(this).html('男');
            $(this).addClass("btn-primary");
            $(this).removeClass("btn-danger");
        }
    });

    $('button.position').click(function() {
        if ($(this).text() === '一般') {
            $(this).html('行政');
            $(this).addClass("btn-warning");
        } else if ($(this).text() === '行政') {
            $(this).html('一般');
            $(this).removeClass("btn-warning");
        }
    });


    $('button#compute').click(function() {
        compute()
    });
}
