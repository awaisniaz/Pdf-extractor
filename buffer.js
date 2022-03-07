// const buf = Buffer.from('Hey!')
// buf[0] = 122
// console.log(buf.toString())

const {exec} = require('child_process')
exec('pwd',(error,stdout,stderr)=>{
    if(error){
        console.log(`error ${error.message}`)
        return
    }
    else{
        if(stderr){
            console.log(`Standard error ${stderr}`)
            return
        }

        console.log(stdout)
    }

})
