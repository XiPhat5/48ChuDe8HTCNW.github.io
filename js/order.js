$(document).ready(function() {
    let currenOrder = currentAccount.getOrders().getOrder(0);

    $('#lblOrderId').html(currenOrder.getId());
    $('#lblOrderTime').html(currenOrder.getTime());
    $('#lblOrderStatus').html(currenOrder.getStatus());

    let orderContact = currenOrder.getContact();
    $('#lblContactName').html(orderContact.getName());
    $('#lblContactPhoneNumber').html(orderContact.getPhoneNumber());
    $('#lblContactAddress').html(orderContact.getAddress());
    
    $('#txtOrderNote').html(currenOrder.getNote());

    
    let html = "";
    let orderProducts = currenOrder.getProductList().getProductList();
    let totalAmount = 0;
    for(let i = 0; i < orderProducts.length; i++)
    {
        html += '<div class="row py-2"><div class="col-12"><div class="product"><div class="row"><div class="col-1"><img src="' 
        + orderProducts[i].getImages(0) + '" class="product-image"></div><div class="col-9"<label class="product-name">' 
        + orderProducts[i].getName() + '</label><p class="num-of-product">Số lượng x' 
        + orderProducts[i].getAmount() + '</p></div><div class="col-2 text-end align-self-center"><label class="product-price">' 
        + FormatPrice((orderProducts[i].getPrice() * orderProducts[i].getAmount()).toString()) + '</label></div></div></div><div class="row"><div class="col-12"><div class="line"></div></div></div></div></div>';
        
        totalAmount += orderProducts[i].getPrice() * orderProducts[i].getAmount();
    }

    $('#box-order-product').html(html);

    $('#order-total-payment').html(FormatPrice(totalAmount.toString()));
});