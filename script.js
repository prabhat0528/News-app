let key = "9ead3c093bb34ee9ae36e4856e9b2139";
let cardData = document.querySelector('.cardData');
let searchBtn = document.querySelector('.searchBtn');
let searchBox = document.querySelector('.searchBox');
let type=document.querySelector('.type');

const getData = async (input = "india") => { // Default search query
    try {
        let response = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`);
        let data = await response.json();

        // Clear old data before appending new articles
        cardData.innerHTML = '';

        type.innerText="Search: "+input;
        searchBox.value="";

        data.articles.forEach(article => {
            let divCard = document.createElement('div');
            divCard.classList.add("card");
            cardData.appendChild(divCard);

            divCard.innerHTML = `
                <img src="${article.urlToImage}" alt="news image">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
            `;
            divCard.addEventListener('click',()=>{
                window.open(article.url);
            })
        });
    } catch (error) {
        console.error("Error fetching the news data:", error);
    }
};

searchBtn.addEventListener('click', function () {
    getData(searchBox.value);
});

function navClick(navName){
    getData(navName);
}

// Initial data load with default query
getData();
