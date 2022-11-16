package com.example.itp.Adapter;


import static android.content.ContentValues.TAG;
import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;

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
import androidx.recyclerview.widget.RecyclerView;


import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.example.itp.Model.Purchase;
import com.example.itp.R;
import com.example.itp.CustomerPurchaseHistory;
import com.example.itp.AppController;
import com.example.itp.URL.URL;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PurchaseHistoryAdapter extends RecyclerView.Adapter<PurchaseHistoryAdapter.MyHolder> {
    private PurchaseHistoryAdapter adapter;
    Context context;
    List<Purchase> purchaseList;

    public PurchaseHistoryAdapter(Context context, List<Purchase> centerList) {
        this.context = context;
        this.purchaseList = centerList;
    }

    @NonNull
    @Override
    public MyHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_purchase_history, parent, false);
        return new PurchaseHistoryAdapter.MyHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PurchaseHistoryAdapter.MyHolder holder, int position) {

        final String id = purchaseList.get(position).getId();
        final String item = purchaseList.get(position).getItem();
        final String payment = purchaseList.get(position).getPayment();
        final String order_date = purchaseList.get(position).getOrder_date();
        final String delivery_date = purchaseList.get(position).getDelivery_date();

        holder.item.setText(item);
        holder.payment.setText(payment);
        holder.order_date.setText(order_date);
        holder.delivery_date.setText(delivery_date);
//
    }



    @Override
    public int getItemCount() {
        return purchaseList.size();
    }

    class MyHolder extends RecyclerView.ViewHolder {
        TextView item, payment,order_date, delivery_date;


        public MyHolder(@NonNull View itemView) {
            super(itemView);

            item = itemView.findViewById(R.id.item);
            payment = itemView.findViewById(R.id.payment);
            order_date = itemView.findViewById(R.id.order_date);
            delivery_date = itemView.findViewById(R.id.delivery_date);



        }
    }


}
