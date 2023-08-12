var express = require('express');
var router = express.Router();
// const mongoose = require('mongoose');


// mongoose.connect("mongodb://127.0.0.1:27017/quizDB", {useNewUrlParser: true})
// .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB', err);
//   });

// const quizSchema = new mongoose.Schema({
//   username:  {
//     type: String,
//     required: [true, "Please check your data entry no name entered!"]
//   },
//   english: {type: Number, default: 0},
//   mathematic: {type: Number, default: 0},
//   riddle: {type: Number, default: 0},
//   general: {type: Number, default: 0}
// });

// const Quiz = mongoose.model("Quiz", quizSchema);

// // const newUser = new Quiz ({
// //     username: "Dhee"
// // });

// // newUser.save();

// // Quiz.deleteOne({_id: "644fc807c5dc54f6c1c7e268"}).then(function() {
// //     console.log("Blog Deleted");
 
// // }).catch(function(error){
// //     console.log(error);
// // });

// router.post("/signup", async (req, resp) => {
//     try {
//         const newUser = new Quiz(req.body);
//         let result = await newUser.save();
//         result = result.toObject();
//         if (result) {
//             delete result.password;
//             resp.send(req.body);
//             console.log(result);
//         } else {
//             console.log("User already register");
//         }
 
//     } catch (e) {
//         resp.send("Something Went Wrong");
//     }
// });



router.get("/", function(req, res, next){
    res.send("Sign up page");
});


module.exports = router;