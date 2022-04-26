function getAge(dayOfBirth)
{
    return Math.floor(((new Date()) - (new Date(dayOfBirth)))/31557600000);// 24 * 3600 * 365,25 * 1000
}

$(function() {
    //#region Xử lí dử liệu đầu tiên
    let txtPassword = $('#txtPassword');

    txtPassword.val(currentAccount.getPassword());

    $('#txtUserName').val(currentAccount.getUserName());
    $('#txtEmail').val(currentAccount.getEmail());
    $('#txtPhoneNumber').val(currentAccount.getPhoneNumber());

    let gender = currentAccount.getGender();
    if(gender == 1)
        $('.gender #male').prop('checked', true);
    else if(gender == 2)
        $('.gender #female').prop('checked', true);
    else
        $('.gender #other').prop('checked', true);

    $('.gender #male').click(function() {
        $('.gender #female').prop('checked', false);
        $('.gender #other').prop('checked', false);
    });
    $('.gender #female').click(function() {
        $('.gender #male').prop('checked', false);
        $('.gender #other').prop('checked', false);
    });
    $('.gender #other').click(function() {
        $('.gender #male').prop('checked', false);
        $('.gender #female').prop('checked', false);
    });

    $('#inputDayOfBirth').val("2002-10-10");
    //#endregion


    function showContact() {
        let contactList = currentAccount.getContacts().getContactList();
        let html = "";
        $('#boxContact').html(html);
        for(let i = 0; i < contactList.length; i++)
        {
            html += '<div class="row contact my-3"><div class="col-10"><label class="display-2 font-weight-normal mb-2">' + contactList[i].getName()
                + '</label><br><label class="display-3"><i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;' + contactList[i].getPhoneNumber() 
                + '</label><br><label class="display-3"><i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;' + contactList[i].getAddress() + '</label></div><div class="col-2 align-self-center text-end"><button type="button" class="btn text-secondary btnChangeContact" id="' + i + '"><i class="far fa-edit"></i></button><button type="button" class="btn text-secondary btnRemoveContact" id="' + i + '"><i class="far fa-trash-alt"></i></button></div></div>';
        }
        $('#boxContact').html(html);

        let btnRemoveContact = $('.btnRemoveContact');
        btnRemoveContact.click(function() {
            currentAccount.getContacts().removeContact($(this)[0].id);
            showContact();
        });
    }

    showContact();

    
    //#region Xử lí modal cập nhật mật khẩu
    let txtNowPassword = $('#txtNowPassword');
    let txtNewPassword = $('#txtNewPassword');
    let txtNewPasswordConfirm = $('#txtNewPasswordConfirm');

    let NowPasswordNontification = $('#NowPasswordNontification');
    let NewPasswordNontification = $('#NewPasswordNontification');
    let NewPasswordConfirmNontification = $('#NewPasswordConfirmNontification');

    function checkNowPassword() {
        if(txtNowPassword.val() == "")
        {
            NowPasswordNontification.html("Không được để trống");
            NowPasswordNontification.addClass("text-danger");
            return false;
        }
        NowPasswordNontification.html("");
        NowPasswordNontification.removeClass("text-danger");
        return true;
    }

    function checkNewPassword() {
        if(txtNewPassword.val() == "")
        {
            NewPasswordNontification.html("Không được để trống");
            NewPasswordNontification.addClass("text-danger");
            return false;
        }
        let regt = /^(?=.*([a-zA-Z]))(?=.*[0-9])(?=.*[!@#&\._])(.{8,})$/;
        if(!regt.test(txtNewPassword.val()))
        {
            NewPasswordNontification.html("Sử dụng 8 ký tự trở lên và kết hợp chữ cái, chữ số và biểu tượng");
            NewPasswordNontification.addClass("text-danger");
            return false;
        }
        NewPasswordNontification.html("Sử dụng 8 ký tự trở lên và kết hợp chữ cái, chữ số và biểu tượng");
        NewPasswordNontification.removeClass("text-danger");
        return true;
    }

    function checkNewPasswordConfirm() {
        if(txtNewPasswordConfirm.val() == "")
        {
            NewPasswordConfirmNontification.html("Không được để trống");
            return false;
        }
        if(txtNewPasswordConfirm.val() != txtNewPassword.val())
        {
            NewPasswordConfirmNontification.html("Xác nhận mật khẩu chưa chính xác");
            return false;
        }
        NewPasswordConfirmNontification.html("");
        return true;
    }

    txtNowPassword.blur(function() {checkNowPassword()});
    txtNewPassword.blur(function() {checkNewPassword()});
    txtNewPasswordConfirm.blur(function() {checkNewPasswordConfirm()});


    txtNowPassword.keyup(function() {
        NowPasswordNontification.html("");
        NowPasswordNontification.removeClass("text-danger");
    });
    txtNewPassword.keyup(function() {
        txtNewPasswordConfirm.val("");
        NewPasswordNontification.html("Sử dụng 8 ký tự trở lên và kết hợp chữ cái, chữ số và biểu tượng");
        NewPasswordNontification.removeClass("text-danger");
        NewPasswordConfirmNontification.html("");
    });
    txtNewPasswordConfirm.keyup(function() {
        NewPasswordConfirmNontification.html("");
    });

    $('#btnUpdateNewPassword').click(function() {
        if(checkNewPassword() && checkNewPasswordConfirm() && checkNowPassword())
        {          
            if(txtNowPassword.val() == currentAccount.getPassword() 
               && txtNewPassword.val() != currentAccount.getPassword())
            {
                accountList.getAccount(indexAccount).setPassword(txtNewPassword);
                alert("Cập nhật mật khẩu mới thành công");
            }
            else if(txtNowPassword.val() != currentAccount.getPassword())
            {
                NowPasswordNontification.html("Mật khẩu hiện tại không chính xác");
                NowPasswordNontification.addClass("text-danger");
            }
            else
            {
                NewPasswordNontification.html("Mật khẩu mới trùng với mật khẩu hiện tại");
                NewPasswordNontification.addClass("text-danger");
            }
        }
        else
        {
            checkNowPassword();
            checkNewPassword();
            checkNewPasswordConfirm();
        }
    });
    //#endregion


    //#region Xử lí cập nhật thông tin tài khoản
    let txtUserName = $('#txtUserName');
    let txtPhoneNumber = $('#txtPhoneNumber');
    let inputDayOfBirth = $('#inputDayOfBirth');

    let UserNameNontification = $('#UserNameNontification');
    let PhoneNumberNontification = $('#PhoneNumberNontification');
    let DayOfBirthNontification = $('#DayOfBirthNontification');

    function checkUserName() {
        if(txtUserName.val() == "")
        {
            UserNameNontification.html("Không được để trống");
            return false;
        }
        let regt = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
        if(regt.test(txtUserName.val()))
        {
            UserNameNontification.html("");
            return true;
        }
        UserNameNontification.html("Bắt buộc nhập theo mẫu: Nguyen Thanh Tam");
        return false;
    }

    function checkPhoneNumber() {
        if(txtPhoneNumber.val() == "")
        {
            PhoneNumberNontification.html("Không được để trống");
            return false;
        }
        let regt = /^0[0-9]{9}$/;
        if(regt.test(txtPhoneNumber.val()))
        {
            PhoneNumberNontification.html("");
            return true;
        }
        PhoneNumberNontification.html("Số điện thoại phải bắt đầu là 0 và gồm 10 chữ số");
        return false;
    }

    function checkDayOfBirth() {
        if(getAge(inputDayOfBirth.val()) < 16)
        {
            DayOfBirthNontification.html("Ngày sinh không đủ 16 tuổi");
            return false;
        }
        DayOfBirthNontification.html("");
        return true;
    }

    txtUserName.blur(function() {checkUserName()});
    txtPhoneNumber.blur(function() {checkPhoneNumber()});
    inputDayOfBirth.change(function() {checkDayOfBirth()});

    txtUserName.keyup(function() {
        UserNameNontification.html("");
    });
    txtPhoneNumber.keyup(function() {
        PhoneNumberNontification.html("");
    });

    $('#btnCapNhatThongTin').click(function() {
        if(checkUserName() && checkPhoneNumber() && checkDayOfBirth())
        {
            alert("Cập nhật thông tin tài khoản thành công");
        }
        else
        {
            checkUserName();
            checkPhoneNumber();
            checkDayOfBirth();
        }
    });
    //#endregion


    //#region Xử lí thêm địa chỉ giao hàng
    let modalAddAddress = $('#modalAddAddress');
    let txtName = $('#modalAddAddress #txtName');
    let txtPhoneNumbers = $('#modalAddAddress #txtPhoneNumber');
    let txtAddress = $('#modalAddAddress #txtAddress');
    let NameNontification = $('#NameNontification');
    let phoneNumberNontification = $('#phoneNumberNontification');
    let addressNontification = $('#addressNontification');

    function checkName() {
        if(txtName.val() == "")
        {
            NameNontification.html("Không được đề trống");
            NameNontification.addClass("text-danger");
            return false;
        }
        let regt = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
        if(regt.test(txtName.val()))
        {
            NameNontification.html("Nhập họ tên theo mẫu: Nguyễn Thanh Tâm");
            NameNontification.removeClass("text-danger");
            return true;
        }
        NameNontification.html("Nhập họ tên theo mẫu: Nguyễn Thanh Tâm");
        NameNontification.addClass("text-danger");
        return false;
    }

    function checkPhoneNumbers() {
        if(txtPhoneNumbers.val() == "")
        {
            phoneNumberNontification.html("Không được đề trống");
            phoneNumberNontification.addClass("text-danger");
            return false;
        }
        let regt = /^0[0-9]{9}$/;
        if(regt.test(txtPhoneNumbers.val()))
        {
            phoneNumberNontification.html("");
            phoneNumberNontification.removeClass("text-danger");
            return true;
        }
        phoneNumberNontification.html("Số điện thoại phải bắt đầu bằng 0 và gồm 10 chữ số");
        phoneNumberNontification.addClass("text-danger");
        return false;
    }

    function checkAddress() {
        if(txtAddress.val() == "")
        {
            addressNontification.html("Không được đề trống");
            return false;
        }
        addressNontification.html("");
        return true;
    }

    txtName.blur(function() {checkName();});
    txtPhoneNumbers.blur(function() {checkPhoneNumbers();});
    txtAddress.blur(function() {checkAddress();});

    txtName.keyup(function() {
        NameNontification.html("Nhập họ tên theo mẫu: Nguyễn Thanh Tâm");
        NameNontification.removeClass("text-danger");
    });
    txtPhoneNumbers.keyup(function() {
        phoneNumberNontification.html("");
        phoneNumberNontification.removeClass("text-danger");
    });
    txtAddress.keyup(function() {
        addressNontification.html("");
    });


    $('#btnAddAddress').click(function() {
        if(checkName() && checkPhoneNumbers() && checkAddress())
        {
            let newContact = new Contact(txtName.val(), txtPhoneNumbers.val(), txtAddress.val());
            currentAccount.getContacts().addContactToList(newContact);
            showContact();
        }
        else
        {
            checkName();
            checkPhoneNumbers();
            checkAddress();
        }
    });
    //#endregion




    //#region Xử lí sửa địa chỉ giao hàng
    /*let modalChangeContact = $('#modalChangeAddress');
    let txtNameChangeContact = $('#modalChangeAddress #txtName');
    let txtPhoneNumbersChangeContact = $('#modalChangeAddress #txtPhoneNumber');
    let txtAddressChangeContact = $('#modalChangeAddress #txtAddress');
    let NameNontificationChangeContact = $('#modalChangeAddress #NameNontification');
    let phoneNumberNontificationChangeContact = $('#modalChangeAddress #phoneNumberNontification');
    let addressNontificationChangeContact = $('#modalChangeAddress #addressNontification');

    function checkNameChangeContact() {
        if(txtNameChangeContact.val() == "")
        {
            NameNontificationChangeContact.html("Không được đề trống");
            NameNontificationChangeContact.addClass("text-danger");
            return false;
        }
        let regt = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
        if(regt.test(txtNameChangeContact.val()))
        {
            NameNontificationChangeContact.html("Nhập họ tên theo mẫu: Nguyễn Thanh Tâm");
            NameNontificationChangeContact.removeClass("text-danger");
            return true;
        }
        NameNontificationChangeContact.html("Nhập họ tên theo mẫu: Nguyễn Thanh Tâm");
        NameNontificationChangeContact.addClass("text-danger");
        return false;
    }

    function checkPhoneNumbersChangeContact() {
        if(txtPhoneNumbersChangeContact.val() == "")
        {
            phoneNumberNontificationChangeContact.html("Không được đề trống");
            phoneNumberNontificationChangeContact.addClass("text-danger");
            return false;
        }
        let regt = /^0[0-9]{9}$/;
        if(regt.test(txtPhoneNumbersChangeContact.val()))
        {
            phoneNumberNontificationChangeContact.html("");
            phoneNumberNontificationChangeContact.removeClass("text-danger");
            return true;
        }
        phoneNumberNontificationChangeContact.html("Số điện thoại phải bắt đầu bằng 0 và gồm 10 chữ số");
        phoneNumberNontificationChangeContact.addClass("text-danger");
        return false;
    }

    function checkAddressChangeContatc() {
        if(txtAddressChangeContact.val() == "")
        {
            addressNontificationChangeContact.html("Không được đề trống");
            return false;
        }
        addressNontificationChangeContact.html("");
        return true;
    }

    txtNameChangeContact.blur(function() {checkNameChangeContact();});
    txtPhoneNumbersChangeContact.blur(function() {checkPhoneNumbersChangeContact();});
    txtAddressChangeContact.blur(function() {checkAddressChangeContatc();});

    txtNameChangeContact.keyup(function() {
        NameNontificationChangeContact.html("Nhập họ tên theo mẫu: Nguyễn Thanh Tâm");
        NameNontificationChangeContact.removeClass("text-danger");
    });
    txtPhoneNumbersChangeContact.keyup(function() {
        phoneNumberNontificationChangeContact.html("");
        phoneNumberNontificationChangeContact.removeClass("text-danger");
    });
    txtAddressChangeContact.keyup(function() {
        addressNontificationChangeContact.html("");
    });

    let btnChangeContact = $('.btnChangeContact');

    btnChangeContact.click(function() {
        modalChangeContact.show();
    });
    btnRemoveContact.click(function() {
        alert();
    });

    $('#btnSaveChangeContact').click(function() {
        
        /*if(checkNameChangeContact() && checkPhoneNumbersChangeContact() && checkAddressChangeContatc())
        {
            let newContact = new Contact(txtNameChangeContact.val(), txtPhoneNumbersChangeContact.val(), txtAddressChangeContact.val());
            currentAccount.getContacts().addContactToList(newContact);
            showContact();
        }
        else
        {
            checkNameChangeContact();
            checkPhoneNumbersChangeContact();
            checkAddressChangeContatc();
        }
    });
    */
    //#endregion


    //#region Xử lí xóa đĩa chỉ giao hàng 
    

    //#endregion

});