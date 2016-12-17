import db from '../initial/mongodb';
import Err from '../utils/Err';
const { Type } = db;

const createType = async(ctx, next) => {
  const { name, description, language } = ctx.request.body;
  const supportedLanguages = language.split(',');

  let $type = Type.findOne({ name }).exec();
  const existingType = await $type;

  if (existingType) {
    throw new Err('CONFLICT', 'Dulplicate type'); 
  }

  const type = new Type({
    name, description, supportedLanguages,
  });

  await type.save().then(type => {
    return ctx.body = type;
  }).catch((err) => {
    throw new Err('BAD-REQUEST', 'bad !!!!');
  });
};

const getType = async(ctx, next) => {
  let $types = Type.find().exec();

  const types = await $types;

  await $types.then(types => {
    return ctx.body = types;
  }).catch((err) => {
    throw new Err('BAD-REQUEST', 'bad !!!!');
  });
}

export default {
  createType,
  getType,
};