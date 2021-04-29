* GraphQL
1. query
2. mutation
3. subscription (beta)
* Apollo Server
* Mongoose - Schema
* Jwt Authentication
* bcrypt

TODO
1. use mongoose methods $pull, $unshift, $addToSet instead of array methods

Issues
1. /resolvers/posts -> getPost() | CastError: Cast to ObjectId failed | error handling does not work properly for wrong postId input. Mongoose issue, error appears also without try/catch but without crashing the server.