document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const bookResults = document.getElementById('bookResults');
    const genreTags = document.querySelectorAll('.genre-tag');

    // Função para gerar cor baseada no gênero
    function getGenreColor(genre) {
        const colors = {
            romance: '#FF71AD',
            fantasia: '#FFDD00',
            ficcao: '#2453D5',
            suspense: '#8B4513',
            manga: '#FF0000',
            manhwa: '#00AA00',
            manhua: '#0000FF',
            aventura: '#FFA500',
            scifi: '#800080',
            terror: '#000000'
        };
        return colors[genre] || '#666666';
    }

    // Função para criar capa genérica
    function createGenericCover(title, author, genre) {
        const color = getGenreColor(genre);
        return `
            <div style="width:100%; height:100%; background:linear-gradient(135deg, ${color} 0%, ${color}99 100%); display:flex; align-items:center; justify-content:center;">
                <div class="book-cover-content">
                    <div class="book-cover-title">${title}</div>
                    <div class="book-cover-author">${author}</div>
                </div>
            </div>
        `;
    }

    // Dados de livros populares em português brasileiro
    const popularBooks = {
        romance: [
    {
        title: "É Assim Que Acaba",
        author: "Colleen Hoover",
        category: "Romance",
        cover: "https://m.media-amazon.com/images/I/91r5G8RxqfL.jpg"
    },
    {
        title: "A Hipótese do Amor",
        author: "Ali Hazelwood",
        category: "Romance",
        cover: "https://m.media-amazon.com/images/I/81LTEfXYgcL.jpg"
    },
    {
        title: "Todas as Suas (Im)Perfeições",
        author: "Colleen Hoover",
        category: "Romance",
        cover: "https://m.media-amazon.com/images/I/81Vhnel+xxL.jpg"
    }
],
        fantasia: [
            {
                title: "Harry Potter e a Pedra Filosofal",
                author: "J.K. Rowling",
                category: "Fantasia",
                cover: "https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg"
            },
            {
                title: "O Nome do Vento",
                author: "Patrick Rothfuss",
                category: "Fantasia",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1270352123i/186074.jpg"
            },
            {
                title: "As Crônicas de Nárnia",
                author: "C.S. Lewis",
                category: "Fantasia",
                cover: "https://m.media-amazon.com/images/I/71yJLhQekBL._AC_UF1000,1000_QL80_.jpg"
            }
        ],
        ficcao: [
            {
                title: "Duna",
                author: "Frank Herbert",
                category: "Ficção Científica",
                cover: "https://m.media-amazon.com/images/I/81zN7udGRUL.jpg"
            },
            {
                title: "1984",
                author: "George Orwell",
                category: "Ficção Distópica",
                cover: "https://m.media-amazon.com/images/I/91g5gcjTxsL._UF1000,1000_QL80_.jpg"
            },
            {
                title: "Fahrenheit 451",
                author: "Ray Bradbury",
                category: "Ficção Científica",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1383718290i/13079982.jpg"
            }
        ],
        suspense: [
            {
                title: "A Paciente Silenciosa",
                author: "Alex Michaelides",
                category: "Suspense",
                cover: "https://m.media-amazon.com/images/I/91R8S52UP6L.jpg"
            },
            {
                title: "O Homem de Giz",
                author: "C.J. Tudor",
                category: "Suspense",
                cover: "https://m.media-amazon.com/images/I/91o6FMAy8UL._AC_UF1000,1000_QL80_.jpg"
            },
            {
                title: "Garota Exemplar",
                author: "Gillian Flynn",
                category: "Suspense",
                cover: "https://m.media-amazon.com/images/I/510k5EkYuWL._AC_UF1000,1000_QL80_.jpg"
            }
        ],
        manga: [
            {
                title: "One Piece - Volume 1",
                author: "Eiichiro Oda",
                category: "Mangá",
                cover: "https://m.media-amazon.com/images/I/716EGgqzyOL._AC_UF1000,1000_QL80_.jpg"
            },
            {
                title: "Attack on Titan - Volume 1",
                author: "Hajime Isayama",
                category: "Mangá",
                cover: "https://m.media-amazon.com/images/I/81qPzeEO5IL.jpg"
            },
            {
                title: "Demon Slayer - Volume 1",
                author: "Koyoharu Gotouge",
                category: "Mangá",
                cover: "https://m.media-amazon.com/images/I/71oZmNhST-L._AC_UF1000,1000_QL80_.jpg"
            }
        
        ],
        aventura: [
            {
                title: "Percy Jackson e o Ladrão de Raios",
                author: "Rick Riordan",
                category: "Aventura",
                cover: "https://m.media-amazon.com/images/I/61JenSx3wKL._AC_UF1000,1000_QL80_.jpg"
            },
            {
                title: "As Aventuras de Sherlock Holmes",
                author: "Arthur Conan Doyle",
                category: "Aventura",
                cover: "https://m.media-amazon.com/images/I/613LTnr4lgL._AC_UF1000,1000_QL80_.jpg"
            },
            {
                title: "A Ilha do Tesouro",
                author: "Robert Louis Stevenson",
                category: "Aventura",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1485248909i/295.jpg"
            }
        ],
        scifi: [
            {
                title: "Fundação",
                author: "Isaac Asimov",
                category: "Ficção Científica",
                cover: "https://cdn.awsli.com.br/386/386942/produto/278423443/8d21bf85468f7f9d8f2c4c7bfd4b7543-z7vpl0fmiw.jpg"
            },
            {
                title: "Neuromancer",
                author: "William Gibson",
                category: "Cyberpunk",
                cover: "https://m.media-amazon.com/images/I/91Bx5ilP+EL._AC_UF1000,1000_QL80_.jpg"
            },
            {
                title: "O Fim da Infância",
                author: "Arthur C. Clarke",
                category: "Ficção Científica",
                cover: "https://m.media-amazon.com/images/I/71aSbmu4MzL.jpg"
            }
        ],
        terror: [
            {
                title: "It: A Coisa",
                author: "Stephen King",
                category: "Terror",
                cover: "https://m.media-amazon.com/images/I/91g9Dvtf+jL.jpg"
            },
            {
                title: "O Iluminado",
                author: "Stephen King",
                category: "Terror",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg"
            },
            {
                title: "Drácula",
                author: "Bram Stoker",
                category: "Terror",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387151694i/17245.jpg"
            }
        ]
    
    };

    // Função para exibir livros
    function displayBooks(books, genre) {
        bookResults.innerHTML = '';
        
        if (!books || books.length === 0) {
            bookResults.innerHTML = '<div class="no-results">Nenhum livro encontrado para esta categoria/gênero.</div>';
            return;
        }
        
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            
            bookCard.innerHTML = `
                <div class="book-cover">
                    <img src="${book.cover}" alt="Capa do livro ${book.title}" class="book-cover-image">
                </div>
                <div class="book-info">
                    <div>
                        <div class="book-title">${book.title}</div>
                        <div class="book-author">${book.author}</div>
                    </div>
                    <div class="book-category">${book.category}</div>
                </div>
            `;
            
            bookResults.appendChild(bookCard);
        });
    }

    // Função para buscar livros por gênero
    function searchBooks(genre) {
        bookResults.innerHTML = '<div class="loading">Carregando...</div>';
        
        // Simular um pequeno delay para melhor experiência
        setTimeout(() => {
            if (popularBooks[genre]) {
                displayBooks(popularBooks[genre], genre);
            } else {
                bookResults.innerHTML = '<div class="no-results">Nenhum livro encontrado para esta categoria/gênero.</div>';
            }
        }, 500);
    }

    // Event listener para iniciar a busca ao pressionar 'Enter'
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim().toLowerCase();
            if (query) {
                // Mapear termos em português para as chaves
                const genreMap = {
                    'romance': 'romance',
                    'fantasia': 'fantasia',
                    'ficção': 'ficcao',
                    'ficcao': 'ficcao',
                    'suspense': 'suspense',
                    'mangá': 'manga',
                    'manga': 'manga',
                    'manhwa': 'manhwa',
                    'manhua': 'manhua',
                    'aventura': 'aventura',
                    'ficção científica': 'scifi',
                    'scifi': 'scifi',
                    'ciência': 'scifi',
                    'terror': 'terror',
                    'horror': 'terror'
                };
                
                const genre = genreMap[query] || query;
                searchBooks(genre);
            }
        }
    });

    // Event listeners para os gêneros
    genreTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const genre = this.getAttribute('data-genre');
            searchInput.value = this.textContent;
            searchBooks(genre);
        });
    });

    // Buscar livros de romance por padrão ao carregar a página
    searchBooks('romance');
});