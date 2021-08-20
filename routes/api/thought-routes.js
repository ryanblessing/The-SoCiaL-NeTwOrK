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
    // .put(updateThought)
    
// -- api/thoughts/userId/thoughtId
router
    .route('/:userId/:id')
    .get(getThoughtById)
    .delete(deleteThought)
    .put(updateThought)

// -- api/thoughts/:thoughtId/reactions
router 
    .route('/:id/reactions')
    .post(addReaction)
    .delete(deleteReaction) 

//user id - 6116d5508adc7b10f8279d21 -batman

    module.exports = router;