const socket = io()

let user 
let chatbox = document.getElementById('chatbox')



Swal.fire({
    title:'Identifícate',
    input: 'text',
    text:'Ingresa un usuario',
    // icon:'success'
    inputValidator: value =>{
        return !value && 'Necesitas escribir un nombre de usuario'
    },
    allowOutsideClick: false


}).then(res=>{
    user = res.value
    socket.emit('authenticated', user)
})
const handleSocket = (evt)=>{
    if(evt.key === 'Enter'){
        if (chatbox.value.trim().length > 0){
            socket.emit('message', {
                user: user,
                message: chatbox.value
            })
            chatbox.value = ''
        }
        else{
            console.log('escriba algo');
        }
    }
}
chatbox.addEventListener('keyup', handleSocket)
console.log(chatbox.value);

socket.on ('messageLog', data =>{
    let log =  document.getElementById('messageLog')
    let message = ''
    data.forEach(mensajes => {
        message = message + `<li>${mensajes.user} dice: ${mensajes.message}</li><br>` 
    });
    log.innerHTML = message
})

socket.on('newUserConnected', data =>{
    if(!user) return
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        title:`${data} se ha unido al chat`,
        icon: 'success'
    })
})