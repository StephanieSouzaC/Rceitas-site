class Cardnews extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" }); // Cria uma virtual DOM e define que pode receber alterações de fora(atributos como href,src e dentre outros)
    currentIndex = 0;
    totalItems = this.shadowRoot.querySelectorAll('.section_team_cards_employee').length;
    constructor() {

        super();// construtor pai(HTMLElement)

        this.connectedCallback()

        this.shadow.appendChild(this.build())// adiciona um nó na árvore
        this.shadow.appendChild(this.styles())// adiciona um nó na árvore


        // EVENT LISTENER CLICK
        const cardRight = this.shadowRoot.querySelector('.prev-btn');
        cardRight.addEventListener('click', () => {
            this.prevSlide();
        });
        const next = this.shadowRoot.querySelector('.next-btn');
        next.addEventListener('click', () => {
            this.nextSlide();
        });


        // EVENT LISTENER WIDTH SCREEN
        window.addEventListener('resize', () => {
            var width = window.innerWidth;
            if (width >= 1000) {
                console.log("maior")
            }
        });
    }

    build() {

        const template = `
            <div class="carousel-container">
                    
                <div class="carousel" id="as">
                <div class="card_recipe">
                    <h3 class="card_recipe_name">Pão de queijo</h3>
                    <img src="/assets/pdqueijo.jpg">
                    <p class="card_recipe_description">Delicioso pão de queijo caseiro.</p>
                    <p class="card_recipe_time">30 minutos</p>
                    <img src="/assets/relogio.png">
                </div>
                    <div class="card_recipe">
                    <h2 class="card_recipe_name">Bolo de Cenoura</h2>
                    <img src="/assets/bolo-cenoura.jpg">
                    <p class="card_recipe_description">O famoso bolo de cenoura com cobertura de chocolate.</p>
                    <p class="card_recipe_time">60 minutos</p>
                    <img src="/assets/relogio.png">
                </div>
                    <div class="card_recipe">
                    <h3 class="card_recipe_name">Broinha de fubá</h3>
                    <img src="/assets/broinha.jpeg">
                    <p class="card_recipe_description">A Broinha mineira que conquista todos.</p>
                    <p class="card_recipe_time">45 minutos</p>
                    <img src="/assets/relogio.png">
                </div>
                </div>
                <button  class="carousel-btn prev-btn"  >&laquo;</button>
                <button  class="carousel-btn next-btn"  >&raquo;</button>
                </div>
                </div>`;
        const componentRoot = document.createElement("div");//Cria um nó
        componentRoot.setAttribute("class", "card");
        componentRoot.innerHTML = template;//insere um dado no nó
        return componentRoot // retorna o nó
    }
    connectedCallback() {
        this.totalItems = this.shadowRoot.querySelectorAll('.section_team_cards_employee').length;
    }


    styles() {
        const link = document.createElement("link");// cria uma tag link
        link.setAttribute("rel", "stylesheet");//define css
        link.setAttribute("href", "app/components/component1/estilos.css"); //especifica o caminho do css

        return link;
    }


    updateCarousel() {
        this.shadowRoot.querySelector('.carousel').style.transform = `translateX(${-this.currentIndex * 100}%)`;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateCarousel();
    }

}


customElements.define("card-news", Cardnews);
