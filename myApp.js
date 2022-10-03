const { type } = require('express/lib/response');
let mongoose =  require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
              .then(() => console.log("Connection Established !"))
              .catch((err) => console.log("Connection Fails !", err.message));


let personSchema = mongoose.Schema({
  name : {type:String,required: true},
  age : {type:Number},
  favoriteFoods : {type: [String]}
})

const Person = mongoose.model('Person',personSchema)

//Install and Set Up Mongoose
let john = new Person({name:'John Doe', age:45,favoriteFoods:['Soya meat']})
let soda = new Person({name:'John Hing', age:45,favoriteFoods:['Pizza','Buger']})
arrayOfPeople = [john,soda]


const createAndSavePerson = (done) => { 
  let john = new Person({name:'John Doe', age:45,favoriteFoods:['Soya meat']})
  john.save((err,data)=>{
    if (err) return console.error(err);
    done(null, data);
  })  
};

const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, (err, data) => {
    if(err) {
       done(err); 
    }
  done(null, data);
  }) 
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err, docs)=>{
    if(err){
      return done(err);
    }
    done(null, docs);
  })  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,docs)=>{
    if(err){
      return err;
    }
    done(null,docs)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,doc)=>{
    if(err){
      return err;
    }
    done(null ,doc);
  })  
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId,(err,doc)=>{
    if(err)
      return err;
      doc.favoriteFoods.push('hamburger')
      doc.save((error,data)=>{
      if (error) return console.err(error)
      done(null ,data);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new: true},(err,doc)=>{
    if(err) console.error(err);
    done(null ,doc);
  })  
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
