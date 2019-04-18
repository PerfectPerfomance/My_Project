import React, {Component} from 'react';
export class Login extends Component{

    // handleClick = (e) => {  e.preventDefault(); console.log('HERERERER')}

    render(){
        return(
            <form style={{display:'flex', flexDirection:'column' , width: '300px'}}>
                <label htmlFor="chek1">login</label>
                <input id="chek1"/>

                <label htmlFor="chek2">password</label>
                <input id="chek2"/>
                <button onClick={this.handleClick}>send</button>
            </form>
        )

}}