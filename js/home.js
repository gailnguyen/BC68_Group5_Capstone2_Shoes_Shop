"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// XỬ LÍ EVENT CLICK NAV TRÊN MOBILE
const overlay = $("[data-overlay]");
const openBtn = $("[data-nav-open-btn]");
const closeBtn = $("[data-nav-close-btn]");
const navbar = $("[data-navbar]");

function addEvent(eventype, elements, func) {
  for (let element of elements) {
    element.addEventListener(eventype, func);
  }
}

function toggleClass() {
  overlay.classList.toggle("active");
  navbar.classList.toggle("active");
}

addEvent("click", [openBtn, overlay, closeBtn], toggleClass);

// XỬ LÍ THÊM CLASS ACTIVE CHO HEADER VÀ GO TO TOP KHI SCROLL
const header = $("[data-header]");
const goTopBtn = $("[data-go-top]");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

// XỬ LÍ GỌI API VÀ RENDER SẢN PHẨM
// Dùng IIFE, closure, context
const apps = (() => {
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
    // Hàm render ra html
    render(list, element, text) {
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
                  id=${shoe.id} onclick="handleItemClick(event)"
                />
        
                <div class="card-badge">${text}</div>
        
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

      element.innerHTML = html;
    },

    async init() {
      // Gọi Api và render ra html
      let data = await getApi();

      // Nếu tồn tại data, thì lấy data và gọi hàm render để render ra html.
      if (data) {
        let listShoes = data.slice(0, 8);

        let listSpecial = listShoes.filter((item) => {
          return item.price >= 280;
        });

        // Gọi hàm render
        this.render(listShoes, $("[data-product]"), "new");
        this.render(listSpecial, $("[data-special-product]"), "special");
      } else {
        alert("Lấy dữ liệu thất bại, vui lòng F5 lại trang");
      }
    },
  };
})();

apps.init();

// lấy id sản phẩm từ event onclick
function handleItemClick(event) {
  const itemId = event.target.id;
  console.log(itemId);
  window.location.href = `detail.html?id=${itemId}`;
}
