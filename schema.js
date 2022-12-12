const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');



const UserSchema = new mongoose.Schema({
  name: String,
  passward: String, 
  // videos: [VideoSchema],
  interests: [String], 
})




const VideoSchema = new mongoose.Schema({
    title: String, // standard types
    author: UserSchema,
    likes: Number,
    // comment: [CommentSchema],
    pic: String,
    create_at: Date,
    tag: String,
    url: String,
});




const CommentSchema = new mongoose.Schema({
    content: String,
    Author: String, 
    Profile: String, // 头像, url: string
    Video: VideoSchema,
    
})





const customizationOptions = {}; // left it empty for simplicity, described below


const video_model = mongoose.model('Video', VideoSchema);
const user_model = mongoose.model('user', UserSchema);
const comment_model = mongoose.model('comment', CommentSchema);

const VideoTC = composeMongoose(video_model, customizationOptions);
const UserTC = composeMongoose(user_model, {});
const CommentTC = composeMongoose(comment_model, {})







function adminAccess(resolvers) {
    Object.keys(resolvers).forEach(k => {
      resolvers[k] = resolvers[k].wrapResolve(next => rp => {
        if (!rp.context.isAdmin) {
          throw new Error('You should be admin, to have access to this action.');
        }
        return next(rp);
      });
    });
    return resolvers;
  }




schemaComposer.Query.addFields({
    FindVideos: VideoTC.mongooseResolvers.findMany(),
    // CommentsOfVideo: 
    
});


schemaComposer.Mutation.addFields({
    UploadVideo: VideoTC.mongooseResolvers.createOne(),
    // Login:
    // Signup:
    // ChangeTag:
    // ChangeUserName:
    Comment: CommentTC.mongooseResolvers.createOne(),
    // Like: VideoTC
    


});


const graphqlSchema = schemaComposer.buildSchema();

module.exports = { graphqlSchema}