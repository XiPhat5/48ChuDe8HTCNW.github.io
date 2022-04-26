$(document).ready(function() {
    let orderList = currentAccount.getOrders().getOrderList();
    let html = "";
    if(orderList.length == 0)
    {
        $('#no-order').css("display", "block");
    }
    else
    {
        $('#no-order').css("display", "none");
        for(let i = 0; i < orderList.length; i++)
        {
            html += '<div class="order my-3"><div class="row my-3"><div class="col-12 p-4 bg-white rounded"><div class="row"><div class="col-6"><label class="font-weight-light"><i class="fas fa-file-alt"></i>&nbsp;&nbsp;Mã đơn hàng</label>&nbsp;&nbsp;<label class="text-danger">' 
            + orderList[i].getId() + '</label>&nbsp;&nbsp;<br><label class="font-weight-light"><i class="far fa-calendar-alt"></i>&nbsp;&nbsp;Ngày đặt hàng</label>&nbsp;&nbsp;<label class="text-danger">' + orderList[i].getTime() + '</label></div><div class="col-6 text-end align-self-center"><label class="font-weight-light"><i class="fas fa-truck"></i>&nbsp;&nbsp;Trạng thái</label>&nbsp;&nbsp;<label class="text-danger">' 
            + orderList[i].getStatus() + '</label></div></div><div class="row"><div class="col-12"><div class="line mt-1 mb-2" style="border-bottom: 1px solid dodgerblue;"></div></div></div>';

            let productList = orderList[i].getProductList().getProductList();
            let totalPayment = 0;
            for(let i = 0; i < productList.length; i++)
            {
                html += '<div class="row py-2"><div class="col-12"><div class="product"><div class="row"><div class="col-1"><img src="' + productList[i].getImages(0) + '" class="product-image"></div><div class="col-9"><label class="product-name">' + productList[i].getName() + '</label><p class="num-of-product">Số lượng x' + productList[i].getAmount() + '</p></div><div class="col-2 text-end align-self-center"><label class="product-price">' + FormatPrice(productList[i].getPrice().toString()) + '</label></div></div></div><div class="row"><div class="col-12"><div class="line"></div></div></div></div></div>';

                totalPayment += productList[i].getPrice() * productList[i].getAmount();
            }
            
            html += '<div class="row pt-3"><div class="col-12 text-end"><label class="font-weight-light">Tổng thanh toán:</label>&nbsp;&nbsp;<label class="total-amount">' + FormatPrice(totalPayment.toString()) + '</label></div></div><div class="row"><div class="col-12 text-end"><a href="order.html"><button type="button" class="btn btn-outline-secondary mx-3">Xem chi tiết đơn hàng</button></a><button type="button" class="btn btn-danger">Liên hệ</button></div></div></div></div></div>';
        }
    }

    $('#box-order').html(html);
})