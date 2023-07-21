const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require('multer');
var smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const {
  request
} = require("express");
const Jwtkey = 'developer'

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

module.exports.verification = async (req, res) => {
  let {
    email,
    otp
  } = req.body
  if (!email && !otp) {
    res.send('Please Enter OTP')
  } else {
    const OTPRecord = await User.find({
      email: email
    })
    if (OTPRecord.length <= 0) {
      res.send('Account record does not exist')
    } else {
      const createAt = OTPRecord[0].createAt
      const OTP = OTPRecord[0].otp
      var currentDate = new Date();
      var futureDate = new Date(currentDate.getTime() + 5900);
      if (createAt >= futureDate) {
        res.send('OTP is expire')
      } else {
        if (OTP === otp) {
          let user = await User.findOne({
            email: email
          });
          jwt.sign({
            user
          }, Jwtkey, {
            expiresIn: "24h"
          }, (err, token) => {
            if (err) {
              res.send({
                user: 'something went wrong'
              });
            }
            res.send({
              email: user.email,
              username: user.username,
              role: user.role,
              isActive: user.isActive,
              image: user.image,
              isOtpSend: user.isOtpSend
            });
          })
        } else {
          res.send('OTP is invalid')
        }
      }
    }
  }
}

module.exports.resendOTP = async (req, res) => {
  let {
    email
  } = req.body
  console.log(email, 'email');

  if (email) {
    getOTP(email)
    res.send('OTP sent successfully to your email')
  }

};


module.exports.resetPassword = async (req, res) => {
  let data = await User.find(req.body)
  // console.log(data);
  if (data[0].email) {
    // console.log(data[0]);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      type: 'SMTP',
      host: "smtp.gmail.com",
      secure: false,
      debug: true,
      auth: {
        user: 'varun.saraswat@technostacks.in',
        pass: '#Saraswat@817$'
      },
      tls: {
        rejectUnauthorized: false
      }

    });
    try {
      const token = createToken(data[0].email);
      const mailOptions = {
        from: 'varun.saraswat@technostacks.in',
        to: req.body.email,
        subject: "Verify your email",
        html: `<p>Your reset password link <a href=http://localhost:5173/resetPassword/?token=${token} >click here</a> to create new password</p>`
      }

      await User.updateOne({
        email: req.body.email
      }, {
        $set: {
          resetPasswordToken: token
        },
      })
      transporter.sendMail(mailOptions, (error, resp) => {
        if (error) {
          console.log(error);
        } else {
          res.send("success");
        }
      })
    } catch (error) {
      res.send(error)
    }
  } else {
    res.send({
      email: "Email is not valid"
    })
  }
}

module.exports.resetPassword_verify = async (req, res) => {
  console.log(req.params.token);
  let data = await User.find({
    resetPasswordToken: req.params.token,
  });
  if (data.length > 0) {
    changePassword(data[0].email, req.body.password);
    res.send({ "message": "success" })
  } else {
    res.send({
      error: 'Token invalid',
    });
  }
};

const changePassword = async (email, password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  let result = await User.updateOne(
    { email: email },
    { $set: { password: hashPassword } }
  );
  console.log(result);
};

module.exports.changeNewPassword = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    await changePassword(req.body.email, req.body.newPassword);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports.isOtp = async (req, res) => {
  let isOtp = await User.updateOne({
    email: req.body.email
  }, {
    $set: {
      isOtpSend: req.body.isOtpSend
    },
  })
  let userData = await User.find({
    email: req.body.email
  })
  if (userData) {
    res.send({
      email: userData[0].email,
      isOtpSend: userData[0].isOtpSend,
      role: userData[0].role,
      isActive: userData[0].isActive,
      image: userData[0].image,
      username: userData[0].username
    })
  } else {
    res.send({
      error: 'something went wrong'
    })
  }
}