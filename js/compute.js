var count = 4;
var condition_count = 4;
var candidate_count = 1;
function compute() {

}

function add_condition() {
	// $("td#votes").before("<td></td>")
	// for (var i=1;i<=count;i++) {

	// }
	// $("td#votes").before("<td></td>")
}

function add_candidate(num) {
	// $("tr.num"+num).after("<tr><td>1</td><tr>")
}

function add_election_condition() {

}

function get_votes(i) {
    alert(get_input_data(i, count, false, 0));
}

function get_gender(i) {
    alert(get_input_data(i, 2, true, "gender"));
}

function get_name(i) {
	alert(100)
    alert(get_input_data(i, 1, false, 0));
}

function get_position(i) {
    alert(get_input_data(i, 3, true, "position"));
}

function get_input_data(num, col, is_seletion, seletion_name) {
    if (!is_seletion) {
        return $('input#num' + num + '_col' + col).val();
    } else {
        return $("input.num" + num + ":radio:checked[name='" + seletion_name + "']").val();
    }
}

function test() {
    get_name(1);
    get_gender(1);
    get_position(1)
    get_votes(1);
}
