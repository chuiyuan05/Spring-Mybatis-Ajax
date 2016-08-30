package com.chuiyuan.service.mybatis;

import com.chuiyuan.dao.mybatis.UserMybatisDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by chuiyuan on 16-8-30.
 */
@Transactional
@Service
public class UserMybatisService {
    @Autowired
    private UserMybatisDao userDao ;

    public boolean hasMatchUser(String username, String password){
        int matchCount = userDao.getMatchCount(username, password);
        return matchCount > 0;
    }

}
