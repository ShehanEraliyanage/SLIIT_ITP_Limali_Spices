package com.example.itp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    private Button customer_btn,supplier_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        customer_btn = (Button) findViewById(R.id.customer_btn);
        supplier_btn = (Button) findViewById(R.id.supplier_btn);
        customer_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent A = new Intent(MainActivity.this, com.example.itp.CustomerLoginActivity.class);
                startActivity(A);
            }
        });

//        supplier_btn.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent intent = new Intent(MainActivity.this, CustomerLoginActivity.class);
//                startActivity(intent);
//            }
//        });

    }
}