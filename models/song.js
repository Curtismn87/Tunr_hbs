module.exports = function(sequelize, Sequelize){
  return sequelize.define("lie", {
    title: Sequelize.STRING,
    album: Sequelize.STRING,
    previewUrl: Sequelize.STRING,
    candidateId: Sequelize.INTEGER
  });
}
