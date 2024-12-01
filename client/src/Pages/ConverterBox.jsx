import { useParams } from "react-router-dom";
import ImgUploader from "../components/ImgUploader";

function ConverterBox() {
  const { type } = useParams();
  return (
    <div>
      {type.split("-").length === 3 ? <ImgUploader /> : <div>pdf uploader</div>}
    </div>
  );
}

export default ConverterBox;
