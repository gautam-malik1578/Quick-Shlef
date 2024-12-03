const BASE_URL = "http://127.0.0.1:5000/api/v1/";
export async function signup(data) {
  const req = await fetch(`${BASE_URL}user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await req.json();
  if (res.status === "fail") {
    throw new Error(res.message);
  }
  return res;
}
