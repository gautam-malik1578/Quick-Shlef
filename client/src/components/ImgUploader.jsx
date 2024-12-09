import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useProcessimgs } from "../hooks/useProcessImgs";
import styles from "./ImgUploader.module.css";
import loginAnnimation from "../annimations/processingFile.json";
import ThinkingAnnimation from "../annimations/ThinkingAnnimation.json";
import DownloadAnnimation from "../annimations/DownloadAnnimation.json";
import Loader from "./Loader";
function ImgUploader() {
  const { type: conversionType } = useParams();
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [showDownload, setShowDownload] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [Outputsize, setOutputSize] = useState(300);
  const { mutate, isLoading } = useProcessimgs();
  const navigator = useNavigate();
  function handleSubmit() {
    const data = { image: imageData, size: Outputsize };
    mutate(data, {
      onSuccess: (data) => {
        console.log(data.link);
        // if (conversionType.startsWith("img")) {
        setShowDownload(true);
        setDownloadLink(data.link);
        // }
        setImage(null);
      },
    });
  }
  function handleDownload() {
    setImage(null);
    setImageData(null);
    setShowDownload(false);
    setDownloadLink("");
  }
  const handleImageUpload = (e) => {
    console.log("this is what we have n file mate ", e.target.files);
    const file = e.target.files[0];
    // const validTypes = ["image/png", "image/jpeg", "image/webp"];
    const validTypes = conversionType.startsWith("img")
      ? ["image/png", "image/jpeg", "image/webp"]
      : [`image/${conversionType.split("-")[0]}`];
    const maxSize = 1 * 1024 * 1024; // 1 MB

    // Reset error and image

    setImage(null);

    if (!file) return;

    // Validate file type
    if (!validTypes.includes(file.type)) {
      toast.error(`plz select a ${conversionType.split("-")[0]} file`);
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      toast.error("file size must be less than 1MB");
      // setError("File size must be less than 1MB.");
      return;
    }
    toast.success("Picked your file 😁");
    // Read and preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    setImageData(file);
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.uploaderBoxwrapper}>
      <div className={styles.uploaderBox}>
        <h3 className={styles.uploaderBoxhead}>
          {"convert " + conversionType.replaceAll("-", " ")}
        </h3>
        {!isLoading && image && (
          <figure className={styles.uploaderBoxFig}>
            <img
              className={styles.uploaderBoxImg}
              src={image}
              alt="Uploaded Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                marginTop: "10px",
              }}
            />
          </figure>
        )}
        {!isLoading && !image && (
          <div className={styles.annimationbox}>
            <Loader
              height={140}
              width={140}
              anni={showDownload ? DownloadAnnimation : ThinkingAnnimation}
              text="select a file"
            />
          </div>
        )}
        {isLoading && (
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
          className={styles.uploaderBoxForm}
        >
          {!showDownload && (
            <div>
              <button disabled={isLoading} className={styles.uploaderBoxbtn}>
                <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                  {image ? "Change Image" : "Upload Image"}
                </label>
              </button>
              <input
                type="file"
                id="image-upload"
                accept="image/png, image/jpeg, image/webp"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          )}
          {!conversionType.startsWith("img") && image && (
            <div>
              <label htmlFor="outputsize">Size </label>
              <select
                name=""
                id="outputsize"
                value={Outputsize}
                disabled={isLoading}
                onChange={(e) => {
                  setOutputSize(Number(e.target.value));
                }}
              >
                <option value="200">200px</option>
                <option value="300">300px</option>
                <option value="400">400px</option>
              </select>
            </div>
          )}

          {image && (
            <button
              disabled={isLoading}
              className={styles.uploaderBoxbtn}
              onClick={(e) => {
                handleSubmit();
              }}
            >
              {isLoading ? "Processing..." : "convert"}
            </button>
          )}
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
              Download file
            </a>
          )}
          <button
            disabled={isLoading}
            className={styles.uploaderBoxbtn}
            onClick={(e) => {
              navigator(-1);
            }}
          >
            back
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImgUploader;
