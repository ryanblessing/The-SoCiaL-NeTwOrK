//-- /api/thoughts
const {
    Thought,
    User
} = require('../model')
// GET routes
const thoughtController = {
    // 1. GET to get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                res.json(dbThoughtData)
            })
            .catch(err => {
                res.json(err);
            });
    },
    // 2. GET to get a single thought by its _id
    getThoughtById({ params }, res) {
        Thought.findById({ _id: params.id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log('error in the thought get by ID', err)
                res.status(404)
            })
    },

    //POST

    // 1. POST to create a new thought(don't forget to push the created thoughts _id to the associated users thoughts array field)
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findByIdAndUpdate(
                params.userId,
                {$addToSet: {thoughts: _id }}, 
                {new: true,
                runValidators: true}
                )
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No User found with this ID!'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
    },

    //PUT
    // 1. PUT to update a thought by its _id
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.id,
            body,
            {
            new: true,
            runValidators: true
            }
            )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this ID found!'})
                return;
            }
            res.json(dbThoughtData);
        })    
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
    },
    //DELETE
    // 1.DELETE to remove a thought by its _id



    //get help with delete thought with TA's
    deleteThought({ params }, res) { 
        Thought.findByIdAndDelete(params.id)
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No Thought id found!'
                    })
                    return;
                }
                return User.findByIdAndUpdate(
                    params.userId, {
                        $pull: {
                            thoughts: params.thoughtId
                        }
                    }, {
                        new: true
                    }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this ID'
                    })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    // example data
    // {
    //     "thoughtText": "Here's a cool thought...",
    //     "username": "lernantino",
    //     "userId": "5edff358a0fcb779aa7b118b"
    //   }

    // --- /api/thoughts/:thoughtID/reactions

    // 1.POST to create a reaction stored in a single thoughts reactions array field

    // get help in all reactions with TA's
    addReaction({ params, body }, res) {
      Thought.findByIdAndUpdate( params.thoughtId,
        {$push: {reactions: body}},
        {new: true,
        runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID!'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },
    // 2. DELETE to pull and remove a reaction by the reactions reactionID value

    deleteReaction({ params, body}, res) {
        Thought.findByIdAndUpdate( params.thoughtId,
            {$pull: {reactions: {reactionId: body.reactionId}}},
            {new:true}
            )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction found with this ID!'})
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController;