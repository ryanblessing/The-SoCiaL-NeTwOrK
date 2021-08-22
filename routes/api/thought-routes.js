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

//-- api/thoughts route
router
    .route('/')
    .get(getAllThought)
    
// -- api/thoughts/:userID
router
    .route('/:userId')
    .post(createThought)
        
// -- api/thoughts/userId/thoughtId
router
    .route('/:userId/:id')
    .get(getThoughtById)
    .delete(deleteThought)
    .put(updateThought)

// -- api/thoughts/:thoughtId/reactions
router 
    .route('/:userId/:id/reactions')
    .post(addReaction)
    .delete(deleteReaction) 
    
//user id - 61227b4798f9623da0c93f30 -bane

    module.exports = router;