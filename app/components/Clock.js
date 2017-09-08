import React, { Component } from 'react';

export default class Clock extends Component {
    constructor(props){
        super(props);
        this.time = new Date();
        this.updater = null;
    }
    componentDidMount(){
        this.updater = setInterval(()=>{this.time = new Date()}, 500);
    }
    componentWillUnmount(){
        this.updater = null;
    }
    render(){
        return (
            <div>
                {this.time.getHours()+" : "+this.time.getMinutes()+" : "+this.time.getSeconds()}
            </div>
        )
    }
}
