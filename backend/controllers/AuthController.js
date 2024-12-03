const User = require("../models/UserModel");
const AppError = require("../utilities/AppError");
const catchAsync = require("../utilities/catchAsync");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { promisify } = require("util");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });
  // const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
  //   expiresIn: "2d",
  // });
  res.status(201).json({
    staus: "success",
    // token,,
    message: "sign up successful plz verfiy yourself",
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password are provided
  if (!email || !password) {
    next(new AppError("plz provid an email and password", 400));
    return; //make sure the fun finis right aware
  }
  // check if user exist and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    next(new AppError("the user does not exisit", 400));
    return;
  }
  if (user.isVerified == false) {
    // make sure that the user is verified then only
    return next(
      new AppError("the user is not verifed plz verfiy with an otp", 401)
    );
  }
  if (!(await user.correctPaasowrd(password, user.password))) {
    next(new AppError("incorrect user or password ", 401));
    return;
  }
  // create and send token

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  console.log("we reached the  protrect ⛔⛔⛔⛔⛔");
  // step 1 get token and check it is there
  let token = "";
  if (req?.query?.token.length > 1) {
    token = req.query.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("you are not logged in ,plz login ", 401));
  }
  // step 2 verify the token and if not valid new app error and return
  //   try {
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY); //instead of usning call back we made it retuen a promise and then the arg which it would have in cb are present in decode object now we can do what we want with them if it is invalid token then we will have an error and go to catch async
  console.log(decoded); //{ id: '66d46f3559a1e3d557db98d8', iat: 1725200114, exp: 1725372914 }
  //   } catch (err) {
  //     console.log("we found an error in token-------------------------");
  //     if (err.JsonWebTokenError == "invalid signature") {
  //       return next(new AppError("invalid token plz login again", 401));
  //     }
  //   }

  // step 3 check if the user still exist may happen that user is deleted
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("the user no loger exist", 400));
  }
  // step 4 make sure that the password is not changed after the the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "the password has been changed recently ,plz login in again",
        401
      )
    );
  }
  //mount the user data to the request if need further
  req.user = user; //this is cool
  next(); //goes to the next middleware ie access has been granted
});

exports.restrictTo = function (...allowed) {
  return async (req, res, next) => {
    if (!allowed.includes(req.user.role)) {
      return next(
        new AppError("you do not have permissin to do this action", 403)
      );
    }
    next();
  };
};
exports.checkTokens = catchAsync((req, res, next) => {
  console.log("we reached the  check tokens ⛔⛔⛔⛔⛔");
  if (req?.user?.isPremium) {
    // this i s premimuim case
    console.log("premium case");
    if (Number(req?.user?.tokens) > 10) {
      return next(new AppError("ran out of tokens,tokens reset tomorrow"));
    }
  } else {
    // this is non premimuim case
    console.log("premium case");
    if (Number(req?.user?.tokens) > 3) {
      return next(
        new AppError(
          "all tokens used ,upgrade to premiuim or try tomorrow",
          400
        )
      );
    }
  }
  console.log("call next just alright");
  next();
});

///////////////// 2 factor auth here mate /////////////////////////////////
exports.Verify = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.otp) {
    return next(new AppError("plz provide both and email and otp ", 400));
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("the email does not exist  ", 400));
  }
  if (user.isVerified) {
    return next(new AppError("the user is already verified ", 400));
  }
  // now we need to check if the otp sent is matches to what we gave and is within the time limit and respond accordingly
  if (user.Otp != Number(req.body.otp)) {
    return next(new AppError("the otp did not match", 401));
  }
  if (user.otpVaildTime < Date.now()) {
    return next(new AppError("the otp is no longer valid plz ask for new otp"));
  }
  //  by now we have all the condition ready and valid  now we need to have send the token
  // so send make the user verified and send the token to the user mate
  user.isVerified = true;
  await user.save({ validateBeforeSave: false }); //this guy should be saved to the data base mate

  // make  a token of its id and not password as it will be unique and useful in the future
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, //so that js in browser can not access it
    secure: process.env.ENVIORMENT === "production", //if true then only sent on https
  });
  //send the response to the user
  res.status(200).json({
    status: "success",
    token,
    userId: user.id,
    username: user.username,
    gender: user.sex,
  });
  // boi this one was a long one nah mate
});

exports.sendOtp = catchAsync(async (req, res, next) => {
  // now this guy need to be here mate it should have the email to whic we need to send otp and to that email we set the
  if (!req.body.email) {
    return next(new AppError("plz provide the eamil which is to be verified"));
  }
  // now what we can  find the user wiht the desired email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("the email does not exist ", 400));
  }
  if (user.isVerified) {
    return next(new AppError("the user is already verified ", 400));
  }
  // now if we have reached  here we need to genrate the otp save it to db and the expired time and the send it over via email
  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // we have genrate the otp
  user.Otp = otp;
  user.otpVaildTime = Date.now() + 15 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  // by now we have written to the the database all we need now is to sent it over to the user on his mail
  // Set up Nodemailer transporter with your email service credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or any other email service
    auth: {
      user: process.env.EMAIL_USERNAME, // your email address
      pass: process.env.EMAIL_PASSWORD, // your email password or app-specific password
    },
  });
  ///

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // sender address
    to: user.email, // receiver email
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 15 minutes.`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
  // by now we have sent the otp to the user to his mail just now respond to the request
  res.status(200).json({
    status: "success",
    message: `an otp has been sent to ${user.email} ,vaild for 15 min`,
  });
});
