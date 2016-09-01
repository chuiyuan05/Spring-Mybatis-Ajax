package com.chuiyuan.dao;

import com.chuiyuan.dao.mybatis.UserMybatisDao;
import com.chuiyuan.domain.User;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * Created by chuiyuan on 16-8-30.
 * If you remove MapperScannerConfigurer in applicationContext-mybatis,
 * you must use this in Service.
 */
@Repository
public class UserMybatisTemplateDao  {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    private UserMybatisDao getDao(){
        return sqlSessionTemplate.getMapper(UserMybatisDao.class);
    }

    public int getMatchCount(Map params) {
        return getDao().getMatchCount(params);
    }

    public User findUserByUserName(String userName) {
        User user = new User();

        return  getDao().findUserByUserName(userName);
    }

    public void updateLoginInfo(User user) {
        getDao().updateLoginInfo(user);
    }

}
