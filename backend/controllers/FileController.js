const pdfkit = require("pdfkit");
const fs = require("fs");
const multer = require("multer");
const Recipe = require("muhammara").Recipe;
const path = require("path");
const fxs = require("fs").promises;
const PDFParser = require("pdf-parse"); //
const sharp = require("sharp");
// const { exportImages } = require("pdf-export-images");

const AppError = require("../utilities/appError");
const catchAsync = require("../utilities/catchAsync");
// here we are configuring the multer ////////////////////////////////////////////////
const imgstorage = multer.memoryStorage();

const imgFilter = (req, files, cb) => {
  if (files.mimetype.split("/")[0] !== "image") {
    cb(
      new AppError("plz upload images in correct format jpeg or png", 400),
      false
    );
  } else {
    cb(null, true);
  }
};
const upload = multer({ storage: imgstorage, fileFilter: imgFilter });
exports.imgsToPdf0 = upload.array("image", 5);
//////// by now we have configured multer now and exported the first middleware so theat we can access req.file //////////////

////////////////////////img to pdf mate ///////////////////////////////////////////////
exports.imgsToPdf = catchAsync(async (req, res, next) => {
  console.log("we reached the  img to pdf mate  ⛔⛔⛔");
  const doc = new pdfkit();
  //  console.log("the data of --------files is ----", req.files);
  const images = req.files.map((file) => file.buffer);
  // console.log(images);
  const uploadDir = path.join(__dirname, "temp");
  const nameOfPdf = `ImgPdf_${Date.now()}.pdf`;
  let pdfPath = path.join(uploadDir, `../../temp/${nameOfPdf}`);
  // const pdfPath = "../temp/output.pdf";
  // res.pipe();
  doc.pipe(fs.createWriteStream(pdfPath));
  images.forEach((img, index) => {
    doc.image(img, { fit: [500, 500] });
    if (index < images.length - 1) {
      doc.addPage();
    }
  });
  doc.end();
  res.status(200).json({
    status: "success",
    message: "pdf was made",
    link: `http://127.0.0.1:5000/api/v1/file/pdf/download/${nameOfPdf}`,
  });
});
/////////////////////////////img to pdf ended here mate //////////////////////////////
/////////////////////////now let's do for pdf to img /////////////////////
const { PDFDocument } = require("pdf-lib");
const { createCanvas } = require("canvas");
const fss = require("fs-extra");
const User = require("../models/UserModel");
// const multer = require("multer");

//////////////////////////////////////////////
// Multer setup for uploading PDF files
const pdfStorage = multer.memoryStorage();
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Please upload a valid PDF"), false);
  }
};
const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: pdfFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
});

///////////// let's encrypt the pdf////////////////////////////////////////////////////////////

exports.PdfForEncrypt = uploadPdf.single("pdf");
///////////////// this is what we have mate to encrypt the file  ///////////////
exports.pdfEncrypt = async (req, res, next) => {
  console.log("Processing started...");

  if (!req.file) {
    return res.status(400).json({ status: "fail", message: "No PDF provided" });
  }
  if (!req.body.password) {
    return res.status(400).json({
      status: "fail",
      message: "plz provide the password  for encryption",
    });
  }
  const pdfName = `Lock_${Date.now()}`;
  // File paths
  const tempInputPath = path.join(__dirname, `../temp/${pdfName}_input.pdf`);
  const tempOutputPath = path.join(
    __dirname,
    `../temp/${pdfName}_encrypted.pdf`
  );

  // Save uploaded file to the temp directory
  await fxs.writeFile(tempInputPath, req.file.buffer);
  console.log("PDF file saved for encryption.");

  // Encrypt the PDF
  const pdfDoc = new Recipe(tempInputPath, tempOutputPath);
  pdfDoc
    .encrypt({
      userPassword: req.body.password, // Password for opening the file
      ownerPassword: "admin", // Password for administrative control
      userProtectionFlag: 4, // Restricts copying, printing, etc.
    })
    .endPDF();
  console.log("Encryption completed.");

  // Send the encrypted file to the user
  res.status(200).json({
    status: "success",
    message: "pdf was made",
    link: `http://127.0.0.1:5000/api/v1/file/pdf/download/${pdfName}_encrypted.pdf`,
  });
  // res.download(tempOutputPath, "encrypted.pdf", async (err) => {
  //   if (err) {
  //     console.error("Error sending file:", err);
  //     next(err);
  //   } else {
  //     // const user = await User.findById(req._id);
  //     // user.tokens = user.tokens + 1;
  //     // await user.save({ validateBeforeSave: false });
  //   }
  // });
};
// ok we are have trouble have to delte the files from temp for some reason make a corn job to delte after some time
////////////////////////////////////////////////////////////////////////////
///----------------------------trim a pdf --------------------------------///
exports.PdfForTrim = uploadPdf.single("pdf");
// exports.PdfTrim = catchAsync(async (req, res, next) => {});
exports.PdfTrim = catchAsync(async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "fail", message: "No PDF provided" });
    }

    if (!req.body.pages) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid pages array" });
    }

    // const pagesToKeep = req.body.pages; // Array of pages to retain
    let pagesToKeep = req.body.pages ? JSON.parse(req.body.pages) : [];
    const pdfName = `trim_${Date.now()}`;
    const tempInputPath = path.join(__dirname, `../temp/${pdfName}_input.pdf`);
    const tempOutputPath = path.join(
      __dirname,
      `../temp/${pdfName}_output.pdf`
    );

    // Save uploaded file to the temp directory
    await fxs.writeFile(tempInputPath, req.file.buffer);
    console.log("PDF file saved for trimming.");

    // Read the uploaded PDF to get the number of pages
    const pdfBuffer = req.file.buffer;
    const pdfData = await PDFParser(pdfBuffer);
    const totalPages = pdfData.numpages;

    // Validate the requested pages, ensuring they exist in the uploaded PDF
    const validPages = pagesToKeep.filter(
      (page) => page >= 1 && page <= totalPages
    );

    if (validPages.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No valid pages in the requested range",
      });
    }

    // Create a new Recipe instance for an empty PDF
    const pdfDoc = new Recipe("new", tempOutputPath);

    // Append only the valid pages
    for (const page of validPages) {
      pdfDoc.appendPage(tempInputPath, page);
    }

    // Finalize the output PDF
    pdfDoc.endPDF();
    console.log("Trimming completed.");

    // Send the new trimmed PDF link to the user
    res.status(200).json({
      status: "success",
      message: "pdf was made",
      link: `http://127.0.0.1:5000/api/v1/file/pdf/download/${pdfName}_output.pdf`,
    });
  } catch (err) {
    console.error("Error in PDF trimming:", err);
    next(err);
  }
});
///---------------------------trim a pdf ---------------------------------///
///--------------------------append two pdfs-----------------------------////
exports.PdfForAppend = uploadPdf.array("pdf", 2); // we shall shave 2 pdfs not more no less mate
// exports.PdfAppend = catchAsync(async (req, res, next) => {
//   // we need to make sure 2 pdf are added
//   // make sure that req.body.pages exist
//   // if req.body.pages is * means we need to append all pdf
//   // first pdf will be in which we shall append and we shall append from second pdf
//   // we need to make sure the append pages in pdf second exist whihc are to be apppended to first
//   // for this is guess we shall be saving the files to fs and delteing in end when we send data to the users
// });
exports.PdfAppend = catchAsync(async (req, res, next) => {
  try {
    // Step 1: Validate file upload (must be exactly 2 PDFs)
    if (!req.files || req.files.length !== 2) {
      return next(new AppError("Please upload exactly 2 PDFs.", 400));
    }

    // Step 2: Validate `pages` in request body
    const pages = req.body.pages;
    if (!pages) {
      return next(new AppError("Please provide the pages array.", 400));
    }

    // Parse `pages` array or check if it's "*" for all pages
    let pagesToAppend = [];
    if (pages === "*") {
      pagesToAppend = "*"; // Append all pages from the second PDF
    } else {
      try {
        pagesToAppend = JSON.parse(pages);
      } catch (err) {
        return next(new AppError("Invalid pages array format.", 400));
      }
    }

    // Step 3: Write uploaded PDFs to disk
    const uploadDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Ensure the upload directory exists
    }
    // const pdfName = `${Date.now()}`;
    const firstPdfPath = path.join(uploadDir, `first_${Date.now()}.pdf`);
    const secondPdfPath = path.join(uploadDir, `second_${Date.now()}.pdf`);

    // Write files to disk
    await fxs.writeFile(firstPdfPath, req.files[0].buffer);
    await fxs.writeFile(secondPdfPath, req.files[1].buffer);

    // Step 4: Extract pages and validate using `pdf-parse`
    const pdfData = await PDFParser(fs.readFileSync(secondPdfPath));
    const totalPages = pdfData.numpages;

    if (
      pagesToAppend !== "*" &&
      !pagesToAppend.every((page) => page <= totalPages)
    ) {
      return next(
        new AppError(
          "Some pages to append do not exist in the second PDF.",
          400
        )
      );
    }

    // Step 5: Generate output PDF by appending pages
    const pdfName = `output_${Date.now()}.pdf`;
    const outputPdfPath = path.join(uploadDir, pdfName);
    const pdfDoc = new Recipe(firstPdfPath, outputPdfPath);

    if (pagesToAppend === "*") {
      pdfDoc.appendPage(secondPdfPath);
    } else {
      pdfDoc.appendPage(secondPdfPath, pagesToAppend);
    }

    pdfDoc.endPDF();

    // Step 6: Send the generated PDF back link to the user
    res.status(200).json({
      status: "success",
      message: "pdf was made",
      link: `http://127.0.0.1:5000/api/v1/file/pdf/download/${pdfName}`,
    });
  } catch (err) {
    next(err);
  }
});
///--------------------------append two pdfs-----------------------------////
///-------------------------now do insert into pdf ---------------------/////
exports.PdfForInsert = uploadPdf.array("pdf", 2);
exports.pdfInsert = catchAsync(async (req, res, next) => {
  res.send("working on it!");
});
///-------------------------now do insert into pdf ---------------------/////
//--------------------------ok lets try to convert the png to jpg-------------------------//

const PngStorage = multer.memoryStorage();
// Filter for PNG images only
const PngFilter = (req, file, cb) => {
  if (file.mimetype !== "image/png") {
    cb(new AppError("Please upload an image in PNG format.", 400), false);
  } else {
    cb(null, true);
  }
};

// Set up multer with storage and filter
const PngUpload = multer({
  storage: PngStorage,
  fileFilter: PngFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // no more than i mb
});

exports.PngUpload = PngUpload.single("image"); // Allow exactly 1 image

const WebpStorage = multer.memoryStorage();

// Filter for WebP images only
const WebpFilter = (req, file, cb) => {
  if (file.mimetype !== "image/webp") {
    cb(new AppError("Please upload an image in WebP format.", 400), false);
  } else {
    cb(null, true); // we tell teh erroor and
  }
};
// Set up multer with storage and filter
const WebpUpload = multer({
  storage: WebpStorage,
  fileFilter: WebpFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});

exports.WebpUpload = WebpUpload.single("image"); // Allow exactly 1 image

const JpgStorage = multer.memoryStorage();

// Filter for JPG images only
const JpgFilter = (req, file, cb) => {
  if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/jpg") {
    cb(new AppError("Please upload an image in JPG format.", 400), false);
  } else {
    cb(null, true);
  }
};

// Set up multer with storage and filter for JPG
const JpgUpload = multer({
  storage: JpgStorage,
  fileFilter: JpgFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});

exports.JpgUpload = JpgUpload.single("image"); // Allow exactly 1 image

exports.toJpg = catchAsync(async (req, res, next) => {
  // by now we are sure we have a png file in req.file
  console.log("this is checkpoint 1👮👮👮👮⛔⛔");
  const outputPath1 = path.join(__dirname, "../temp");
  const imgName = `img_${Date.now()}.jpg`;
  const jpgPath = path.join(outputPath1, imgName);
  const size = req.body.size * 1 || 200;
  console.log("this is checkpoint 2👮👮👮👮⛔⛔", req.file);
  await sharp(req.file.buffer).resize(size).toFile(jpgPath); // this will puth the converted file to the /temp
  console.log("this is checkpoint 3👮👮👮👮⛔⛔");
  console.log(jpgPath);
  // res.download(jpgPath, "output.jpg", async (err) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   await fxs.unlink(jpgPath);
  //   console.log("all went wll mate ");
  // });
  res.status(200).json({
    status: "sucess",
    link: `http://127.0.0.1:5000/api/v1/file/downloadImg/${imgName}`,
  });
});
//--------------------------ok lets try to convert the png to jpeg-------------------------//
//--------------------------ok lets try to convert the jpeg to png--------------------------///
// Memory storage setup for JPG uploads

exports.toPng = catchAsync(async (req, res, next) => {
  // Ensure we have a JPG file in `req.file`
  console.log("this is checkpoint 1👮👮👮👮⛔⛔");
  const outputPath1 = path.join(__dirname, "../temp");
  const imgName = `img_${Date.now()}.png`;
  const pngPath = path.join(outputPath1, imgName);
  const size = req.body.size || 200;
  // Resize and convert the JPG to PNG
  await sharp(req.file.buffer).resize(size).toFile(pngPath);
  console.log("this is checkpoint 2👮👮👮👮⛔⛔");

  // Send the link to  download
  res.status(200).json({
    status: "sucess",
    link: `http://127.0.0.1:5000/api/v1/file/downloadImg/${imgName}`,
  });
});

//--------------------------ok lets try to convert the jpeg to png--------------------------///
//--------------------------ok let's do jpeg to webp ----------------------------------------///
exports.toWebP = catchAsync(async (req, res, next) => {
  // Ensure we have a JPG file in `req.file`
  console.log("this is checkpoint 1👮👮👮👮⛔⛔");
  const outputPath1 = path.join(__dirname, "../temp");
  const imgName = `img_${Date.now()}.webp`;
  const webpPath = path.join(outputPath1, imgName);
  const size = req.body.size || 200;
  // Resize and convert the JPG to PNG
  await sharp(req.file.buffer).resize(size).toFile(webpPath);
  console.log("this is checkpoint 2👮👮👮👮⛔⛔");

  // Send the converted file link to donlwoad download
  res.status(200).json({
    status: "sucess",
    link: `http://127.0.0.1:5000/api/v1/file/downloadImg/${imgName}`,
  });
});
//--------------------------ok let's do jpeg to webp ----------------------------------------///
//////////////////////// ok now what we need is ///// this  is what we have //////
exports.downloadPdf = catchAsync(async (req, res, next) => {
  const pdfName = req.params.pdfName;
  const filePath = path.join(__dirname, `../temp/${pdfName}`);
  console.log("the book name is download file----", pdfName);
  // Stream the file to the response   "./controllers/Node.js-Express-in-Action"
  res.download(filePath, "mypdf.pdf", (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error downloading file",
        error: err.message,
      });
    } else {
      fxs
        .unlink(filePath)
        .then((data) => console.log("deleted the book as well"))
        .catch((err) => {
          console.log("we hade error in delted file", filePath);
        });
    }
  });
});
///////////////////////////////////////////////////////////////////
////////////////////////////download img///////////////////////
exports.downloadImg = catchAsync(async (req, res, next) => {
  const imgName = req.params.imgName;
  const arr = imgName.split(".");
  const ext = arr[arr.length - 1];
  const filePath = path.join(__dirname, `../temp/${imgName}`);
  console.log("the img name is download file----", imgName);
  // Stream the file to the response   "./controllers/Node.js-Express-in-Action"
  res.download(filePath, `myImg.${ext}`, (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error downloading file",
        error: err.message,
      });
    } else {
      fxs
        .unlink(filePath)
        .then((data) => console.log("deleted the img as well"))
        .catch((err) => {
          console.log("we hade error in delted img file", filePath);
        });
    }
  });
});
////////////////////////////download img///////////////////////
