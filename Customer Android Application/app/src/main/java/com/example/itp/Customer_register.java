package com.example.itp;

import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;
import static com.example.itp.AppController.TAG;


import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.example.itp.Function.Validation;
import com.example.itp.URL.URL;


import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class Customer_register extends AppCompatActivity {

    private EditText name,email,nic,contact,address,password;
    private ImageButton back_btn, register;
    private RelativeLayout login;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_customer_register);

        name = findViewById(R.id.name);
        email = findViewById(R.id.email);
        nic = findViewById(R.id.nic);
        contact = findViewById(R.id.contact);
        address = findViewById(R.id.address);
        password = findViewById(R.id.password);

        register = findViewById(R.id.register);
        login = findViewById(R.id.login);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Customer_register.this, com.example.itp.CustomerLoginActivity.class);
                startActivity(intent);
            }
        });


        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String text_name = name.getText().toString();
                String text_email = email.getText().toString();
                String text_nic = nic.getText().toString();
                String text_contact = contact.getText().toString();
                String text_address = address.getText().toString();
                String text_password = password.getText().toString();

                if (TextUtils.isEmpty(text_name) || TextUtils.isEmpty(text_email) || TextUtils.isEmpty(text_nic) || TextUtils.isEmpty(text_contact) || TextUtils.isEmpty(text_address) || TextUtils.isEmpty(text_password)) {
                    Toast.makeText(Customer_register.this, "All filed are required", Toast.LENGTH_SHORT).show();
                } else if (!Validation.isValidEmailAddress(text_email)) {
                    Toast.makeText(Customer_register.this, "Enter valid email", Toast.LENGTH_SHORT).show();
                } else if (!Validation.isValidMobileNumber(text_contact)) {
                    Toast.makeText(Customer_register.this, "Enter valid phone number", Toast.LENGTH_SHORT).show();
                }
                else if (text_nic.length() < 12) {
                    Toast.makeText(Customer_register.this, "NIC is invalid", Toast.LENGTH_SHORT).show();
                } else if (text_password.length() < 6) {
                    Toast.makeText(Customer_register.this, "Password must be least 6 characters", Toast.LENGTH_SHORT).show();
                }else{
                    registerCustomer(text_name,text_email,text_nic,text_contact,text_address,text_password);
                }

            }
        });

    }

    private void registerCustomer(final String text_name,final String text_email,final String text_nic, final String text_contact, final String text_address, final String text_password) {

        String tag_sting_req = "req_register";
        StringRequest strReq = new StringRequest(Request.Method.POST, URL.CUSTOMER_REGISTER_URL, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d(TAG, "Customer Register Response");
                try {
                    Log.e(ContentValues.TAG, "Customer added" + response);
                    JSONObject jsonObject = new JSONObject(response);

                    boolean state = jsonObject.getBoolean("status");
                    if(state){
                        Toast.makeText(Customer_register.this, "Customer added Successfully", Toast.LENGTH_SHORT).show();
                        Intent intent= new Intent(Customer_register.this, CustomerLoginActivity.class);
                        intent.addFlags(FLAG_ACTIVITY_NEW_TASK);
                        startActivity(intent);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e(TAG, "Registration Error" + error.getMessage());
               // Toast.makeText(Customer_register.this, error.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("name", text_name);
                params.put("email", text_email);
                params.put("nic", text_nic);
                params.put("contact_number", text_contact);
                params.put("address", text_address);
                params.put("password", text_password);
                return params;
            }
        };
        AppController.getInstance().addToRequestQueue(strReq, tag_sting_req);

    }
}