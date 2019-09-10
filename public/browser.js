function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}


let createField = document.getElementById("create-field")

// Create
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault()

    axios.post("/create-item", { text: createField.value }).then(function (response) {
        // Create HTML for new item
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createField.value = ""
        createField.focus()
    }).catch(function () {
        console.log("Please try again later")
    })          // On the fly post request



})

document.addEventListener("click", function (event) {
    // Update
    if (event.target.classList.contains("edit-me")) {
        let userInput = prompt("you clicked Edit button", event.target.parentElement.parentElement.querySelector(".item-text").innerHTML)

        if (userInput) {
            // This will return a Promise
            // Axios will send of a asynchronous call to the database WITHOUT having to reload the entire page
            axios.post("/update-item", { text: userInput, id: event.target.getAttribute("data-id") }).then(function () {
                event.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(function () {
                console.log("Please try again later")
            })          // On the fly post request
        }
    }


    // Delete
    if (event.target.classList.contains("delete-me")) {
        if (confirm("Do you want to Delete Permanately ?")) {        // Create a confirm pop up

            axios.post("/delete-item", { id: event.target.getAttribute("data-id") }).then(function () {
                event.target.parentElement.parentElement.remove()
            }).catch(function () {
                console.log("Please try again later")
            })          // On the fly post request



        }

    }


})