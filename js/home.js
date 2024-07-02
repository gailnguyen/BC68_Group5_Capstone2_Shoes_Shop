"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Sử dụng IIFE, Closure, Context
const apps = (() => {
  const overlay = $("[data-overlay]");
  const openBtn = $("[data-nav-open-btn]");
  const closeBtn = $("[data-nav-close-btn]");
  const navbar = $("[data-navbar]");
  const api = "https://shop.cyberlearn.vn/api/Product";

  // Hàm gọi Api
  async function getApi() {
    try {
      let res = await fetch(api);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      let data = await res.json();
      return data.content;
    } catch (error) {
      console.log("Error fetching data:", error);
      return [];
    }
  }

  return {
    addEvent(eventype, elements, func) {
      for (let element of elements) {
        element.addEventListener(eventype, func);
      }
    },

    toggleClass() {
      overlay.classList.toggle("active");
      navbar.classList.toggle("active");
    },

    // Hàm render ra html
    render(list) {
      let html = list
        .map((shoe) => {
          let desc = shoe.shortDescription.split(":");

          return `
            <li class="product-item">
            <div class="product-card">
              <figure class="card-banner">
                <img
                  src="${shoe.image}"
                  alt="Shoes"
                  class="card-img"
                  width="312"
                  height="350"
                  loading="lazy"
                />
        
                <div class="card-badge">New</div>
        
                <ul class="card-action-list">
                  <li class="card-action-item">
                    <button
                      class="card-action-btn"
                      aria-labelledby="card-label-1"
                    >
                      <ion-icon name="cart-outline"></ion-icon>
                    </button>
        
                    <div class="card-tooltip" id="card-label-1">
                      Add to Cart
                    </div>
                  </li>
        
                  <li class="card-action-item">
                    <button
                      class="card-action-btn"
                      aria-labelledby="card-label-2"
                    >
                      <ion-icon name="heart-outline"></ion-icon>
                    </button>
        
                    <div class="card-tooltip" id="card-label-2">
                      Add to Whishlist
                    </div>
                  </li>
        
                  <li class="card-action-item">
                    <button
                      class="card-action-btn"
                      aria-labelledby="card-label-3"
                    >
                      <ion-icon name="eye-outline"></ion-icon>
                    </button>
                    <div class="card-tooltip" id="card-label-3">
                      Quick View
                    </div>
                  </li>
        
                  <li class="card-action-item">
                    <button
                      class="card-action-btn"
                      aria-labelledby="card-label-4"
                    >
                      <ion-icon name="repeat-outline"></ion-icon>
                    </button>
        
                    <div class="card-tooltip" id="card-label-4">Compare</div>
                  </li>
                </ul>
              </figure>
        
              <div class="card-content">
                <h3 class="card-title h3">
                  <a href="./detail.html">${shoe.name}</a>
                </h3>
                <p class="card-text">${desc[1]}</p>
                <data class="card-price" value=" ${shoe.price}">$${shoe.price}</data>
              </div>
            </div>
          </li>`;
        })
        .join("");

      $("[data-product]").innerHTML = html;
    },

    async init() {
      // Xử lí event click nav trên mobile
      this.addEvent("click", [openBtn, overlay, closeBtn], this.toggleClass);

      // Gọi Api và render ra html
      let data = await getApi();
      if (data) {
        let listShoes = data.slice(0, 8);
        this.render(listShoes);
      } else {
        alert("Lấy dữ liệu thất bại, vui lòng F5 lại trang");
      }
    },
  };
})();

apps.init();
