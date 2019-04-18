var express = require('express');
var app = express();
const cors = require('cors');
var Sequelize = require('sequelize');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const sequelize = new Sequelize({
  database: 'test_d2',
  username: 'root',
  password: '12345',
  dialect: 'mysql'
});

const Ingridient = sequelize.define('ingridient', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  type: Sequelize.STRING,
  units: Sequelize.ENUM("KG", "LITER"),
  quantity: Sequelize.FLOAT,
  price: Sequelize.FLOAT
});

const Recipe = sequelize.define('recipe' , {
    title: Sequelize.STRING,
    description: Sequelize.STRING
});

const Coupling = sequelize.define('Coupling', {
    status: Sequelize.STRING
});

Recipe.belongsToMany( Ingridient, {
    through: Coupling
});

Ingridient.belongsToMany(Recipe, {
    through:Coupling
});


var schema = buildSchema(`
    type Query {
        getIngridient(id: Int!): Ingridient
        getIngridients:[Ingridient]
        getRecipe(id: Int!): Recipe
        getRecipes:[Recipe]
    }
    
    type Mutation {
        createIngridient(description: String!, title: String!, text: String!, units: String!, quantity: String!, price: String!):Ingridient
        updateIngridient(id: Int!, description: String, title: String, text: String, units: String, quantity: String, price: String):Ingridient
        createRecipe(description: String!, title: String!):Recipe
        updateRecipe(id: Int!, description: String!, title: String!):Recipe
    }
     
    type Ingridient {
        id: Int
        description: String
        title: String
        units: String
        quantity: String
        price: String
    }
    type Recipe {
        id: Int
        description: String
        title: String
    }
    
    type RecipeIngridient{
        id: Int
        title: Int
    }
`);

async function getIngridient({id}){
  let ingridient = await Ingridient.findById(id)
    return ingridient;
}

async function getIngridients(){
  return await Ingridient.findAll({})
}

async function createIngridient({description, title, text, units, quantity, price }){
   let ingridient = await Ingridient.create({
    description,
    title,
    units,
    quantity,
    price
  });
   return ingridient
    }
async function updateIngridient({id, description, title, text, units, quantity, price}) {
    let ingridient = await Ingridient.findById(id)
    ingridient.description = description,
    ingridient.title = title,
    ingridient.text = text,
    ingridient.units = units,
    ingridient.quantity = quantity,
    ingridient.price = price

    await ingridient.save ();
    return ingridient;
};

var root = {
  getIngridient,
  getIngridients,
  createIngridient,
    updateIngridient,
    getRecipe,
    getRecipes,
    createRecipe,
    updateRecipe,


};

async function getRecipe({id}){
    let recipe = await Recipe.findById(id)
    console.log(recipe);
    return recipe;
}

async function getRecipes(){
    return await Recipe.findAll({})
}

async function createRecipe({description, title, text, }){
    let recipe = await Recipe.create({
        description,
        title,
    });
    return recipe
}
async function updateRecipe({id, description, title, text, }) {
    let recipe = await Ingridient.findById(id)
    recipe.description = description,
        recipe.title = title,

    await recipe.save ();
    return recipe;
};



app.use(cors());
//middleware связь графа с экспресом

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

sequelize.sync();

app.get('/', function (req, res) {
    res.send('Запустился')
});

app.post('/', function (req, res) {
    res.send('сохранил')
});


app.listen(4000,() => {
} );

