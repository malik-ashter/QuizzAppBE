var logger = require('../utils/logger.js');

module.exports = function(err, req, res, next){

  logger.error(err.message);
  res.status(500).send({message: err.message});
}