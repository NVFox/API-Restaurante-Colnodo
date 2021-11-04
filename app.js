const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

const rutas = require('./rutas/rutas');

//CONFIG (Templates y port)
app.set('port', process.env.PORT || 5000);

//CONFIG (Conexión BD y Sesiones)
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'mysql-andres-tellez.alwaysdata.net',
    user: '247808_andres',
    password: 'sql2415david',
    port: 3306,
    database: 'andres_tellez_sistema'
}, 'single'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

// Rutas globales

app.use('/', rutas)

app.listen(app.get('port'), () => {
    console.log(`En el servidor ${app.get('port')}`)
});