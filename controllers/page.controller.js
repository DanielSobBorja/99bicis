var path = require('path');
var fs = require('fs');
const VIEW_DIR = '../public/views/';
const IMG_DIR = '/img/';

var pageController = (function () {
    const renderBikes = async (req, res) => {
        try {
            const filePath = path.join(__dirname, VIEW_DIR, '/home.html');
            const html = await fs.promises.readFile(filePath, 'utf8');

            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const apiUrl = `${baseUrl}/inventory/available`;

            const response = await fetch(apiUrl);
            const inventories = await response.json();

            // Renderiza las bicis en el HTML
            const bikeHtml = inventories
                .map((inventory) => {
                    const n = Math.floor(Math.random() * 10) + 1;
                    const b = inventory.bike.brand.toUpperCase();
                    const c = inventory.bike.category.toUpperCase();
                    return `
                    <div class="card" style="width: 350px; border: none;box-shadow: 0 10px 20px rgba(0,0,0,.1);">
                        <div class="px-2">
                            <img src="${IMG_DIR}bike${n}.jpg" alt="Bike Image" class="img-fluid" style="height: 348px; object-fit: cover;">
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between px-4">
                            <h2 class="card-title">${inventory.bike.name}</h2>
                            <div>
                                <div class="d-flex mb-2 align-items-end" style="gap: 1rem">
                                    <h4 class="card-subtitle text-muted">${b}</h4>
                                    <h6 class="card-text">${c}</h6>
                                </div>
                                <h1 class="card-text">${inventory.price} €</h1>
                                <div class="d-flex mb-2 justify-content-between" style="gap: 2rem">
                                    <p class="card-text">en ${inventory.store.name}</p>
                                    <p class="card-text text-muted no-wrap">Quedan ${inventory.rentableStock}</p>
                                </div>   
                            </div>
                        </div>
                        <button class="btn btn-primary w-100" style="border-radius: 0px 0px 0.375rem 0.375rem;">Alquilar</button>
                    </div>`;
                })
                .join('');

            // Inserta las bicis en el HTML
            const updatedHtml = html.replace('{{bikes}}', bikeHtml);

            // Envía el HTML al cliente
            res.send(updatedHtml);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    };

    // public API
    return {
        renderBikes,
    };
})();

exports.pageController = pageController;
