const authController = require('../controller/authController');
const multer = require('multer');
const express = require('express');
const router = express.Router();

router.use(express.static('uploads'));
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    }

  })
}).single("image");

router.get('/signup', authController.signup_get);
router.post('/signup', upload, authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
// router.post('/logout',authController.logout_get);

module.exports = router;  