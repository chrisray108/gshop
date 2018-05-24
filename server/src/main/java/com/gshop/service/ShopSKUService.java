package com.gshop.service;
import com.gshop.bean.ShopSPU;
import java.util.List;


public interface ShopSKUService {

    List<ShopSPU> fetchItemList(Integer type);
}
