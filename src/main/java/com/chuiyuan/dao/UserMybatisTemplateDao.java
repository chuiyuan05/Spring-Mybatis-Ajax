package com.chuiyuan.dao;

import com.chuiyuan.dao.mybatis.UserMybatisDao;
import com.chuiyuan.domain.User;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by chuiyuan on 16-8-30.
 * If you remove MapperScannerConfigurer in applicationContext-mybatis,
 * you must use this in Service.
 */
@Repository
public class UserMybatisTemplateDao implements UserMybatisDao{

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    private UserMybatisDao getDao(){
        return sqlSessionTemplate.getMapper(UserMybatisDao.class);
    }

    public int getMatchCount(Map params) {
        return getDao().getMatchCount(params);
    }

    public List<User> findUserByUserName(String username) {
        return getDao().findUserByUserName(username);
    }

    public void updateLoginInfo(User user) {
        getDao().updateLoginInfo(user);
    }

    public User findUserById(int userId) {
        return getDao().findUserById(userId);
    }
}
