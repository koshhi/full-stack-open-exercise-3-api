const express = require ('express')
const app = express()
const cors = require('cors')

const logger = require("./loggerMiddleware")

app.use(cors())
app.use(express.json())
app.use(logger)


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Ruta para obtener la lista de personas
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// Ruta para obtener la información
app.get('/info', (req, res) => {
    const count = persons.length;
    const currentTime = new Date();

    res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${currentTime}</p>
    `);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`);
})