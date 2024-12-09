import Loader from "./Loader";
import styles from "./PdfUploader.module.css";
import ThinkingAnnimation from "../annimations/ThinkingAnnimation.json";
import loginAnnimation from "../annimations/processingFile.json";
import DownloadAnnimation from "../annimations/DownloadAnnimation.json";
// import PDFViewer from "pdf-viewer-reactjs";
import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.mjs";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useProcessPdf } from "../hooks/useProcessPdf";
const maxSize = 1 * 1024 * 1024;

const headOpt = {
  "append-pdf": "Append two pdfs one after other",
  "trim-pdf": "Trim redundant pdf pages",
  "lock-pdf": "Secure your pdf with Password",
};
function PdfUploader() {
  const [countFile, setCountFile] = useState(0);
  const [appendString, setAppendString] = useState("");
  const [passowrd, setPassword] = useState("");
  const [pdfs, setPdfs] = useState([null, null]);
  const [pdfObj, setPdfObj] = useState([null, null]); // this is url mate where we need to have
  const [showDownload, setShowDownload] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const { type } = useParams();
  const { mutate: processPdf, isLoading: isProcessing } = useProcessPdf();
  const navigator = useNavigate();
  //////////////////////////////// handle convert  //////////////////////////////
  function handleConvert() {
    if (type.startsWith("lock") && passowrd.length < 8) {
      toast.error("password must be atleast 8 char");
      return;
    }
    if (type.startsWith("trim") && appendString.length < 1) {
      toast.error("plz provide pages to be kept");
      return;
    }
    const data = {
      passowrd,
      appendString,
      pdfs,
      countFile,
    };
    console.log("calling the processPdf with data", data);
    processPdf(data, {
      onSuccess: (data) => {
        setDownloadLink(data.link);
        setShowDownload(true);
        setCountFile(0);
        setAppendString("");
        setPassword("");
        setPdfs([null, null]);
        setPdfObj([null, null]);
      },
      onError: () => {
        setCountFile(0);
        setAppendString("");
        setPassword("");
        setPdfs([null, null]);
        setPdfObj([null, null]);
      },
    });
  }
  //////////////////////////////// handle convert  //////////////////////////////
  //////////////////////////handle download///////////////////////////////////////
  function handleDownload() {
    setShowDownload(false);
    setDownloadLink("");
  }
  //////////////////////////handle download///////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////
  function handleUpload(e) {
    console.log(e.target.id);
    const file = e.target.files[0];
    const fileidx = e.target.id.split("-")[1] - 1; //the idx where the file will go
    if (file.size > maxSize) {
      toast.error("file size must be less than 1MB");
      return; // go no further mate
    }
    // by now we are sure that we have to have to keep the file mate
    const url = URL.createObjectURL(file);
    // Update pdfs array
    setPdfs((prevPdfs) => {
      const updatedPdfs = [...prevPdfs];
      updatedPdfs[fileidx] = file; // Assign to correct index
      return updatedPdfs; // Return updated array
    });

    // Update pdfObj array
    setPdfObj((prevPdfObj) => {
      const updatedPdfObj = [...prevPdfObj];
      updatedPdfObj[fileidx] = url; // Assign to correct index
      return updatedPdfObj; // Return updated array
    });
    if (countFile < 2) {
      setCountFile((p) => p + 1);
    }
    toast.success("picked up! file");
  }
  // ////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////handle password chaneg ///////////////////////////////////
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  /////////////////handle password chaneg ///////////////////////////////////
  /////////////////handle append string ///////////////////////////////////
  function onAppendStringChange(e) {
    setAppendString(e.target.value);
  }
  /////////////////handle append string ///////////////////////////////////

  return (
    <div className={styles.uploaderBoxwrapper}>
      <div className={styles.uploaderBox}>
        <h3 className={styles.PdfUploaderHead}>{headOpt[type]}</h3>
        {countFile == 0 && !isProcessing && (
          <div className={styles.annimationbox}>
            <Loader
              height={140}
              width={140}
              anni={showDownload ? DownloadAnnimation : ThinkingAnnimation}
              text={`${showDownload ? "download your file" : "select a Pdf"}`}
            />
          </div>
        )}

        {countFile > 0 && !isProcessing && (
          <div className={styles.pdfpreviewBox}>
            {pdfObj.map((obj, idx) => {
              if (obj == null) return obj;
              return (
                // <Document key={idx} file={obj}>
                //   <Page pageNumber={1} />
                // </Document>
                // <PDFViewer key={idx} document={{ url: obj }} />
                <object
                  data={obj + "#zoom=0&view=Fit"}
                  key={idx}
                  height="100%"
                  type="application/pdf"
                  className={styles.pdfpreview}
                ></object>
              );
            })}
          </div>
        )}
        {isProcessing && (
          <div className={styles.annimationbox}>
            <Loader
              height={100}
              width={100}
              anni={loginAnnimation}
              text="conveting..."
            />
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {!showDownload && type.startsWith("append") ? (
            <div className={styles.uploadBtns}>
              {(countFile == 0 || countFile == 2) && !showDownload && (
                <div>
                  <button disabled={isProcessing}>
                    <label htmlFor="pdf-1">
                      {countFile == 0 ? "upload Pdf-1" : "change Pdf-1"}
                    </label>
                  </button>
                  <input
                    type="file"
                    id="pdf-1"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleUpload(e);
                    }}
                  />
                </div>
              )}
              {countFile > 0 && (
                <div>
                  <button disabled={isProcessing}>
                    <label htmlFor="pdf-2">
                      {countFile == 1 ? "upload Pdf-2" : "change Pdf-2"}
                    </label>
                  </button>
                  <input
                    type="file"
                    id="pdf-2"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleUpload(e);
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className={styles.uploadBtns}
              style={{ display: `${showDownload ? "none" : "flex"}` }}
            >
              <button disabled={isProcessing}>
                <label htmlFor="pdf-1">
                  {countFile == 0 ? "upload Pdf" : "change pdf"}
                </label>
              </button>
              <input
                type="file"
                id="pdf-1"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleUpload(e);
                }}
              />
            </div>
          )}

          {type.startsWith("lock") && countFile > 0 && (
            <div className={styles.inputBox}>
              <label htmlFor="password">Password:</label>
              <input
                type="text"
                placeholder="W13cf##1"
                minLength={8}
                id="password"
                value={passowrd}
                onChange={(e) => onPasswordChange(e)}
                className={styles.inputField}
              />
            </div>
          )}
          {type.startsWith("trim") && countFile > 0 && (
            <div className={styles.inputBox}>
              <label htmlFor="pages">Pages To Keep</label>
              <input
                type="text"
                placeholder="2,5,7"
                id="pages"
                value={appendString}
                onChange={(e) => onAppendStringChange(e)}
                className={styles.inputField}
              />
            </div>
          )}
          <div className={styles.actionBtns}>
            {((type.startsWith("append") && countFile == 2) ||
              (!type.startsWith("append") && countFile > 0)) && (
              <button disabled={isProcessing} onClick={() => handleConvert()}>
                {isProcessing ? "Processing" : "Process"}
              </button>
            )}
            <button disabled={isProcessing} onClick={() => navigator(-1)}>
              back
            </button>
            {showDownload && (
              <a
                className={styles.downloadBtn}
                href={downloadLink}
                onClick={() => {
                  handleDownload();
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Pdf
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PdfUploader;
