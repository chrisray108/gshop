package com.gshop.service;

import com.gshop.bean.ShopSPU;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface ShopSKUService {


    List<ShopSPU> fetchItemList(Integer type);
}
