const express = require('express')
const app = express()
const cluster = require("cluster")
const os = require("os")

const numCpu = os.cpus().length
app.get('/',(req,res)=>{
    for(let i = 0 ; i<1e8;i++){

    }
    res.send(`Ok...💋💋💋💋💋💋💋 ${process.pid}`)
    cluster.worker.kill()
})

if(cluster.isMaster){
    for(let i = 0;i<numCpu;i++){
       cluster.fork()
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork()

    })
}
else{
    app.listen(4000,()=>{
        console.log(`I am Up Now 🌹🌹❤❤ ${process.pid}`)
    })
}
