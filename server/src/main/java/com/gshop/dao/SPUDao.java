package com.gshop.dao;

import com.gshop.bean.ShopSPU;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SPUDao {

    List<ShopSPU> fetchItemList(@Param("type") Integer type);

}
