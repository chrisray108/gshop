package com.gshop.controller;

import com.gshop.bean.ShopSPU;
import com.gshop.util.MapUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ShopItemResrController {
    @RequestMapping(value = "/itemlist",produces = "text/plain;charset=UTF-8")
    @ResponseBody
    List<ShopSPU> itemlist()
    {
        ShopSPU spu = new ShopSPU();

        return Arrays.asList(spu, spu, spu, spu);
    }

    @RequestMapping(value = "/test",produces = "text/plain;charset=UTF-8")
    @ResponseBody
    String test()
    {
        return "it is my test";
    }
}
