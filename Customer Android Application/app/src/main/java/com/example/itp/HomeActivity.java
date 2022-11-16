package com.example.itp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.itp.CustomerOrderAdd;
import com.example.itp.CustomerOrderHistory;
import com.example.itp.CustomerProfile;
import com.example.itp.CustomerPurchaseHistory;
import com.example.itp.R;

public class HomeActivity extends AppCompatActivity {
    private Button profile,addbtn,ohistorybtn,phistorybtn,logout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        profile = (Button) findViewById(R.id.profile);
        addbtn = (Button) findViewById(R.id.addbtn);
        ohistorybtn = (Button) findViewById(R.id.ohistorybtn);
        phistorybtn = (Button) findViewById(R.id.phistorybtn);
        profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(HomeActivity.this, CustomerProfile.class);
                startActivity(intent);
            }
        });

        addbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(HomeActivity.this, CustomerOrderAdd.class);
                startActivity(intent);
            }
        });

        ohistorybtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(HomeActivity.this, CustomerOrderHistory.class);
                startActivity(intent);
            }
        });

        phistorybtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(HomeActivity.this, CustomerPurchaseHistory.class);
                startActivity(intent);
            }
        });

    }
}