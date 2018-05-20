package com.gshop.bean;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.List;

public class ShopSPU implements Serializable {


    /**
     * id
     */
    @Autowired
    private String spuId;

    /**
     * 标题
     */
    @Autowired
    private String title;

    /**
     * 副标题
     */
    @Autowired
    private String subTitle;

    /**
     * 描述
     */
    @Autowired
    private String desc;

    /**
     * 图片
     */
    @Autowired
    private List<String> imageUrls;

    /**
     * 类型
     */
    @Autowired
    private Integer type;

}
