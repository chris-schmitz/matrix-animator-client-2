import './App.css'
import Animator from "./layouts/Animator"
import { useState } from "react"
import { MatrixAnimation } from "./domain/MatrixAnimation"

export const notificationDismissTypes = {
    AUTO_DISMISS: "auto-dismiss",
    USER_DISMISS: "user-dismiss"
}

function App() {
    const [activeLayout, setActiveLayout] = useState(Layouts.ANIMATOR)
    const [animation, setAnimation] = useState(MatrixAnimation.newBlankAnimation())
    const [notification, setNotification] = useState({
        show: false,
        message: null,
        dismissType: notificationDismissTypes.AUTO_DISMISS
    })


    function getActiveLayout() {
        switch (activeLayout)
        {
            case Layouts.ANIMATOR:
                return <Animator
                    animation={animation}
                    setAnimation={setAnimation}
                    setNotification={setNotification}
                />
            case Layouts.ANIMATION_LIST:
                return <h1>Animation List</h1>

        }
    }

    function renderNotification() {
        if (notification.show)
        {
            if (notification.dismissType == notificationDismissTypes.AUTO_DISMISS)
            {
                setTimeout(() => {
                    setNotification({ show: false, message: null, dismissType: notificationDismissTypes.AUTO_DISMISS })
                }, 3000)
                return <div className="notification" data-testid="notification">{notification.message}</div>
            }
        }
    }

    return (
        <div id="app-root" className="App">
            {renderNotification()}
            {getActiveLayout()}
        </div>
    )
}


export default App

export const Layouts = {
    ANIMATION_LIST: "animation_list",
    ANIMATOR: "animator",
}