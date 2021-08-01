import { db } from "../components/firebase"
import firebase from "firebase/app";
export const getUsers = (setUsers, currentUser) => {
    db.collection("users")
        .onSnapshot((querySnapshot) => {
            var users = []
            querySnapshot.forEach((doc) => {
                users = [...users,
                {
                    name: doc.data().displayName,
                    id: doc.id,
                    photoURL: doc.data().photoURL,
                }]
            });
            users = users.filter(el => el.name !== currentUser.displayName)
            setUsers(users)
        });
}

export const sendMessage = (e, senderId, receiverId, message) => {
    e.preventDefault()
    if (message === "") {
        return
    }
    db.collection("messages").doc().set({
        content: message,
        users: [senderId, receiverId],
        timestamp: firebase.firestore.Timestamp.now()
    })
}


export const getMessages = (userId,setCurrentMessages) => {
    db.collection('messages')
        .where('users', 'array-contains', userId)
        .orderBy("timestamp")
        .onSnapshot(querySnapshot => {
            var messages = []
            querySnapshot.forEach(doc => {     
                messages = [
                    ...messages,
                    {
                        msgId:doc.id,
                        userId: doc.data().users.find(el => el !== userId),
                        content: doc.data().content,
                        timestamp:doc.data().timestamp?.toDate(),
                        sent:doc.data().users[0]===userId
                    }
                ]
            })
            setCurrentMessages(messages)
        })
}

