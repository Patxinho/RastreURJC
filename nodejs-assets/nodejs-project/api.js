module.exports = function api( options ) {

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
}