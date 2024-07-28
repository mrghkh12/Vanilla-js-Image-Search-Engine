const $ = document;

const imageContainer = $.querySelector(".image-container");
const loadMoreBtn = $.querySelector(".more-img-btn");
const searchInput = $.querySelector(".search-box input");
const lightBoxElem = $.querySelector(".lightBox");
const closeLightBoxBtn = lightBoxElem.querySelector(".uil-times");
const dlLightBoxBtn = lightBoxElem.querySelector(".uil-import");

const apiKey = "1JFcrBeutxzbXKbDXJacTLeidhb6FDb51Bi4I5Lw6D7NTgTj8p7kIxyR";

const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgURL) => {
  fetch(imgURL)
    .then((res) => res.blob())
    .then((file) => {
      const dlElem = $.createElement("a");
      dlElem.href = URL.createObjectURL(file);
      dlElem.download = new Date().getTime();
      dlElem.click();
    })
    .catch(() => alert("Failed to download image!"));
};

const showLightBox = (photographer, img) => {
  lightBoxElem.querySelector(".photoGrapher span").innerHTML = photographer;
  lightBoxElem.querySelector(".preview-img img").src = img;
  dlLightBoxBtn.setAttribute("data-imgURL", img);
  lightBoxElem.classList.add("show");
  $.body.style.overflow = "hidden";
};
const hideLightBox = () => {
  lightBoxElem.classList.remove("show");
  $.body.style.overflow = "auto";
};

const generateImgElement = (imgData) => {
  imgData.forEach((imgItem) => {
    imageContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="img-card" onclick="showLightBox('${imgItem.photographer}', '${imgItem.src.large2x}')">
                <img src="${imgItem.src.large2x}">

                <div class="details">
                    <div class="photoGrapher">
                        <i class="uil uil-camera"></i>
                        <span>${imgItem.photographer}</span>
                    </div>
                    <button class="dl-btn" onclick='downloadImg("${imgItem.src.large2x}");event.stopPropagation();'><i class="uil uil-import"></i></button>
                </div>
            </li>`
    );
  });
};

async function getImages(apiURL) {
  loadMoreBtn.innerText = "Loading...";
  loadMoreBtn.classList.add("disabled");
  let response = await fetch(apiURL, { headers: { Authorization: apiKey } });
  let data = await response.json();
  if (data.photos.length > 0) generateImgElement(data.photos);
  else alert("Failed to load images!");
  loadMoreBtn.innerText = "Load More";
  loadMoreBtn.classList.remove("disabled");
}

const loadMoreImage = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiURL = searchTerm
    ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`
    : apiURL;
  getImages(apiURL);
};

const loadSearchImage = (e) => {
  if (e.target.value.trim() === "") return (searchTerm = null);
  if (e.key === "Enter") {
    currentPage = 1;
    searchTerm = e.target.value;
    imageContainer.innerHTML = "";
    getImages(
      `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`
    );
  }
};

getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);
loadMoreBtn.addEventListener("click", loadMoreImage);
closeLightBoxBtn.addEventListener("click", hideLightBox);
dlLightBoxBtn.addEventListener("click", (e) =>
  downloadImg(e.target.dataset.imgurl)
);
searchInput.addEventListener("keyup", loadSearchImage);
