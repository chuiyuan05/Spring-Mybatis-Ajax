package com.chuiyuan.service;

import com.chuiyuan.dao.UserMybatisTemplateDao;
import com.chuiyuan.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
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
        System.out.println("match"+matchCount);
        return matchCount > 0;
    }

    public User findUserById(int userId){
        return userDao.findUserById(userId);
    }

    public List<User> findUserByUserName(String username){
        return userDao.findUserByUserName(username);
    }

}
