import React, { useRef, useEffect } from 'react'

export default function circle() {

    const svg = useRef(null);
    let pathLength = 0;

    useEffect( () => {
        pathLength = svg.current.getTotalLength();
        svg.current.style.strokeDasharray = pathLength;
        svg.current.style.strokeDashoffset = pathLength;
        svg.current.style.stroke = "black";

        setTimeout( () => {
            manageMouseOver();
        }, 100)
    }, [])

    const manageMouseOver = () => {
        svg.current.style.transitionDuration = "0.8s";
        svg.current.style.strokeDashoffset = 0;
    }

    const manageMouseLeave = () => {
    //    svg.current.style.strokeDashoffset = pathLength;
    }

    return (
<svg onMouseOver={manageMouseOver} onMouseLeave={manageMouseLeave} className="svg" width="256" height="89" viewBox="0 0 256 89" fill="none" xmlns="http://www.w3.org/2000/svg">
<path ref={svg} className="svg-path" d="M134.217 22.1716C159.976 20.7306 185.339 16.4922 211.243 16.6627C222.152 16.7346 241.155 15.7771 249.34 26.8876C260.207 41.6372 239.11 57.8099 231.046 62.4537C200.629 79.9696 162.711 80.9299 129.576 81.8713C107.465 82.4995 85.3261 81.7466 63.3401 78.1889C46.8151 75.5149 27.5191 73.0408 12.8986 62.4342C2.83525 55.1336 -0.520335 43.6051 8.99957 34.5244C27.8021 16.5895 53.7266 11.8951 77.0455 8.73239" stroke="black" stroke-width="1" stroke-linecap="round"/>
</svg>

    )
}
