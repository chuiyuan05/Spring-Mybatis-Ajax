package com.chuiyuan.service;

import com.chuiyuan.dao.UserMybatisTemplateDao;
import com.chuiyuan.dao.mybatis.UserMybatisDao;
import com.chuiyuan.domain.User;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by chuiyuan on 16-8-30.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext-mybatis.xml"})
public class TestUserMybatisService {
    @Autowired
    UserService userService ;

    @Autowired
    UserMybatisTemplateDao userDao ;

    @BeforeClass
    public static void init(){

    }

    @Test
    public void hasMatchUser(){
        boolean b1 = userService.hasMatchUser("admin","123456");
        boolean b2 = userService.hasMatchUser("admin", "123");
        System.out.println("hasMatchUser");
        Assert.assertTrue(b1);
        Assert.assertFalse(b2);
    }

    @Test
    public void testFindUserById(){
        User user = userDao.findUserById(1);
        System.out.println(user.toString());
    }

    @Test
    public void testFindUserByUserName(){
        List<User> users = userService.findUserByUserName("admin");
        System.out.println(users.get(0).toString());
    }


    @AfterClass
    public static void clear(){

    }

}
