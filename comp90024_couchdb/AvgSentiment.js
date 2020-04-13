// Average Sentiment of each lga

// Map
function (doc) {
  if(doc.tweet){
    emit(doc.tweet.lga_code,doc.tweet.sentiment.p_neg);
  }
}

// Reduce
function (keys, values, rereduce) {
  var avg=0
  var k = values.join(" ").split(" ")
  for(var i=0;i<k.length;i++){
    avg=avg+parseFloat(k[i])/k.length
  }
  return avg;
}
