import {Box} from '@material-ui/core';
import {useState, useRef} from 'react';

import one from '../../assets/tutorials/one.mp4';
import two from '../../assets/tutorials/two.mp4';
import three from '../../assets/tutorials/three.mp4';
import four from '../../assets/tutorials/four.mp4';
import five from '../../assets/tutorials/five.mp4';
import six from '../../assets/tutorials/six.mp4';
import seven from '../../assets/tutorials/seven.mp4';
import eight from '../../assets/tutorials/eight.mp4';
import nine from '../../assets/tutorials/nine.mp4';


export default function UserGuideWindow (props: any) {

    const [TUTORIAL_INTRO, SET_TUTORIAL_INTRO] = useState(true);

    const TUTORIAL_DATA = useRef([
        {
            id: 0,
            title: 'First, pick a sorting algorithm.',
            source: one
        },
        {
            id: 1,
            title: "Then, click sort to visualize the algorithm. Wait until it's  finish.",
            source: two
        },
        {
            id: 2,
            title: "Once it's done, you can generate new array and pick another algorithm.",
            source: three
        },
        {
            id: 3,
            title: "If you want a smaller or larger array, you can change its size or length.",
            source: four
        },
        {
            id: 4,
            title: "If you want to visualize the algorithm clearly, make it slower by changing the sorting speed.",
            source: five
        },
        {
            id: 5,
            title: "You can also change the order of arrangement to ascending or descending.",
            source: six
        },
        {
            id: 6,
            title: "Now, let's move on to Searching Visualizer Tab",
            source: seven
        },
        {
            id: 7,
            title: "Type an integer to be search, change the speed then click search.",
            source: eight
        },
        {
            id: 8,
            title: "If linear search is too slow. Click stop",
            source: nine
        },
    ]);

    const [ACTIVE_WINDOW, SET_ACTIVE_WINDOW] = useState(TUTORIAL_DATA.current[0]);

    function changeWindow (n: number) {
        const max = TUTORIAL_DATA.current.length;
        const newIndex = ACTIVE_WINDOW.id + n;

        if (newIndex < 0) SET_TUTORIAL_INTRO(true);
        else if (newIndex === max) props.handleSkip();
        else {
            SET_ACTIVE_WINDOW(TUTORIAL_DATA.current[newIndex]);
        }
    }

    function handleCheckBox (e: any) {
        if (e.target.checked == true) {
            localStorage.setItem('tutorialHidden', "true");
        }
    }

    return (
        <>
            <Box hidden={!TUTORIAL_INTRO}>
                <div className="user-guide-window">
                    <h1>Thank You!</h1>
                    <h2>For Visiting Algo Visualizer</h2>
                    <p>
                        This visualization tool is designed to help beginner programmers
                        visualize fundamental sorting, searching and visualizing an arbitrary code.
                        Please take the short tutorial first if you're not yet familiar,
                        otherwise, just skip.
                    </p>
                    <div>
                        <button onClick={() => {SET_TUTORIAL_INTRO(false);}} >Start tutorial</button>
                        <button onClick={props.handleSkip}>Skip for now</button>
                    </div>
                    <div className="dont-show-again">
                        <input type="checkbox" id="checkbox-dont-show-again" onClick={handleCheckBox} />
                        &nbsp; Dont' show again
                    </div>
                </div>
            </Box>

            <Box hidden={TUTORIAL_INTRO}>
                <div className="tutorials">
                    <span id="counter"> {ACTIVE_WINDOW.id + 1}/{TUTORIAL_DATA.current.length} </span>
                    <h1> {ACTIVE_WINDOW.title} </h1>
                    <div className="content-container">
                        <video src={ACTIVE_WINDOW.source} loop autoPlay muted />
                    </div>
                    <div>
                        <button className="tutorialbtn" onClick={() => {changeWindow(-1);}} >back</button>
                        <button className="tutorialbtn" onClick={() => {changeWindow(1);}}> {(ACTIVE_WINDOW.id === TUTORIAL_DATA.current.length - 1 ? 'Finish' : 'Next')} </button>
                    </div>
                </div>
            </Box>
        </>
    );
}