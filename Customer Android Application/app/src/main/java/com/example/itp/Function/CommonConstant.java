package com.example.itp.Function;

public class CommonConstant {

    // Constant for validate email pattern in ValidateHelper
    public static final String EMAIL_PATTERN = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";

    // Constant for validate old NIC pattern in ValidateHelper
    public static final String NIC_OLD_PATTERN = "^\\d{9}[vVxX]$";

    // Constant for validate new NIC pattern in ValidateHelper
    public static final String NIC_NEW_PATTERN = "^\\d{12}$";

    // Constant for validate mobile number pattern in ValidateHelper
    public static final String MOBILE_NUMBER_PATTERN = "^\\d{10}$";
}
