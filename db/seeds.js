var DB = require("./connection");
var Seeds = {
  candidates: require("./candidate_data"),
  lies: require("./lie_data")
}

DB.models.candidate.bulkCreate(Seeds.candidates)
.then(function(){
  return DB.models.candidate.findAll();
})
.then(function(candidates){
  var a, candidate, s, lie, lies, output = [];
  for(a = 0; a < candidates.length; a++){
    candidate = candidates[a];
    lies = Seeds.lies[candidate.name];
    for(s = 0; s < lies.length; s++){
      lie = lies[s];
      lie.candidateId = candidate.id;
      output.push(lie);
    }
  }
  return DB.models.lie.bulkCreate(output);
})
.then(function(){
  process.exit();
});
