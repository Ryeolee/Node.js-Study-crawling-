const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server,{path : '/socket.io'});
    io.on('connection',(socket)=>{
        const req = socket.request;
        const ip  = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        socket.on('disconnect',() => {
            clearInterval(socket.interval);
        });
        socket.on('error',(error) => {
            console.error(error);
        });
        socket.on('reply',(data)=> {
            console.log(data);
            socket.emit('news',{data, acumulate_users:30,message: "ok"});
        });

    })
}