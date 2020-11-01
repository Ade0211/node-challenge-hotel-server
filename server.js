const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
let bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

app.get("/bookings", function (request, response) {
  response.json(bookings);
});



//CREATE
app.post("/bookings", function (req, res) {
  let newBooking = req.body
  // let newBooking = {
  //   // id:req.body.id,
  // title:req.body.title,
  // firstName:req.body.firstName,
  //   surname:req.body.surname,
  //   email:req.body.email,
  //   checkInDate:req.body.checkInDate,
  //   checkOutDate:req.body.checkOutDate
  // }
  // newBooking.timeSpent = new Date().toISOString();
  let newId = Math.max.apply(null, bookings.map(x=> x.id))+ 1;
  let newRoomId = Math.max.apply(null, bookings.map(x=> x.roomId)) + 1;
  newBooking.id =newId;
  newBooking.roomId = newRoomId;
  console.log(newBooking)
    if (Object.keys( newBooking).length === 0){ 
    res.send({status:400})
  }else{ 
    bookings.push(newBooking);
    res.json(bookings)
  }

});

//READ ONE BOOKING BY ID
app.get("/bookings/:id", function (req, res) {
 const {id} = req.params
 const myBookings = bookings.find(e=> e.id == id);
  myBookings? res.json(myBookings): res.send("data not found");
});

//DELETE A BOOKING BY ID
app.delete("/bookings/:id", function (req, res) {
  const {id}= req.params;
 bookings= bookings.filter(e=> e.id !=id);
  res.send(bookings);
 res.send("single album deleted")
});



// TODO add your routes and helper functions here
const listener = app.listen(8000, function () {
  console.log("Your app is listening on port 8000");
});
