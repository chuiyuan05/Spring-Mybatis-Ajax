package com.chuiyuan.service;

import com.chuiyuan.dao.mybatis.UserMapper;
import com.chuiyuan.domain.User;
import com.chuiyuan.utils.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


/**
 * Created by chuiyuan on 16-8-30.
 */
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper ;

    public boolean login(String username, String passwd){
        Map<String, String> params = new HashMap<String, String>() ;
        params.put("username",username);
        params.put("passwd", MD5.convert(passwd));
        User user = userMapper.findUserByNameAndPasswd(params);
        if(user != null && user.getUsername().equals(username))
            return true;
        return false;
    }

}
