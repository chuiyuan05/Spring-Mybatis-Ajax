package com.chuiyuan.dao;

import com.chuiyuan.dao.mybatis.UserMybatisDao;
import com.chuiyuan.domain.User;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
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

    /*@Autowired
    SqlSessionFactory sqlSessionFactory;*/

    private UserMybatisDao getDao(){
        return sqlSessionTemplate.getMapper(UserMybatisDao.class);
    }

    public int getMatchCount(Map params) {
        return getDao().getMatchCount(params);
    }

    public int findUserByName(String username) {
        return getDao().findUserByName(username);
    }

    public void updateLoginInfo(User user) {
        getDao().updateLoginInfo(user);
    }

    public User findUserById(int userId) {
       /* SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMybatisDao dao = sqlSession.getMapper(UserMybatisDao.class);*/
       System.out.println("findUserById");
       return (User)sqlSessionTemplate.selectOne(
               "com.chuiyuan.dao.mybatis.UserMybatisDao.findUserById", userId);
    }

    public void insertUser(User user) {
        getDao().insertUser(user);
    }

    public void deleteUser(int userId) {
        getDao().deleteUser(userId);
    }
}
