const router = require('express').Router();
const authRoutes = require('./authRoutes');

// Your routes (Usahakan dibuat semodular mungkin)
router.use('/auth', authRoutes);

module.exports = router;