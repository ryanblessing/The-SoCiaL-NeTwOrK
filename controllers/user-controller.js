//--/api/users routes
const { User } = require('../model')
//GET ROUTES
const userController = {
// 1.get all users
getAllUsers(req, res) {
    User.find({})
    .then(dbUserData => {
        console.log(dbUserData)
        res.json(dbUserData);
    })
    .catch(err => {
        res.json(err);
    });
},

// 2.get single user by its _id and populate thought and friend data
getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
        path: 'Thoughts',
        select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log('error in getUserById section of user-controller', err)
        res.status(404)
    })
},

//POST ROUTES

// 1.Post new User
createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(err).json('create user error!'))
},

//PUT ROUTES

// 1. PUT to update a user by its _ID
UpdateUser({ params, body }, res) {
    User.findByIdAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this Id!'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err).json('update route in user-controller error!'))
},
// DELETE ROUTES
// 1. Remove user by its _Id
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(err).json('Delete user error!'))
}
}

//---- /api/users/:userID/friends/:friendID

//POST ROUTE
// 1. POST to add a new friend to a users friend list

// 2. Delete to remove a friend from the users friend list

module.exports = userController;