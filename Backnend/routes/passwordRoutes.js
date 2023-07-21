const express = require("express");
const passwordController = require("../controller/passwordController");
const passwordRouter = express.Router();

passwordRouter.post('/OTPverification', passwordController.verification);
passwordRouter.post('/resendOTP', passwordController.resendOTP);
passwordRouter.post('/resetPassword', passwordController.resetPassword);
passwordRouter.post('/resetPassword/:token', passwordController.resetPassword_verify);
passwordRouter.put('/changePassword', passwordController.changeNewPassword);
passwordRouter.post('/isOtp', passwordController.isOtp);

module.exports = passwordRouter;