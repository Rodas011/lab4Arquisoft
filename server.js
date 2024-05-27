const log = console.log
//Inicilizamos el servidor http , socket.io y el numero de puerto
const http = require('http').createServer()
const io = require('socket.io')(http)
const port = 3000

http.listen(port, ()=> log(`server listening on port : ${port}`))

let gateCards = [
    { id: 1, flightNumber: 'AA123', destiny: 'DEU', airline: 'LATAM', departure: '10:00 AM' },
    { id: 2, flightNumber: 'BA456', destiny: 'BRA', airline: 'Avianca', departure: '10:00 PM' }
];

io.on('connection',(socket) =>{
    log('connected')
    socket.emit('initialData', gateCards);
    socket.on('updateGate', (updatedGate) => {
        const index = gateCards.findIndex(gate => gate.id === updatedGate.id);
        if (index !== -1) {
            gateCards[index] = updatedGate;
            io.emit('gateUpdated', updatedGate); // Enviar los cambios a todos los clientes conectados
        }
    });
});

//Activamos la cabecera CORS

http.prependListener("request", (req,res) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
});

io.on('disconnect', (evt)=>{
    log('conexión cerrada')
})