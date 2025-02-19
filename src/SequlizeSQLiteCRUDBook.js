const express = require('express');
const sequelize = require('sequelize');
const Sequelize = require('sequelize');
const app = express()
app.use(express.json());
const sequelize = new sequelize('database' , 'username' , 'password',{
    host: 'localhost',
    dialect: 'sqlite',
    Storage: './Database/2QBooks.sqlite'
});
const Book = sequelize.define('book',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
sequelize.sync();
app.get('/books',(req,res)=>{
    Book.findAll().then(books => {
        res.json(books);
    }).catch(err => {
        res.status(500).send(err);
    });
});
app.get('/books/:id',(req,res) =>{
    Book.findByPk(req.params.id).then(book =>{
        if (!book){
            res.status(404).send('Book not found');
        } else{
            res.json(book);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});
app.post('/books',(req,res)=>{
    Book.create(req.body).then(book =>{
        res.send(book);
    }).catch(err=>{
        res.status(500).send(err);
    });
});