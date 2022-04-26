$(function() {
    let boxLogin = $('#box-login');
    let boxSignUp = $('#box-signup');
    let boxForgotPassword = $('#box-forgot-password');

    boxLogin.hide();
    boxForgotPassword.hide();
    boxSignUp.show();

    //#region  Xử lí cho form Login
    //--------------------------------------------------------------------------------
    function formLogin() {
        let txtEmail = $('#box-login #txtEmail');
        let txtPassword = $('#box-login #txtPassword');

        let EmailNontification = $('#box-login #EmailNontification');
        let PasswordNontification = $('#box-login #PasswordNontification');

        function checkEmail() {
            if(txtEmail.val() == "")
            {
                EmailNontification.html("Không được để trống");
                EmailNontification.addClass("text-danger");
                return false;
            }
            EmailNontification.html("Sử dụng địa chỉ Email để đăng nhập");
            EmailNontification.removeClass("text-danger");
            return true;
        };

        function checkPassword() {
            if(txtPassword.val() == "")
            {
                PasswordNontification.html("Không được để trống");
                return false;
            }
            PasswordNontification.html("");
            return true;
        };

        txtEmail.blur(function() {checkEmail()});

        txtPassword.blur(function() {checkPassword()});

        txtEmail.keyup(function() {
            EmailNontification.html("Sử dụng địa chỉ Email để đăng nhập");
            EmailNontification.removeClass("text-danger");
        });

        txtPassword.keyup(function() {
            PasswordNontification.html("");
        });

        $('#box-login #btnLogin').click(function() {
            if(checkEmail() && checkPassword())
            {
                alert("Đăng nhập thành công");
                document.location.href = "../index.html";
            }
            else
            {
                checkEmail();
                checkPassword();
            }
        });

        $('#linkSignUp').click(function() {
            boxLogin.hide();
            boxSignUp.show();
        });

        $('#linkForgotPassword').click(function() {
            boxLogin.hide();
            boxSignUp.hide();
            boxForgotPassword.show();
        });
    }
    formLogin();
    //--------------------------------------------------------------------------------
    //#endregion


    //#region  Xử lí cho form Sign Up
    //--------------------------------------------------------------------------------
    function formSignUp() {
        let txtName = $('#box-signup #txtName');
        let txtEmail = $('#box-signup #txtEmail');
        let txtPassword = $('#box-signup #txtPassword');
        let txtConfirmPassword = $('#box-signup #txtConfirmPassword');

        let NameNontification = $('#box-signup #NameNontification');
        let EmailNontification = $('#box-signup #EmailNontification');
        let PasswordNontification = $('#box-signup #PasswordNontification');
        let ConfirmPasswordNontification = $('#box-signup #ConfirmPasswordNontification');

        function checkName() {
            if(txtName.val() == "")
            {
                NameNontification.html("Không được để trống");
                NameNontification.addClass("text-danger");
                return false;
            }
            let regt = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
            if(!regt.test(txtName.val()))
            {
                NameNontification.html("* Sai định dạng");
                NameNontification.addClass("text-danger");
                return false;
            }
            NameNontification.html("Vd: Nguyen Thanh Tam");
            NameNontification.removeClass("text-danger");
            return true;
        }

        function checkEmail() {
            if(txtEmail.val() == "")
            {
                EmailNontification.html("Không được để trống");
                EmailNontification.addClass("text-danger");
                return false;
            }
            let regt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!regt.test(txtEmail.val()))
            {
                EmailNontification.html("* Sai định dạng");
                EmailNontification.addClass("text-danger");
                return false;
            }
            EmailNontification.html("Sử dụng địa chỉ E-mail hiện tại của bạn");
            EmailNontification.removeClass("text-danger");
            return true;
        };

        function checkPassword() {
            if(txtPassword.val() == "")
            {
                PasswordNontification.html("Không được để trống");
                PasswordNontification.addClass("text-danger");
                return false;
            }
            let regt = /^(?=.*([a-zA-Z]))(?=.*[0-9])(?=.*[!@#&\._])(.{8,})$/;
            if(!regt.test(txtPassword.val()))
            {
                PasswordNontification.html("Sử dụng 8 ký tự trở lên và kết hợp chữ cái, chữ số và biểu tượng");
                PasswordNontification.addClass("text-danger");
                return false;
            }
            PasswordNontification.html("Sử dụng 8 ký tự trở lên và kết hợp chữ cái, chữ số và biểu tượng");
            PasswordNontification.removeClass("text-danger");
            return true;
        };

        function checkConfirmPassword() {
            if(txtConfirmPassword.val() == "")
            {
                ConfirmPasswordNontification.html("Không được để trống");
                return false;
            }
            if(txtConfirmPassword.val() != txtPassword.val())
            {
                ConfirmPasswordNontification.html("Xác nhận mật khẩu chưa chính xác");
                return false;
            }
            ConfirmPasswordNontification.html("");
            return true;
        };


        txtName.blur(function() {checkName()});
        txtEmail.blur(function() {checkEmail()});
        txtPassword.blur(function() {checkPassword()});
        txtConfirmPassword.blur(function() {checkConfirmPassword()});

        txtName.keyup(function() {
            NameNontification.html("Vd: Nguyen Thanh Tam");
            NameNontification.removeClass("text-danger");
        });
        txtEmail.keyup(function() {
            EmailNontification.html("Sử dụng địa chỉ E-mail hiện tại của bạn");
            EmailNontification.removeClass("text-danger");
        });
        txtPassword.keyup(function() {
            txtConfirmPassword.val("");
            PasswordNontification.html("Sử dụng 8 ký tự trở lên và kết hợp chữ cái, chữ số và biểu tượng");
            PasswordNontification.removeClass("text-danger");
            ConfirmPasswordNontification.html("");
        });
        txtConfirmPassword.keyup(function() {
            ConfirmPasswordNontification.html("");
        });

        $('#box-signup #btnSignUp').click(function() {
            if(checkEmail() && checkPassword() && checkConfirmPassword())
            {
                let check = true;
                for(let i = 0; i < accountList.getAccountList().length; i++)
                    if(txtEmail.val() == accountList.getAccount(i).getEmail())
                    {
                        check = false;
                        break;
                    }
                
                if(check)
                {
                    alert("Đăng ký tài khoản thành công");
                    boxSignUp.hide();
                    boxLogin.show();
                }
                else
                {
                    EmailNontification.html("Email đã được đăng kí");
                    EmailNontification.addClass("text-danger");
                }
            }
            else
            {
                checkName();
                checkEmail();
                checkPassword();
                checkConfirmPassword();
            }
        });

        $('#linkLogin').click(function() {
            boxSignUp.hide();
            boxLogin.show();
        });
    }
    formSignUp();
    //--------------------------------------------------------------------------------
    //#endregion


    //#region Xử lí cho form Forgot Password
    //----------------------------------------------------------------------------------------
    function formForgotPassword() {


        $('#box-forgot-password #linkLogin').click(function() {
            boxSignUp.hide();
            boxForgotPassword.hide();
            boxLogin.show();
        });
        $('#box-forgot-password #linkSignUp').click(function() {
            boxLogin.hide();
            boxForgotPassword.hide();
            boxSignUp.show();
        });
    }
    formForgotPassword();
    //----------------------------------------------------------------------------------------
    //#endregion
});
