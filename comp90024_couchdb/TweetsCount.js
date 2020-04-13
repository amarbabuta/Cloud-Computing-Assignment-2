// Total Number of tweets for each LGA

// Map
function (doc) {
    if(doc.tweet){
      emit(doc.tweet.lga_code,1);
    }
  }

// Reduce
// _sun
