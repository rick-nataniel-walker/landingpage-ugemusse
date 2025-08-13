const wordCount = (words) => {
    const wordLength = words.split(" ").length;
    return Math.ceil(wordLength/200);
}


function pagination(itemPerpage,currentPageIndex) {
     const pages = [];
    for(let i=0; i < itemPerpage; i++) {
        pages.push(i+1);
    }
    tableFiller("pagArea", pages, btnRender(pages,currentPageIndex, itemPerpage));
}

function btnRender(index,currentPageIndex, maxPages) {
    return function (index) {
        let activePage = index===currentPageIndex ? "active" : "";
        return `
          <button class="page-link ${activePage}" onclick="pagination(${maxPages},${index})">${index}</button>
        `
    };
}