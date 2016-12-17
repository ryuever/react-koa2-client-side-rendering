import db from '../initial/mongodb';
import mongoose from 'mongoose';
import Err from '../utils/Err';
const { Option } = db;

const createOptions = async(ctx, next) => {
  const data = ctx.request.body;
  const id = ctx.params.typeId;

  const options = data.map(d => ({
    type: mongoose.Types.ObjectId(id),
    content: d,
  }));

  await Option.insertMany(options).then(options => {
    return ctx.body = options;
  }).catch((err) => {
    throw new Err('BAD-REQUEST', 'create options');
  });
};

const getOptions = async(ctx, next) => {
  const typeId = ctx.params.typeId;
  const options = Option.find({ type: typeId }).exec();

  await options.then(options => {
    return ctx.body = options;
  }).catch(err => {
    throw new Err('BAD-REQUEST', 'get options');
  })
};

export default {
  createOptions,
  getOptions,
};