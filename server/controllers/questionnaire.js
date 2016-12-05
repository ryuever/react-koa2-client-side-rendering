import db from '../initial/mongodb';
const { User } = db;

const postQuestionnaire = async (ctx, next) => {
  // ctx.body = 'success';
  let $user = User.findOne({name: '1111'}).exec();

  await $user
    .then(function(existingUser){
      if(existingUser){
        throw new Error('Dulplicate user');    // bypass promise chain
      }
      let user = new User({
        name: 'liu',
        nationality: 'China',
      });

      user.save();
      return ctx.body = 'insert successful';
    })

    .catch((err)=>{
      if (err){
        return ctx.body = 'error';
      }
    });
};

export default {
  postQuestionnaire,
};