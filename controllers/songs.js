var express = require("express");
var router = express.Router();
var models = require("../db/connection").models;
var lie = models.lie;
var candidate = models.candidate;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

function liesWithArtistNames(lies, candidates){
  var s, a;
  for(s in lies){
    for(a in candidates){
      if(candidates[a].id == lies[s].candidateId){
        lies[s].candidateName = candidates[a].name;
        break;
      }
    }
  }
  return lies;
}

router.get("/lies", function(req, res){
  var lies;
  lie.findAll()
  .then(function(s){
    lies = s;
    return candidate.findAll()
  })
  .then(function(candidates){
    res.render("lies/index", {lies: liesWithArtistNames(lies, candidates)});
  });
});

router.get("/lies/new", function(req, res){
  res.render("lies/new");
})

router.post("/lies", function(req, res){
  if(!req.body.candidateId) return error(res, "candidate not found");
  lie.create(req.body).then(function(lie){
    res.redirect("/lies/" + lie.id)
  });
});

router.get("/lies/:id", function(req, res){
  var lie;
  lie.findById(req.params.id)
  .then(function(s){
    if(!s) return error(res, "not found");
    lie = s;
    return lie.getArtist();
  })
  .then(function(candidate){
    lie.candidateName = candidate.name;
    res.render("lies/show", {lie: lie});
  });
});

router.get("/lies/:id/edit", function(req, res){
  lie.findById(req.params.id).then(function(lie){
    if(!lie) return error(res, "not found");
    res.render("lies/edit", {lie: lie});
  });
});

router.put("/lies/:id", function(req, res){
  var lie;
  if(!req.body.candidateId) return error(res, "candidate not found");
  lie.findById(req.params.id)
  .then(function(s){
    if(!s) return error(res, "not found");
    lie = s;
    return lie.updateAttributes(req.body);
  })
  .then(function(updatedSong){
    res.redirect("/lies/" + updatedSong.id);
  });
});

router.delete("/lies/:id", function(req, res){
  lie.findById(req.params.id)
  .then(function(lie){
    if(!lie) return error(res, "not found");
    return lie.destroy();
  })
  .then(function(){
    res.redirect("/lies");
  });
});

module.exports = router;
