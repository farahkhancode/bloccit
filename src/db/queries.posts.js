const Post = require("./models").Post;
const Topic = require("./models").Topic;

module.exports = {
  getPosts(id, callback){
     return Post.findById(id)
     .then((post) => {
       callback(null, post);
     })
     .catch((err) => {
       callback(err);
     })
   }
}
