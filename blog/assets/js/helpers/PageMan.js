var pageDetails = {
    currentPageIndex: 1,
    itemsPerPage: 6,
    currentSlice: [],
    list: [],
    maxPages: 0,
    navigation: {
        show:true,
        navigatorSize: "sm",
        curentPageHolder:"#current-page",
        wholePageHolder:"#whole-pages",
        navWrapper:"#nav-wrapper"
    }
}

/**
 * Process a recipe.
 *
 * @param {Object} pageDetail - An object representing the pageDetails to work with.
 *
 * */
function initPageObject(pageDetail){
    pageDetails = {...pageDetails, ...pageDetail};
    pageDetails.maxPages = pageDetails.list.length / pageDetails.itemsPerPage;
    return pageDetails;
}

function currentPage() {
    $(pageDetails.navigation.curentPageHolder).text(pageDetails.currentPageIndex);
    $(pageDetails.navigation.wholePageHolder).text(pageDetails.maxPages);
}

function previous() {
    const previousPage = pageDetails.currentPageIndex - 1;
    const firstPage = 1;
    let findPrev = previousPage >= firstPage ? previousPage : undefined;
    if (findPrev !== undefined) {
        pageDetails.currentPageIndex--;
        return displayedItems(pageDetails.currentSlice);
    }
}

function next() {
    const nextPage = pageDetails.currentPageIndex + 1;
    let findNext = nextPage <= pageDetails.maxPages ? nextPage : undefined;
    if (findNext !== undefined) {
        pageDetails.currentPageIndex++;
        return displayedItems(pageDetails.currentSlice);
    }
}

function displayedItems(payload = pageDetails.list) {
    const pageNumber = pageDetails.currentPageIndex;
    const firstItemIndex = (pageNumber - 1) * pageDetails.itemsPerPage;
    const lastItemIndex = pageNumber * pageDetails.itemsPerPage;
    pageDetails.maxPages = Math.ceil(payload.length / pageDetails.itemsPerPage);
    let slice = payload.slice(firstItemIndex, lastItemIndex);
    currentPage();
    //show naviagtor
    if(pageDetails.list.length>pageDetails.itemsPerPage) {
        if(pageDetails.navigation.show){
            if (pageDetails.navigation.navigatorSize==="sm"){
                $(pageDetails.navigation.navWrapper).append(smNavigator())
            }else{
                $(pageDetails.navigation.navWrapper).append(lgNavigator())
            }
            pageDetails.navigation.show = false;
        }
    }
    return slice;
}

function search(field, haystack) {
    pageDetails.currentSlice = pageDetails.list.filter(item =>
        item && typeof item[field] !== 'undefined' && item[field] !== null &&
        (
            (typeof item[field] === 'string' && item[field].toLowerCase().includes(haystack.toLowerCase())) ||
            (typeof item[field] === 'boolean' && item[field] === true)
        )
    );
    pageDetails.currentPageIndex = 1;
    return pageDetails.currentSlice;
}

function smNavigator(){
    return `
        <div class="d-flex justify-content-between mt-3">
            <button
                onclick="previousPage()"
                class="btn">
                <i class="fa fa-arrow-circle-left"></i>
            </button>
            <span class="ml-3 py-2">
                Página <a id="current-page">${pageDetails.currentPageIndex}</a> de
                <span id="whole-pages">${pageDetails.maxPages}</span>
            </span>
            <button
                onclick="nextPage()"
                class="btn">
                <i class="fa fa-arrow-circle-right"></i>
            </button>
        </div>
    `;
}

function lgNavigator(){
    return `
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button  onclick="previousPage()"
                     class="mr-5 btn"
            >Anterior</button>
            <span class="ml-3 py-2">
                Página <a id="current-page">${pageDetails.currentPageIndex}</a> de
                <span id="whole-pages">${pageDetails.maxPages}</span>
            </span>
            <button  onclick="nextPage()"
                     class="mr-5 btn"
            >Proximo</button>
        </div>
    `;
}
