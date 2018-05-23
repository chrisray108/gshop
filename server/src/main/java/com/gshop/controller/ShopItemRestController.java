package com.gshop.controller;

import com.gshop.bean.ShopSPU;
import com.gshop.util.MapUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ShopItemRestController {
    @RequestMapping(value = "/itemlist",method = RequestMethod.GET)
    List<ShopSPU> itemlist()
    {
        ShopSPU spu = new ShopSPU();
        spu.setTitle("aaa") ;
        return Arrays.asList(spu, spu, spu, spu);
    }

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    String test()
    {
        return "it is my test";
    }
}
