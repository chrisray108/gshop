package com.gshop.controller;

import com.gshop.bean.ShopSPU;

import com.gshop.service.ShopSKUService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ShopItemRestController {

    @Autowired
    private ShopSKUService skuService;


    @RequestMapping(value = "/itemlist",method = RequestMethod.GET)
    List<ShopSPU> itemlist()
    {
        return skuService.fetchItemList(1);
    }

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    String test()
    {
        return "it is my test";
    }
}
