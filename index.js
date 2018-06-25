const restify = require("restify");

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCix-KkR-cjpVVAV7fSM5SO6xIFPZmDBVU',
  Promise: Promise
});

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'allugardb'
  }
});

module.exports = function (dbConfig) {
  var knex = require('knex')(dbConfig);

  var KnexQueryBuilder = require('knex/lib/query/builder');

  KnexQueryBuilder.prototype.paginate = function (per_page, current_page) {
    var pagination = {};
    var per_page = per_page || 10;
    var page = current_page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;
    return Promise.all([
      this.clone().count('* as count').first(),
      this.offset(offset).limit(per_page)
    ])
      .then(([total, rows]) => {
        var count = total.count;
        var rows = rows;
        pagination.total = count;
        pagination.per_page = per_page;
        pagination.offset = offset;
        pagination.to = offset + rows.length;
        pagination.last_page = Math.ceil(count / per_page);
        pagination.current_page = page;
        pagination.from = offset;
        pagination.data = rows;
        return pagination;
      });
  };

  knex.queryBuilder = function () {
    return new KnexQueryBuilder(knex.client);
  };

  return knex;
}


const server = restify.createServer({
  name: "myapp",
  version: "1.0.0",
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/all", function (req, res, next) {

  knex('places').then((dados) => {
    res.send(dados);
  }, next)

  return next();
});

server.get("/itens/:page/:perPage", function (req, res, next) {

  const { page } = req.params;
  const { perPage } = req.params;
  
  knex('item')
    .paginate(perPage, page)
    .select({ 'id': 'item.id', 'nome': 'item.nome', 'imagem': 'item.imagem', 'preço': 'item.preço', 'descrição': 'item.descrição', 'avaliacao': 'item.avaliacao', 'endereco': 'usuarios.endereco', 'data': 'item.data_publicacao' })
    .innerJoin('usuarios', 'item.locatario', 'usuarios.id')
    .then((dados) => {
      res.send(dados);
    }, next)

  return next();
});


server.post("/cadastrarproduto", function (req, res, next) {

  knex('item')
    .insert(req.body)
    .then((dados) => {
      res.send(dados);
    }, next)

  return next();
});

server.post("/cadastrarusuario", function (req, res, next) {

  knex('usuarios')
    .insert(req.body)
    .then((dados) => {
      res.send(dados);
    }, next)

  return next();
});

server.get("/pesquisarid/:id", function (req, res, next) {
  const { id } = req.params;
  knex('item')
    .innerJoin('usuarios', 'item.locatario', 'usuarios.id')
    .where("item.id", id)
    .first()
    .select('item.id', 'item.nome', 'item.imagem', 'usuarios.endereco')
    .then((dados) => {
      res.send(dados);
    }, next)

  return next();
});

server.get("/comentarios/:id", function (req, res, next) {
  const { id } = req.params;
  knex('comentarios')
    .where("comentarios.item_id", id)
    .innerJoin('usuarios', 'comentarios.usuario_id', 'usuarios.id')
    .select({ 'nome': 'usuarios.nome', 'mensagem': 'comentarios.mensagem', 'datahora': 'comentarios.datahora' })
    .then((dados) => {
      res.send(dados);
    }, next)

  return next();
});

server.get("/pesquisarnome/:nome", function (req, res, next) {
  const { nome } = req.params;
  knex('item')
    .where("nome", 'like', '%' + nome + '%')
    .then((dados) => {
      res.send(dados);
    }, next)

  return next();
});

server.post("/geolocate", function (req, res, next) {
  const { lat, lng } = req.body

  googleMapsClient.reverseGeocode({ latlng: [lat, lng] }).asPromise()
    .then((response) => {
      const address = response.json.results[0].formatted_address
      const place_id = response.json.results[0].place_id;
      res.send({ address, place_id });
    }, next)
    .catch((err) => {
      res.send(err);
    });
  return next();
});

server.get(/\/(.*)?.*/, restify.plugins.serveStatic({
  directory: './dist',
  default: 'index.html',
}));

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});