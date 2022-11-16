package com.example.itp.Adapter;

import static android.content.ContentValues.TAG;
import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.example.itp.AppController;
import com.example.itp.CustomerOrderHistory;
import com.example.itp.MainActivity;
import com.example.itp.Model.Order;
import com.example.itp.R;
import com.example.itp.URL.URL;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrderHistoryAdapter extends RecyclerView.Adapter<OrderHistoryAdapter.MyHolder> {
    private OrderHistoryAdapter adapter;
    Context context;
    List<Order> orderList;

    public OrderHistoryAdapter(Context context, List<Order> centerList) {
        this.context = context;
        this.orderList = centerList;
    }

    @NonNull
    @Override
    public MyHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_order_history, parent, false);
        return new OrderHistoryAdapter.MyHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull OrderHistoryAdapter.MyHolder holder, int position) {

        final String id = orderList.get(position).getId();
        final String item = orderList.get(position).getItem();
        final String quantity = orderList.get(position).getQuantity();
        final String order_date = orderList.get(position).getOrder_date();

        holder.item.setText(item);
        holder.quantity.setText(quantity);
        holder.order_date.setText(order_date);
        holder.delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                deleteItem(id);
            }
        });
    }



    @Override
    public int getItemCount() {
        return orderList.size();
    }

    class MyHolder extends RecyclerView.ViewHolder {
        TextView item, quantity,order_date;
        Button delete;

        public MyHolder(@NonNull View itemView) {
            super(itemView);

            item = itemView.findViewById(R.id.item);
            quantity = itemView.findViewById(R.id.quantity);
            order_date = itemView.findViewById(R.id.order_date);
            delete = itemView.findViewById(R.id.delete);

        }
    }

    private void deleteItem(String id) {
        String tag_string_req = "req_order_history_delete";
        StringRequest strReq = new StringRequest(Request.Method.POST,
                URL.ORDER_HISTORY_DELETE, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    Log.e(TAG, "Order delete   " + response);
                    JSONObject jsonObject = new JSONObject(response);

                    boolean state = jsonObject.getBoolean("status");
                    if(state){
                        Toast.makeText(context, "Deleted Successfully", Toast.LENGTH_SHORT).show();
                        Intent intent= new Intent(context.getApplicationContext(), CustomerOrderHistory.class);
                        intent.addFlags(FLAG_ACTIVITY_NEW_TASK);
                        context.getApplicationContext().startActivity(intent);
                    }


                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e(TAG, "order error. " + error.getMessage());
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