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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person);
            }
            else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.get('/info', (request, response, next) => {
    let numEntries;

    Person.find({})
        .then(numPeople => {
            // console.log('numPeople variable: ', numPeople.length, typeof numPeople)
            numEntries = numPeople.length;
            // console.log('\n\nnumEntries: ', numEntries);
            response.send(`<p>Phonebook has info for ${numEntries} people.</p><p>${currTime}</p>`)
        })
        .catch(error => next(error));

    const currTime = new Date();
    console.log('currTime: ', currTime)
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({error: 'name-missing'});
    }
    else if (!body.number) {
        return response.status(400).json({error: 'number-missing'});
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    });

    console.log('newPerson: ', newPerson);

    newPerson.save()
        .then(savedPerson => {
            response.json(savedPerson);
        })
        .catch(error => next(error)); 
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });

const unknownEndpoint = (request, response) => {
response.status(404).send({error: 'unknown endpoint'});
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
console.error(error.message)

if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
}
else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
}

next(error);
};

app.use(errorHandler);