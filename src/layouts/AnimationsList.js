import {Link, useLoaderData, useLocation} from "react-router-dom"
import {getAnimationList} from '../utilities/apis'

export async function loader() {
    const animations = await getAnimationList()
    return animations || []
}

export default function AnimationsList({setNotification}) {
    const animationList = useLoaderData()
    const location = useLocation()

    function renderAnimationList() {
        if (!animationList) return
        return animationList.map(animationData => {
            return <div className="saved-animation-list-item" key={animationData.id}><Link
                to={`animation/${animationData.id}`}>{animationData.title || "..."}</Link>
            </div>
        })
    }


    console.log(location)

    // if (location.state.previousAction === 'delete') {
    //     setNotification({
    //         show: true,
    //         message: "Animation Deleted",
    //         dismissType: notificationDismissTypes.AUTO_DISMISS
    //     })
    // }

    return <div className="animation-list">
        <h1>Matrix Animator</h1>
        <Link className="new-animation-button" to={`animation`}>New Animation</Link>
        <h3>Saved Animations</h3>
        {renderAnimationList()}
    </div>
}