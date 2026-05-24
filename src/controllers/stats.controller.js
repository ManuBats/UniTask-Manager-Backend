const statsService = require('../services/stats.service');
const { success } = require('../utils/response');

const dashboard = async (req, res) => {
  const data = await statsService.dashboard(req.usuarioId);
  success(res, data);
};

module.exports = { dashboard };
