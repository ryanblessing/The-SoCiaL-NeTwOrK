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

// -- api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)

// -- api/thoughts/userId/thoughtId
router
    .route('/:userId/:thoughtId')
    .delete(deleteThought)
    
// -- api/thoughts/:thoughtId/reactions
router 
    .route('/:id/reactions')
    .post(addReaction)
    .delete(deleteReaction) 



    module.exports = router;