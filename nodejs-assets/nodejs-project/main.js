var rn_bridge = require('rn-bridge');
var seneca = require('seneca')()
var entities = require('seneca-entity')

seneca.use(entities)

var isReady = false;
seneca.use('seneca-jsonfile-store', {
  folder:'/storage/emulated/0/RastreURJC'
})
.listen(3000)
.use(coords.j) 
.use('api')
.ready((function (err) {
  if (err) return process.exit(!console.error(err))

  console.log('ready')
  isReady = true
  rn_bridge.channel.send('true');
})
)


rn_bridge.channel.on('message', (msg) => {
  switch(msg) {
    case 'ready':
      if (isReady)
        rn_bridge.channel.send('true');
      else
        rn_bridge.channel.send('false');
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