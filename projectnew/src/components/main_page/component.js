import React, {Component} from 'react';
import { GraphQLClient } from 'graphql-request';
// import axios from 'axios';

const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} });
export class MainPage extends Component{
    componentDidMount() {

        gql.request(`query getI{
        getIngridients{
                id,
                title,
                description

        }}`, {}).then(data=> this.setState({ingridientsList: data.getIngridients}));

        let promise = fetch('http://localhost:4000/user_form', {
            method:'post'
        });

    };

    constructor(props){
        super(props);
        this.state = {
            ingridientsList:[],
            recipeName: null,
            recipeDescription: null,
            RecipeIngridients: [{quantity: 0, ingridientId: null}]
        }
    };

    handleSubmit = (e) => {
            e.preventDefault();
        const {
            recipeDescription,recipeName,
        } = this.state;
        gql.request(`mutation  createRecipe(
            $title:String!,  $description:String!){
            createRecipe(
                title:$title,description:$description
            )
            {
                title, description
            }}`, {title:recipeName, description:recipeDescription})
            // .then(() => this.props.history.push('/'))
    };

    handleDescription = (e) => {

        this.setState({recipeDescription: e.target.value})
    };

    handleName = (e) => {

        this.setState({recipeName: e.target.value})
    };

    handleAdd = (e) => {
        this.setState({   RecipeIngridients: [...this.state.RecipeIngridients, {quantity: 0, ingridientId: null}]})

    };

    // delete = (e) => {
    //   this.setState( {})
    // };

    render(){
        console.log(this.state, this.props)
        return(
           <div className='fpage'>
               <section className='group_header'>
                   <h1> Мои рецепты</h1>
               </section>
               <div>
                   <form onSubmit={this.handleSubmit}>
                       <input onChange={this.handleName} placeholder="Название"/><br/>
                       <textarea onChange={this.handleDescription} placeholder="описание рецепта"></textarea>
                       <br/>
                       <button onClick={this.handleAdd}>Добавить ингридиенты</button>
                       <button onSubmit={this.handleSubmit}>Отправить</button>
                   </form>
                   {this.state.RecipeIngridients.map(recipeIngridient =>
                       <>
                    <input type="number" value={recipeIngridient.quantity}/>
                       <select>
                           {this.state.ingridientsList ? this.state.ingridientsList.map(ing => <option value={`${ing.id}`}>{ing.title}</option>) : 'loading'}
                       </select>
                           {/*<button onClick={this.delete(index)}>Удалить</button>*/}
                   <br/>
                   </>)}

               </div>
           </div>

        )
    };
}
