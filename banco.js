const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();


const app = express();

app.use(express.json());

const host = process.env.LOCALHOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

// Conectar ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.stack);
    return;
  }
  console.log('Conexão estabelecida com o MySQL');
});


// Rotas do Express.js

app.get('/listar', (req, res) => {
  connection.query(`SELECT * FROM clientes`, (err, rows) => {
    if (err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
    
    res.send(rows);
  })
})

app.post('/adicionar', (req, res) => {
    const { nome } = req.body;
    const { sobrenome } = req.body;
    const { email } = req.body;
    const { idade } = req.body;

    connection.query(`INSERT INTO clientes(nome,sobrenome,email,idade) VALUES ('${nome}', '${sobrenome}', '${email}', '${idade}')`, 
    (err, rows) => {
    if (err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
    
    res.send(rows);
  });
});

app.delete('/:id', (req, res) => {
  const { id } = req.params
  connection.query(`DELETE FROM clientes WHERE id = '${id}'`, (err, rows) => {
    if (err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
    
    res.send(rows);
  })
})

// Iniciar o servidor
app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});