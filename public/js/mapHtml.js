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
                                <p class="card-text text-muted no-wrap text-end">Quedan\n${inv.rentableStock - inv.rentedStock}</p>
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
        <div class="d-flex mt-2 pt-5 mb-5" style="gap: 5%">
            <div class="mt-2 d-flex flex-column justify-content-between">
                <h1 class="display-3">Alquilar</h1>
                <img src="${IMG_DIR}bike${img}.jpg" alt="Bike Image" class="img-fluid mt-2" style="height: 348px; width: 348px; border-radius:2rem;">
            </div>
            <div class="d-flex flex-column mt-2">
                <h1 class="card-text text-end">${inventory.bike.name}</h1>
                <h1 class="card-text mb-3 text-end">${inventory.price} €</h1>
                <div class="d-flex justify-content-between" style="gap: 4rem">
                    <div>
                        <p class="card-text"><strong>Marca:</strong> ${inventory.bike.brand}</p>
                        <p class="card-text"><strong>Categoría:</strong> ${inventory.bike.category.toUpperCase()}</p>
                        <p class="card-text"><strong>Spe Lvl:</strong> ${inventory.bike.spe_level}</p>
                        <p class="card-text"><strong>Peso:</strong> ${inventory.bike.weight} kg</p>
                        <p class="card-text"><strong>Frame:</strong> ${inventory.bike.frame}</p>
                        <p class="card-text"><strong>Fork:</strong> ${inventory.bike.fork}</p>
                        <p class="card-text"><strong>Tm. Rueda:</strong> ${inventory.bike.wheel_size}</p>
                    </div>
                    <div>
                        <p class="card-text"><strong>Frenos:</strong> ${inventory.bike.brakes}</p>
                        <p class="card-text"><strong>Group Set:</strong> ${inventory.bike.groupset}</p>
                        <p class="card-text"><strong>Drive Train:</strong> ${inventory.bike.drivetrain}</p>
                        <p class="card-text"><strong>Suspensión:</strong> ${inventory.bike.suspension}</p>
                        <p class="card-text"><strong>Front Travel:</strong> ${inventory.bike.front_travel}</p>
                        <p class="card-text"><strong>Sillín:</strong> ${inventory.bike.seatpost}</p>
                    </div>
                    <div class="text-end">
                        <p class="card-text text-muted text-end">${inventory.store.name}</p>
                        <h4 class="card-text text-muted text-end">Quedan ${inventory.rentableStock - inventory.rentedStock}</h4>
                    </div>
                </div>
                <div class="d-flex mt-5" style="gap: 2rem">
                    <button onclick="rent()" class="btn btn-primary px-5" style="background:green;border:green;">Alquilar</button>
                    <button onclick="retrn()" class="btn btn-primary px-5" style="background:red;border:red;">Devolver</button>
                </div>
            </div>
        </div>
        <script>
        function rent() {
            fetch(\`/inventory/rent/${inventory._id}\`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: 1 })
              })
              .then(response => response.json())
              .then(data => {
                location.reload();
              })
              .catch((error) => {
                console.error('Error:', error);
              });
        }
        function retrn() {
            fetch(\`/inventory/return/${inventory._id}\`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: 1 })
              })
              .then(response => response.json())
              .then(data => {
                location.reload();
              })
              .catch((error) => {
                console.error('Error:', error);
              });
        }
        </script>`;
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
                            <p class="card-text text-end">${inv.store.name}</p>
                            <p class="card-text text-muted no-wrap text-end">Quedan\n${inv.rentableStock - inv.rentedStock}</p>
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