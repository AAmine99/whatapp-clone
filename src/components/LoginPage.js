import React, { Fragment, useContext } from 'react'
import styles from './style/LoginPage.module.css'
import { firebaseApp, provider, db } from './firebase';
import { loadingContext, userContext } from '../contexts';
export default function LoginPage() {
    const {  setCurrentUser } = useContext(userContext)
    const { loading } = useContext(loadingContext)
    const login = async () => {
        try {
            const result = await firebaseApp.auth().signInWithPopup(provider)
            setCurrentUser(result.user)
            addUser(result.user.uid, result.user.displayName, result.user.photoURL)
        }
        catch (err) {
            console.log(err)
        }
    }
    const addUser = (id, displayName, photo) => {
        db.collection("users").doc(id).set({
            displayName,
            photoURL: photo,
        }, { merge: true })
    }


    const spinner = <div className={styles.loader}>Loading</div>
    return (
        <div className={styles.Container}>
            <div className={styles.LogoContainer}>
                {
                    loading ? spinner :
                        (
                            <Fragment>
                                <div className={styles.Logo}>
                                <img alt="whatapp" src="https://img.icons8.com/color/144/000000/whatsapp--v6.png"/>
                                    <h1 style={{marginTop:"10px"}}>WhatZab</h1>
                                </div>
                                <div onClick={login} className={styles.googleBtn}>
                                    <div className={styles.googleIconWrapper}>
                                        <img alt="héhé" className={styles.googleIcon}
                                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                                    </div>
                                    <p className={styles.btnText}><b>Sign in with google</b></p>
                                </div>
                            </Fragment>
                        )
                }
            </div>
        </div>
    )
}
