package com.gshop.bean;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;

public class ShopSKU implements Serializable {
    /**
     * 规格
     */
    @Autowired
    private String spec;

    /**
     * 描述
     */
    @Autowired
    private String desc;

}
