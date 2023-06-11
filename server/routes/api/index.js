const router = require('express').Router();
const chatApiRoutes = require('./chatApiRoutes');
const userApiRoutes = require('./userApiRoutes');

router.use('/chat',chatApiRoutes);
router.use('/user',userApiRoutes);

module.exports = router;