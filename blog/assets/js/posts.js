
var pageSpecs = {
    sliceIndex: 0,
    minPaginationSlice: 3,
    currentPagSlice: 3,
}

function renderPosts() {
    tableFiller("blogCard", displayedItems(), blogCard);
}

$(()=>{
    axios.get('http://127.0.0.1:8000/api/posts').
        then((r) => {
            const posts = r.data.data;
            const leadingPost = posts.splice(0, 1);
            tableFiller("latestPost", leadingPost, latestPost);
            pageSpecs.list = posts;
            pageSpecs = initPageObject(pageSpecs);
            pagination();
    });


});

const blogCard = (data) => {
  return `
    <a href="reading-page.html?id=${data.id}" style="outline: none; text-decoration: none">
        <div class="blog-card" >
            <div class="blog-image" style="background-image: url('${data.postImg}');"></div>
            <div class="blog-content">
                <span class="blog-category">${data.category.name.toUpperCase()}</span>
                <h3 class="blog-title">${data.title}</h3>
                <p class="blog-excerpt">${data.excerpt}</p>
                <div class="blog-meta">
                    <span class="blog-date"><i class="far fa-calendar"></i> ${formatDate(data.publishedAt)}</span>
                    <span>12 Comentários</span>
                </div>
            </div>
        </div>
    </a>
  `;
}

const latestPost = (data) => {
  return `
    <div class="featured-image">
        <div class="featured-content">
            <span class="featured-category">${data.category.name.toUpperCase()}</span>
            <h2 class="featured-title">${data.title}</h2>
            <div class="featured-meta">
                <span><i class="far fa-user"></i> ${data.author.name}</span>
                <span><i class="far fa-calendar"></i> ${formatDate(data.publishedAt)}</span>
                <span><i class="far fa-clock"></i> ${wordCount(data.content)} min leitura</span>
            </div>
            <p class="featured-excerpt">${data.excerpt}</p>
            <a href="reading-page.html?id=${data.id}" class="read-more">
                Ler Artigo Completo <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
  `;
}