//-- /api/thoughts

// GET routes

// 1. GET to get all thoughts

// 2. GET to get a single thought by its _id


//POST

// 1. POST to create a new thought(dont forget to push the created thoughts _id to the associated users thoughts array field)
// example data
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
//   }

//PUT
// 1. PUT to update a thought by its _id

//DELETE
// 1.DELETE to remove a thought by its _id


// --- /api/thoughts/:thoughtID/reactions

// 1.POST to create a reaction stored in a single thoughts reactions array field

// 2. DELETE to pull and remove a reaction by the reactions reactionID value
