//--/api/users routes
const { User } = require('../model')
//GET ROUTES
const userController = {
// 1.get all users
getAllUsers(req, res) {
    User.find()
    .populate({
        path: 'Thoughts',
        select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log('error in user-controller find all method', err)
        res.status(404);
    })
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
    .catch(err => res.json('create user error', err))
}

//PUT ROUTES

// 1. PUT to update a user by its _ID

// DELETE ROUTES

// 1. Remove user by its _Id

};


//---- /api/users/:userID/friends/:friendID

//POST ROUTE
// 1. POST to add a new friend to a users friend list

// 2. Delete to remove a friend from the users friend list

module.exports = userController;