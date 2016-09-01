package com.chuiyuan.dao.mybatis;

import com.chuiyuan.domain.User;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * Created by chuiyuan on 16-8-30.
 */
@Repository
public interface UserMybatisDao {
    public int getMatchCount(Map params);

    public User findUserByUserName(final String userName);

    public void updateLoginInfo(User user) ;
}
