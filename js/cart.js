$(document).ready(function() {
    //-----------------------------------------------------------------------------------
    // Sản phẩm trong đơn hàng
    //-----------------------------------------------------------------------------------
    let cardId = currentAccount.getCart().getCart();
    let card = new Array();
    for(let i = 0; i < cardId.length; i++)
        card[i] = productList.getProductById(cardId[i].getProductId());
        

    function showProductInCard() {
        let html = "";
        for(let i = 0; i < card.length; i++)
        {
            let product = card[i];
            html += '<div class="product py-1"><div class="row px-5"><div class="col-5"><div class="row"><div class="col-2"><img src="' + product.getImages(0) + '" class="product-image"></div><div class="col-10"><label class="product-name">' + product.getName() + '</label></div></div></div><div class="col-2 align-self-center text-end"><label>' + FormatPrice(product.getPrice().toString()) + '</label></div><div class="col-2 align-self-center"><div class="row count-num-product"><div class="col-4 p-0 text-end align-self-center"><button type="button" class="btn text-warning btnAmountDown" id="' + i + '"><i class="fas fa-minus-circle"></i></button></div><div class="col-4 p-0"><input type="text" class="form-control text-center bg-white txtAmount" value="' + card[i].getAmount() + '" readonly></div><div class="col-4 p-0 align-self-center"><button type="button" class="btn text-warning btnAmountUp" id="' + i + '"><i class="fas fa-plus-circle"></i></button></div></div></div><div class="col-2 align-self-center"><label class="product-price">' + FormatPrice((product.getPrice() * card[i].getAmount()).toString()) + '</label></div><div class="col-1 align-self-center text-center"><button type="button" class="btn text-secondary btnRemove" id="' + i + '"><i class="fas fa-trash"></i></button></div></div><div class="row"><div class="col-12 p-0"><div class="line mt-3"></div></div></div></div>';
        }
        $('#box-product').html(html);

        showTotalPayMent();

        let btnRemove = $('.btnRemove');
        btnRemove.click(function() {
            card.splice($(this)[0].id, 1);
            showProductInCard();
        });
    }
    showProductInCard();


    //#region Xử lí cho nút tăng giảm số lượng sản phẩm
    let txtAmounts = $('.txtAmount');
    let btnAmountUp = $('.btnAmountUp');
    let btnAmountDown = $('.btnAmountDown');
    let productPrice = $('.product-price');

    btnAmountDown.click(function() {
        let index = $(this)[0].id;
        let txtAmount = $(txtAmounts[index]);
        if(parseInt(txtAmount.val()) <= 1)
            txtAmount.val(1);
        else
            txtAmount.val(parseInt(txtAmount.val()) - 1);
        card[index].setAmount(txtAmount.val());
        $(productPrice[index]).html(FormatPrice((card[index].getPrice() * card[index].getAmount()).toString()));
        showTotalPayMent();
    });
    btnAmountUp.click(function() {
        let index = $(this)[0].id;
        let txtAmount = $(txtAmounts[index]);
        if(txtAmount.val() >= 10)
            txtAmount.val(10);
        else if(txtAmount.val() > productList.getProductById(card[index].getId()).getAmount()) { }
        else
            txtAmount.val(parseInt(txtAmount.val()) + 1);
        card[index].setAmount(txtAmount.val());
        $(productPrice[index]).html(FormatPrice((card[index].getPrice() * card[index].getAmount()).toString()));
        showTotalPayMent();
    });
    //#endregion

    //#region xử lí lựa chọn hình thức thanh toán
    let checkBoxThanhToanKhiNhanHang = $('#checkBoxThanhToanKhiNhanHang');
    let checkBoxTheTinDung = $('#checkBoxTheTinDung');
    checkBoxThanhToanKhiNhanHang.click(function() {
        if(checkBoxTheTinDung[0].checked)
        {
            checkBoxTheTinDung.prop("checked", false);
            checkBoxThanhToanKhiNhanHang.prop("checked", true);
        }
    });
    checkBoxTheTinDung.click(function() {
        if(checkBoxThanhToanKhiNhanHang[0].checked)
        {
            checkBoxThanhToanKhiNhanHang.prop("checked", false);
            checkBoxTheTinDung.prop("checked", true);
        }
    });
    //#endregion


    //#region  Danh sách địa chỉ giao hàng
    //-----------------------------------------------------------------------------------
    let contactList = currentAccount.getContacts().getContactList();
    html = "";
    for(let i = 0; i < contactList.length; i++)
    {
        html += '<div class="row contact my-3"><div class="col-1 text-center align-self-center"><input type="checkbox" class="form-check-input checkBoxAddress"></div><div class="col-11"><label class="display-2 font-weight-normal mb-2">' 
            + contactList[i].getName() + '</label><br><label class="display-3"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;' 
            + contactList[i].getPhoneNumber() + '</label><br><label class="display-3"><i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;' 
            + contactList[i].getAddress() + '</label></div><div class="line mt-2"></div></div>';
    }
    $('#boxContact').html(html);
    //#endregion


    //#region Xử lí lựa chọn đại chỉ giao hàng
    let checkBoxAddress = $('.checkBoxAddress');
    function checkAddressOption() {
        let check = false;
        for(let i = 0; i < checkBoxAddress.length; i++)
            if(checkBoxAddress[i].checked)
            {
                check = true;
                break;
            }
        return check;
    }
    //#endregion

    //#region  Tính tổng thanh toán
    //-----------------------------------------------------------------------------------
    function showTotalPayMent() {
        let totalPayment = 0;
        for(let i = 0; i < card.length; i++)
        {
            totalPayment += card[i].getPrice() * card[i].getAmount();
        }
        $('#total-payment').html(FormatPrice(totalPayment.toString()));
    }
    //#endregion

    $('#btnDatHang').click(function() {
        if(checkAddressOption())
        {
            window.location.href = "order_management.html";
        }
        else
        {
            alert("Chọn địa chỉ giao hàng");
        }
    })
});