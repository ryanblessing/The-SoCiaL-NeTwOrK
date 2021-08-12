/* Thought

thoughtText:
-String
-Required
-Must be between 1 and 280 characters

CreatedAt:
-date
-Set default value to the current timestamp
-Use a getter method to format the timestamp on query

Username (The user that created this thought):
-string
-Required

Reactions (These are like replies):
-Array of nested documents created with the reactionSchema


Schema Settings:
-Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.*/