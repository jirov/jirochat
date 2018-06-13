window.onload = () => {
    // Connection
    const socket = io.connect('https://jirochat.herokuapp.com/');

    var output = document.getElementById("output");
    var name = document.getElementById("name");
    var message = document.getElementById("message");
    var send = document.getElementById('send');
    var typing = document.getElementById('typing');

    //Emit events
    send.addEventListener('click', () => {
        socket.emit('chat', {
            name: name.value,
            message: message.value
        });
        output.innerHTML += `<p style="text-align:right"><span>${message.value}</span><strong> ${name.value}</strong></p>`;
        message.value = "";
    });

    message.addEventListener('keypress', () => {
        socket.emit('typing', name.value);
    })

    // Listen Events
    socket.on('chat', (data) => {
        if (data.name != name.value) {
            output.innerHTML += `<p style="text-align:left"><strong>${data.name} </strong><span>${data.message}</span></p>`;
        }
        document.getElementById("typing").innerHTML = "";
    });

    socket.on('typing', (data) => {
        if (data != name.value) {
            typing.innerHTML = `<p style="text-align:left"><em><strong>${data}</strong> is writing message ... </em></p>`;
        }
    })
}