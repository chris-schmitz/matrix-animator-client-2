import { Link, useLoaderData } from "react-router-dom"
import { getAnimationList } from '../utilities/apis'

export async function loader() {
  const animations = await getAnimationList()
  return animations
}
export default function AnimationsList() {
  const animationList = useLoaderData()
  console.log(animationList)

  function renderAnimationList() {
    return animationList.map(animationData => {
      return <li key={animationData.id}><Link to={`animation/${animationData.id}`}>{animationData.title}</Link></li>
    })
  }

  return <div>
    <h1>Animations list!</h1>
    <ul>
      <li><Link to={`animation`}>New Animation</Link></li>
      {renderAnimationList()}
    </ul>
  </div>
}