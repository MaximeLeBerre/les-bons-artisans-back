const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Object = require('./models/Object');

const app = express();

mongoose.connect('mongodb+srv://LesBonsArtisans:LesBonsArtisans@cluster0.xmgzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(bodyParser.json());

app.get('/api/object', (req, res, next) => {
  Object.find()
    .then(objects => res.status(200).json(objects))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/object/:id', (req, res, next) => {
  Object.findOne({ _id: req.params.id })
    .then(object => res.status(200).json(object))
    .catch(error => res.status(404).json({ error }));
});

app.post('/api/object', (req, res, next) => {
  delete req.body._id;
  const object = new Object({
    ...req.body
  });
  object.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/object/:id', (req, res, next) => {
  Object.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/object/:id', (req, res, next) => {
  Object.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;