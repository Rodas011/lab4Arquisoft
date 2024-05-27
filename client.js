var socket = io('http://localhost:3000');
const l = console.log

function getEl(id) {
    return document.getElementById(id)
}

socket.on('initialData', (gateCards) => {
    const gatesDiv = document.getElementById('gates');
    gatesDiv.innerHTML = '';
    gateCards.forEach(gate => {
        const gateDiv = document.createElement('div');
        gateDiv.classList.add('gate-card');
        gateDiv.innerHTML = `
            <h3>Puerta de embarque ${gate.id}</h3>
            <p>Numero de Vuelo: <input type="text" value="${gate.flightNumber}" id="flightNumber-${gate.id}"></p>
            <p>Destino: <input type="text" value="${gate.destiny}" id="destiny-${gate.id}"></p>
            <p>Aerolinea: <input type="text" value="${gate.airline}" id="airline-${gate.id}"></p>
            <p>Hora de Salida: <input type="text" value="${gate.departure}" id="departure-${gate.id}"></p>
            <button onclick="updateGate(${gate.id})">Actualizar</button>
        `;
        gatesDiv.appendChild(gateDiv);
    });
});

socket.on('gateUpdated', (updatedGate) => {
    document.getElementById(`flightNumber-${updatedGate.id}`).value = updatedGate.flightNumber;
    document.getElementById(`destiny-${updatedGate.id}`).value = updatedGate.destiny;
    document.getElementById(`airline-${updatedGate.id}`).value = updatedGate.airline;
    document.getElementById(`departure-${updatedGate.id}`).value = updatedGate.departure;
});

function updateGate(id) {
    const flightNumber = document.getElementById(`flightNumber-${id}`).value;
    const destiny = document.getElementById(`destiny-${id}`).value;
    const airline = document.getElementById(`airline-${id}`).value;
    const departure = document.getElementById(`departure-${id}`).value;
    socket.emit('updateGate', { id, flightNumber, destiny, airline, departure });
}