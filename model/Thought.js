const { Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required:'Please insert your thoughts!',
            minLength: [1, 'Must be above 1 character!'],
            maxLength: [280, 'Cannot be more than 280 characters!']
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            //find out if this needs to be a Schema.Types.something in reference to the userSchema.
            required: 'Username is required!',
            trim: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;




/* Thought
Schema Settings:
-Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.*/