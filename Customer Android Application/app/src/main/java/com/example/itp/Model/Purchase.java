package com.example.itp.Model;

public class Purchase {

    private String id;
    private String item ;
    private String payment;
    private String order_date;
    private String delivery_date;

    public Purchase(String id, String item, String payment, String order_date, String delivery_date) {
        this.id = id;
        this.item = item;
        this.payment = payment;
        this.order_date = order_date;
        this.delivery_date = delivery_date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }

    public String getDelivery_date() {
        return delivery_date;
    }

    public void setDelivery_date(String delivery_date) {
        this.delivery_date = delivery_date;
    }
}
