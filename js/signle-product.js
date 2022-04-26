$(function() {
    let product = productList.getProductById(localStorage.getItem("productId"));

    $('.product-name').html(product.getName());
    $('.new-price').html(FormatPrice(product.getPrice().toString()));
    $('#titleThongSoKiThuat').html("Thông số kỹ thuật " + product.getName());

    let btnAddToCard = $('#btnAddToCard');
    if(product.getAmount() == 0)
    {
        btnAddToCard.html("Hết hàng");
        btnAddToCard.addClass("disabled");
    }
    else
    {
        btnAddToCard.html("Thêm vào giỏ hàng");
        btnAddToCard.removeClass("disabled");
    }
        

    //#region  Xử lí số lượng sản phẩm
    let cartPlusMinusBox = $('#cart-plus-minus-box');
    let SoLuongSanPhamNontification = $('#SoLuongSanPhamNontification');

    $('.cart-plus-minus .inc').click(function() {
        if(cartPlusMinusBox.val() > 15)
        {
            cartPlusMinusBox.val("10");
            SoLuongSanPhamNontification.html("Số lượng không được vượt quá 10");
        }
        else if(cartPlusMinusBox.val() > product.getAmount())
        {
            cartPlusMinusBox.val(product.getAmount());
            SoLuongSanPhamNontification.html("Trong kho hiện tại chỉ còn " + product.getAmount() + " sản phẩm");
        }
        else
            SoLuongSanPhamNontification.html("");
    });
    $('.cart-plus-minus .dec').click(function() {
        if(cartPlusMinusBox.val() < 1)
        {
            cartPlusMinusBox.val("1");
            SoLuongSanPhamNontification.html("Số lượng không được nhỏ hơn 1");
        }
        else
            SoLuongSanPhamNontification.html("");
    });
    //#endregion

    //#region  Đổ dữ liệu vào table cấu hình kĩ thuật của máy
    $('#cauHinh #cpu').html(product.getCPU());
    $('#cauHinh #ram').html(product.getRam());
    $('#cauHinh #gpu').html(product.getGPU());
    $('#cauHinh #hardDrive').html(product.getHardDrive());
    $('#cauHinh #screen').html(product.getScreen());
    $('#cauHinh #port').html(product.getPort());
    $('#cauHinh #audio').html(product.getAudio());
    $('#cauHinh #wireless').html(product.getWireless());
    $('#cauHinh #webcam').html(product.getWebcam());
    $('#cauHinh #otherFunction').html(product.getorderFunction());
    $('#cauHinh #size').html(product.getSize());
    $('#cauHinh #weight').html(product.getWeight());
    $('#cauHinh #color').html(product.getColor());
    $('#cauHinh #battery').html(product.getBattery());
    $('#cauHinh #os').html(product.getOS());
    // Mô tả sản phẩm
    $('.detailed-product-description').html(product.getDescription());
    //#endregion

    //#region  Xử lí slide show hình ảnh sản phẩm chính
    let carouselInner = $('#carouselExampleControlsNoTouching .carousel-inner');
    let productImages = product.getImagesList();
    for(let i = 0; i < productImages.length; i++)
    {
        let carouselItem;
        if (i == 0)
            carouselItem = '<div class="carousel-item active"><img src="' + productImages[i] + '" class="d-block w-100"></div>';
        else
            carouselItem = '<div class="carousel-item"><img src="' + productImages[i] + '" class="d-block w-100"></div>';
        carouselInner.append(carouselItem);
    }
    //#endregion

    //#region  Xử lí slide show product details small images 
    let boxProductDetailsSmallImages = $('.product-details-small-images .carousel-inner');
    function showProductDetailsSmallImages() {
        for(let i = 0; i <= product.getImagesList().length / 4; i++)
        {
            if(i == 0)
                boxProductDetailsSmallImages.append('<div class="carousel-item active"><div class="row"><div class="col-3"></div><div class="col-3"></div><div class="col-3"></div><div  class="col-3"></div></div></div>');
            else
                boxProductDetailsSmallImages.append('<div class="carousel-item"><div class="row"><div class="col-3"></div><div class="col-3"></div><div class="col-3"></div><div  class="col-3"></div></div></div>');
        }

        let carouselItems = $('.product-details-small-images .carousel-inner .col-3');
        for(let i = 0; i < product.getImagesList().length; i++)
            $(carouselItems[i]).append('<img src="' + product.getImages(i) + '">');
    }
    showProductDetailsSmallImages();
    //#endregion

    //#region  Xử lí danh sách 15 sản phẩm cùng danh mục
    let boxSanPham = $('.san-pham-cung-danh-muc .carousel-inner');
    function hienThiDanhSachSanPham() {
        for(let i = 0; i < productList.getProductList().length / 4; i++)
        {
            if(i == 0)
                boxSanPham.append('<div class="carousel-item active"><div class="row"><div class="col-3"></div><div class="col-3"></div><div class="col-3"></div><div  class="col-3"></div></div></div>');
            else
                boxSanPham.append('<div class="carousel-item"><div class="row"><div class="col-3"></div><div class="col-3"></div><div class="col-3"></div><div  class="col-3"></div></div></div>');
        }

        let carouselItems = $('.san-pham-cung-danh-muc .carousel-item .col-3');
        for(let i = 0; i < productList.getProductList().length; i++)
        {
            let product11 = productList.getProduct(i);
            $(carouselItems[i]).append('<div class="card border-0"><img class="card-img-top" src="' + product11.getImages(0) + '"><div class="card-body"><h6 class="card-title">' + product11.getName() + '</h6><h5 class="card-text text-danger text-end">' + FormatPrice(product11.getPrice().toString()) + '</h5></div><div class="card-footer bg-white text-end py-3"><button class="btn-sm btn-primary border-1 me-1" type="button">Thêm vào giỏ hàng</button><a href=""><button class="btn-sm btn-outline-secondary border-1 btnViewDetails" id="' + product11.getId() + '"><i class="far fa-eye"></i></button></a></div></div>');
        }
    };
    hienThiDanhSachSanPham();
    
    $('.card').hover(function() {        
        $(this).find('.card-footer').slideDown(250);    
    } ,function() {        
        $(this).find('.card-footer').slideUp(250);    
    });
    //#endregion

    //#region Xử lí button view deltails
    let btnViewDetails = $('.btnViewDetails');
    btnViewDetails.click(function() {
        localStorage.setItem("productId", $(this)[0].id);
    });
    //#endregion
});