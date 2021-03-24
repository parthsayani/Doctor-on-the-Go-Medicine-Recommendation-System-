function SentimentalAnalysis(current_selected_disease) {
    $("#title_circle").html("Top Three Medicines For " + current_selected_disease);

    var map_drug_score = new Map();
    review_disease = [];

    current_selected_disease = current_selected_disease.toString();
    current_selected_disease = current_selected_disease.replace("'", "");

    var obj = {};
    for (var i = 0; i < disease_sentiment.length; i++) {
        var disease = disease_sentiment[i].condition.toString();
        disease = disease.replace("'", "");
        if (current_selected_disease.localeCompare(disease) == 0) {
            review_disease.push({
                medicine: disease_sentiment[i].drugName,
                review: disease_sentiment[i].Review_Sentiment
            });
         
            var drug_name = disease_sentiment[i].drugName;
            var review_sentiment = disease_sentiment[i].Review_Sentiment;
            if (drug_name in obj) {

                obj[drug_name].push(review_sentiment);
            }
            else {
                obj[drug_name] = [review_sentiment];

            }
        }
    }

    var med_avg_score = [];

    for (var drug_score in obj) {
        var name_medicine = drug_score;
        var score_array = obj[drug_score];
        var sum = 0;
        var average_score = 0;
        for (var i = 0; i < score_array.length; i++) {
            sum = sum + score_array[i];
        }

        average_score = sum / score_array.length;
        med_avg_score.push({
            medicine: name_medicine,
            avg_score: average_score
        });

    }

 
    med_avg_score.sort(function (a, b) {
        return parseFloat(b.avg_score) - parseFloat(a.avg_score);
    });
 
    var top3med = [];
    if (med_avg_score.length < 3) {
        for (var i = 0; i < med_avg_score.length; i++) {
            top3med.push({
                med: med_avg_score[i].medicine,
                med_score: med_avg_score[i].avg_score
            });
        }
    }
    else {
        for (var i = 0; i < 3; i++) {
            top3med.push({
                med: med_avg_score[i].medicine,
                med_score: med_avg_score[i].avg_score
            });
        }
    }
    CreateCircles(top3med);
}
