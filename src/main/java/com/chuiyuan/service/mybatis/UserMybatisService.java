package com.chuiyuan.service.mybatis;

import com.chuiyuan.dao.UserDao;
import com.chuiyuan.dao.mybatis.UserMybatisDao;
import com.chuiyuan.dao.mybatis.UserMybatisTemplateDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by chuiyuan on 16-8-30.
 */
@Service
public class UserMybatisService {
    @Autowired
    private UserMybatisDao userDao ;

    public boolean hasMatchUser(String username, String password){
        Map params = new HashMap();
        params.put("username", username);
        params.put("password", password);
        int matchCount = userDao.getMatchCount(params);
        return matchCount > 0;
    }

}
