let selected = []

document.addEventListener('DOMContentLoaded',()=>{
    loadProducts();

    let submit = document.getElementById('submit');
    submit.addEventListener('click',()=>{
        fetch('https://5def9af102b2d90014e1b5e5.mockapi.io/api/Product',{
            method: 'post',
            body: selected,
        })
        .then(r=>r.json())
        .then(r=>{
            console.log(selected);
            console.log(r)
        });
    });
});

function loadProducts(){
    fetch('https://5def9af102b2d90014e1b5e5.mockapi.io/api/Product')
        .then(r=>r.json())
        .then(r=>{
            for(let item of r){
                let template = `<div id =${item.sku} class="product">
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
        }).then(()=>{
            addListeners();
        })
}

function addListeners(){
    let products = document.querySelectorAll('.product');
    for(let p of products){
        let sku = p.id;
        p.addEventListener('click', ()=>{
            let list = document.querySelector('.selected-products');
            let item = document.getElementById(sku);
            let obj = {
                name : '',
                sku : sku
            }
            if(!item.classList.contains('clicked') ){
                item.classList.add('clicked');
                obj.name = item.querySelector('.name').textContent;
                list.innerHTML += `<li id='${sku}-list' class='selected-product'>${obj.name}</li>`;
                selected.push(sku); 
            }else {
                item.classList.remove('clicked');
                document.getElementById(`${sku}-list`).remove();
                selected.splice(selected.indexOf(sku),1);
            }
        });
    }
    
}