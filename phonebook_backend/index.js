const express = require('express');
const app = express();
app.use(express.json());

let phonebookData = [
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
];

app.get('/api/persons', (request, response) => {
    response.json(phonebookData);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    // console.log('id: ', id, typeof id)
    const person = phonebookData.find(p => p.id === id);
    // console.log('person: ', person)

    person ? response.json(person) : response.status(404).end();
});

app.get('/info', (request, response) => {
    const numEntries = Number(phonebookData.length);
    console.log('numEnt: ', numEntries)

    const currTime = new Date();
    console.log('currTime: ', currTime)

    response.send(`<p>Phonebook has info for ${numEntries} people.</p><p>${currTime}</p>`)
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    // remove the person object with the same id as in request.params via filtering
    phonebookData = phonebookData.filter(p => p.id !== id);

    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);