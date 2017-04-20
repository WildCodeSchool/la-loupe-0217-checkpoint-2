import express from 'express';
import Msg from '../models/msg.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var msg = new Msg();

    router.get('/', msg.findAll);

    router.post('/', msg.create);

    router.post('/:id', msg.like);

    app.use('/msg', router);

};
