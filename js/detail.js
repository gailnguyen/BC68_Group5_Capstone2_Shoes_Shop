function getIdParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
  };
}

function getById() {
  let id = getIdParams().id;
  let promise = axios({
    method: "GET",
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
  });
  promise
    .then((res) => {
      console.log(res.data.content);
      renderDetailApi(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}
getById();

function renderDetailApi(object) {
  let {
    image,
    name,
    categories,
    shortDescription,
    price,
    size,
    quantity,
    description,
    relatedProducts,
  } = object;

  // single product
  let content = "";
  let sizeOption = "";
  for (let i = 0; i < size.length; i++) {
    // console.log(size[i]);
    sizeOption += `<span>${size[i]}</span>`;
  }
  content += `
    <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 single-product-img">
        <!-- product img -->
        <img src="${image}" class="img-fluid" alt="">
    </div>
    <div class="col-sm-12 col-md-12 col-lg-7 col-xl-7">
        <!-- product detail -->
        <div class="single-product-card p-5">
            <h2>${name}</h2>
            <p>${categories[0].id}</p>
            <p>${shortDescription}</p>
            <h3>$${price}</h3>
            <span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><span>
            <div class="product_size"><p>Size:</p>${sizeOption}</div>
            <p>Quantity: ${quantity}</p>
            <button class="d-inline" id="btnAddToCart">ADD TO CART</button>
            <button class="d-inline" id="btnAddToFavorites">ADD TO FAVORITES</button>
        </div>
    </div>
    `;
  // console.log(content);
  document.querySelector(".single-product-area").innerHTML = content;

  // full description
  document.querySelector(".product-description").innerHTML = `
  <ul class="nav nav-tabs flex-sm-column flex-md-column flex-lg-row flex-xl-row" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
      type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">description</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
      type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">review</button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
        tabindex="0">
        <p>${description}</p>
    </div>
    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
        tabindex="0">
        <div class="review-wrap">
            <h2>Write a review</h2>
            <div class="row">
                <div class="mb-3">
                    <label for="" class="form-label"><span>*</span> Your name</label>
                    <input type="text" class="form-control" name="" id="" aria-describedby="helpId"
                        placeholder="" />
                </div>
                <div class="row">
                    <div class="mb-3">
                        <label for="" class="form-label"><span>*</span> Your review</label>
                        <input type="text" class="form-control" name="" id="" aria-describedby="helpId"
                            placeholder="" />
                    </div>
                </div>
                  <div class="row">
                      <div class="col">
                          <label class="control-label"><span>*</span> Rating</label>
                          <span> <br> Bad </span>
                          <input type="radio" value="1" name="rating">
                          <input type="radio" value="2" name="rating">
                          <input type="radio" value="3" name="rating">
                          <input type="radio" value="4" name="rating">
                          <input type="radio" value="5" name="rating">
                          <span>Good</span>
                      </div>
                  </div>
              </div>
          </div>

      </div>
  </div>
  `;

  // category
  let sameCategory = "<h2>Same Category:</h2>";
  for (let z = 0; z < relatedProducts.length; z++) {
    console.log(relatedProducts[z]);
    let { image, name, description, price } = relatedProducts[z];
    // console.log(alias);
    sameCategory += `
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
      <div class="related-product-card">
        <div class="product-layout">
          
          <div class="related-product-img">
            <img src="${image}" class="img-fluid" alt="">
          </div>
          
          <div class="related-product-info">
            <h3>${name}</h3>
            <span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
            <p>$${price}</p>
            <div style="display:none" class="action">add to cart</div>
          </div>
        </div>  
      </div>
    </div>
    `;
  }
  document.querySelector(".same-categories").innerHTML = sameCategory;
}
