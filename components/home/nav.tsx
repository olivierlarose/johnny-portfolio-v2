import React, { Component } from 'react'
import Matter from 'matter-js';

const elements = [
    {
        name: 'instagram',
        src: './images/instagram_pod.png',
        x: 0.25,
        y: -500
    },
    {
        name: 'contact',
        src: './images/contact_pod.png',
        x: 0.65,
        y: -800
    }
]

export default class nav extends Component {

    private container;
    private width;
    private height;

    componentDidMount(){
        const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Events = Matter.Events,
        Composite = Matter.Composite,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Bodies = Matter.Bodies;

        this.width = this.container.getBoundingClientRect().width;
        this.height = this.container.getBoundingClientRect().height;
        const height = this.height;
        const width = this.width;
        //Create and run renderer
        const engine = Engine.create();
        const runner = Runner.create();
        const render = Render.create({
            element: this.container,
            engine: engine,
            options: { 
                width, 
                height,
                wireframes: false,
                background: "transparent",
            }
        })
        Render.run(render);
        Runner.run(runner, engine);

        //Add walls and ground
        const wallRight = Bodies.rectangle(width+6, height/2, 10, height, { 
            isStatic: true 
        })
        const wallLeft = Bodies.rectangle(-6, height/2, 10, height, {
            isStatic: true 
        });
        const ground = Bodies.rectangle(width/2, height+6, width, 10, {
             isStatic: true,
        });
        Composite.add(engine.world, [wallRight, wallLeft, ground]);

         //add letters
         let scale = width > 600 ? 0.18 : 0.125;
         if(width > 1400){
             scale = 0.22;
         }
         const bodies = [];
         elements.forEach( ({ name, src, x, y }) => {
             const img = new Image();
             img.onload = () => {
                 const imageHeight = img.height;
                 const imageWidth = img.width;
                 const mass = img.width / 100;
                 const angle = 0.2 * Common.choose([1, -1]);
                 const label = name
                 const letter = Bodies.rectangle(width * x, y, imageWidth * scale, imageHeight * scale, {
                     mass, 
                     angle, 
                     label,
                     render: {
                         sprite: {
                             texture: src,
                             xScale: scale,
                             yScale: scale
                         }
                     }
                 })
                 bodies.push(letter);
                 Composite.add(engine.world, letter);
             }
             img.src = src
         })

         //Add mouse
        const mouse = Mouse.create(document.documentElement);
        render.mouse = mouse;

        var mConstraint;
        mConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                render: {
                    visible: false
                }
            }
        });
       Matter.World.add(engine.world, mConstraint);
       
       Matter.Events.on(mConstraint, 'mousemove', function (event) {
          //For Matter.Query.point pass "array of bodies" and "mouse position"
          const mousePosition = {
              x: event.mouse.position.x,
              y: event.mouse.position.y 
          }
          var foundPhysics = Matter.Query.point(bodies, mousePosition);
         if(!foundPhysics[0]){
             if(document.body.style.cursor == "pointer"){
                 document.body.style.cursor = "default";
             }
             return;
         }
         document.body.style.cursor = "pointer";
        //  console.log(foundPhysics[0].label); //returns a shape corrisponding to the mouse position
       });

       Matter.Events.on(mConstraint, 'mousedown', function (event) {
        //For Matter.Query.point pass "array of bodies" and "mouse position"
        const mousePosition = {
            x: event.mouse.position.x,
            y: event.mouse.position.y 
        }
        var foundPhysics = Matter.Query.point(bodies, mousePosition);
        const body = foundPhysics[0];
        if(!body){
           return;
        }
        const mouse = {
            x: event.mouse.mousedownPosition.x,
            y: event.mouse.mousedownPosition.y 
        }

        const pod = {
            x: body.position.x,
            y: body.position.y,
            width: body.bounds.max.x - body.bounds.min.x,
            height: body.bounds.max.y - body.bounds.min.y
        }
        // console.log(mouse, pod); //returns a shape corrisponding to the mouse position

        if(mouse.x > pod.x - pod.width * 0.36 && mouse.x < pod.x + pod.width * 0.36){
            if(mouse.y > pod.y - pod.height * 0.1 && mouse.y < pod.y + pod.height * 0.1){
                switch(body.label){
                    case "instagram":
                        window.open("https://www.instagram.com/johnny_ngov/",'_blank');
                        break;
                    case "contact":
                        window.location.href = "mailto:ngovjohnny@gmail.com?";
                        break;
                }
            }
        }
     });

     window.addEventListener('resize', () => { 
        render.bounds.max.x = window.innerWidth;
        render.bounds.max.y = window.innerHeight;
        render.options.width = window.innerWidth;
        render.options.height = window.innerHeight;
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        const prevWidth = this.width;
        const prevHeight = this.height;
        this.height = window.innerHeight;
        this.width = window.innerWidth;

        Matter.Body.setPosition(wallRight,{x: this.width+6, y: this.height/2})
        Matter.Body.setPosition(wallLeft,{x: -6, y: this.height/2})
        Matter.Body.setPosition(ground,{x: this.width/2, y: this.height+6})
        Matter.Body.scale(ground, this.width / prevWidth, 1);

      });

      window.addEventListener('scroll', (e) => {
          const offset = {
              x: 0,
              y: -1 * window.scrollY
          }
          Matter.Mouse.clearSourceEvents(mouse);
          Matter.Mouse.setOffset(mouse, offset)
      })

    }

    render() {
        return (
            <div className="nav">
                <div ref={ref => {this.container = ref}} className="main"></div>
            </div>
        )
    }
}
