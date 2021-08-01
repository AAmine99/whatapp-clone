import React, { useContext } from 'react'
import styles from './style/Discussion.module.css'
import { activeTabContext, usersListContext } from '../contexts';
const Discussion = ({ name, activeIndex,photoURL }) => {
    const { activeTab, setActiveTab } = useContext(activeTabContext)
    const {users } = useContext(usersListContext)
    let myClass = styles.discussion
    if (users[activeTab] && users[activeTab].name === name) {
        myClass = `${styles.active} ${styles.discussion}`
    }
    return (
        <div onClick={() => setActiveTab(activeIndex)} className={myClass}>
            <img className={styles.avatar} alt={name} src={photoURL} />
            <div className={styles.discussion_detail}>
                <span className={styles.name}>{name}</span>
            </div>
        </div>
    )
}

export default Discussion
