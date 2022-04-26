$(document).ready(function() {
    //--------------------------------------------------------------------------------
    function display() {
        let noLoveProducts = $('#no-love-products');
        let boxLoveProduct = $('#box-love-product');
        let loveProducts = currentAccount.getLoveProducts().getLoveProductList();
        
        // Nếu danh sách sản phẩm yêu thích tồn tại nhiều hơn 1 sản phẩm thì hiển thị danh sách đó
        if(loveProducts.length > 0)
        {
            let html = "";
            for(let i = 0; i < loveProducts.length; i++)
            {
                if(i % 2 == 0)
                    html += '<div class="row pb-4">';

                let product = productList.getProductById(loveProducts[i]);
                html += '<div class="col-6"><div class="love-product"><a class="row m-0"><div class="col-11 border-end border-secondary px-4 py-3"><div class="row"><div class="col-3 align-self-center"><img src="' + product.getImages(0) + '" alt=""></div><div class="col-9"><div class="row"><div class="col-12"><label class="product-name text-dark">' + product.getName() + '</label></div></div><div class="row"><div class="col-7"><button class="btn btn-outline-primary">Thêm vào giỏ hàng</button></div><div class="col-5"><label class="product-price">' 
                + FormatPrice(product.getPrice().toString()) + '</label></div></div></div></div></div><div class="col-1 align-self-center text-center p-0"><div class="btn btnRemoveLoveProduct" id="' + i + '"><i class="fas fa-heart text-danger"></i></div></div></a></div></div>';
                
                if(i == loveProducts.length - 1 && i % 2 == 0)
                    html += '<div class="col-6"></div>';
                
                if(i % 2 != 0)
                    html += '</div>'
            }
            noLoveProducts.hide();
            boxLoveProduct.html(html); 
        }
        // Nếu trong danh sách không có sản phẩm yêu thích thì ẩn box product và hiện box không có sản phẩm yêu thích
        else
        {
            noLoveProducts.show();
            boxLoveProduct.hide();
        }
    }

    display();

    let btnRemoveLoveProduct = $('.btnRemoveLoveProduct');

    function btnRemoveLoveProduct_Click() {
        btnRemoveLoveProduct.click(function() {
            let index = $(this)[0].id;
            btnRemoveLoveProduct_Click(index);
            currentAccount.getLoveProducts().removeProduct(index);
            display();
            btnRemoveLoveProduct = $('.btnRemoveLoveProduct');
            btnRemoveLoveProduct_Click();
        });
    }

    btnRemoveLoveProduct_Click();    
    //--------------------------------------------------------------------------------
});