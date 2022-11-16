package com.example.itp.Model;

public class Customer {

    private String name;
    private String email;
    private String nic;
    private String contact_number;
    private String address;
    private String password;

    public Customer(String name, String email, String nic, String contact_number, String address, String password) {
        this.name = name;
        this.email = email;
        this.nic = nic;
        this.contact_number = contact_number;
        this.address = address;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getContact_number() {
        return contact_number;
    }

    public void setContact_number(String contact_number) {
        this.contact_number = contact_number;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
