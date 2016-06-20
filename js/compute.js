var count = 4;
var condition_count = 4;
var candidate_count = 1;

function sortFunction(a,b){
    return b.votes - a.votes;
}
function get_gender_limits(){
    alert($('select#gender_limit').val());
    alert(parseInt($('input#gender_limit_son').val()));
    alert(parseInt($('input#gender_limit_mom').val()));
}

function get_position_limit(){
    alert($('select#position_limit').val());
    alert(parseInt($('input#position_limit_son').val()));
    alert(parseInt($('input#position_limit_mom').val()));
}

function compute() {
    var p = Array(candidate_count);
    for (var i = 0; i < candidate_count; i++) {
        p[i] = People(i+1);
    }
    p.sort(sortFunction)
    for (var i = 0; i < candidate_count; i++) {
        alert(p[i].name);
        alert(p[i].votes);
    }
}

function add_condition() {
	// $("td#votes").before("<td></td>")
	// for (var i=1;i<=count;i++) {

	// }
	// $("td#votes").before("<td></td>")
}

function add_candidate(num) {
	$("tr.num"+num).after('\
        <tr class="num'+(num+1)+'">\
            <td><input class="num'+(num+1)+'" id="num'+(num+1)+'_col1" type="text"></td>\
            <td><input class="num'+(num+1)+' gender'+(num+1)+'" id="num'+(num+1)+'_col2" type=radio name="gender'+(num+1)+'" value="man"></td>\
            <td class="gender'+(num+1)+'">男</td>\
            <td><input class="num'+(num+1)+' gender'+(num+1)+'" id="num'+(num+1)+'_col2" type=radio value="woman" name="gender'+(num+1)+'"></td>\
            <td class="gender'+(num+1)+'">女</td>\
            <td><input class="num'+(num+1)+' position'+(num+1)+'" id="num'+(num+1)+'_col3" type=radio name="position'+(num+1)+'" value="normal"></td>\
            <td class="position'+(num+1)+'">一般</td>\
            <td><input class="num'+(num+1)+' position'+(num+1)+'" id="num'+(num+1)+'_col3" type=radio value="admin" name="position'+(num+1)+'"></td>\
            <td class="position'+(num+1)+'">行政</td>\
            <td><input class="num'+(num+1)+'" id="num'+(num+1)+'_col4" type="text"></td>\
        </tr>')
    candidate_count +=1;
}

function add_election_condition() {

}
function get_how_many_people_needed(){
    return $('input#how_many').val();
}
function get_votes(i) {
    return parseInt(get_input_data(i, 4, false, 0));
}

function get_gender(i) {
    return get_input_data(i, 2, true, "gender"+i);
}

function get_name(i) {
    return get_input_data(i, 1, false, 0);
}

function get_position(i) {
    return get_input_data(i, 3, true, "position"+i);
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
        'votes': get_votes(i)
    }
}

function test() {
    get_gender_limits()
    get_position_limit()
    // alert(get_how_many_people_needed());
    // s = People(1);
    // alert(s.name)
    // get_name(1);
    // get_gender(1);
    // get_position(1)
    // get_votes(1);
}
