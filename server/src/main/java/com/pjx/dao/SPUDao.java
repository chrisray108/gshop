package com.pjx.dao;

import com.pjx.bean.ShopSPU;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SPUDao
{

    List<ShopSPU> fetchItemList(@Param("type") Integer type);

    Long addItem(ShopSPU spu);

}

