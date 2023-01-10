window.onload = function() {
    let messages = [],
        socket = io.connect('http://localhost:3700'),
        field = document.querySelector('#field'),
        sendButton = document.querySelector('#send'),
        content = document.querySelector('#content'),
        name = document.querySelector('#name')

        socket.on('message', function(data){
            if(data.message){
                messages.push(data)
                let html = ''
                for(let i = 0; i<messages.length; i++){
                    html+='<b>'+ (messages[i].username ? messages[i].username: 'Server' + ': </b>')
                    html+=messages[i].message + '<br>'
                }
                content.innerHTML = html 
                content.scrollTop = content.scrollHeight
            } else {
                console.log('error:', data)
            }
        })

        sendButton.onClick = function(){
            if(name.value == '') {
                alertt('digite seu nome')
            } else{
                let text = field.value 
                socket.emit('send', {message: text, username: name.value})
                field.value = ''
            }
        }
        field.addEventListener('keypress', function(e){
            let key = e.which || e.keyCode
            if (key === 13){
                sendButton.onClick()
            }
        })


}