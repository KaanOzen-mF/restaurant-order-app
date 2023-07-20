import {menuArray} from './data.js'

const orderSection = document.getElementById("order-part")
const cardInfo = document.getElementById("card-details")
const orderSuccess = document.getElementById("order-success")
const closeBtn = document.getElementById("close-btn")

const orderBtn = document.getElementById("order-btn")
orderBtn.addEventListener("click", () => {
    cardInfo.style.display = "flex"
})

closeBtn.addEventListener("click", ()=> {
    cardInfo.style.display = "none"
})

const payBtn = document.getElementById("pay-btn")
payBtn.addEventListener("submit", () => {
    event.preventDefault()
    cardInfo.style.display = "none"
    orderSection.style.display = "none"
    orderSuccess.style.display = "flex"
})

document.addEventListener('click', function(e){
    if(e.target.dataset.foodid){
       handleAddClick(e.target.dataset.foodid)
    }
    if(e.target.dataset.removeid){
        handleRemoveClick(e.target.dataset.removeid)
    }
})

let totalPrice  = []

function sumArray(arr){
    let sum = 0
    arr.forEach( item => {
        sum += item;
    });
    return sum;
    
}
function handleRemoveClick(){
    document.getElementById("order-cart").remove()
}

function handleAddClick(foodId){
    const targetFoodObj = menuArray.filter(function(food){
        return food.id == foodId
    })[0]
    let orders = `           
                    <div id="order-cart">
                        <div id="order-info">
                            <p id="order-name">${targetFoodObj.name}</p>
                            <p id="order-remove" data-removeid="${targetFoodObj.id}">remove</p>
                        </div>
                        <p>$${targetFoodObj.price}</p>
                    </div>
                    ` 
    let totalCost = `
                        <p>Total Price</p>
                        <p>$${targetFoodObj.price+sumArray(totalPrice)}</p>
                    `
    document.getElementById("order-container").innerHTML += orders
    document.getElementById("total-price").innerHTML = totalCost
    totalPrice.push(targetFoodObj.price)
    render()
}


const getFoods = () => {
    let meals = ``
    menuArray.forEach(food => 
        meals += `
            <div class="meal-cards">
                <div class="meal-card">
                    
                    <div class="meal">
                        <img src="${food.image}">
                        <div class="meal-info">
                            <p>${food.name}</p>
                            <p>${food.ingredients}</p>
                            <p>$${food.price}</p>
                        </div>
                    </div>
                    <button id="item-add-btn" data-foodid="${food.id}">+</button>
                </div>
            </div>
            <div class="line"></div>`
    )  
    
 return meals  
}


function render(){
    document.getElementById("meal-part").innerHTML = getFoods()
}

render()