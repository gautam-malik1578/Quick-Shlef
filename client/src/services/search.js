const BASE_URL = "http://127.0.0.1:5000/api/v1/";
export async function searchBook(queryString) {
  const req = await fetch(`${BASE_URL}book${queryString}`);
  const res = await req.json();
  if (res.status === "fail") {
    throw new Error(res.message);
  }
  return res;
}
export async function getBookById(id) {
  const req = await fetch(`${BASE_URL}book/${id}`);
  const res = await req.json();
  if (res.status === "fail") {
    throw new Error(res.message);
  }
  return res;
}
