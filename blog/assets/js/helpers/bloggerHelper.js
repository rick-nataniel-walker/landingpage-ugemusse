let globalPageDetails;

const wordCount = (words) => {
    const wordLength = words.split(" ").length;
    return Math.ceil(wordLength/200);
}


function pagination(currentPageIndex = pageDetails.currentPageIndex, callback=null) {
     const pages = [];
     pageDetails.currentPageIndex = currentPageIndex;
     globalPageDetails = pageDetails;
    for(let i=0; i < pageDetails.maxPages; i++) {
        pages.push(i+1);
    }
    tableFiller("pagArea", pages, btnRender(pages));
    renderPosts(pageDatils.list);
}

function btnRender(pages) {
    return function (pages) {
        let activePage = pages===pageDetails.currentPageIndex ? "active" : "";
        return `
          <button class="page-link ${activePage}" 
            onclick="pagination(${pages})">
                ${pages}
          </button>
        `
    };
}