const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

require('dotenv').config();

const Person = require('./models/person');

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {

        response.json(people);
    });
});

app.get('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id);
    // // console.log('id: ', id, typeof id)
    // const person = phonebookData.find(p => p.id === id);
    // // console.log('person: ', person)

    // person ? response.json(person) : response.status(404).end();

    Person.findById(request.params.id).then(person => {
        response.json(person);
    });
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


app.post('/api/persons', (request, response) => {
    const body = request.body;

    // check if name already exists in phonebook:
    // let nameAlreadyExists;
    // if (body.name) {
    //     nameAlreadyExists = phonebookData.some((entry) => entry.name.toLowerCase() === body.name.toLowerCase());
    //     console.log('nameAlreadyExists: ', nameAlreadyExists)
    // }
    // else {
    //     nameAlreadyExists = false;
    // }

    if (!body.name) {
        return response.status(400).json({
            error: 'name-missing'
        });
    }
    else if (!body.number) {
        return response.status(400).json({
            error: 'number-missing'
        })
    }
    // else if (nameAlreadyExists) {
    //     return response.status(400).json({
    //         error: 'name-already-exists'
    //     });
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    });
    
    person.save().then(savedPerson => {
        response.json(savedPerson);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });