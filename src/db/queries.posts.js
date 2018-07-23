const Flair = require("./models").Flair;
const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Authorizer = require("../policies/post");


module.exports = {

    addPost(newPost, callback){
        return Post.create(newPost)
        .then((post) => {
            callback(null, post);
        })
        .catch((err) => {
            callback(err);
        })
      },

      getPost(id, callback){
        return Post.findById(id, {
          include: [{
            model: Flair,
            as: "flairs"
          }]
        })
        .then((post) => {
          callback(null, post);
        })
        .catch((err) => {
          callback(err);
        })
      },

      deletePost(req, callback){

// #1
    return Post.findById(req.params.id)
    .then((post) => {

// #2
      const authorized = new Authorizer(req.user, post).destroy();

      if(authorized) {
// #3
        post.destroy()
        .then((res) => {
          callback(null, post);
        });

      } else {

// #4
        req.flash("notice", "You are not authorized to do that.")
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  }
,

updatePost(req, updatedPost, callback){

// #1
 return Post.findById(req.params.id)
 .then((post) => {

// #2
   if(!post){
     return callback("Post not found");
   }

// #3
   const authorized = new Authorizer(req.user, post).update();

   if(authorized) {

// #4
     post.update(updatedPost, {
       fields: Object.keys(updatedPost)
     })
     .then(() => {
       callback(null, post);
     })
     .catch((err) => {
       callback(err);
     });
   } else {

// #5
     req.flash("notice", "You are not authorized to do that.");
     callback("Forbidden");
   }
 });
}
}
