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

// Ruta para obtener la información de una persona por ID
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).send({ error: 'Person not found' });
    }
});

// Ruta para eliminar una persona por ID
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const initialLength = persons.length;
    persons = persons.filter(person => person.id !== id);

    if (persons.length < initialLength) {
        res.status(204).end(); // 204 No Content si se eliminó
    } else {
        res.status(404).send({ error: 'Person not found' });
    }
});

// Ruta para crear una persona
app.post('/api/persons', (request, response)=>{
    const person = request.body 
    //console.log(person)

    //validación de que la persona tiene numero o nombre
    if (!person || !person.name || !person.number) {
      return response.status(400).json({
        error: 'person.number or name are missing'
      })
    }

    // Validación para comprobar si el nombre y número ya existen
    const entryExists = persons.some(p => p.name === person.name && p.number === person.number);
    if (entryExists) {
        return response.status(400).json({
            error: 'name and number must be unique'
        });
    }

    const ids = persons.map(person => person.id)
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;

    const newPerson = {
      id: maxId + 1,
      name: person.name,
      number: person.number,
    }

    persons = [...persons, newPerson]
    response.status(201).json(newPerson)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`);
})