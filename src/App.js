import './App.css';
import WorkArea from "./components/WorkArea";
import {useState} from "react";

import {AnimationFrame} from "./domain/AnimationFrame";
import Timeline from "./components/Timeline";


function App() {
    // * right now we're hard coding to 8 by 8 b/c that's the size
    // * of all of my physical matrices at the moment, but eventually
    // * I'll build bigger ones so I'll add the dynamic sizing later
    function makeNewFrame(id) {
        return new AnimationFrame(id, 8, 8, Array(8 * 8).fill("#FFFFFF"))
    }

    const [frames, setFrames] = useState([makeNewFrame(0)])
    const [activeFrame, setActiveFrame] = useState(0)

    function handleAnimationFrameUpdate(frameId, gridColors) {
        const framesUpdate = frames.slice()
        const targetFrame = framesUpdate.find(frame => frame.id === frameId)
        targetFrame.gridColors = gridColors
        setFrames(framesUpdate)
    }

    function handleTimelineGridSelection(frameId) {
        setActiveFrame(frameId)
    }

    function handleNewFrameRequest() {
        const newFrames = frames.slice()
        const previousId = newFrames[newFrames.length - 1].id
        newFrames.push(makeNewFrame(previousId + 1))
        setFrames(newFrames)
    }

    return (
        <div id="app-root" className="App">
            <WorkArea animationFrame={frames[activeFrame]} handleAnimationFrameUpdate={handleAnimationFrameUpdate}/>
            <Timeline frames={frames} handleTimelineGridSelection={handleTimelineGridSelection}
                      handleNewFrameRequest={handleNewFrameRequest}/>
        </div>
    );
}

export default App;
