const express = require("express");
const { protect, checkTokens } = require("../controllers/AuthController");
const {
  imgsToPdf0,
  imgsToPdf,
  // PdfToImg0,
  // PdfToImg,
  PdfForEncrypt,
  pdfEncrypt,
  PdfForTrim,
  PdfTrim,
  PdfForAppend,
  PdfAppend,
  PngUpload,
  JpgUpload,
  WebpUpload,
  toJpg,
  toPng,
  toWebP,
  downloadPdf,
  downloadImg,
} = require("../controllers/FileController");
const router = express.Router();
// router.post("/pdf/insert", (req, res) => res.send("working on it "));
// router.post("/pdf/convert/img", protect, PdfToImg0, PdfToImg); /// these to lads are pending
router.get("/pdf/download/:pdfName", downloadPdf);
router.get("/downloadImg/:imgName", downloadImg);
router.post("/pdf/trim", PdfForTrim, PdfTrim);
router.post("/pdf/append", PdfForAppend, PdfAppend);
router.post("/pdf/password", PdfForEncrypt, pdfEncrypt);
router.post("/img/convert/pdf", imgsToPdf0, imgsToPdf);
router.post("/png/convert/jpeg", PngUpload, toJpg);
router.post("/png/convert/webp", PngUpload, toWebP);
router.post("/jpeg/convert/png", JpgUpload, toPng); //this is what we have this is what we have to do
router.post("/jpeg/convert/webp", JpgUpload, toWebP);
router.post("/webp/convert/png", WebpUpload, toPng);
router.post("/webp/convert/jpg", WebpUpload, toJpg);
module.exports = router;
