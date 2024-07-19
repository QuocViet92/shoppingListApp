import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase ,ref, push , onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSetting ={
    databaseURL :"https://mobileapp-47c39-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSetting)
const database = getDatabase(app)
const movieInDb= ref(database ,"ShoppingList")
let inputName = document.getElementById("inpMovie")
const shopping = document.getElementById("shopping-list")


document.getElementById("add-btn").addEventListener("click", function(){
    let inputValue = inputName.value
    push(movieInDb , inputValue)
    clearInputFieldEl()
})



function appendItemToShoppingListEl(item) {
    let itemId= item[0]
    let itemValue = item[1]
   let newEl = document.createElement("li")
   newEl.textContent = itemValue
   shopping.append(newEl)

   newEl.addEventListener("click",function(){
    console.log(itemId)
    let removeEl = ref(database,`ShoppingList/${itemId}`)
    remove(removeEl)
})
}

function clearInputFieldEl() {
    inputName.value = " "
}

onValue(movieInDb , function(snapshot){
    if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())
    shopping.innerHTML=" "
    for(let i of itemsArray){
        appendItemToShoppingListEl(i)
    }}
    else{
        shopping.innerHTML =" No Item"
    }
})