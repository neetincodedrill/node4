var express = require("express");
var router = express.Router();
var db = require("../db");
var dbo = db.getDb();
const multer = require("multer");
const { dataValidation, emailformatvalidation } = require("./validation");

//collection name
const userinfo = dbo.collection("info");
const addressinfo = dbo.collection("address");

// storing file in upload folder and changing path name
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer to upload file in uploads folder
const maxSize = 1 * 1024 * 1024; //for 1 MB
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: maxSize },
}).single("file");

//routes
//get request to get all the user data with their address
router.get("/", async (req, res, next) => {
  const allUser = await userinfo.find({}).toArray();
  // console.log(allUser)
  const data = await Promise.all(
    allUser.map(async (element) => {
      const allAddress = await addressinfo
        .find({ email: element.email })
        .toArray();
      const info = {
        user: element,
        address: allAddress,
      };
      return info;
    })
  );
  res.status(200).send(data);
});

//post request to post user data
router.post("/", async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("File too large should be less than 1 MB");
    }else if (err) {
      return res
        .status(400)
        .send("Only .png, .jpg and .jpeg format filetype  allowed!");
    }else{
        const filepath = req.file.path;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const gender = req.body.gender;
        const email = req.body.email;
        const country = req.body.country;
        const state = req.body.state;
        const city = req.body.city;
        const zip = req.body.zip;
        const country1 = req.body.country1;
        const state1 = req.body.state1;
        const city1 = req.body.city1;
        const zip1 = req.body.zip1;

        var fieldValidation = [
        dataValidation(first_name, last_name, zip, zip1),
        emailformatvalidation(email),
        ];

        const data = {
            filepath: filepath,
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            email: email,
        };

        const address1 = [
            {
            country: country,
            state: state,
            city: city,
            zip: zip,
            },
            {
            country: country1,
            state: state1,
            city: city1,
            zip: zip1,
            }
        ];

        const addressData = {
            email: email,
            address: address1,
        };

        try {
        // to prevent create user with already exits email id
        const emailduplication = await userinfo.findOne({ email: email });
        //to prevent create address with already exits email id
        const addressDuplication = await addressinfo.findOne({ email: email });
        const error = [];
        if (emailduplication && addressDuplication) {
            res.status(400).send("User with same emailid already exits");
        } else {
            if (fieldValidation[0] === true && fieldValidation[0] === true) {
            const newUser = await userinfo.insertOne(data);
            const userAddress = await addressinfo.insertOne(addressData);
            res.status(201).send("New user created");
            } else {
            fieldValidation.forEach((element) => {
                if (typeof element === "string" || typeof element === false) {
                error.push(element);
                }
            });
            res.status(400).send(error);
            }
        }
        } catch (err) {
        console.log(err);
        }
    }
  });
});

module.exports = router;
