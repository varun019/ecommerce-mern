// const mongoose = require('mongoose');
// const app = require('./app');
// const nodemailer = require('nodemailer');
// let server;

// // const exitHandler = () => {
// //   if (server) {
// //     server.close(() => {
// //     //   logger.info('Server closed');
// //       process.exit(1);
// //     });
// //   } else {
// //     process.exit(1);
// //   }
// // };

// // const unexpectedErrorHandler = (error) => {
// //   console.error(error);
// //   exitHandler();
// // };

// // process.on('uncaughtException', unexpectedErrorHandler);
// // process.on('unhandledRejection', unexpectedErrorHandler);

// // process.on('SIGTERM', () => {
// //   logger.info('SIGTERM received');
// //   if (server) {
// //     server.close();
// //   }
// // });