// THIS IS SPECIALLY CREATED TO FORMAT THE MESSAGES 
// FROM A STRING TO AN OBJECT SO AS TO BE ABLE TO
// DISPLAY THE TIME AND NAME OF THE USER WHO SENT THE MESSAGE
// AND OTHER PROPERTIES 

const time = require('moment')

function formatMessage(username, text){
    return {
        username,
        text,
        time: time().format('h:mm a')
    }
}

module.exports = formatMessage