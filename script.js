console.log("hello script");
const socket =io('https://chatverse.herokuapp.com',{transports:['websocket']})
const form =document.getElementById("sent-container")
const messageInput = document.getElementById("message-inp")
const messageContainer =document.querySelector('.container')

const append=(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
}

const names = prompt("enter your name to join")
socket.emit('new-user-joined', names )
socket.on('user-joined',name=>{
    console.log(name);
    append(`${name} joined the chat`,"right");
    
})
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message =messageInput.value;
    append(`you : ${message}`,"right")
    socket.emit('send',message)
    messageInput.value =""
})
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,"left")
})
socket.on('leave',data=>{
    append(`${data.name} left the chat`,"left")
})