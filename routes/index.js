const router = require('express').Router();

//import all api routes
const apiRoutes = require('./api');

//add prefix of /api to all api routes imported from the api directory
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> 404 Error my friend!</h1>')
})

module.exports = router;