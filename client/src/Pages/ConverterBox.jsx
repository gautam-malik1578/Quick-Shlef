import { useParams } from "react-router-dom";
import ImgUploader from "../components/ImgUploader";
import PdfUploader from "../components/PdfUploader";

function ConverterBox() {
  const { type } = useParams();
  return (
    <div>
      {type.split("-").length === 3 ? <ImgUploader /> : <PdfUploader />}
    </div>
  );
}

export default ConverterBox;
