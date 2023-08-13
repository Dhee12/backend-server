var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "coi8338dnd83i3()33383ox$$#32dd2nid3d3dd8dqo3d3)#4483mdjnedud";


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://dheemautin:Nevergiveup2002@cluster12.vgyispf.mongodb.net/quizDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });


//Mongoose Schema
const quizSchema = new mongoose.Schema({
  username:  {
    type: String,
    unique: true,
    required: [true, "Please check your data entry no name entered!"]
  },
  english: {type: Number, default: 0},
  mathematic: {type: Number, default: 0},
  riddle: {type: Number, default: 0},
  general: {type: Number, default: 0},
  totalscore: {type: Number, default: 0}
});


const User = mongoose.model("User", quizSchema);

const questSchema = new mongoose.Schema({
  _id: Number,
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String
});

const Quest = mongoose.model("Quests", questSchema);
const Maths = mongoose.model("Maths", questSchema);
const Riddle = mongoose.model("Riddle", questSchema);
const General = mongoose.model("General", questSchema);




//The Receiving end of the Sign Up.
app.post("/signup", async (req, resp) => {
  const userName  = req.body.Data;
  try {
      const oldUser = await User.findOne({ username: userName }).exec();
      if(oldUser){
         return resp.send({status: "User Already Exist"});
      }
      const newUser = new User({
          username: userName
      });
      await newUser.save();
      resp.send({status:"Ok"});
  } catch (e) {
      resp.send({status:"error"});
  }
});
//GLobal Var Username.
var userName;

// The Receiving end of the sign in Page
app.post("/signin", async (req, resp) => {
    userName  = req.body.Data;
    try {
      const oldUser = await User.findOne({ username: userName }).exec();
      const token = jwt.sign({username: oldUser.username}, JWT_SECRET);
      if(!oldUser){
        return resp.send({status: "User does not exist"});
     }
      if(resp.status(201)){
        return resp.json({status: "Ok", data: token});
      }else {
        return resp.json({status: "error"});
      }
  } catch (e) {
        resp.send({error: "Bad Message"});
    }
});


// The English Question receiving Side.
app.post("/english", async (req, resp) => {
  const questID  = req.body.Num;
  const Score = req.body.score;
  try {
    const question = await Quest.findOne({ _id: questID}).exec();
    await User.findOneAndUpdate({username: userName}, {english: Score}).exec();
    if (!question || question.length === 0) {
      // If no documents are found, return an error
      resp.status(404).json({ message: 'No users found' });
    } else {
      // If documents are found, return them as JSON
        resp.json(question);   
    }
} catch (e) {
      resp.send({error: "Error"});
  }
});



// The Mathematics Question receiving Side.
app.post("/mathematic", async (req, resp) => {
  const questID  = req.body.Num;
  const Score = req.body.score;
  try {
    const question = await Maths.findOne({ _id: questID}).exec();
    await User.findOneAndUpdate({username: userName}, {mathematic: Score}).exec();
    if (!question || question.length === 0) {
      // If no documents are found, return an error
      resp.status(404).json({ message: 'No users found' });
    } else {
      // If documents are found, return them as JSON
        resp.json(question);   
    }
  } catch (e) {
      resp.send({error: "Error"});
  }
});


// The Riddle Question receiving Side.
app.post("/riddle", async (req, resp) => {
  const questID  = req.body.Num;
  const Score = req.body.score;
  try {
    const question = await Riddle.findOne({ _id: questID}).exec();
    await User.findOneAndUpdate({username: userName}, {riddle: Score}).exec();
    if (!question || question.length === 0) {
      // If no documents are found, return an error
      resp.status(404).json({ message: 'No users found' });
    } else {
      // If documents are found, return them as JSON
        resp.json(question);   
    }
  } catch (e) {
      resp.send({error: "Error"});
  }
});


// The General Knowledge Question receiving Side.
app.post("/general", async (req, resp) => {
  const questID  = req.body.Num;
  const Score = req.body.score;
  try {
    const question = await General.findOne({ _id: questID}).exec();
    await User.findOneAndUpdate({username: userName}, {general: Score}).exec();
    if (!question || question.length === 0) {
      // If no documents are found, return an error
      resp.status(404).json({ message: 'No users found' });
    } else {
      // If documents are found, return them as JSON
        resp.json(question);   
    }
  } catch (e) {
      resp.send({error: "Error"});
  }
});


app.get("/leader", async (req, resp) => {
  try {
    const question = await User.find();
    if (!question || question.length === 0) {
      // If no documents are found, return an error
      resp.status(404).json({ message: 'No users found' });
    } else {
      // If documents are found, return them as JSON
        resp.json(question);   
    }
  } catch (e) {
      resp.send({error: "Error"});
  }
});







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
