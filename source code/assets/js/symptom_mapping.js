function symptom_mapping(selected_symptoms) {
    var dict = [];
    var dict1 = [];
    selected_symptoms = selected_symptoms.split(",");
    var sym_set = new Set(selected_symptoms); //hash all the values in sym_set for faster search4
    var res_dis_arr = []; //contains all the possible disease.
    for (var i = 0; i < dis_sym_data.length; i++) {
        var curr_dis = dis_sym_data[i].disease;
        var curr_sym = dis_sym_data[i].symptom;
        var cur_sym_array = curr_sym.split(',');
        var match_count = 0;
        for (var j = 0; j < cur_sym_array.length; j++) {
            var sym = cur_sym_array[j];
            if (sym_set.has(cur_sym_array[j])) {
                match_count = match_count + 1;
            }
        }
        dict.push({
            Name: curr_dis,
            Count: match_count
        });
    }
    dict.sort(function (a, b) {
        return parseFloat(a.Count) - parseFloat(b.Count);
    });
    for (var i = dict.length - 21; i <= dict.length - 1; i++) {
        dict1.push(dict[i]);

    }
    CreateBubble(dict1);
}
