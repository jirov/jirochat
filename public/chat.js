window.onload = () => {
    // Connection
    const socket = io.connect('https://jirochat.herokuapp.com/');

    var output = document.getElementById("output");
    var name;
    var message = document.getElementById("message");
    var send = document.getElementById('send');
    var typing = document.getElementById('typing');
    var username = document.getElementById('username');
    var login = document.getElementById('login');
    var formLogin = document.getElementById('formlogin');
    var formChat = document.getElementById('formchat');
    var listUsers = document.getElementById('list-users');

    //Emit events
    send.addEventListener('click', () => {
        socket.emit('chat', {
            name: name,
            message: message.value
        });
        output.innerHTML += `<p style="text-align:right"><span>${message.value}</span><strong> ${name}</strong></p>`;
        message.value = "";
    });

    message.addEventListener('keypress', () => {
        socket.emit('typing', name);
    });

    // Listen Events
    socket.on('chat', (data) => {
        if (data.name != name) {
            output.innerHTML += `<p style="text-align:left"><strong>${data.name} </strong><span>${data.message}</span></p>`;
        }
        document.getElementById("typing").innerHTML = "";
    });

    socket.on('typing', (data) => {
        if (data != name) {
            typing.innerHTML = `<p style="text-align:left"><em><strong>${data}</strong> is writing message ... </em></p>`;
        }
    });

    login.addEventListener('click', (e) => {
        e.preventDefault();
        socket.emit('newuser', username.value);
        if (username.value != '') {
            console.log("zo day");
            formLogin.style.display = "none";
            formChat.style.display = "block";

            name = username.value;
        }
        else{
            alert('Username is required!');
            username.style.border = "1px solid red";
        }
        document.getElementById('name').textContent += `User : ${name}`;
        username.value = "";
    });

    socket.on('newuser', (data) => {
        listUsers.innerHTML = "";
        console.log(`Data : ${data}`);
        data.forEach((item) => {
            listUsers.innerHTML += `<li class="list-group-item"><span class="glyphicon glyphicon-user"></span> <strong>${item}</strong></li>`
        });
    });
}