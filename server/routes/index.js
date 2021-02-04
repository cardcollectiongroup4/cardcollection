const router = require('express').Router();
const authRoutes = require('./authRoutes');
const cardRoutes = require('./cardRoutes');
// Your routes (Usahakan dibuat semodular mungkin)
router.use('/auth', authRoutes);
router.use('/card', cardRoutes)

module.exports = router;