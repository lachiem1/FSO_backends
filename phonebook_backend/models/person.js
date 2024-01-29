const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: Number, 
});

personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        if (returnedObj) {
            returnedObj.id = returnedObj._id.toString();
            delete returnedObj._id;
            delete returnedObj.__v;
        }
    }
});

module.exports = mongoose.model('Person', personSchema);