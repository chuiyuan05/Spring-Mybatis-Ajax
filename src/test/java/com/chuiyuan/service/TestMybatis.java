package com.chuiyuan.service;

import com.chuiyuan.dao.mybatis.UserMapper;
import com.chuiyuan.domain.User;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by chuiyuan on 16-9-2.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext-mybatis.xml"})
public class TestMybatis {

    @Autowired
    private UserMapper userMapper ;

    @BeforeClass
    public static void init(){

    }

    @Test
    public void testFindUserById(){
        User user = userMapper.findUserById(2);
        System.out.println(user);
    }



    @AfterClass
    public static void clear(){

    }

}
