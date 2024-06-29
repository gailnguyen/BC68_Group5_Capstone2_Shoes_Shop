function getById(event) {
  event.preventDefault();
  //   console.log("haha");
  let id = document.getElementById("id").value;
  let promise = axios({
    method: "GET",
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
  });
  promise
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

document.getElementById("search").onsubmit = getById;
