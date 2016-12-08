import db from '../initial/mongodb';
import Err from '../utils/Err';
const { User } = db;

const postQuestionnaire = async(ctx, next) => {
  let $user = User.findOne(ctx.request.body).exec();
  const { name } = ctx.request.body;

  await $user
    .then(function(existingUser){
      if(existingUser){
        throw new Err('CONFLICT', 'Dulplicate user');
      }
      let user = new User({
        name,
        nationality: 'China',
      });

      user.save();
      return ctx.body = 'insert successful';
    })
};

export default {
  postQuestionnaire,
};