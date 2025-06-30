$(()=>{
    axios.get('http://127.0.0.1:8000/api/posts').
        then((r) => {
            const posts = r.data.data;
            tableFiller("blogCard", posts, blogCard);
    })
});

const blogCard = (data) => {
  return `
    <div class="blog-card" >
        <div class="blog-image" style="background-image: url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80');"></div>
        <div class="blog-content">
            <span class="blog-category">${data.category.name}</span>
            <h3 class="blog-title">${data.title}</h3>
            <p class="blog-excerpt">${data.excerpt}</p>
            <div class="blog-meta">
                <span class="blog-date"><i class="far fa-calendar"></i> ${data.publishedAt}</span>
                <span>12 Comentários</span>
            </div>
        </div>
    </div>
  `;
}