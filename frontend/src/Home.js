import React, { Component } from 'react';
import Controls from './components/Controls'
import Canvas from './components/Canvas'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    } 

    render() {
        return (
            <div className="container" id="home-title">
                <div className="row text-center justify-content-center">
                    <div className="col my-4">
                        <Controls />  
                        <Canvas />                                              
                    </div>                    
                </div>
            </div>
        );
    }
}

export default Home;