document.addEventListener('DOMContentLoaded',()=>{
    console.log("Hello");
    loadProducts();
});


function loadProducts(){
    fetch('https://5def9af102b2d90014e1b5e5.mockapi.io/api/Product')
        .then(r=>r.json())
        .then(r=>{
            for(let item of r){
                let template = `<div class="product">
                    <div class="text">
                        <h3 class="name">
                            ${item.name}
                        </h3>
                        <p class="price"> 
                            ${item.price}
                        </p>
                        <p class="discountStatus"> 
                            ${item.isDiscounted}
                        </p>
                        </div>
                    </div>`;
                let product_list = document.querySelector('.product-list');
                product_list.innerHTML += template;
            }
        });
}