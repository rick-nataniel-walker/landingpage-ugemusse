let globalPageDetails;

const wordCount = (words) => {
    const wordLength = words.split(" ").length;
    return Math.ceil(wordLength/200);
}


function pagination(currentPageIndex = pageSpecs.currentPageIndex, callback=null) {
    const pages = [];
    pageSpecs.currentPageIndex = currentPageIndex;
    globalPageDetails = pageSpecs;
    for(let i=pageSpecs.sliceIndex; i < pageSpecs.currentPagSlice; i++) {
        pages.push(i+1);
    }

    tableFiller("pagArea", pages, btnRender(pages));
    renderPosts();
}

function next() {
    if(pageSpecs.currentPagSlice < pageSpecs.maxPages) {
        pageSpecs.sliceIndex++;
        pageSpecs.currentPagSlice++;
    }
    nextPayload();
    pagination();
}

function previous() {
    if(pageSpecs.currentPagSlice >= pageSpecs.minPaginationSlice && pageSpecs.sliceIndex>0) {
        pageSpecs.sliceIndex--;
        pageSpecs.currentPagSlice--;
    }
    previousPayload();
    pagination();
}

function btnRender(pages) {
    return function (pages) {
        let activePage = pages===pageSpecs.currentPageIndex ? "active" : "";
        return `
          <button class="page-link ${activePage}" 
            onclick="pagination(${pages})">
                ${pages}
          </button>
        `
    };
}