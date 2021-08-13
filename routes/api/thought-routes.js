const router = require('express').Router();

const{
    getAllThought,
    getThoughtById,
    createThought
} = require('../../controllers/thought-controller')

//--- api/thoughts route
router
    .route('/')
    .get(getAllThought)
    .post(createThought)


// --- api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)

    module.exports = router;