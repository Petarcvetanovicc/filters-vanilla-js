let filterProducts = [...products]

let productsSection = document.querySelector('main')
let form = document.querySelector('.form')
let searchInput = document.querySelector('.search')
let companyBtnSection = document.querySelector('.company-btn-section')

function displayProducts() {

    if(filterProducts.length < 1){
        productsSection.innerHTML = `<h4>No Items</h4>`
        return
    }

    productsSection.innerHTML = filterProducts.map(function (product) {
        return `<div class="product">
        <img src="${product.image}" alt="">
        <p class="product-title">${product.title}</p>
        <p class="product-price">${product.price}</p>
    </div>`
    }).join('')
}

displayProducts()

form.addEventListener('keyup', function(){
    let value = searchInput.value
    
    filterProducts = products.filter(function(product){
        return product.title.toLowerCase().includes(value)
    })

    displayProducts()
})

function displayButtons(){
    let companies = products.map(function(item){
        return item.company
    })
    let uniqueCompanies = ['all', ...new Set(companies)]
    
    companyBtnSection.innerHTML = uniqueCompanies.map(function(company){
        return `<button class="btn" data-id="${company}">${company}</button>`
    }).join('')
}
displayButtons()

companyBtnSection.addEventListener('click',function(e){
    const el = e.target
    
    if(el.dataset.id){
        if(el.dataset.id === 'all'){
            filterProducts = [...products];
        }
        else {
            filterProducts = products.filter(function(product){
                return product.company === el.dataset.id
            })
        }
    }
    searchInput.value = ''
    displayProducts()
})