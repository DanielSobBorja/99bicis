const IMG_DIR = '/img/'
var htmlMapping = (function () {
    const mapInventoriesHtml = (inventories) => {
        return inventories
            .map((inv) => {
                const n = Math.floor(Math.random() * 10) + 1;
                const b = inv.bike.brand.toUpperCase();
                const c = inv.bike.category.toUpperCase();
                return `
                <div class="card" style="width: 350px;">
                    <div class="px-2">
                        <img src="/img/bike${n}.jpg" alt="Bike Image" class="img-fluid" style="height: 348px; object-fit: cover;">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between px-4">
                        <div class="d-flex flex-column mb-2">
                            <h2 class="card-title">${inv.bike.name}</h2>
                            <h4 class="card-subtitle"><span class="text-muted">${b}</span>  ${c}</h4>
                        </div>
                        <div>
                            <h1 class="card-text text-nowrap">${inv.price} €</h1>
                            <div class="d-flex mb-2 justify-content-between" style="gap: 2rem">
                                <p class="card-text">en ${inv.store.name}</p>
                                <p class="card-text text-muted no-wrap">Quedan ${inv.rentableStock - inv.rentedStock}</p>
                            </div>   
                        </div>
                    </div>
                    <a href="/rent?inventoryId=${inv._id}&img=${n}" class="btn btn-primary w-100" style="border-radius: 0px 0px 0.375rem 0.375rem;">Alquilar</a>
                </div>`;
            })
            .join('');
    }

    const mapBikeHtml = (inventory, img) => {
        return `
        <div class="d-flex">
            <img src="${IMG_DIR}bike${img}.jpg" alt="Bike Image" class="img-fluid" style="height: 348px; width: 348px;">
            <div>
                <h1 class="card-text text-nowrap">${inventory.price} €</h1>
                <p class="card-text">${inventory.store.name}</p>
                <p class="card-text text-muted no-wrap">Quedan ${inventory.rentableStock - inventory.rentedStock}</p>
            </div>
        </div>`;
    }

    const mapStoresHtml = (inventories, inventoryId, img) => { 
        return inventories
        .filter((i) => i._id != inventoryId && i.rentableStock - i.rentedStock > 0)
        .map((inv) => {
            return `
            <div class="card" style="width: 350px;">
                <a href="/rent?inventoryId=${inv._id}&img=${img}" class="btn btn-primary w-100" style="border-radius: 0.375rem 0.375rem 0px 0px;">Alquilar</a>
                
                <div class="px-2">
                    <img src="${IMG_DIR}bike${img}.jpg" alt="Bike Image" class="img-fluid" style="height: 348px;">
                </div>
                <div class="card-body d-flex flex-column justify-content-between px-4">
                    <div>
                    <div class="d-flex mb-2 justify-content-between" style="gap: 2rem">
                        <h1 class="card-text text-nowrap">${inv.price} €</h1>
                        <div>
                            <p class="card-text">${inv.store.name}</p>
                            <p class="card-text text-muted no-wrap">Quedan ${inv.rentableStock - inv.rentedStock}</p>
                        </div>
                    </div>   
                    </div>
                </div>
            </div>`;
        })
        .join('');
    }


    // public API
    return {
        mapInventoriesHtml,
        mapBikeHtml,
        mapStoresHtml,
    };
})();
exports.htmlMapping = htmlMapping;