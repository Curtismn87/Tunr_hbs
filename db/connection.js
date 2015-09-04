var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///tunr_db");
var candidate = sequelize.import("../models/candidate");
var lie = sequelize.import("../models/lie");

lie.belongsTo(candidate);
candidate.hasMany(lie);

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    lie: lie,
    candidate: candidate
  }
}
