package com.pjx.service;
import com.pjx.bean.ShopSPU;
import java.util.List;


public interface ShopSKUService {

    List<ShopSPU> fetchItemList(Integer type);
    Long addItem(Integer type);
}
