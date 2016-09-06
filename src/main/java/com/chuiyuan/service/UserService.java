package com.chuiyuan.service;

import com.chuiyuan.dao.mybatis.UserMapper;
import com.chuiyuan.domain.User;
import com.chuiyuan.utils.MD5;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


/**
 * Created by chuiyuan on 16-8-30.
 */
@Service
public class UserService {
    private static Logger logger = Logger.getLogger(UserService.class);

    @Autowired
    private UserMapper userMapper ;

    public boolean login(String username, String passwd){
        logger.info("==>UserService:login");
        Map<String, String> params = new HashMap<String, String>() ;
        params.put("username",username);
        params.put("passwd", MD5.convert(passwd));
        User user = userMapper.findUserByNameAndPasswd(params);
        if(user != null && user.getUsername().equals(username))
            return true;
        return false;
    }

}
