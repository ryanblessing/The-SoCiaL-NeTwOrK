const router = require('express').Router();

const{
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
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
    .put(updateThought)
    .delete(deleteThought)
    

// ---api/thoughts/:thoughtId/reactions
router 
    .post(addReaction)
    .delete(deleteReaction) 



    module.exports = router;