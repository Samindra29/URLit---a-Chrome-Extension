const inputbtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const saveTabbtn = document.getElementById("saveTab-btn")
const deletebtn = document.getElementById("delete-btn")
let ulEl = document.getElementById("ul-el")
let myurl = []
const urlsFromLocalStorage = JSON.parse(localStorage.getItem("myurl"))


if (urlsFromLocalStorage){   
    myurl = urlsFromLocalStorage
    render(myurl)
}

function render(arr){
    let listitems = ""
    for(var i = 0; i < arr.length; i++){
        listitems += `
            <li>
                <a href='${arr[i]}'>
                    ${arr[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listitems
}

inputbtn.addEventListener("click", function(){
    myurl.push(inputEl.value)
    inputEl.value = ""

    localStorage.setItem("myurl", JSON.stringify(myurl))
    render(myurl)
})

saveTabbtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myurl.push(tabs[0].url)
        localStorage.setItem("myurl", JSON.stringify(myurl))
        render(myurl)
    })
})

deletebtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myurl = []
    render(myurl)
})



    