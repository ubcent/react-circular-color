import  React, { Component } from 'react';
import CircularColor from '../../src';

export default class CustomizedHandle extends Component{

    renderHandle = ({ onHandleDown, cx, cy, handleRadius }) => {
        return(
            <svg x={cx-10} y={cy-10} width={20} height={20} > 
            <polygon points={'10,0 0,20 20,20'} fill="#fff" />
            </svg>
        );
    }

    render(){
        return(
            <CircularColor
                size={200}
                renderHandle={this.renderHandle}
            />
        );
    }

}