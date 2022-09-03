//display menu links
const loadAllNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => setAllMenu(data.data.news_category))
}
const setAllMenu = news_category => {
    const setMenu = document.getElementById('nav-menu')
    news_category.forEach(category => {
        const link = document.createElement('a')
        link.innerHTML = `<a onclick="getMenuNews('${category.category_id}')"  class="fw-bolder border-2 btn btn-outline-primary" href="#">${category.category_name}</a>`
        setMenu.appendChild(link)
    });
}

// spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}

// display menu news by click
const getMenuNews = (category_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showMenuNews(data.data))
    toggleSpinner(true)
}

const showMenuNews = data => {
    const showNews = document.getElementById('show-news')
    showNews.innerText = '';
    const searchField = document.getElementById('text-field')
    searchField.value = ''

    data.forEach(dat => {
        //get data length
        const itemsLength = `${data.length} Items are Found.`;
        searchField.value = itemsLength

        const makeDiv = document.createElement('div')
        makeDiv.innerHTML = `
        <div class="card mb-3 mt-4  style=" max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${dat.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${dat.title ? dat.title : 'No title found'}</h5>
                            <p class="card-text">${dat.details.slice(0, 200) + '...'}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                        <div class="d-flex px-3 justify-content-between">
                            <div class="d-flex">
                                <div class="mt-2">
                                    <img class="author" src="${dat.author.img}" alt="">
                                </div>

                                <div class="me-1">
                                    <h7>${dat.author.name ? dat.author.name : 'No Name Found.'}</h7>
                                    <p>${dat.author.published_date ? dat.author.published_date : 'Date not found.'}</p>
                                </div>
                            </div>

                            <div class="d-flex px-4 mt-2 ">
                                <div class="px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-eye" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path
                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                    </svg>
                                </div>
                                <div>${dat.total_view ? dat.total_view : 'no view'}</div>
                            </div>

                            <div>
                                <button onclick="loadNewsDetail('${dat._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                
                            </div>
                        </div>
                
                        
                    </div>
                </div>
            </div>
        
        
        
        `
        showNews.appendChild(makeDiv)

    })
    toggleSpinner(false)

}

// show detail by modal
const loadNewsDetail = news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => modalData(data.data))
}
const modalData = newId => {
    newId.forEach(news => {
        const modalTitle = document.getElementById('title-id')
        modalTitle.innerText = news.title
        const newsDetails = document.getElementById('news-details')
        newsDetails.innerText = news.details
    })
}

loadAllNews()



