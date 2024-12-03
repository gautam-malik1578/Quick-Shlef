const BASE_URL = "http://127.0.0.1:5000/api/v1/";
export async function getOtp(data) {
  const req = await fetch(`${BASE_URL}user/getotp`, {
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

export async function verifyOtp(data) {
  const req = await fetch(`${BASE_URL}user/verify`, {
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
