module.exports = function( options ) {

this.add({role:'coords',cmd:'get'},function(args,callback){
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
}