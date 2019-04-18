import React, {Component} from 'react';
export class Registr extends Component{
    render(){
        return(
            <form style={{display:'flex', flexDirection:'column' , width: '300px'}}>
                <label htmlFor="chek1">login</label>
                <input id="chek1"/>

                <label htmlFor="chek2">password</label>
                <input id="chek2"/>

                <label htmlFor="chek3">confirmation password</label>
                <input id="chek3"/>

                <button>send</button>
            </form>
        )
    }
}