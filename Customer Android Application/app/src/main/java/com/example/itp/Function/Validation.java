package com.example.itp.Function;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validation {

    public static boolean isValidEmailAddress(String email) {
        Pattern p = Pattern.compile(CommonConstant.EMAIL_PATTERN);
        Matcher m = p.matcher(email);
        return m.matches();
    }

    public static boolean isValidNIC(String nic) {
        Pattern pattern1 = Pattern.compile(CommonConstant.NIC_NEW_PATTERN);
        Pattern pattern2 = Pattern.compile(CommonConstant.NIC_OLD_PATTERN);
        Matcher matcher1 = pattern1.matcher(nic);
        Matcher matcher2 = pattern2.matcher(nic);
        return (matcher1.matches())||(matcher2.matches());
    }

    public static boolean isValidMobileNumber(String mobileNumber) {
        Pattern pattern = Pattern.compile(CommonConstant.MOBILE_NUMBER_PATTERN);
        Matcher matcher = pattern.matcher(mobileNumber);
        return (matcher.matches());
    }


}
