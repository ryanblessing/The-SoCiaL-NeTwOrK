const { Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            trim: true,
            required: 'Please enter a reaction!',
            minLength: [1, 'Must be above 1 character!'],
            maxLength: [280, 'Cannot be more than 280 characters!']
        },
        username: {
            type: String,
            trim: true,
            required: 'Please enter your username!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const ThoughtSchema = new Schema(
    {
        //maybe need to make a thought id to make work?
        // thoughtId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => new Types.ObjectId()
        // },
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