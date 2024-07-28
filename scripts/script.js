const $ = document

const imageContainer = $.querySelector('.image-container')

const apiKey = '1JFcrBeutxzbXKbDXJacTLeidhb6FDb51Bi4I5Lw6D7NTgTj8p7kIxyR'

const perPage = 15;
let currentPage = 1;


const generateImgElement = (imgData) => {
    imgData.forEach(imgItem => {
        imageContainer.insertAdjacentHTML('beforeend' , 
            `<li class="img-card">
                <img src="${imgItem.src.large2x}">

                <div class="details">
                    <div class="photoGrapher">
                        <i class="uil uil-camera"></i>
                        <span>${imgItem.photographer}</span>
                    </div>
                    <button class="dl-btn"><i class="uil uil-import"></i></button>
                </div>
            </li>`
        )
    })
}

async function getImages(apiURL) {
    let response = await fetch(apiURL, { headers: { Authorization: apiKey } });
    let data = await response.json();
    generateImgElement(data.photos);
}


getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`)