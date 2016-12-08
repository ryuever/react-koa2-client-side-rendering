import db from '../initial/mongodb';
const { User } = db;

const createUser = async(ctx, next) => {
  let $user = User.findOne({name: '1111'}).exec();

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
    
    .catch((err)=>{
      if (err){
        return ctx.body = 'error';
      }
    });
};