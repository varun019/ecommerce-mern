const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const CartItem = require("../models/cart");
//hadle errors

const hadleErrors = (err) => {
  console.log(err.message);
  let errors = {
    email: "",
    password: "",
    username: ""
  };
  // duplicate error code
  if (err.code === 11000) {
    errors.username = "This username is already registered";
    errors.email = "This email is already registered";
    return errors;
  }
  // validation errors
  if (err.message.includes("signup validation failed")) {
    Object.values(err.errors).forEach(({
      properties
    }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({
    id
  }, "secret", {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.send("sign up get request");
};
module.exports.login_get = (req, res) => {
  res.send("login get request");
};
module.exports.signup_post = async (req, res) => {
  console.log(req.body)
  const {
    email,
    password
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      email
    });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    req.body.password = hashedPassword;
    const newUser = new User(req.body);

    await newUser.save();

    res.status(201).json({
      message: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    });
  }
}

const getOTP = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      type: "SMTP",
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: 'varun.saraswat@technostacks.in',
        pass: '#Saraswat@817$'
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const otp = `${Math.floor(100000 + Math.random() * 900000)}`
    const mailOptions = {
      from: 'varun.saraswat@technostacks.in',
      to: email,
      subject: "Verify your email",
      text: `Your OTP is ${otp}`
    }

    transporter
      .verify()
      .then(() => console.log('Connected to email server'))
      .catch(() => console.log('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));

    const newUser = await User.updateOne({
      email: email
    }, {
      $set: {
        otp: otp,
        createAt: Date.now()
      },
    })
    // newUser.save()
    transporter.sendMail(mailOptions, (error, res) => {
      if (error) {
        console.log('error occured', error);

      } else {
        console.log("success", res);

      }
    })
  } catch (error) {
    console.log(error)
  }

}

module.exports.login_post = async (req, res) => {
  const {
    username
  } = req.body
  const {
    email
  } = req.body;
  const {
    password
  } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({
      username
    })
    if (user === null) {
      user = await User.findOne({
        email
      })
      console.log(user);
    }
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const LoginToken = createToken(user._id);

        if (user.role === "admin") {
          res.send(user)
        } else {
          res.send({
            userId:user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            isActive: user.isActive,
            image: user.image,
            isOtpSend: user.isOtpSend
          });
          // console.log(res,"response");
          if (user.isOtpSend === true) {
            getOTP(req.body.email)
          }
        }
      } else {
        res.send({
          error: 1,
          message: "Invalid password"
        });
      }

    } else {
      res.send({
        error: 1,
        message: "Invalid email or username please check email or username"
      });
    }
  } catch (err) {
    console.error(err);
  }
}

// module.exports.logout_get = async (req,res) => {
//   CartItem.deleteMany({userId : req.user.id},(err)=>{
//     if(err){
//       console.log("Failed to clear cart for the user",err);
//     }
//   })
//   res.status(200).json({message:"Logged Out Successfllu"})
// }
