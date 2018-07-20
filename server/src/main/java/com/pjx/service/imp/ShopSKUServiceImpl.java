package com.pjx.service.imp;

import com.pjx.bean.ShopSPU;
import com.pjx.dao.SPUDao;
import com.pjx.service.ShopSKUService;
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

    @Override
    public Long addItem(Integer type) {
        ShopSPU spu = new ShopSPU();
        spu.setTitle("测试数据");
        spu.setType(2);
        spu.setPrise(100);
        return spudao.addItem(spu);
    }
}
