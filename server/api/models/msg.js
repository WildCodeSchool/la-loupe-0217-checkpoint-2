import mongoose from 'mongoose';
import User from './user.js';

const msgSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: new Date
  }
});

let model = mongoose.model('Msg', msgSchema);

export default class Msg {

  create (req, res) {
    model.create(req.body,
      function(err, msg) {
        if(err || !msg) {
          res.sendStatus(500)
        } else {
          res.json(msg)
        }
      })
  }

};
