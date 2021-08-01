import React, { useContext,useEffect, Fragment } from 'react'
import styles from './style/Sidebar.module.css'
import { usersListContext, userContext } from '../contexts';
import Discussion from './Discussion';
import { getUsers } from '../utils';
import { firebaseApp } from './firebase';
const Sidebar = () => {
    const { currentUser,setCurrentUser } = useContext(userContext)
    const { displayName, photoURL } = currentUser
    const { users } = useContext(usersListContext)
    const {setUsers}= useContext(usersListContext)
    useEffect(() => {
        getUsers(setUsers,currentUser)
    }, [setUsers,currentUser])
    let usersList = users.map(({ id, name, photoURL }, i) => {
        return <Discussion key={id} photoURL={photoURL} activeIndex={i} name={name} id={id} />
    })
    usersList = <Fragment>{usersList}</Fragment>
    return (
        <div className={styles.Sidebar}>
            <div className={styles.Topbar}>
                <div className={styles.avatarHolder}>
                    <img className={styles.avatar} alt={displayName} src={photoURL} />
                </div>
                <div>
                    <button className={styles.signoutBtn} onClick={async ()=>{
                        await firebaseApp.auth().signOut()
                        setCurrentUser(null)
                    } }>
                        <span>Sign Out</span>
                        
                    </button>
                </div>
            </div>
            {/* <form className={styles.form}>
                <div className={styles.search}>
                    <SearchIcon fontSize="small" style={{ paddingLeft: "15px" }} />
                    <input
                        className="input"
                        onFocus={e => e.target.placeholder = ''}
                        onBlur={e => e.target.placeholder = 'Start a new conversation'}
                        placeholder="Start a new conversation"
                    />
                </div>
            </form> */}
            <div className={styles.discussions}>
                {
                    usersList
                }
            </div>
        </div>
    )
}

export default Sidebar
