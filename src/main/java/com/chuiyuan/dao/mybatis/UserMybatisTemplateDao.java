package com.chuiyuan.dao.mybatis;

import com.chuiyuan.model.User;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by chuiyuan on 16-8-30.
 */
@Repository
public class UserMybatisTemplateDao implements UserMybatisDao{

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public int getMatchCount(String userName, String passwrod) {
        UserMybatisDao userMybatisDao =
                sqlSessionTemplate.getMapper(UserMybatisDao.class);
        return userMybatisDao.getMatchCount(userName, passwrod);
    }

    public User findUserByUserName(String userName) {
        UserMybatisDao userMybatisDao =
                sqlSessionTemplate.getMapper(UserMybatisDao.class);
        return  userMybatisDao.findUserByUserName(userName);
    }

    public void updateLoginInfo(User user) {
        UserMybatisDao userMybatisDao =
                sqlSessionTemplate.getMapper(UserMybatisDao.class);
        userMybatisDao.updateLoginInfo(user);
    }
}
