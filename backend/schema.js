const mongoose = require('mongoose');
const { composeMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');
const {Token } = require('./token');



const UserSchema = new mongoose.Schema({
  name: String,
  passward: String, 
  interests: [String], 
  email: String,
  token: String,
})


const VideoSchema = new mongoose.Schema({
    title: String, 
    author: UserSchema,
    likes: Number,
    cover_url: String,
    create_at: Date,
    tag: [String],
    url: String,
    description: String
    
});


const CommentSchema = new mongoose.Schema({
    body: String,
    Author: UserSchema, 
    Profile: String,
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
        console.log(rp.args, rp.context)
        if (rp.args.token == token){
          return {message: ({  }, _, context) => {
            return null;
          }}
          throw new Error('You should be admin, to have access to this action.');
        }
        else{
          
          return next(rp);
        }
        
      });
    });
    return resolvers;
  }


var _id;

schemaComposer.Query.addFields({
    FindVideos: VideoTC.mongooseResolvers.findMany(),
    GetAllComments: CommentTC.mongooseResolvers.findMany(),
    GetVideo: VideoTC.mongooseResolvers.findMany(),
    Login:UserTC.mongooseResolvers.findOne().wrapResolve(next => rp => {
      user_model.updateOne({name:rp.param.name},{token:Token.encrypt({id: rp.param.name},'15d')}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
        }
    })
    }),
});


schemaComposer.Mutation.addFields({
    UploadVideo: VideoTC.mongooseResolvers.createOne(),
    Like: VideoTC.mongooseResolvers.updateOne(),
    Comment: CommentTC.mongooseResolvers.createOne(),
    // SetToken: UserTC.mongooseResolvers.updateOne().wrapResolve(next => rp =>{
    //   const token = Token.encrypt({id:},'15d');  
    //   return next(rp)
    // }),
    
    ...adminAccess({
    
    "RemoveVideo": UserTC.mongooseResolvers.removeById(),
    "Signup": UserTC.mongooseResolvers.createOne(),
    "ChangeTag":VideoTC.mongooseResolvers.updateOne(),
    "ChangeInterest":VideoTC.mongooseResolvers.updateOne(),
    "ChangeUserName": UserTC.mongooseResolvers.updateOne(), 
    }),


});


const graphqlSchema = schemaComposer.buildSchema();

module.exports = { graphqlSchema, user_model, video_model}