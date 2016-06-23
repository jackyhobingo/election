var count = 4;
var condition_count = 4;
var candidate_count = 1;

function sort_by_votes(a, b) {
    return b.votes - a.votes;
}

function is_gender_should_be_considered(limits) {
    if (limits.gender == 'none' || is_limits_number_error(limits)) {
        return false;
    }
    return true;
}

function is_position_should_be_considered(limits) {
    if (limits.position == 'none' || is_limits_number_error(limits)) {
        return false;
    }
    return true;
}


function is_limits_number_error(limits) {
    // test NaN and numerator > denominator
    if (limits.denominator !== limits.denominator) {
        return true;
    } else if (limits.numerator !== limits.numerator) {
        return true;
    } else if (limits.numerator > limits.denominator) {
        return true;
    }
    return false;
}

function show_ans(sorted_p_array) {
    $('.selected').removeClass("selected");
    for (var i=0 ; i < candidate_count; i ++) {
        if( sorted_p_array[i].selected) {
            $('tr.num'+sorted_p_array[i].num).addClass("selected");
        } 
    }

}


function compute_how_many_gender_prioritized_people(limits) {
    if (!is_gender_should_be_considered(limits)) {
        return 0;
    } else {
        return Math.ceil(candidate_count * limits.numerator / limits.denominator);
    }
}

function compute_how_many_position_prioritized_people(limits) {
    if (!is_position_should_be_considered(limits)) {
        return 0;
    } else {
        return Math.ceil(candidate_count * limits.numerator / limits.denominator);
    }
}


function get_gender_limits() {
    return {
        "gender": $('select#gender_limit').val(),
        "numerator": parseInt($('input#gender_limit_son').val()),
        "denominator": parseInt($('input#gender_limit_mom').val())
    }
}

function get_position_limits() {
    return {
        "position": $('select#position_limit').val(),
        "numerator": parseInt($('input#position_limit_son').val()),
        "denominator": parseInt($('input#position_limit_mom').val())
    }
}

function compute() {
    var p = Array(candidate_count);
    for (var i = 0; i < candidate_count; i++) {
        p[i] = People(i + 1);
    }
    p.sort(sort_by_votes)
    var gender_limit = get_gender_limits();
    var gender_prioritized_people_amount = compute_how_many_gender_prioritized_people(gender_limit);
    var position_limit = get_position_limits();
    var position_prioritized_people_amount = compute_how_many_position_prioritized_people(position_limit);
    var people_needed_amount = get_how_many_people_needed();

    first_filter = get_filter("gender", gender_limit.gender, gender_prioritized_people_amount);
    second_filter = get_filter("position", gender_limit.position, position_prioritized_people_amount);

    p = selection(p, people_needed_amount, first_filter, second_filter);
    show_ans(p)
    // for ( var i = 0 ;  i < candidate_count ; i++ ){
    //     if (p[i].selected){
    //         alert(p[i].name);

    //     }
    // }


}

function get_filter (limit, limit_type, amount) {
    return [limit, limit_type, amount]
}

function selection(sorted_p_array, needed_amount, first_filter, second_filter) {
    var had_selected = 0;
    for(var i = 0; i < candidate_count && first_filter[2] > 0; i++){
        if (sorted_p_array[i][first_filter[0]] == first_filter[1]) {
            sorted_p_array[i].selected = true;
            had_selected ++;
            first_filter[2] --;
            if (needed_amount == had_selected) {
                return sorted_p_array;
            }
        }
    }
    for (var i=0; i < candidate_count && second_filter[2] > 0; i++) {
        if (sorted_p_array[i][second_filter[0]] == second_filter[1]) {
            if(!sorted_p_array[i].selected) {
                sorted_p_array[i].selected = true;
                had_selected ++;
            }
            second_filter[2] --;
            if (needed_amount == had_selected) {
                return sorted_p_array; 
            }
        }
    }
    for (var i=0; i< candidate_count; i++) {
        if(!sorted_p_array[i].selected) {
            sorted_p_array[i].selected = true;
            had_selected ++;
            if (needed_amount == had_selected) {
                return sorted_p_array
            }
        }
    }
    return sorted_p_array;
}





function add_condition() {

}

function add_candidate(num) {
    $("tr.num" + num).after('\
        <tr class="num' + (num + 1) + '">\
            <td><input class="num' + (num + 1) + '" id="num' + (num + 1) + '_col1" type="text"></td>\
            <td><input class="num' + (num + 1) + ' gender' + (num + 1) + '" id="num' + (num + 1) + '_col2" type=radio name="gender' + (num + 1) + '" value="man"></td>\
            <td class="gender' + (num + 1) + '">男</td>\
            <td><input class="num' + (num + 1) + ' gender' + (num + 1) + '" id="num' + (num + 1) + '_col2" type=radio value="woman" name="gender' + (num + 1) + '"></td>\
            <td class="gender' + (num + 1) + '">女</td>\
            <td><input class="num' + (num + 1) + ' position' + (num + 1) + '" id="num' + (num + 1) + '_col3" type=radio name="position' + (num + 1) + '" value="normal"></td>\
            <td class="position' + (num + 1) + '">一般</td>\
            <td><input class="num' + (num + 1) + ' position' + (num + 1) + '" id="num' + (num + 1) + '_col3" type=radio value="admin" name="position' + (num + 1) + '"></td>\
            <td class="position' + (num + 1) + '">行政</td>\
            <td><input class="num' + (num + 1) + '" id="num' + (num + 1) + '_col4" type="text"></td>\
        </tr>')
    candidate_count += 1;
}

function add_election_condition() {
    // To do
}

function get_how_many_people_needed() {
    return parseInt($('input#how_many').val());
}

function get_votes(i) {
    return parseInt(get_input_data(i, 4, false, 0));
}

function get_gender(i) {
    return get_input_data(i, 2, true, "gender" + i);
}

function get_name(i) {
    return get_input_data(i, 1, false, 0);
}

function get_position(i) {
    return get_input_data(i, 3, true, "position" + i);
}

function get_input_data(num, col, is_seletion, seletion_name) {
    if (!is_seletion) {
        return $('input#num' + num + '_col' + col).val();
    } else {
        return $("input.num" + num + ":radio:checked[name='" + seletion_name + "']").val();
    }
}

function People(i) {
    return {
        'name': get_name(i),
        'gender': get_gender(i),
        'position': get_position(i),
        'votes': get_votes(i),
        'selected': false,
        'num': i
    }
}

function test() {

}
