package com.gshop.bean;

import java.io.Serializable;
import java.util.List;

public class ShopSPU implements Serializable {


    /**
     * id
     */
    private String spuId;

    /**
     * 标题
     */
    private String title;

    /**
     * 副标题
     */
    private String subTitle;

    /**
     * 描述
     */
    private String desc;

    /**
     * 图片
     */
    private List<String> imageUrls;

    /**
     * 类型
     */
    private Integer type;

    public String getSpuId() {
        return spuId;
    }

    public void setSpuId(String spuId) {
        this.spuId = spuId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "ShopSPU{" +
                "spuId='" + spuId + '\'' +
                ", title='" + title + '\'' +
                ", subTitle='" + subTitle + '\'' +
                ", desc='" + desc + '\'' +
                ", imageUrls=" + imageUrls +
                ", type=" + type +
                '}';
    }
}
