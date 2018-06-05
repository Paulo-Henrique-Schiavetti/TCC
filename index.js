const restify = require("restify");

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCix-KkR-cjpVVAV7fSM5SO6xIFPZmDBVU',
  Promise: Promise
});
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'allugardb'
    }
  });


const server = restify.createServer({
  name: "myapp",
  version: "1.0.0",
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/all", function(req, res, next) {
    
  knex('places').then((dados) => {
    res.send(dados);
  }, next)

  return next();
});

server.get("/itens", function(req, res, next) {
    
  knex('item').then((dados) => {
    res.send(dados);
  }, next)

  return next();
});

server.post("/cadastrarproduto", function(req, res, next) {
    
  knex('item')
  .insert(req.body)
  .then((dados) => {
    res.send(dados);
  }, next)

  return next();
});

server.post("/cadastrarusuario", function(req, res, next) {
    
  knex('usuarios')
  .insert(req.body)
  .then((dados) => {
    res.send(dados);
  }, next)

  return next();
});

server.get("/paginaitem/:id", function(req, res, next) {
    const {id} = req.params;
  knex('item')
    .where("id", id)
    .first()
    .then((dados) => {
      res.send(dados);
    }, next)

  return next();
});

server.get("/conversa/:id", function(req, res, next) {
    const {id} = req.params;
  knex('conversa')
    .innerJoin('usuarios', 'conversa.remetente_id', 'usuarios.id')
    .where("conversa.item_id", id)
    .select( {'nome' : 'usuarios.nome', 'mensagem' : 'conversa.mensagem'} )
    .then((dados) => {
      res.send(dados);
    }, next)

  return next();
});

server.get("/pesquisarnome/:nome", function(req, res, next) {
    const {nome} = req.params;
  knex('item')
    .where("nome",'like', '%'+nome+'%')
    .then((dados) => {
      res.send(dados);
    }, next)

  return next();
});

server.post("/geolocate", function(req, res, next) {
  const {lat, lng} = req.body

  googleMapsClient.reverseGeocode({latlng: [lat, lng]}).asPromise()
  .then((response) => {
    const address = response.json.results[0].formatted_address
    const place_id = response.json.results[0].place_id;
    res.send({address, place_id});
  }, next)
  .catch((err) => {
    res.send(err);
  });
  return next();
});

server.get(/\/(.*)?.*/,restify.plugins.serveStatic({
  directory: './dist',
  default: 'index.html',
}));

server.listen(8080, function() {
    console.log("%s listening at %s", server.name, server.url);
  });