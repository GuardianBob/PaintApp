import React, { Component } from "react";


export default class Controls extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            active: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(name) {
        this.setState({
            active: name
        })
    }

    render() {        
        return(
            <div className="container">                
                <div className="btn-group btn-group-toggle" data-toggle="buttons" >
                    <input
                        type="button"
                        className={this.state.active === "btn1" ? 'btn btn-secondary active' : 'btn btn-secondary'}
                        value={"Pencil"}
                        onClick={() => this.handleToggle("btn1")}
                        key={ "btn1" } />
                    <input
                        type="button"
                        className={this.state.active === "btn2" ? 'btn btn-secondary active' : 'btn btn-secondary'}
                        value={"Eraser"}
                        onClick={() => this.handleToggle("btn2")}
                        key={ "btn2" } />
            </div>                
            </div>        
        );
    }
}
