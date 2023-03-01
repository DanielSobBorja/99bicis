document.querySelector('#showAvailable').addEventListener('change', function () {
  const available = this.checked ? 'y' : 'n';
  document.querySelector('#bike-container').innerHTML = '<div class="card card-loading"><img src="/img/loading-blue.gif"/><p>Cargando</p></div><div class="card card-loading"><img src="/img/loading-blue.gif"/><p>Cargando</p></div><div class="card card-loading"><img src="/img/loading-blue.gif"/><p>Cargando</p></div><div class="card card-loading"><img src="/img/loading-blue.gif"/><p>Cargando</p></div><div class="card card-loading"><img src="/img/loading-blue.gif"/><p>Cargando</p></div><div class="card card-loading"><img src="/img/loading-blue.gif"/><p>Cargando</p></div>';
  fetch(`/inventory/available?available=${available}`)
      .then(response => response.text())
      .then(data => {
        console.log(typeof data)
        const html = mapInventoriesHtml(JSON.parse(data));
        document.querySelector('#bike-container').innerHTML = html;
      });
});
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