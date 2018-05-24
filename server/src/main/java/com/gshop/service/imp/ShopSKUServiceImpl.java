package com.gshop.service.imp;

import com.gshop.bean.ShopSPU;
import com.gshop.dao.SPUDao;
import com.gshop.service.ShopSKUService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopSKUServiceImpl implements ShopSKUService {

    @Autowired
    private SPUDao spudao;

    @Override
    public List<ShopSPU> fetchItemList(Integer type) {
        return spudao.fetchItemList(type);
    }
}
