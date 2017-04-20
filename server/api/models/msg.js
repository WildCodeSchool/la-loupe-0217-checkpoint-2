import mongoose from 'mongoose';
import User from './user.js';

const likeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

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
  },
  liked: [likeSchema]
});

let model = mongoose.model('Msg', msgSchema);

export default class Msg {

  create (req, res) {
    model.create(req.body,
      function(err, msg) {
        if(err || !msg) {
          res.status(500).send(err.message);
        } else {
          res.json(msg)
        }
      })
    }

    findAll (req, res) {
      model.find({}).populate('author').exec(function (err, msgs) {
        if (err) {
          res.status(500).send(err.message);
        } else if (!msgs) {
          res.sendStatus(404);
        } else {
          res.json(msgs)
        }
      })
    }

    like (req, res) {
      console.log(req.params.id)
      model.findByIdAndUpdate(
        req.params.id,
        {$push: {"liked": {author: req.body.userId}}},
          function(err, msg) {
          if (err) {
            res.status(500).send(err.message);
          } else if (!msg) {
            res.sendStatus(404);
          } else {
            res.json(msg)
          }
        }
      )}

    };
