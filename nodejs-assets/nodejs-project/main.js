var rn_bridge = require('rn-bridge');
var seneca = require('seneca')()
var entities = require('seneca-entity')

seneca.use(entities)

var isReady = false;
seneca.use('seneca-jsonfile-store', {
  folder:'/storage/emulated/0/RastreURJC'
})
.listen(3000) 
.ready((function (err) {
  if (err) return process.exit(!console.error(err))

  console.log('ready')
  isReady = true
  console.log(isReady)
})
)


seneca.add({role:'coords',cmd:'get'},function(args,callback){
  var coords = seneca.make$('coords')
  var json = JSON.parse(args.location)
  if (isReady){
    coords.latitude= json.latitude
    coords.longitude= json.longitude
    coords.latitudeDelta = json.latitudeDelta
    coords.longitudeDelta = json.longitudeDelta
    coords.date = new Date().toISOString().slice(0, 10)
    coords.save$(function (err, gps) {
      console.log("coords.id = " + coords.id )
    })
  }
  callback(null,{location:coords.data$(false)})
})

//API
seneca.add({ role: 'api', cmd: 'getCoordsToday' }, function (args, callback) {
  var coords = seneca.make$('coords')
  var json = new Array()
  coords.list$({date: new Date().toISOString().slice(0, 10)},function(err,list){
    list.forEach(function( location ){
      json.push(location.data$(false))
    })
    callback(null, {location: JSON.parse(JSON.stringify(json))})
  })
})

seneca.add({ role: 'api', cmd: 'getCoords' }, function (args, callback) {
  var coords = seneca.make$('coords')
  var json = new Array()
  coords.list$(function(err,list){
    list.forEach(function( location ){
      json.push(location.data$(false))
    })
    callback(null, {location: JSON.parse(JSON.stringify(json))})
  })
})

rn_bridge.channel.on('message', (msg) => {
  switch(msg) {
    case 'ready':
      rn_bridge.channel.send(isReady);
      break;
      default:
      seneca.act({role:'coords',cmd:'get',location:msg}, function (err, result) {
        if (err) return console.error(err)
        console.log(result)
      })
      break;  
  }
} );

// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");