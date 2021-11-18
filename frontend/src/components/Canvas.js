import React, { Component } from "react";


export default class Controls extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            active: false,
        };
    }

    render(){
        return(
            <div>
                <div id="sketch">
                    <canvas id="paint"></canvas>
                </div>
                
            </div>
        );
    }


}