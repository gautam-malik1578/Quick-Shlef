const BASE_URL = "http://127.0.0.1:5000/api/v1/";
export async function proceesImg(queryUrl, imageData) {
  const formData = new FormData();
  formData.append("image", imageData.image);
  formData.append("size", imageData.size || 300);
  console.log(
    "we are in service mate ->>>>>>>>"
    // formData.get("image"),
    // formData.get("size")
  ); // Log the formData entry
  const req = await fetch(`${BASE_URL}file/${queryUrl}`, {
    method: "POST",
    body: formData,
  });
  // console.log("we got the respone mate ", req);
  // if (req.status != 200) {
  const res = await req.json();
  if (res.status == "fail") {
    throw new Error(res.message);
  }
  // }
  return res;
}
export async function downloadFile(link) {
  console.log(link);
  const req = await fetch(link);
  console.log("this is the req of the service mate ", req);
  const res = await req.json();
  console.log("this is the res in the service mate", res);
  if (res?.status == "fail") {
    throw new Error(res?.message);
  }
  return res;
}
