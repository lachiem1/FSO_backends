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
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function(val) {
                const phoneNumberParts = val.split('-');
                let phoneNumLength = 0;
                phoneNumberParts.forEach(element => {
                    phoneNumLength += element.length;
                });
                console.log(phoneNumLength)
                console.log('parts test: ', phoneNumberParts.length, '\n\n')
                
                return phoneNumLength >= 8 && phoneNumberParts.length === 2;
            }
        },
        required: true
    }, 
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