package com.example.itp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class SupplierQuotationAdd extends AppCompatActivity {

    private String item;
    private Float price;
    private Number quantity;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_supplier_quotation_add);
    }
}