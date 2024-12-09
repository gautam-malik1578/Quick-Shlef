export function buildString(prefrance) {
  const {
    searchtype,
    releasedYear,
    isAvaliable,
    maxSize,
    genre,
    searchString,
  } = prefrance;
  //   if (searchString == "") return "";
  let searchquery = "?";
  if (searchString.length != 0) {
    searchquery += `${searchtype}=${searchString}`;
  }
  if (releasedYear > 0 && releasedYear < 3001) {
    if (searchquery.length > 1) searchquery += "&";
    searchquery += `releasedYear[lte]=${releasedYear}`;
  }
  if (!genre.includes("any")) {
    if (searchquery.length > 1) searchquery += "&";
    searchquery += `genre=[${[...genre]}]`;
  }
  if (Number(isAvaliable) != 0) {
    if (searchquery.length > 1) searchquery += "&";
    if (Number(isAvaliable) === -1) {
      searchquery += `available=true`;
    } else {
      searchquery += `available=false`;
    }
  }
  if (searchquery.length > 1) searchquery += "&";
  searchquery += `size[lte]=${maxSize}&fields=title,imgUrl,likes`;
  //lets add the sorting to give some diffrent results at random
  let random = ["likes", "releasedYear", "size", "author"];
  const idx = Math.floor(Math.random() * random.length); // Generates a random index between 0 and 3
  if (searchquery.length > 1) searchquery += "&";
  searchquery += `sort=-${random[idx]}`;
  return searchquery;
}
