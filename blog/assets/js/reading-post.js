$(()=>{
    const url = new URL(window.location.href); // or use the full string if not in browser
    const params = new URLSearchParams(url.search);
    const id = params.get("id");

    axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
    .then((r) => {
        const post = r.data.data;
        tableFiller("articleContent", [post], readingPostBody);
    })
});

const readingPostBody = (data) => {
    return `
        <div class="article-header">
            <span class="article-category">${data.category.name.toUpperCase()}</span>
            <h1 class="article-title">${data.title}</h1>
            <div class="article-meta">
                <span><i class="far fa-user"></i> ${data.author.name}</span>
                <span><i class="far fa-calendar"></i> ${formatDate(data.publishedAt)}</span>
                <span><i class="far fa-clock"></i> ${wordCount(data.content)} min leitura</span>
                <span><i class="far fa-comment"></i> 24 Comentários</span>
            </div>
        </div>
        
        <div class="featured-image">
            <img src="${data.postImg}" class="w-100 h-100 object-fit-cover rounded">
        </div>
        
        <div class="article-body">
            ${data.content}
        </div>
        
        <div class="article-footer">
            <div class="tags-section">
                <div class="tags-title">Tags:</div>
                <div class="tags">
                    <a href="#" class="tag">Prospecção Mineral</a>
                    <a href="#" class="tag">Geofísica</a>
                    <a href="#" class="tag">Moçambique</a>
                    <a href="#" class="tag">Tete</a>
                    <a href="#" class="tag">SIG</a>
                    <a href="#" class="tag">Tecnologia</a>
                </div>
            </div>
            
            <div class="social-sharing">
                <a href="#" class="social-btn facebook">
                    <i class="fab fa-facebook-f"></i> Compartilhar
                </a>
                <a href="#" class="social-btn twitter">
                    <i class="fab fa-twitter"></i> Tweetar
                </a>
                <a href="#" class="social-btn linkedin">
                    <i class="fab fa-linkedin-in"></i> Compartilhar
                </a>
                <a href="#" class="social-btn whatsapp">
                    <i class="fab fa-whatsapp"></i> Enviar
                </a>
            </div>
            
            <div class="author-info">
                <div class="author-avatar"></div>
                <div class="author-details">
                    <h3>Dr. Ubaldo Gemusse</h3>
                    <p>Geólogo com mais de 15 anos de experiência em prospecção mineral e gestão de recursos. Especialista em geologia econômica e tecnologias de exploração mineral. Atualmente atua como consultor para projetos de mineração em Moçambique e países vizinhos.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-researchgate"></i></a>
                        <a href="#"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>
            </div>
            
            <div class="navigation-buttons">
                <a href="#" class="nav-btn">
                    <i class="fas fa-arrow-left"></i> Artigo Anterior
                </a>
                <a href="#" class="nav-btn">
                    Próximo Artigo <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    
    `;
}