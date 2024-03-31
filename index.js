
const express = require('express');
const mongoDB = require('./db');
const User = require('./models/UserSchema');
const User2 = require('./models/UserSchema2');
const attdce=require('./models/attendanceSchema');
const Alloted=require('./models/AllotedSchema')
const Room=require('./models/Room');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const app = express();
const port = 5000;

// Connect to MongoDB
mongoDB();

// Enable CORS

const express = require('express')
 const mongoDB=require('./db');
 const User=require('./models/UserSchema')
const cors=require('cors');
const app = express()
const port = 5000
//dta
 mongoDB();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);


app.use(express.json());

// //-------- Multer configuration for file uploads------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './files';
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });
// 



//-----------------/multer-------------------------------------
//-------------- Route to handle user registration----------------
app.post('/register', upload.fields([{ name: 'IncomeCertificate', maxCount: 1 }, { name: 'Adhar', maxCount: 1 }]), async (req, res) => {
  console.log(req.file);
  const {
    Name, PhoneNo, EmergencyPhoneNo, Gender, Degree, AdmNo, YearOfStudy, Branch, PAddress1,
    PAddress2, PPincode, PDistrict, PState, PCountry, RAddressLine1, RAddress2, RPincode, RDistrict, RState, RCountry,
    Income, GName, GPhoneNo, Relation, GAddress1, GAddress2, GPincode, GDistrict, GState, GCountry,Priority
  } = req.body;

  // const IncomeCertificate = req.file ? path.join('files', req.file.filename) : '';
  // const Adhar = req.file ? path.join('files', req.file.filename) : '';

  try {
    const StudentInfo = await User.create({
      Name, PhoneNo, EmergencyPhoneNo, Gender, Degree, AdmNo, YearOfStudy, Branch, PAddress1,
      PAddress2, PPincode, PDistrict, PState, PCountry, Adhar: req.files['Adhar'][0].filename, RAddressLine1, RAddress2, RPincode, RDistrict, RState, RCountry,
      Income, IncomeCertificate: req.files['IncomeCertificate'][0].filename, GName, GPhoneNo, Relation, GAddress1, GAddress2, GPincode, GDistrict, GState, GCountry,Priority
    });
    res.json(StudentInfo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error(error);
  }
});
// Route to copy user registration data to another schema
app.post('/copyregister', async (req, res) => {
  try {
    
    const { Date, Name, PhoneNo, EmergencyPhoneNo, Gender, Degree, AdmNo, YearOfStudy, Branch, PAddress1, PAddress2, PPincode, PDistrict, PState, PCountry, RAddressLine1, RAddress2, RPincode, RDistrict, RState, RCountry, Income, GName, GPhoneNo, Relation, GAddress1, GAddress2, GPincode, GDistrict, GState, GCountry, Priority } = req.body;

    // Ensure that IncomeCertificate and Adhar are provided
    
    const newData = await User2.create({
      Date, Name, PhoneNo, EmergencyPhoneNo, Gender, Degree, AdmNo, YearOfStudy, Branch, PAddress1, PAddress2, PPincode, PDistrict, PState, PCountry,
      RAddressLine1, RAddress2, RPincode, RDistrict, RState, RCountry, Income, GName, GPhoneNo, Relation, GAddress1, GAddress2, GPincode, GDistrict, GState, GCountry, Priority,

    });

    res.status(200).json({ message: 'Data copied to another schema successfully' });
  } catch (error) {
    console.error('Error copying data to another schema:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//---------------/userReg-------------------------------------
app.use("/files",express.static("files"));
app.get("/getfiles",async(req,res)=>{
  try{
    User.find({}).then((data)=>{res.send({status:"ok",data:data});});
  }
  catch(error){}
})


// Route to fetch user data
app.get('/fetch', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error(error);
  }
});
// ---------------attendane---------------

app.get('/attendance', async (req, res) => {
  try {
    const students = await User.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/attendance', async (req, res) => {
  const{Name,Date,present}=req.body;
  // Assuming req.body contains attendance data
  try {
    const AttendanceInfo = await attdce.create({
      Name, Date,present
    });
    res.json(AttendanceInfo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error(error);
  }
});
// ----------------user------------------------------
// app.post('/allot', async (req, res) => {
//   try {
//     const { studentId,Room_No} = req.body;

//     // Find the student by ID in the Student schema
//     const student = await User.findById(studentId);
//     // const room=await Room.findById(Room_No);

//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
//     const room = await Room.findOne({ Room_No });
//     if (!room) {
//       return res.status(404).json({ error: 'Room not found' });
//     }

//     // Create a new document in the AllottedStudent schema
//     const allottedStudent = new Alloted({
//       Name: student.Name,
//       AdmNo:student.AdmNo,
//       password:student.PhoneNo,
//       Room_No: room.Room_No,
//       // Copy other fields as needed
//     });

//     // Save the allotted student to the database
//     await allottedStudent.save();
//     // student.room=room.Room_No;
//     // await student.save();
//     // await room.save();
//     return res.status(200).json({ message: 'Student details stored successfully in allotted schema' });
//   } catch (error) {
//     console.error('Error storing student details in allotted schema:', error.message);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });
// Route to handle allotting a room to a student
app.post('/allot', async (req, res) => {
  try {
    const { studentId } = req.body;

    // Find the student by ID in the User schema
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Find an available room
    const availableRoom = await Room.findOne({ availability: true, capacity: { $gt: 0 } });
    if (!availableRoom) {
      return res.status(400).json({ error: 'No available rooms' });
    }

    // Create a new document in the Alloted schema
    const allottedStudent = new Alloted({
      Name: student.Name,
      AdmNo:student.AdmNo,
      PhoneNo:student.PhoneNo,
      password:student.PhoneNo,
      Degree:student.Degree,
      AdmNo:student.AdmNo,
      YearOfStudy:student.YearOfStudy,
      Branch:student.Branch,
      PAddress1:student.PAddress1,
      PAddress2:student.PAddress2,
      PPincode:student.PPincode,
      PDistrict:student.PDistrict,
      PState:student.PState,
      PCountry:student.PCountry,
      Room_No: availableRoom.Room_No,
      GName:student.GName,
      GPhoneNo:student.GPhoneNo,
      Relation:student.Relation 
      // Add other fields from the user and room schemas as needed
    });

    // Save the allotted student to the database
    await allottedStudent.save();

    // Update student's room number in the User schema
    student.roomNo = availableRoom.Room_No;
    await student.save();

    // Update room details
    availableRoom.availability = false; // Set availability to false
    availableRoom.capacity--; // Decrement room capacity
    availableRoom.copystudents.push(studentId); // Add student to the room's list of students
    await availableRoom.save();
    


    await User.deleteOne({ _id: studentId });

    return res.status(200).json({ message: 'Room allotted successfully', roomNo: availableRoom.Room_No });
  } catch (error) {
    console.error('Error allotting room to student:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle room allocation
// app.post('/allocate-room', async (req, res) => {
//   try {
//     const { studentId } = req.body;
//     const student = await User.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     // Find available rooms based on student's year of study
//     const availableRooms = await Room.find({ availability: true, capacity: { $gt: 0 } });

//     // Logic to select the appropriate room based on the student's year of study
//     // You need to implement this logic based on your requirements

//     if (availableRooms.length === 0) {
//       return res.status(400).json({ error: 'No available rooms' });
//     }

//     const selectedRoom = availableRooms[0]; // For demonstration, selecting the first available room

//     // Update room details
//     selectedRoom.copystudents.push(studentId);
//     selectedRoom.capacity--; // Decrement room capacity
//     if (selectedRoom.capacity === 0) {
//       selectedRoom.availability = false; // Set availability to false if room is full
//     }
//     await selectedRoom.save();

//     // Update student's room details
//     student.room = selectedRoom.Room_No; // Assuming 'room' is a field in the User schema
//     await student.save();

//     return res.status(200).json({ message: 'Room allocated successfully', roomNo: selectedRoom.Room_No });
//   } catch (error) {
//     console.error('Error allocating room:', error.message);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });
 

// ------------------------------
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
