const mongoose = require('mongoose');

if (process.argv.length !== 5) {
    console.log('Incorrect number of args given. Run: node mongo.js <password> <contactName> <contactNum>')
    process.exit(1);
}
const [ nit1 , nit2 , password , contactName , contactNum ] = process.argv;
console.log(contactName, contactNum)
const url = `mongodb+srv://lachiem1:${password}@mongodb-learning.tvusz9q.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number, 
});

const Contact = mongoose.model('Contact', contactSchema);

const contact = new Contact({
    name: contactName,
    number: contactNum,
})

// const contact = new Contact({
//     name: 'myNameJeff',
//     number: 9000009900,
// });

contact.save().then(result => {
    console.log(`Contact ${contactName} succesfully saved!`)
});

Contact.find({}).then(result => {
    console.log('List of contacts currently in db:')
    result.forEach(contact => {
        console.log(contact)
    });
    mongoose.connection.close();
});