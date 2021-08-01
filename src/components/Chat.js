import React, { useContext, useEffect, useRef } from 'react'
import styles from './style/Chat.module.css'
import MessageIn from '../components/messages/MessageIn'
import MessageOut from '../components/messages/MessageOut'
import { activeTabContext, usersListContext, userContext, MessagesContext } from '../contexts'
import { sendMessage, getMessages } from '../utils';
const Chat = () => {
    const { activeTab } = useContext(activeTabContext)
    const { users } = useContext(usersListContext)
    const { currentUser } = useContext(userContext)
    const { currentMessages, setCurrentMessages } = useContext(MessagesContext)
    const { name, photoURL, id } = users[activeTab] ? users[activeTab] : { name: null, photoURL: null, id: null }
    const input = useRef()
    const msgEnd = useRef()
    useEffect(() => {
        getMessages(currentUser.uid, setCurrentMessages)
    }, [currentUser.uid, setCurrentMessages])
    
    useEffect(()=>{
        scrollToBottom()
    },[currentMessages,activeTab])

    const messagesList = currentMessages.map(({ msgId, userId, content, timestamp, sent }) => {
        if (userId === id && sent === true) {
            return <MessageIn key={msgId} content={content} timestamp={timestamp?.toLocaleString()} />
        }
        if (userId === id) {
            return <MessageOut key={msgId} content={content} timestamp={timestamp?.toLocaleString()} />
        }
        return null
    })
    
    
    const scrollToBottom = () => {
        msgEnd.current.scrollIntoView({behavior: 'smooth'})
    }
    return (
        <div className={styles.Chat}>
            <div className={styles.Topbar_chat}>
                <div className={styles.Topbar_chat_detail}>
                    <img className={styles.avatar} alt={name} src={photoURL} />
                    <div style={{ paddingLeft: "15px" }}>
                        {name}
                    </div>
                </div>
            </div>
            <div className={styles.Messages}>
                <div className={styles.empty} />
                {messagesList}
                <div ref={msgEnd} ></div>
            </div>
            <form onSubmit={e => {
                sendMessage(e, currentUser.uid, users[activeTab].id, input.current.value)
                input.current.value = ""
            }} className={styles.SendForm}>
                <input
                    type="text"
                    ref={input}
                    className="send_input"
                    placeholder="Type a message" />
                {/* <button type="submit">
                    <h4>Send</h4>
                </button> */}
            </form>
        </div>
    )
}

export default Chat
