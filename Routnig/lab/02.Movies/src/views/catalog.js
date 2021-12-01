import { html } from "../lib.js";

const catalogTemplate = () => html`
<section id="home-page">
            <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
                <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
                    class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px">
                <h1 class="display-4">Movies</h1>
                <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
            </div>
    
            <h1 class="text-center">Movies</h1>
    
            <section id="add-movie-button">
                <a id="createLink" href="#" class="btn btn-warning ">Add Movie</a>
            </section>
    
            <section id="movie">
                <div class=" mt-3 ">
                    <div class="row d-flex d-wrap">
    
                        <div class="card-deck d-flex justify-content-center">
    
                            <!-- Movie Catalog-->
    
                        </div>
                    </div>
                </div>
            </section>
        </section>`;


export function catalogPage(ctx) {
    ctx.render(catalogTemplate());
}
