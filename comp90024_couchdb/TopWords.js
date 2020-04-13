// Total number of tweets in each LGA

// Map
function (doc) {
  if(doc.tweet){
    emit(doc.tweet.lga_code,doc.tweet.filtered_text);
  }
}

// Reduce
function (keys, values, rereduce) {
  var a = values.join(" ").replace(/https?:\/\/[^ $]*[ $]*/g,"")
  var list= a.match(/(\w+)/g).filter(function(word) {
    return word.length > 1
  })
  var words = {};
  for (var i = 0; i < list.length; i++) {
    if (!(words.hasOwnProperty(list[i]))) {
      words[list[i]] = 0;
    }
    ++words[list[i]];
  }
  keysSorted = Object.keys(words).sort(function(a,b){return words[b]-words[a]})
  return keysSorted.slice(0,10)
}
