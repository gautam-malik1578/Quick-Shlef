import { checkString } from "../utility/checkAppendString";

const BASE_URL = "http://127.0.0.1:5000/api/v1/";
export async function ProcessPdf(url, data) {
  console.log("reached the service pdf with url", url);
  const { passowrd, appendString, pdfs, countFile } = data;
  const formData = new FormData();
  //  let's fix the data mate as we need to do
  if (url !== "pdf/trim") {
    formData.append("pages", "*");
  } else {
    //  this is where we set the pages of append
    if (!checkString(appendString)) {
      throw new Error("plz give trim string in 2,3,4 ... format");
    }
    // let myarr = appendString.split(",");
    // myarr = myarr.map((e) => Number(e));
    // console.log("the array we are sending is ", myarr);
    formData.append("pages", "[" + appendString + "]"); // set the trim string
  }
  // putting the file as we should
  pdfs.forEach((ele) => {
    if (ele) {
      formData.append("pdf", ele);
    }
  });
  formData.append("password", passowrd); // will be ignored if not needed

  const req = await fetch(`${BASE_URL}file/${url}`, {
    method: "POST",
    body: formData,
  });
  const res = await req.json();
  if (res.status == "fail") {
    throw new Error(res.message);
  }
  console.log("this is the res from process pdf in services mate ", res);
  return res;
}
