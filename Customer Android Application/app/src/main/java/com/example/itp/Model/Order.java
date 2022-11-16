package com.example.itp.Model;
public class Order {

    private String id;
    private String item ;
    private String quantity;
    private String order_date;

    public Order(String id, String item, String quantity, String order_date) {
        this.id = id;
        this.item = item;
        this.quantity = quantity;
        this.order_date = order_date;
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

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getOrder_date() {
        return order_date;
    }

    public void setOrder_date(String order_date) {
        this.order_date = order_date;
    }
}
