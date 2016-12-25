import db from '../initial/mongodb';
import Err from '../utils/Err';
import mongoose from 'mongoose';
const { Type } = db;

const createType = async(ctx, next) => {
  const { name, description, language } = ctx.request.body;
  const supportedLanguages = language.split(',').map(key => key.trim());

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

const deleteType = async(ctx, next) => {
  const typeId = ctx.params.typeId;

  try {
    await Type.remove({ _id: mongoose.Types.ObjectId(typeId)}).exec()

    ctx.status = 204;    
  } catch (err) {
    console.error('err: ', err);
    throw new Err('BAD-REQUEST', 'delete type');
  }  
}

export default {
  createType,
  getType,
  deleteType,
};
