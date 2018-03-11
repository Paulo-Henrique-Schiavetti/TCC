const restify = require("restify");
var fs = require('fs');

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAVbUQNNGKFeUMHDNZCilrkNklhPE83wKk',
  Promise: Promise
});
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'db'
    }
  });


const server = restify.createServer({
  name: "myapp",
  version: "1.0.0",
  key: fs.readFileSync('./key.pem'), //on current folder
  certificate: fs.readFileSync('./cert.pem')
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

server.post("/geocode", function(req, res, next) {
  const {lat, lng} = req.body

  googleMapsClient.reverseGeocode({latlng: [lat, lng]}).asPromise()
  .then((response) => {
    const address = response.json.results[0].formatted_address
    const place_id = response.json.results[0].place_id;
    const image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=300x300&sensor=false`;

    knex('places')
    .insert({place_id, address, image})
    .then(() => {
        res.send({address, image});
    }, next)

  })
  .catch((err) => {
    res.send(err);
  });

});

server.get(/\/(.*)?.*/,restify.plugins.serveStatic({
  directory: './dist',
  default: 'index.html',
}));

server.listen(8080, function() {
    console.log("%s listening at %s", server.name, server.url);
  });