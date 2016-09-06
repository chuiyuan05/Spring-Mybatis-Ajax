package com.chuiyuan.mybatis;

import com.chuiyuan.dao.mybatis.UserMapper;
import com.chuiyuan.domain.User;
import com.chuiyuan.utils.MD5;
import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by chuiyuan on 16-9-2.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext-mybatis.xml"})
public class TestMybatis {

    Logger logger = Logger.getLogger(TestMybatis.class);

    @Autowired
    private UserMapper userMapper ;

    @BeforeClass
    public static void init(){

    }

    @Test
    public void testInsertUser(){
        User user = new User();
        user.setUsername("lisj3");
        user.setPasswd(MD5.convert("1234"));
        user.setDep("that");
        user.setRole(2);
        //userMapper.insertUser(user);
    }

    @Test
    public void testFindUserById(){
        User user = userMapper.findUserById(1);
        logger.info(user);
    }

    @Test
    public void testFindUserByName(){
        List<User> list = userMapper.findUserByName("lisj");
        if (list.isEmpty()){
            logger.info("empty");
        }else {
            logger.info(list.size());
        }
    }

    @Test
    public void testFindUserByNameAndPasswd(){
        Map<String, String> params = new HashMap<String, String>() ;
        params.put("username","lisj");
        params.put("passwd",MD5.convert("1234"));

        User user = userMapper.findUserByNameAndPasswd(params);
        logger.info(user.toString());
    }


    @AfterClass
    public static void clear(){

    }

}
