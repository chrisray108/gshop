package com.gshop;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.bind.annotation.RestController;


@RestController

@SpringBootApplication
@MapperScan("com.gshop.dao")

public class ServerApplication
{
    public static void main(String[] args)
    {
        SpringApplication.run(ServerApplication.class, args);
    }
}
