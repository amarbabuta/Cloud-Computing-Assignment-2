//Number of Mental illness cases per LGA

// Map
function (doc) {
  for (var x = 0 ; x<doc.features.length;x++ ){
    if(doc.features[x].properties.Mental_illness_cases||doc.features[x].properties.Mental_illness_cases==0){
      emit(doc.features[x].properties.lga_code.toString(),doc.features[x].properties.Mental_illness_cases);
    }
  }
}

// Reduce
// None
