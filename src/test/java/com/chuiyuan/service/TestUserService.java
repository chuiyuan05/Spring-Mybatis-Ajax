package com.chuiyuan.service;


import org.junit.AfterClass;
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
    }

    @Test
    public void hasMatchUser(){

    }

    @Test
    public void findUserByUserName(){

    }

    @AfterClass
    public static void clear(){

    }
}
