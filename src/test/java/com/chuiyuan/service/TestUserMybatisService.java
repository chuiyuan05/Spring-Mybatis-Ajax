package com.chuiyuan.service;

import com.chuiyuan.service.mybatis.UserMybatisService;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by chuiyuan on 16-8-30.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext-mybatis.xml"})
public class TestUserMybatisService {
    @Autowired
    UserMybatisService userMybatisService ;

    @BeforeClass
    public static void init(){

    }

    @Test
    public void hasMatchUser(){
        boolean b1 = userMybatisService.hasMatchUser("admin","123456");
        boolean b2 = userMybatisService.hasMatchUser("admin", "123");
        Assert.assertTrue(b1);
        Assert.assertFalse(b2);
    }

    @AfterClass
    public static void clear(){

    }

}
