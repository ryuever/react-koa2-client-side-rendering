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

  try {
    ctx.body = await Option.insertMany(options); 
  } catch (err) {
    throw new Err('BAD-REQUEST', 'create options');
  }
};

const getOptions = async(ctx, next) => {
  const typeId = ctx.params.typeId;
  try {
    ctx.body = await Option.find({ type: typeId }).exec();
  } catch (err) {
    throw new Err('BAD-REQUEST', 'get options');
  }
};

const deleteOptions = async(ctx, next) => {
  const typeId = ctx.params.typeId;
  const data = ctx.request.body;

  try {
    const tasks = data.map(option => {
      Option.remove({ _id: mongoose.Types.ObjectId(option)}).exec();
    })

    let results = [];
    for (let task of tasks) {
      results.push(await task);
    }
    ctx.status = 204;    
  } catch (err) {
    throw new Err('BAD-REQUEST', 'delete options');
  }
}

export default {
  createOptions,
  getOptions,
  deleteOptions,
};