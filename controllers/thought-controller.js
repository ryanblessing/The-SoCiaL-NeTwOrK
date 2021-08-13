//-- /api/thoughts
const { Thought, User } = require('../model')
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
getThoughtById({}) {
    Thought.findOne({ _id: params.id })
    .populate({
        path: 'User',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log('error in the thought get by ID', err)
        res.status(404)
    })
},

//POST

// 1. POST to create a new thought(dont forget to push the created thoughts _id to the associated users thoughts array field)
createThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then(({ _id }) => {
        return User.findOneAndUpdate({},
            { _id: params.UserId },
            { $push: { thought: _id} },
            { new: true }
        )
    })
    .then(dbThoughtData => {
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err))
},

//PUT
// 1. PUT to update a thought by its _id
updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, body, {new: true })
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'No Thought with this id! '})
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(err).json('update user error'))
},
//DELETE
// 1.DELETE to remove a thought by its _id
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.status(err).json('Delete thought issues'))
}
}

// example data
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
//   }

// --- /api/thoughts/:thoughtID/reactions

// 1.POST to create a reaction stored in a single thoughts reactions array field

// 2. DELETE to pull and remove a reaction by the reactions reactionID value


module.exports = thoughtController;
