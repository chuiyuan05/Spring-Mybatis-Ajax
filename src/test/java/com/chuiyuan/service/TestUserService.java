package com.chuiyuan.service;


import com.chuiyuan.model.User;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by chuiyuan on 16-8-29.
 */
public class TestUserService {
    private static ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
    private static UserService userService = null ;
    private static User user = null ;

    @BeforeClass
    public static void init(){
        userService = (UserService)ctx.getBean("userService");
        user = new User();
        user.setUserId(112);
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
