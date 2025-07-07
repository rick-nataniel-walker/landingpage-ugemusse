$(()=>{
    axios.get('http://127.0.0.1:8000/api/posts').
        then((r) => {
            const posts = r.data.data;
            const leadingPost = posts.splice(0, 1);
            localStorage.setItem("readingPost", JSON.stringify(leadingPost))
            tableFiller("latestPost", leadingPost, latestPost);
            tableFiller("blogCard", posts, blogCard);
    })
});

const readingPostBody = (data) => {

}

const blogCard = (data) => {
  return `
    <div class="blog-card" >
        <div class="blog-image" style="background-image: url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80');"></div>
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
                <span><i class="far fa-clock"></i> 8 min leitura</span>
            </div>
            <p class="featured-excerpt">${data.excerpt}</p>
            <a href="reading-page.html" class="read-more">
                Ler Artigo Completo <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
  `;
}