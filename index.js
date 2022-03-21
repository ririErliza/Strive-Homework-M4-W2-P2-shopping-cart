/* Load books function */

// const loadBooks = () => {
//     const url = "https://striveschool-api.herokuapp.com/books"

// fetch (url)
// .then(response => response.json() )
// .then(data => {
//   console.log(data)
    
//     let cardsWrapper = document.querySelector ("#cardsWrapper")

 
//     cardsWrapper.innerHTML =""
//     data.forEach(element => {
//         const content=
//         `<div class="col-md-4 hideThis">
//         <div class="card mb-4 shadow-sm">
//                 <img src=${element.img} class="card-image img-fluid" />
//                 <div class="card-body">
//                   <p class="card-text">
//                     This is an image.
//                   </p>
//                   <div class="d-flex justify-content-between align-items-center">
//                     <div class="btn-group">
//                       <button type="button" class="btn btn-sm btn-outline-secondary">
//                         View
//                       </button>
//                       <button type="button" class="btn btn-sm btn-outline-secondary " onclick="hideFunction()">
//                         Hide
//                       </button>
//                     </div>
//                     <small class="text-muted">${element.title}</small>
//                   </div>
//                 </div>
//               </div>
//             </div>`

//             cardsWrapper.innerHTML += content
//     })
// })
// .catch(error => {
//     console.log(error)
// })
// }


const cardsWrapper = document.querySelector("#cardsWrapper")

    const loadBooks = () => {

      const url = "https://striveschool-api.herokuapp.com/books"

      fetch(url)
      .then(response => response.json())
      .then(booksArray => {
        console.log(booksArray)
        // DOM MANIPULATION WITH MAP

        cardsWrapper.innerHTML = booksArray.map(book => `

        <div class="col-6 col-md-3 mb-5 hideThis">
                    <div class="card h-100">
                            <img src="${book.img}" class="book-img card-img-top" alt="HTML">
                            <div class="card-body">
                                <h6 class="card-title text-truncate"> ${book.title} </h6>
                                <p class="card-text">${book.category}</p>
                                

                                <div>
                                    <span class="font-weight-bold price">$ ${book.price}</span>  
                                </div>
                            </div>

                            <div class="card-footer d-flex flex-row justify-content-between bg-light">
                                <button class="mr-3 btn btn-sm border border-secondary text-muted" onclick="hideFunction()">
                                    Hide
                                </button>
                    
                                <button class="mr-3 btn btn-sm" onclick="addToCart()">
                                <i class="bi bi-plus-square-fill"></i>
                                </button>
                            </div>

                    </div>
                </div>`).join("")





        })
    }

    /* hide function */

function hideFunction() {
    let x = document.querySelector(".hideThis");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  /* search function */

  const searchFunction = (event) =>{
    const url = "https://striveschool-api.herokuapp.com/books"

    const query =event.target.value
    console.log(query)

    fetch(url)
      .then(response => response.json())
      .then(booksArray => {
        cardsWrapper.innerHTML = booksArray.filter(book =>
          book.title.toLowerCase().includes(query.toLowerCase() ) )
          .map(book=> 
            `<div class="col-6 col-md-3 mb-5 hideThis">
                    <div class="card h-100">
                            <img src="${book.img}" class="book-img card-img-top" alt="HTML">
                            <div class="card-body">
                                <h6 class="card-title text-truncate"> ${book.title} </h6>
                                <p class="card-text">${book.category}</p>
                                

                                <div>
                                    <span class="font-weight-bold price">$ ${book.price}</span>  
                                </div>
                            </div>

                            <div class="card-footer d-flex flex-row justify-content-between bg-light">
                                <button class="mr-3 btn btn-sm border border-secondary text-muted" onclick="hideFunction()">
                                    Hide
                                </button>
                    
                                <button class="mr-3 btn btn-sm" onclick="addToCart()">
                                <i class="bi bi-plus-square-fill"></i>
                                </button>
                            </div>

                    </div>
                </div>`).join("")

  })
}




window.onload = () => {
  loadBooks();
  document.querySelector("input").addEventListener("change", searchFunction);
}