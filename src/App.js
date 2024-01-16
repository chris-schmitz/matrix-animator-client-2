import './App.css';
import Animator from "./layouts/Animator";
import {useState} from "react";


function App() {
    const [activeLayout, setActiveLayout] = useState(Layouts.ANIMATOR)

    function getActiveLayout() {
        switch (activeLayout) {
            case Layouts.ANIMATOR:
                return <Animator/>
            case Layouts.ANIMATION_LIST:
                return <h1>Animation List</h1>

        }
    }

    return (
        <div id="app-root" className="App">
            {getActiveLayout()}
        </div>
    );
}


export default App;

export const Layouts = {
    ANIMATION_LIST: "animation_list",
    ANIMATOR: "animator",
}