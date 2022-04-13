import React, {createContext, useState, useEffect} from "react";

export const NotificationContext = createContext({
    notification: null,
    showNotification: () => {},
    hideNotification: () => {}
})
export default function NotificationContextProvider(props) {
    const [activeNotification, setActiveNotification] = useState();

    useEffect(() =>{
        if(activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')){
            const timer = setTimeout(() =>{
                hideNotificationHandler()
            }, 3000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [activeNotification])



    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData)
    }

    function hideNotificationHandler(){
        setActiveNotification(null)
    }

    const context = {notification: activeNotification,
                    showNotification: showNotificationHandler,
                    hideNotification: hideNotificationHandler}

  return <NotificationContext.Provider value = {context}>
      {props.children}
  </NotificationContext.Provider>;
}
