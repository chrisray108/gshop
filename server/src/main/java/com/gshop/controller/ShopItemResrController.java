package com.gshop.controller;

import com.gshop.bean.ShopSPU;
import com.gshop.util.MapUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ShopItemResrController {
    @RequestMapping(value = "/itemlist",produces = "text/plain;charset=UTF-8")
    List<ShopSPU> itemlist()
    {
        ShopSPU spu = new ShopSPU();
        return null;
    }
}
