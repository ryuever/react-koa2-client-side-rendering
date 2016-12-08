import db from '../initial/mongodb';
const { User } = db;

const postQuestionnaire = async(ctx, next) => {
  let $user = User.findOne(ctx.request.body).exec();
  // console.log('ctx body ', ctx.request.body);

  await $user
    .then(function(existingUser){
      if(existingUser){
        throw new Error('Dulplicate user');
      }
      let user = new User({
        name: 'li',
        nationality: 'China',
      });

      user.save();
      return ctx.body = 'insert successful';
    })
    
    // .catch((err)=>{
    //   if (err){
    //     console.log('error ', err);
    //     return ctx.body = 'error';
    //   }
    // });
};

export default {
  postQuestionnaire,
};