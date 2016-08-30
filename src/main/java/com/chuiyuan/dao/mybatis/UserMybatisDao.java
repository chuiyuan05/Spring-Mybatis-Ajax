package com.chuiyuan.dao.mybatis;

import com.chuiyuan.model.User;

/**
 * Created by chuiyuan on 16-8-30.
 */
public interface UserMybatisDao {
    public int getMatchCount(String userName, String passwrod);

    public User findUserByUserName(final String userName);

    public void updateLoginInfo(User user) ;
}
