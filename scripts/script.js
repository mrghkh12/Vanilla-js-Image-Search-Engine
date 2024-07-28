const $ = document

const imageContainer = $.querySelector('.image-container')
const loadMoreBtn = $.querySelector('.more-img-btn')
const searchInput = $.querySelector('.search-box input')

const apiKey = '1JFcrBeutxzbXKbDXJacTLeidhb6FDb51Bi4I5Lw6D7NTgTj8p7kIxyR'

const perPage = 15;
let currentPage = 1;
let searchTerm = null


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
    loadMoreBtn.innerText = 'Loading...'
    loadMoreBtn.classList.add('disabled')
    let response = await fetch(apiURL, { headers: { Authorization: apiKey } });
    let data = await response.json();
    generateImgElement(data.photos);
    loadMoreBtn.innerText = 'Load More'
    loadMoreBtn.classList.remove('disabled')
}

const loadMoreImage = () =>{
    currentPage++
    getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`)
}

const loadSearchImage = e => {
    if(e.key === 'Enter'){
       currentPage = 1
       searchTerm = e.target.value
       imageContainer.innerHTML = ''
       getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`)
    }
}


getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`)
loadMoreBtn.addEventListener('click' , loadMoreImage)
searchInput.addEventListener('keyup' , loadSearchImage)