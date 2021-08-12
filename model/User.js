const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: 'Username is required!'
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/]
        },

        thoughts: [],
        friends: []
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model("User", UserSchema)

module.exports = User

/*
Email
-Must match a valid email address (look into Mongoose's matching validation)

Thoughts
-Array of _id values ----ref the thought model

Friends
-Array of _id values ----reference User model

Schema Settings

Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
*/

// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }