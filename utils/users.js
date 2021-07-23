// ANYTHING THAT HAPPENS WITH THE USER LIKE JOINING THE ROOM, LEAVING THE ROOM ETC. HAPPENS IN THIS CODE

// Basically this file is sort of a dummy database, you can connect Firebase if you like as well!

const users = []

// JOIN USER TO THE CHAT 
function userJoin(id, username, room){
    const user = {id, username, room}
    users.push(user)
    return user
}

// GET THE CURRENT USER
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

// USER LEAVES THE CHAT
function userLeaves(id){
    const index = users.findIndex(user => user.id === id)
    if (index!== -1){
        return users.splice(index, 1)[0]
    }
}

// GET ROOM USERS
function getRoomUsers(room){
    return users.filter(user => user.room === room)
}

module.exports = { userJoin, getCurrentUser, userLeaves, getRoomUsers }
