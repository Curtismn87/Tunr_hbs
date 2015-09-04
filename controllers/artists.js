var express = require("express");
var router = express.Router();
var DB = require("../db/connection");
var candidate = DB.models.candidate;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/candidates", function(req, res){
  candidate.findAll().then(function(candidates){
    res.render("candidates/index", {candidates: candidates});
  });
});

router.get("/candidates/new", function(req, res){
  res.render("candidates/new");
});

router.post("/candidates", function(req, res){
  candidate.create(req.body).then(function(candidate){
    res.redirect("/candidates/" + candidate.id)
  });
});

router.get("/candidates/:id", function(req, res){
  var candidate;
  candidate.findById(req.params.id)
  .then(function(a){
    if(!a) return error(res, "not found");
    candidate.sing();
    a.shout();
    candidate = a;
    return candidate.getSongs()
  })
  .then(function(lies){
    res.render("candidates/show", {candidate: candidate, lies: lies});
  });
});

router.get("/candidates/:id/edit", function(req, res){
  candidate.findById(req.params.id).then(function(candidate){
    if(!candidate) return error(res, "not found");
    res.render("candidates/edit", {candidate: candidate});
  });
});

router.put("/candidates/:id", function(req, res){
  var updatedArtist, lies;
  candidate.findById(req.params.id)
  .then(function(candidate){
    if(!candidate) return error(res, "not found");
    return candidate.updateAttributes(req.body)
  })
  .then(function(candidate){
    updatedArtist = candidate;
    return updatedArtist.getSongs()
  })
  .then(function(lies){
    res.render("candidates/show", {candidate: updatedArtist, lies: lies});
  });
});

router.delete("/candidates/:id", function(req, res){
  candidate.findById(req.params.id)
  .then(function(candidate){
    if(!candidate) return error(res, "not found");
    return candidate.destroy()
  })
  .then(function(){
    res.redirect("/candidates")
  });
});

module.exports = router;
