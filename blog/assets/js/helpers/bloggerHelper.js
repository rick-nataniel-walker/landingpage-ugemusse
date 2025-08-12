const wordCount = (words) => {
    const wordLength = words.split(" ").length;
    return Math.ceil(wordLength/200);
}


function pagination(itemPerpage) {
    let pages = [];
    for(let i=0; i < itemPerpage; i++) {
        pages.push(i+1);
    }

    console.log(pages);
    tableFiller("pagArea", pages, btnRender);
}

function btnRender(index) {
    return `
          <button class="page-link active" onclick="">${index}</button>
    `;
}