import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/home/nav';
import Intro from '../components/home/intro';
import Description from '../components/home/description';
import { animate } from 'framer-motion';
import { createRef, useRef, useEffect, useState } from 'react';
import Gsap, { Power4 } from 'gsap';
import Projects from '../components/home/projects';
const projects = [
  {
    src: "hf.jpg",
    x: 0.15,
    y: 0.55,
    color: "#395746",
    date: "2019"
  },
  {
    src: "hfnike.jpg",
    x: 0.6,
    y: 0.15,
    color: "#887973",
    date: "2020"
  },
  {
    src: "hfshoes.jpg",
    x: 0.5,
    y: 0.5,
    color: "#3B302C",
    date: "2021"
  },
  {
    src: "larueinspire.jpg",
    x: 0.1,
    y: 0.1,
    color: "#656987",
    date: "2020"
  }
]

export default function Home() {

  const intro = createRef();
  const home = createRef();
  let bufferEl;

  useEffect(() => {
    animate()
  }, [])

  const animate = () => {
    requestAnimationFrame(animate);
    animateBuffer()
    if(intro.current != null) intro.current.animate();
  }

  const animateBuffer = () => {
    if(!home.current || !bufferEl) return;
    const top = home.current.getBoundingClientRect().top;
    const offset = window.innerWidth * 0.07;
    let value = top/10;
    if(value < -40){
      value = -40
    }
    else if(value > -2){
      value = 0
    }
    Gsap.to(bufferEl, 0, {borderRadius: 0 - value + "%"})
  }

  const setBuffer = (buffer) => {
    console.log("set buffer", buffer);
    bufferEl = buffer
  }

  const [bufferState, setBufferState] = useState(false);

  return (
    <div className="main">
      <Intro ref={intro}/>
      <div ref={home} className="home">
          {/* <Nav /> */}
          <Description setBuffer={setBuffer} bufferState={bufferState}/>
          <Projects setBuffer={setBufferState} projects={projects}/>
      </div>
      <div style={{height:"120vh", backgroundColor:"black"}}>
        <p>La suite</p>
      </div>
    </div>
  )
}
