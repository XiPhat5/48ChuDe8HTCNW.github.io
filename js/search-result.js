$(function() {
    let shopProductArea = $('.shop-product-area');
    let btnProductGirdView = $('#btnProductGirdView');
    let btnProductListView = $('#btnProductListView');
    let btnViewProductDetails = $('.btnViewProductDetails');

    function showShopProductAreaGirdView(productList) {
        btnProductListView.removeClass("active");
        btnProductGirdView.addClass("active");
        shopProductArea.html("");

        for(let i = 0; i < productList.length / 3; i++)
            shopProductArea.append('<div class="row mb-4"><div class="col-4"></div><div class="col-4"></div><div class="col-4"></div></div>');
        let cardProductItems = $('.shop-product-area .col-4');
        for(let i = 0; i < productList.length; i++)
        {
            let product = productList[i];
            $(cardProductItems[i]).append('<div class="card"><img class="card-img-top px-4" src="' + product.getImages(0) + '"><div class="card-body"><h5 class="card-title text-primary" style="line-height: 1.5rem;">' + product.getName() + '</h4><ul><li>' + product.getCPU() + '</li><li>' + product.getRam() + '</li><li>' + product.getGPU() + '</li><li>' + product.getHardDrive() + '</li></ul>' + '</h5><h4 class="card-text text-danger text-end mt-3 fw-bold">' + FormatPrice(product.getPrice().toString()) + '</div><div class="card-footer py-4 text-end"><button type="button" class="btn btn-danger ms-1" id="btnAddToCard">THÊM VÀO GIỎ HÀNG</button><button type="button" class="btn btn-outline-secondary ms-1 btnViewProductDetails" id="' + product.getId() + '"><i class="far fa-eye"></i></button><button type="button" class="btn btn-outline-secondary ms-1 btnAddToLoveProductList"><i class="far fa-heart"></i></button></div></div>');
        }

        btnViewProductDetails = $('.btnViewProductDetails');
    };

    function showShopProductAreaListView(productList) {
        btnProductGirdView.removeClass("active");
        btnProductListView.addClass("active");
        shopProductArea.html("");

        for(let i = 0; i < productList.length; i++)
        {
            let product = productList[i];
            shopProductArea.append('<div class="card-list-view"><div class="row"><div class="col-3"><img src="' + product.getImages(0) + '"></div><div class="col-9"><div class="card-body"><h4 class="text-primary" id="title">' + product.getName() + '</h4><ul><li>' + product.getCPU() + '</li><li>' + product.getRam() + '</li><li>' + product.getGPU() + '</li><li>' + product.getHardDrive() + '</li></ul></div><div class="card-footer bg-white"><div class="row"><div class="col-6 align-self-center"><h3 class="text-danger fw-bold">' + FormatPrice(product.getPrice().toString()) + '</h3></div><div class="col-6"><button type="button" class="btn btn-danger btnAddToCard">THÊM VÀO GIỎ HÀNG</button><button type="button" class="btn btn-outline-secondary btnViewProductDetails ms-1" id="' + product.getId() + '"><i class="far fa-eye"></i></button><button type="button" class="btn btn-outline-secondary btnAddToLoveProductList ms-1"><i class="far fa-heart"></i></button></div></div></div></div></div></div>');
        }

        btnViewProductDetails = $('.btnViewProductDetails');
    };

    function showProductList(productList) {
        if(displayType == "1")
        {
            sortProductList();
            showShopProductAreaListView(productList);
        }
        else if(displayType == "0")
        {
            sortProductList();
            showShopProductAreaGirdView(productList);
        }
        btnViewProductDetails.click(function() {
            localStorage.setItem("productId", $(this)[0].id);
            document.location.href = "single-product.html";
        });
    }

    let productSortSelect = $('.product-short .nice-select');
    let productSortSelectValue = productSortSelect.val();
    let newProductList = productList.getProductList();
    let displayType = localStorage.getItem("displayType");

    function sortProductList() {
        // 0: sắp xếp theo tên A-Z
        // 1: sắp xếp theo tên Z-A
        // 2: sắp xếp theo giá Thấp - Cao
        // 3: sắp xếp theo giá Cao - Thấp
        if(productSortSelectValue == 0)
        {
            for(let i = 0; i < newProductList.length - 1; i++)
                for(let j = i + 1; j < newProductList.length; j++)
                    if(newProductList[i].getName().localeCompare(newProductList[j].getName()) > 0)
                    {
                        let temp = newProductList[i];
                        newProductList[i] = newProductList[j];
                        newProductList[j] = temp;
                    }
        }
        else if(productSortSelectValue == 1)
        {
            for(let i = 0; i < newProductList.length - 1; i++)
                for(let j = i + 1; j < newProductList.length; j++)
                    if(newProductList[i].getName().localeCompare(newProductList[j].getName()) < 0)
                    {
                        let temp = newProductList[i];
                        newProductList[i] = newProductList[j];
                        newProductList[j] = temp;
                    }  
        }
        else if(productSortSelectValue == 2)
        {
            for(let i = 0; i < newProductList.length - 1; i++)
                for(let j = i + 1; j < newProductList.length; j++)
                    if(newProductList[i].getPrice() > newProductList[j].getPrice())
                    {
                        let temp = newProductList[i];
                        newProductList[i] = newProductList[j];
                        newProductList[j] = temp;
                    }  
        }
        else if(productSortSelectValue == 3)
        {
            for(let i = 0; i < newProductList.length - 1; i++)
                for(let j = i + 1; j < newProductList.length; j++)
                    if(newProductList[i].getPrice() < newProductList[j].getPrice())
                    {
                        let temp = newProductList[i];
                        newProductList[i] = newProductList[j];
                        newProductList[j] = temp;
                    }  
        }
    }

    showProductList(newProductList);

    let filterNames = $('.filter-name input[type="checkbox"]');
    let filterAcer = $('#filterAcer');
    let filterAsus = $('#filterAsus');
    let filterApple = $('#filterApple');
    let filterDell = $('#filterDell');
    let filterHP = $('#filterHP');
    let filterLenovo = $('#filterLenovo');

    function filterProductByTrademark() {
        newProductList = new Array();

        if(filterAcer[0].checked)
            pushToArray(newProductList, productList.findByNames(["acer"]));
        if(filterApple[0].checked)
            pushToArray(newProductList, productList.findByNames(["apple"]));
        if(filterAsus[0].checked)
            pushToArray(newProductList, productList.findByNames(["asus"]));
        if(filterDell[0].checked)
        {
            console.log(productList.findByNames(["dell"])[0].getName());
            pushToArray(newProductList, productList.findByNames(["dell"]));
        }
        if(filterHP[0].checked)
            pushToArray(newProductList, productList.findByNames(["hp"]));
        if(filterLenovo[0].checked)
            pushToArray(newProductList, productList.findByNames(["lenovo"]));
        if((!filterAcer[0].checked && !filterApple[0].checked && !filterAsus[0].checked && !filterDell[0].checked
            && !filterHP[0].checked && !filterLenovo[0].checked))
            newProductList = productList.getProductList();

        showProductList(newProductList)
    }

    filterNames.click(function() {
        filterProductByTrademark();
    });
    
    //#region Xử lí xự kiện cho button hiển thị gird view hoặc list view
        // "displayType":0 - đang ở chế độ gird view
        // "displayType":1 - đang ở chế độ list view
    btnProductGirdView.click(function() {
        if(displayType == "1")
        {
            displayType = "0";
            localStorage.setItem("displayType", displayType);
            sortProductList();
            showShopProductAreaGirdView(newProductList);
        }
    });
    btnProductListView.click(function() {
        displayType = localStorage.getItem("displayType");

        if(displayType == "0")
        {
            displayType = "1";
            localStorage.setItem("displayType", displayType);
            sortProductList();
            showShopProductAreaListView(newProductList);
        }
    });
    //#endregion

    //#region Xử lí xự kiện cho button sắp xếp
    productSortSelect.change(function() {
        productSortSelectValue = productSortSelect.val();
        showProductList(newProductList);
    })
    //#endregion

    //#region Xử lí chức năng tìm kiếm sản phẩm
    let txtSearch = $('#txtSearch');
    let btnSearch = $('#btnSearch');
    let numberOfProductsFound = $('#number-of-products-found');

    btnSearch.click(function() {
        newProductList = new Array();
        pushToArray(newProductList, productList.findByNames([txtSearch.val()]));
        numberOfProductsFound.html('Tìm được ' + newProductList.length + ' sản phẩm với từ khóa <strong>' + txtSearch.val()) + '</strong>';
        showProductList(newProductList);
    });
    //#endregion
});