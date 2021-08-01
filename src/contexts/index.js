import React, { createContext, useState } from 'react'
export const tabContext = createContext()
export const activeTabContext = createContext()
export const userContext = createContext()
export const testContext = createContext()

export const loadingContext = createContext(true)
export const usersListContext = createContext()
export const MessagesContext = createContext()

export function ContextProvider({ children }) {
    const [activeTab, setActiveTab] = useState(0)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [currentMessages, setCurrentMessages] = useState([])
    return (
        <MessagesContext.Provider value={{ currentMessages, setCurrentMessages }}>
            <usersListContext.Provider value={{ users, setUsers }}>
                <loadingContext.Provider value={{ loading, setLoading }}>
                    <userContext.Provider value={{ currentUser, setCurrentUser }}>
                        <activeTabContext.Provider value={{ activeTab, setActiveTab }} >
                            {children}
                        </activeTabContext.Provider>
                    </userContext.Provider>
                </loadingContext.Provider>
            </usersListContext.Provider>
        </MessagesContext.Provider>
    )
}

