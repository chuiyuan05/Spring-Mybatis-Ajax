package com.chuiyuan.service;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by chuiyuan on 16-9-6.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext-mybatis.xml"})
public class TestUserService {
    private static Logger logger = Logger.getLogger(TestUserService.class);

    @Autowired
    UserService userService;

    @Test
    public void testLogin(){
        boolean islogin = userService.login("lisj","1234");
        logger.info("islogin==>"+islogin);
    }
}
