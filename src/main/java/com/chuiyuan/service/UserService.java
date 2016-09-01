package com.chuiyuan.service;

import com.chuiyuan.dao.UserMybatisTemplateDao;
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
    private UserMybatisTemplateDao userDao ;

    public boolean hasMatchUser(String username, String password){
        Map params = new HashMap();
        params.put("username", username);
        params.put("password", password);
        int matchCount = userDao.getMatchCount(params);
        return matchCount > 0;
    }

}
