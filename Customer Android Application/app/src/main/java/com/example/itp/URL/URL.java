package com.example.itp.URL;

public class URL {

    private static String MAIN_URL = "http://192.168.8.100:8090/";

    public static String CUSTOMER_REGISTER_URL = MAIN_URL + "customers/add";
    public static String GET_SELECTED_CUSTOMER = MAIN_URL + "realCustomer/getSelectedCustomer";
    public static String GET_CUSTOMER_BY_ORDER_HISTORY = MAIN_URL + "order/getUserByOrderHistory";
    public static String ORDER_HISTORY_DELETE = MAIN_URL + "order/delete";
    public static String CUSTOMER_ORDER_ADD = MAIN_URL + "order/add";
    public static String GET_CUSTOMER_BY_PURCHASE_HISTORY = MAIN_URL + "order/getUserByPurchaseHistory";

}
