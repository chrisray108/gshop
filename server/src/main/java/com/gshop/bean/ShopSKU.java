package com.gshop.bean;

import java.io.Serializable;

public class ShopSKU implements Serializable {
    /**
     * 规格
     */
    private String spec;

    /**
     * 描述
     */
    private String desc;


    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
