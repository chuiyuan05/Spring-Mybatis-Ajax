package com.chuiyuan.dao.mybatis;

import com.chuiyuan.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by chuiyuan on 16-8-30.
 * Add Repository or not is both ok.
 */
public interface UserMybatisDao {
    /**
     * If >0, login success.
     * @param params
     * @return
     */
    public int getMatchCount(Map params);

    public int findUserByName(String username);

    public void updateLoginInfo(User user) ;

    public User findUserById(int userId) ;

    public void insertUser(User user);

    public void deleteUser(int userId);
}
