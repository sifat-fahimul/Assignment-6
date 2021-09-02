const searchInput = document.getElementById('search-text');
const booksContainer = document.getElementById('books-container')
const errorDiv = document.getElementById('error-message');
const resultFund = document.getElementById('result-found')
const togglerSpinner = spinner => {
    document.getElementById('spinner').style.display = spinner;
}
const searchBtn = () => {
    const search = searchInput.value;
    if (search === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }
    togglerSpinner('block');
    searchInput.value = '';
    booksContainer.textContent = '';
    errorDiv.innerHTML = '';
    resultFund.innerText = '';
    const url = `https://openlibrary.org/search.json?q=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.docs))
}
const showData = (booksArray) => {
    if (booksArray.length === 0) {
        errorDiv.innerText = "NO Result Found";
    }
    else if (booksArray.length !== 0) {
        resultFund.innerText = `Your Result Found : ${booksArray.length}`
    }
    else {
        errorDiv.innerText = "";
    }
    booksArray.forEach((book) => {
        const url = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
        <div>
            <img src="${url ? url : 'book image not available'}" class="img-fluid rounded-start" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title"> book name:${book.title} </h5>
                <p class="card-text"> writer name: ${book.author_name[0]}</p>
                <p class="card-text"> book publisher: ${book.publisher_facet[0]}</p>
                <p class="card-text">publish date: ${book.publish_date[0]}<small class="text-muted"</small></p>
            </div>
        </div>
        `;
        booksContainer.appendChild(div);
        togglerSpinner('none');
    });
    togglerSpinner('none');
};