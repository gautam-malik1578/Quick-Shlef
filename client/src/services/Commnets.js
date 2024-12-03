const BASE_URL = "http://127.0.0.1:5000/api/v1/";
export async function getCommentsOnABook(bookid) {
  // console.log("the id we got is service is ", bookid);
  const req = await fetch(`${BASE_URL}comment/${bookid}`);
  const res = await req.json();
  console.log("console the res", res);
  if (res.status == "fail") {
    throw new Error("something went wronng : mate");
  }

  return res;
}

export async function createCommentsOnABook(data, bookid, token) {
  console.log("Received data in service:", data);

  const req = await fetch(`${BASE_URL}comment/${bookid}?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await req.json();
  if (!res || res.status === "fail") {
    throw new Error(res?.message || "Something went wrong, please try again.");
  }
  return res;
}

export async function updateCommentsOnABook(data, token) {
  console.log("the id we got in service to create commnet", data, token);
  const req = await fetch(`${BASE_URL}comment/${data.id}?token=${token}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await req.json();
  if (!res || res.status === "fail") {
    throw new Error(res?.message || "Something went wrong, please try again.");
  }
  return res;
}
export async function deleteCommentsOnABook(id, token) {
  console.log("the id we got in service to create commnet", id);
  const req = await fetch(`${BASE_URL}comment/${id}?token=${token}`, {
    method: "DELETE",
  });

  const res = await req.json();
  if (!res || res.status === "fail") {
    throw new Error(res?.message || "Something went wrong, please try again.");
  }
  return res;
}
