var path = require('path');
var fs = require('fs');
var { htmlMapping } = require('../public/js/mapHtml');
const VIEW_DIR = '../public/views/';

var pageController = (function () {


    const getHomePage = async (req, res) => {
        try {
            const filePath = path.join(__dirname, VIEW_DIR, '/home.html');
            const html = await fs.promises.readFile(filePath, 'utf8');

            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const apiUrl = `${baseUrl}/inventory/available`;

            const response = await fetch(apiUrl);
            const inventories = await response.json();

            // Renderiza las bicis en el HTML
            const bikeHtml = htmlMapping.mapInventoriesHtml(inventories);
            
            // Inserta las bicis en el HTML
            const updatedHtml = html.replace('{{bikes}}', bikeHtml);

            // Envía el HTML al cliente
            res.send(updatedHtml);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    };

    const getRentPage = async (req, res) => {
        try {
            const filePath = path.join(__dirname, VIEW_DIR, '/rent.html');
            const html = await fs.promises.readFile(filePath, 'utf8');
            const baseUrl = `${req.protocol}://${req.get('host')}`;

            const inventoryId = req.query.inventoryId;
            let apiUrl = `${baseUrl}/inventory/${inventoryId}`;
            let response = await fetch(apiUrl);
            const inventory = await response.json();

            const img = req.query.img; 
            const bike = inventory.bike;

            apiUrl = `${baseUrl}/inventory/bike/${bike._id}`;
            response = await fetch(apiUrl);
            const inventories = await response.json();

            const currentBikeHtml = htmlMapping.mapBikeHtml(inventory, img);
            
            // Renderiza las bicis de otras tiendas en el HTML
            const otherStoresHtml = htmlMapping.mapStoresHtml(inventories, inventoryId, img);
            
            // Inserta la bici actual en el HTML
            let updatedHtml = html.replace('{{bike}}', currentBikeHtml);
            // Inserta las bicis de otras tiendas en el HTML
            updatedHtml = updatedHtml.replace('{{stores}}', otherStoresHtml);

            // Envía el HTML al cliente
            res.send(updatedHtml);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    };


    // public API
    return {
        getHomePage,
        getRentPage,
    };
})();

exports.pageController = pageController;
