// Crimes and population for each LGA

// Map
function (doc) {
    for (var x = 0, len = doc.features.length; x < len; x++) {
      if(doc.features[x].properties.burglary){
        emit(doc.features[x].properties.lga_code,{"weapons":doc.features[x].properties.weapons,
                                                  "total":doc.features[x].properties.total,
                                                  "burglary":doc.features[x].properties.burglary,
                                                  "assault":doc.features[x].properties.assault,
                                                  "sexual":doc.features[x].properties.sexual,
                                                  "disorderly":doc.features[x].properties.disorderly,
                                                  "population":doc.features[x].properties.population,
                                                  "robbery":doc.features[x].properties.robbery,
                                                  "stalking":doc.features[x].properties.stalking,
                                                  "homicide":doc.features[x].properties.homicide,
                                                  "theft":doc.features[x].properties.theft,
                                                  "abduction":doc.features[x].properties.abduction,
                                                  "arson":doc.features[x].properties.arson,
                                                  "violent_offences":(doc.features[x].properties.weapons||0)+(doc.features[x].properties.burglary||0)+(doc.features[x].properties.assault||0)+(doc.features[x].properties.sexual||0)+(doc.features[x].properties.disorderly||0)+(doc.features[x].properties.robbery||0)+(doc.features[x].properties.stalking||0)+(doc.features[x].properties.homicide||0)+(doc.features[x].properties.theft||0)+(doc.features[x].properties.abduction||0)+(doc.features[x].properties.arson||0),
                                                  "violent_offences_per_capita":((doc.features[x].properties.weapons||0)+(doc.features[x].properties.burglary||0)+(doc.features[x].properties.assault||0)+(doc.features[x].properties.sexual||0)+(doc.features[x].properties.disorderly||0)+(doc.features[x].properties.robbery||0)+(doc.features[x].properties.stalking||0)+(doc.features[x].properties.homicide||0)+(doc.features[x].properties.theft||0)+(doc.features[x].properties.abduction||0)+(doc.features[x].properties.arson||0))/(doc.features[x].properties.population)});
      }
    }
  }

// Reduce
// None
