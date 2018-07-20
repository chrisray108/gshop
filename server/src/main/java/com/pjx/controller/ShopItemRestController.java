package com.pjx.controller;

import com.pjx.bean.ShopSPU;

import com.pjx.service.ShopSKUService;
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

    @RequestMapping(value = "/addItem",method = RequestMethod.GET)
    Long addItem() { return skuService.addItem(1); }

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    String test()
    {
        return "it is my test  31231";
    }


}
