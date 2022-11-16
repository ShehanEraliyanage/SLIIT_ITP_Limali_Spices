package com.example.itp;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {
    private Button move;

    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = "http://localhost:8070";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);
        move = (Button) findViewById(R.id.addQbtn);
        move.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, OrderPlacementAdd.class);
                startActivity(intent);
            }
        });

        findViewById(R.id.addQbtn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                handleAddingDialog();
            }


        });

    }

    private void handleAddingDialog() {

        View view =getLayoutInflater().inflate(R.layout.activity_order_placement_add,null);
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setView(view).show();

        Button addBtn=view.findViewById(R.id.add);
        EditText itemEdit = view.findViewById(R.id.itemEdit);
        EditText quantityEdit = view.findViewById(R.id.quantityEdit);
        EditText orderdateEdit = view.findViewById(R.id.orderdateEdit);

        addBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                HashMap<String,String>map = new HashMap<>();
                map.put("item",itemEdit.getText().toString());
                map.put("quantity",quantityEdit.getText().toString());
                map.put("order date",orderdateEdit.getText().toString());

                Call<Void> call = retrofitInterface.executeAdd(map);
                call.enqueue(new Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, Response<Void> response) {

                        if(response.code() == 200){
                            Toast.makeText(MainActivity.this,"Added Sussccusfully",Toast.LENGTH_LONG).show();
                        }else if(response.code() != 200){
                            Toast.makeText(MainActivity.this,"failed",Toast.LENGTH_LONG).show();

                        }


                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        Toast.makeText(MainActivity.this,t.getMessage(),Toast.LENGTH_LONG).show();
                    }
                });

            }
        });
    }
}

