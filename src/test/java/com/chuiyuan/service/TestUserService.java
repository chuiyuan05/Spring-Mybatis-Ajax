package com.chuiyuan.service;


import com.chuiyuan.model.User;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by chuiyuan on 16-8-29.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
public class TestUserService {
//    private static ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
//    private static UserService userService = null ;
//    private static User user = null ;
    @Autowired
    private UserService userService;

    @BeforeClass
    public static void init(){
//        userService = (UserService)ctx.getBean("userService");
//        user = new User();
//        user.setUserId(112);
        System.out.println("init");
    }

    @Test
    public void hasMatchUser(){
        boolean b1 = userService.hasMatchUser("admin","123456");
        boolean b2 = userService.hasMatchUser("admin","123");
        Assert.assertTrue(b1);
        Assert.assertFalse(b2);
    }

    @Test
    public void findUserByUserName(){
        User user = userService.findUserByUserName("admin");
        Assert.assertEquals(user.getUserName(),"admin");
    }

    @AfterClass
    public static void clear(){
        System.out.println("clear");
    }
}
