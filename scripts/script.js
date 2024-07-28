const $ = document

const apiKey = '1JFcrBeutxzbXKbDXJacTLeidhb6FDb51Bi4I5Lw6D7NTgTj8p7kIxyR'

const perPage = 15;
let currentPage = 1;

async function getImages(apiURL) {
    let responce = await fetch(apiURL, { headers: { Authorization: apiKey } });
    let data = await responce.json();
    console.log(data);
}


getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`)