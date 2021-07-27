import React, { Component } from 'react'

export default class projects extends Component<{projects}> {
    
    constructor(props){
        super(props);

    }

    componentDidMount(){
        console.log(this.props);
    }

    render() {
        return (
            <div className="projects">
                {
                    this.props.projects.map( (project) => {
                        return <div className="project">
                            <img src={`/images/${project.src}`}></img>
                        </div>
                    })
                }
            </div>
        )
    }
}
