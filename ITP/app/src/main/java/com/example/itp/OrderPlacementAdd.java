package com.example.itp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class OrderPlacementAdd extends AppCompatActivity {

    private String item;
    private Number quantity;
    private String orderdate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_placement_add);
    }
}