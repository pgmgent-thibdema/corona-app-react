// Get data objects from url via fetch API
export async function fetchGetData(url) {
  const content = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  return content;
}