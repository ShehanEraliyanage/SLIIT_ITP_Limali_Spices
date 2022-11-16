package com.example.itp;

import static android.content.ContentValues.TAG;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;

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

import java.util.HashMap;
import java.util.Map;

public class CustomerProfile extends AppCompatActivity {

    private TextView name, email, nic, contact_number, address;
    private Button back_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_customer_profile);

        name = findViewById(R.id.name);
        email = findViewById(R.id.email);
        contact_number = findViewById(R.id.contact_number);
        nic = findViewById(R.id.nic);
        address = findViewById(R.id.address);

        back_btn = findViewById(R.id.back_btn);

        back_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CustomerProfile.this, com.example.itp.HomeActivity.class);
                startActivity(intent);
            }
        });
    getSelectedCustomer("628ea02b0e69ff9fd529a3a7");

    }

    private void getSelectedCustomer(final String id) {

        String tag_string_req = "customer profile";
        StringRequest strReq = new StringRequest(Request.Method.POST,
                URL.GET_SELECTED_CUSTOMER, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    Log.e(TAG, "Selected Customer   " + response);
                    JSONArray jsonArray = new JSONArray(response);
                    JSONObject jsonObject = jsonArray.getJSONObject(0);
                    name.setText(jsonObject.getString("name"));
                    email.setText(jsonObject.getString("email"));
                    nic.setText(jsonObject.getString("nic"));
                    contact_number.setText(jsonObject.getString("contact_number"));
                    address.setText(jsonObject.getString("address"));



                } catch (JSONException e) {
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
