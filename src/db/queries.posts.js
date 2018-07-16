const Post = require("./models").Post;
const Topic = require("./models").Topic;

module.exports = {
  getPost(id, callback){
     return Post.findById(id)
     .then((topic) => {
       callback(null, topic);
     })
     .catch((err) => {
       callback(err);
     })
   }
}
