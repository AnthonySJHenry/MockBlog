const { response } = require("express");
const express = require("express");
const hbs = require("hbs");
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
const _ = require('lodash');
const mongoose = require('mongoose');
async function main() {
  await mongoose.connect('mongodb+srv://ah:@cluster0.ihcm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const homeTemplate = ''
const aboutContent = "<p>Created by Anthony Henry</p><p>MERN stack demo</p><p>NOTE: In order to make a post use <b>/scrt/compose</b></p>";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const journalSchema = new mongoose.Schema({
  title: String,
  body: String
})
const Journal = mongoose.model('Journal', journalSchema)


const app = express();

app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', (req, res) =>{
  let journals = Journal.find({});
  console.log(journals)
  res.render('home', {homeBody: "MongoDB, Express, and Node.", journals: journals, })

})

// app.get('/j/:jid', (req, res) =>{ //jid is journal id
//   let jid = req.params.jid;
//   let found = false;
  
//    for(let journal of journals) {
//       if (_.lowerCase(jid) == _.lowerCase(journal.title)){
//       res.render('journal', {title: journal.title, text: journal.text})
//       found = true;
//       break;
//     }
//   }
//   if (!found) {
//     res.redirect('/')
//   }
  
// })

app.get('/about', (req, res) =>{
  res.render('about', {content: aboutContent})
})

app.get('/contact', (req, res) =>{
  res.render('contact', {content: contactContent})
})

app.get('/scrt/compose', (req, res) =>{
  res.render('compose')
})


app.post('/scrt/compose', (req, res) =>{

  let title = req.body.journaltitle;
  let body =  req.body.journalbody;
  let post = new Journal({title: title, body: body});
  post.save(function (err) {
    if (err) console.log(err);
  })

  res.redirect('/')
})











app.listen(3000, function() {
  console.log("Server started on port 3000");
});


