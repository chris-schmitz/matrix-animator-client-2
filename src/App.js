import './App.css'
import Animator, { loader as animationLoader } from "./layouts/Animator"
import { useState } from "react"
import { MatrixAnimation } from "./domain/MatrixAnimation"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from './_tests/layouts/Error'
import AnimationsList, { loader as animationListLoader } from './layouts/AnimationsList'

export const notificationDismissTypes = {
    AUTO_DISMISS: "auto-dismiss",
    USER_DISMISS: "user-dismiss"
}


function App() {
    const [notification, setNotification] = useState({
        show: false,
        message: null,
        dismissType: notificationDismissTypes.AUTO_DISMISS
    })



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

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AnimationsList />,
            errorElement: <ErrorPage />,
            loader: animationListLoader
        },
        {
            path: "/animation",
            element: <Animator
                setNotification={setNotification}
            />
        },
        {
            path: "/animation/:id",
            element: <Animator
                setNotification={setNotification}
            />,
            loader: animationLoader
        }
    ])

    return (
        <div id="app-root" className="App">
            {renderNotification()}
            <RouterProvider router={router} />
        </div>
    )
}


export default App

export const Layouts = {
    ANIMATION_LIST: "animation_list",
    ANIMATOR: "animator",
}