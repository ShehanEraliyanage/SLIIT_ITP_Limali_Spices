package com.example.itp;


import java.util.HashMap;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface RetrofitInterface {


    @POST("/supplierquotation/add")
    Call<Void> executeAdd(@Body HashMap<String, String>map);
}
