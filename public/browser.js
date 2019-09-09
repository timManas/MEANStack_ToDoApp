document.addEventListener("click", function(event){
    // Update
    if(event.target.classList.contains("edit-me")) {
        let userInput = prompt("you clicked Edit button", event.target.parentElement.parentElement.querySelector(".item-text").innerHTML)

        if(userInput){
            // This will return a Promise
            axios.post("/update-item",{text: userInput, id: event.target.getAttribute("data-id")}).then(function() {
                event.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(function() {
                console.log("Please try again later")
            })          // On the fly post request
        }
    }


    // Delete
    if(event.target.classList.contains("delete-me")) {
        if(confirm("Do you want to Delete Permanately ?")) {        // Create a confirm pop up

            axios.post("/delete-item",{id: event.target.getAttribute("data-id")}).then(function() {
                event.target.parentElement.parentElement.remove()
            }).catch(function() {
                console.log("Please try again later")
            })          // On the fly post request



        }
            
    }


})