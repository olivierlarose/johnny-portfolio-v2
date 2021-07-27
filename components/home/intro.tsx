import React, { Component, createRef } from 'react'
import Gsap, { Power4 } from 'gsap';
import Circle from './circle';

export default class intro extends Component {
    
    private word = createRef<HTMLDivElement>()
    private scrollOffset: number;

    constructor(props){
        super(props);
        this.scrollOffset = 0;
    }

    componentDidMount(){
        const wordElement = this.word.current.getBoundingClientRect()
        // this.scrollOffset = wordElement.top + window.scrollY;
        this.scrollOffset = window.innerHeight * 0.175;
    }

    animate(){
        const wordElement = this.word.current.getBoundingClientRect()
        // let percentageX = (this.scrollOffset - wordElement.top) / this.scrollOffset
        let percentageX = window.scrollY / this.scrollOffset;
        if(percentageX > 1) percentageX = 1;
        // console.log(percentageX);

        let scale = window.innerWidth < 1000 ? 1.5: 2.3;
        if(window.innerWidth >= 800 && window.innerWidth < 1000) scale = 2.5;
        if(window.innerWidth > 1500) scale = 1.7;
        Gsap.to(this.word.current, 0, {
            scale: 1 + (scale - scale * percentageX),
            ease: Power4.easeOut
        })
    }

    render() {
        return (
            <div className="intro">
                <div className="intro-container">
                    <div ref={this.word} className="word">
                        <p onMouseOver={() => {console.log("hover")}} >Johnny Ngov</p>
                        <Circle />
                        {/* <svg onMouseOver={() => {console.log("hover svg")}}className="svg" xmlns="http://www.w3.org/2000/svg" width="525" height="156.2" viewBox="0 0 525 156.2"><path  d="M261.9,34.5q57.5-5.4,115-6.8c19.2-.5,38.3-.7,57.4-.5,16,.1,32.2-.2,47.9,2.7,13,2.5,26.7,7.4,34.4,18.8s6.1,28.8-1.5,41.1-22.6,22.1-36.9,28.3-32.7,11.6-49.4,15.9c-34.3,8.9-69.5,14.2-104.8,16.9a916.2,916.2,0,0,1-107.4,1.3c-36.1-1.4-72.1-4.5-108-8.1-18-1.9-36-3.8-54-5.9-7.9-.9-15.8-1.6-23.6-3.2s-14.3-3.8-19.9-8.6c-12.8-11.2-8.7-29.7,1.2-41.3,5.4-6.4,12.1-11.4,19-16s14.6-9.3,22.1-13.6A567.9,567.9,0,0,1,149,11.2c8.2-2.9,16.5-5.7,24.8-8.2,1.9-.6,1.1-3.5-.8-2.9A583.8,583.8,0,0,0,72.1,41.7C56.3,50,40.5,58.9,25.9,69.2,13.3,78.1,1.1,90,.1,106.3A26.7,26.7,0,0,0,6.5,126c4.6,5.3,11.1,8.4,17.7,10.4s14.9,3.1,22.4,3.9l27.8,3.1c37.4,4.2,74.7,7.9,112.2,10.3s74.4,3.3,111.6,1.7,73.2-5.6,109.1-13.2a483.3,483.3,0,0,0,53.1-14.3c15.5-5.1,31.1-11.3,43.9-21.6S524.2,83.6,525,68.6s-6.7-26.2-18.6-33.3S479.7,25.9,465.9,25c-18.3-1.3-36.7-1-54.9-.9q-60,.3-119.7,4.9c-9.8.7-19.6,1.6-29.4,2.5-1.9.2-1.9,3.2,0,3Z"/></svg> */}
                    </div>
                </div>
            </div>
        )
    }
}
