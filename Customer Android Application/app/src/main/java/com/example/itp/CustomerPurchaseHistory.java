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
import com.example.itp.Adapter.PurchaseHistoryAdapter;
import com.example.itp.Model.Purchase;
import com.example.itp.URL.URL;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CustomerPurchaseHistory extends AppCompatActivity {

    List<Purchase> purchaseList;
    PurchaseHistoryAdapter purchaseHistoryAdapter;
    private RecyclerView recyclerView;
    private Button back;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_purchase_history);

        recyclerView = findViewById(R.id.purchase_history_recycler_view);
        LinearLayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
        layoutManager.setStackFromEnd(true);
        layoutManager.setReverseLayout(true);
        recyclerView.setLayoutManager(layoutManager);

        back = findViewById(R.id.back);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(CustomerPurchaseHistory.this,HomeActivity.class);
                startActivity(intent);
            }
        });

        purchaseList = new ArrayList<Purchase>();

        getSelectedCustomer("628ee205c2f27b169e6eed48");
    }

    private void getSelectedCustomer(final String id) {

        String tag_string_req = "purchase history";
        StringRequest strReq = new StringRequest(Request.Method.POST,
                URL.GET_CUSTOMER_BY_PURCHASE_HISTORY, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    Log.e(TAG, "purchase History   " + response);
                    JSONArray jsonArray = new JSONArray(response);

                    for (int i = 0; i < jsonArray.length(); i++) {
                        JSONObject purchase = jsonArray.getJSONObject(i);
                        purchaseList.add(new Purchase(
                                purchase.getString("_id"),
                                purchase.getString("item"),
                                purchase.getString("quantity"),
                                purchase.getString("order_date"),
                                purchase.getString("delivery_date")
                        ));
                    }

                    purchaseHistoryAdapter = new PurchaseHistoryAdapter(getApplicationContext(), purchaseList);
                    recyclerView.setLayoutManager(new GridLayoutManager(getApplicationContext(), 1));
                    recyclerView.setAdapter(purchaseHistoryAdapter);

                } catch (JSONException  e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e(TAG, "purchase history error " + error.getMessage());
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