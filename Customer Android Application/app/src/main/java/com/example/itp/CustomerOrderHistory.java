package com.example.itp;

import static android.content.ContentValues.TAG;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.example.itp.Adapter.OrderHistoryAdapter;
import com.example.itp.Model.Order;
import com.example.itp.URL.URL;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CustomerOrderHistory extends AppCompatActivity {

    List<Order> orderList;
    OrderHistoryAdapter orderHistoryAdapter;
    private RecyclerView recyclerView;
    private Button back;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_customer_order_history);

        recyclerView = findViewById(R.id.order_history_recycler_view);
        LinearLayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
        layoutManager.setStackFromEnd(true);
        layoutManager.setReverseLayout(true);
        recyclerView.setLayoutManager(layoutManager);

        back = findViewById(R.id.back);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(CustomerOrderHistory.this,HomeActivity.class);
                startActivity(intent);
            }
        });

        orderList = new ArrayList<Order>();

        getSelectedCustomer("628ea02b0e69ff9fd529a3a7");
    }

    private void getSelectedCustomer(final String id) {

        String tag_string_req = "order history";
        StringRequest strReq = new StringRequest(Request.Method.POST,
                URL.GET_CUSTOMER_BY_ORDER_HISTORY, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    Log.e(TAG, "Order History   " + response);
                    JSONArray jsonArray = new JSONArray(response);

                    for (int i = 0; i < jsonArray.length(); i++) {
                        JSONObject order = jsonArray.getJSONObject(i);
                        orderList.add(new Order(
                                order.getString("_id"),
                                order.getString("item"),
                                order.getString("quantity"),
                                order.getString("order_date")
                        ));
                    }

                    orderHistoryAdapter = new OrderHistoryAdapter(getApplicationContext(), orderList);
                    recyclerView.setLayoutManager(new GridLayoutManager(getApplicationContext(), 1));
                    recyclerView.setAdapter(orderHistoryAdapter);

                } catch (JSONException  e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e(TAG, "order history error " + error.getMessage());
            }
        }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("id", id);
                return params;
            }
        };
        AppController.getInstance().addToRequestQueue(strReq, tag_string_req);
    }
}