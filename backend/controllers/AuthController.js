const User = require("../models/UserModel");
const AppError = require("../utilities/AppError");
const catchAsync = require("../utilities/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
  res.status(201).json({
    staus: "success",
    token,
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
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // step 1 get token and check it is there
  let token = "";
  if (
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
