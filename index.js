/* Load books function */

let books = [];
const cardsWrapper = document.querySelector("#cardsWrapper")

    const loadBooks = () => {

      const url = "https://striveschool-api.herokuapp.com/books"

      fetch(url)
      .then(response => response.json())
      .then(booksArray => {
        books = booksArray;
        console.log(books)
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
                    
                                <button class="mr-3 btn btn-sm" onclick="addToCart('${String(book.asin)}',this)">
                                <i class="bi bi-plus-square-fill"></i>
                                </button>
                            </div>

                    </div>
                </div>`).join("")





        })
    }

    /* Add book to cart function */
    let shoppingCartList=[];
    function addToCart(asin, element){
      const book = books.find ((book) => book.asin == asin);
      shoppingCartList.push(book);
      console.log(shoppingCartList);

      insideShoppingCart();

      element.closest(".card").classList.add("clickedBook")

    }

    const shoppingCart = document.querySelector("#shoppingCart")
    function insideShoppingCart(){
      shoppingCart.innerHTML = "";

      shoppingCartList.forEach((book)=>{
        shoppingCart.innerHTML += `
        <table class="table table-borderless">
                <tbody>
                  <tr>
                  <th scope="row"> <button class="mr-3 btn btn-sm border border-secondary text-muted" onclick="deleteItem('${String(book.asin)}')">
                  delete
                  </button></th>
                    
                  
                    <th> ${book.title}</th>
                    <th><img src=${book.img} width="30" height="40" > </th>

                 
                    
                  </tr>
                </tbody>
              </table>`
              ;
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

      /* delete function for book inside shopping cart*/

function deleteItem(asin){
  const index =shoppingCartList.findIndex((book)=>book.asin === asin);

  if (index !== -1){
    shoppingCartList.splice(index,1)
  }
  insideShoppingCart();
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