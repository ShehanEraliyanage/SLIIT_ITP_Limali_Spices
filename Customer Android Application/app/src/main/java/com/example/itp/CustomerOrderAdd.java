package com.example.itp;

import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;
import static com.example.itp.AppController.TAG;


import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.example.itp.URL.URL;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class CustomerOrderAdd extends AppCompatActivity {

    private EditText item,quantity;
    private Button addOrder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_customer_order_add);

        item = findViewById(R.id.item);
        quantity = findViewById(R.id.quantity);

        addOrder = findViewById(R.id.addOrder);


        addOrder.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String text_item = item.getText().toString();
                String text_quantity = quantity.getText().toString();

                orderAdd(text_item,text_quantity);
            };
        });

    }

    private void orderAdd(final String text_item,final String text_quantity) {

        String tag_sting_req = "req_order add";
        StringRequest strReq = new StringRequest(Request.Method.POST, URL.CUSTOMER_ORDER_ADD, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d(TAG, "Order Add Response");
                try {
                    Log.e(ContentValues.TAG, "Order added" + response);
                    JSONObject jsonObject = new JSONObject(response);

                    boolean state = jsonObject.getBoolean("status");
                    if(state){
                        Toast.makeText(CustomerOrderAdd.this, "Order added Successfully", Toast.LENGTH_SHORT).show();
                        Intent intent= new Intent(CustomerOrderAdd.this, CustomerOrderHistory.class);
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
                Log.e(TAG, "Order added Error" + error.getMessage());
            }
        }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                Log.d(TAG, "Item Add Response"+ text_item);
                Log.d(TAG, "Item Add Response"+ text_quantity);
                params.put("item", text_item);
                params.put("quantity", text_quantity);
                params.put("delivery_date", "");
                params.put("status", "pending");
                params.put("vehicle", "");
                params.put("customer_id", "628ea02b0e69ff9fd529a3a7"); //
                params.put("branch", "");
                params.put("branch_status", "false");
                return params;
            }
        };
        AppController.getInstance().addToRequestQueue(strReq, tag_sting_req);

    }
}