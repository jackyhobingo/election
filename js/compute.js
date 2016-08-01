var num = 0;

var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;

$(document).ready(function() {
    $(function() {
        $("div#candidate").on("keydown", function(evt) {
            var tabIndex = $(":focus").attr('id');
            var tabIndexInt = parseInt(tabIndex.slice(5));
            switch (evt.which) {
                // To Do Need to Refactor
                case UP:
                    if (tabIndexInt - 10 > 10) {
                        $("#index" + String(tabIndexInt - 10)).focus();
                    } else if (tabIndexInt - 10 > 0) {
                        $("#index0" + String(tabIndexInt - 10)).focus();
                    } else {
                        $("#" + tabIndex).focus();
                    }
                    break;
                case DOWN:
                    if (tabIndexInt + 10 < num * 10) {
                        $("#index" + String(tabIndexInt + 10)).focus();
                    } else { 
                        $("#" + tabIndex).focus();
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
                        if (tabIndexInt > 10)
                            $("#index" + String(tabIndexInt + 1)).focus();
                        else
                            $("#index0" + String(tabIndexInt + 1)).focus();
                    }
                    break;
            }
        })
    });
    $('button#create-form').click(function() {
        $('div#candidate').html("")
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

    });

    $('button#gender-limit').click(function() {

        if ($(this).text().indexOf('無') > 0) {
            $(this).html('性別限制：女性至少<input class="in-btn" type="text" id="gender-numerator">分之<input class="in-btn" id="gender-fraction" type="text">以上');
            $(this).addClass("btn-info");
        }

    });

    $('button#gender-limit').dblclick(function() {

        if ($(this).text().indexOf('女') > 0) {
            $(this).html('性別限制：無');
            $(this).removeClass("btn-info");
        }

    })

    $('button#position-limit').click(function() {

        if ($(this).text().indexOf('無') > 0) {
            $(this).html('職位限制：行政至少<input class="in-btn" type="text" id="position-numerator">分之<input class="in-btn" type="text" id="position-fraction">以上');
            $(this).addClass("btn-info");
        }

    });

    $('button#position-limit').dblclick(function() {

        if ($(this).text().indexOf('行政') > 0) {
            $(this).html('職位限制：無');
            $(this).removeClass("btn-info");
        }

    });

})

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

    var p = Array(num);
    for (var i = 0; i < num; i++) {
        p[i] = People(i);
    }
    p.sort(sort_ascending_order_in_votes);
    return p;
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





function get_gender_limit() {
    var limit = get_limit('gender');
    var w = get_total_woman();
    var total = get_total_people();
    var need_amount = get_needed_people_amount();
    if (w / total < limit)
        return Math.ceil(need_amount * w / total);
    else
        return Math.ceil(need_amount * limit);
}

function get_position_limit() {
    var limit = get_limit('position');
    var need_amount = get_needed_people_amount();
    return Math.ceil(need_amount * limit);
}

function get_limit(type) {

    var n = parseInt($('button#' + type + '-limit').children('input#' + type + '-numerator').val());
    var f = parseInt($('button#' + type + '-limit').children('input#' + type + '-fraction').val());
    ans = f / n;
    if (ans !== ans || ans >= 1) {
        ans = 0;
    }

    return ans;
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
        var p = PeopleArray(num);
        var gender_limit = get_gender_limit();
        var gender_chosen = 0;
        var position_limit = get_position_limit();
        var position_chosen = 0;
        var need_amount = get_needed_people_amount();
        var total_chosen = 0;

        // gender priority
        for (var i = 0; i < num && need_amount > total_chosen && gender_limit > gender_chosen; i++) {
            if (!p[i].selected && p[i].gender === '女') {
                p[i].selected = true;
                total_chosen++;
                gender_chosen++;
                if (p[i].position === '行政') {
                    position_chosen++;
                }
            }
        }
        // position priority
        for (var i = 0; i < num && need_amount > total_chosen && position_limit > position_chosen; i++) {
            if (!p[i].selected && p[i].position === '行政') {
                p[i].selected = true;
                total_chosen++;
                position_chosen++;
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
                $('div#result').append('\
                        <div class="container">\
                            <div class="row">\
                                <div class="col-md-2 col-sm-2  col-xs-3">\
                                    ' + p[i].name + '\
                                </div>\
                            </div>\
                        </div>')
            }
        }
    });
}
