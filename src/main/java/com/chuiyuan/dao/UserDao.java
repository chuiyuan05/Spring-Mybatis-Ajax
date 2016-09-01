package com.chuiyuan.dao;

import com.chuiyuan.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by chuiyuan on 16-8-29.
 */
//annotation to define a Dao
@Repository
public class UserDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int getMatchCount(String userName, String passwrod){
        String sqlStr = " SELECT count(*) FROM t_user "
                + " WHERE user_name =? AND password=?";
        return jdbcTemplate.queryForObject(sqlStr, new Object[] {userName, passwrod},
                Integer.class);
    }

    public User findUserByUserName( final String userName){
        String sqlStr = " SELECT user_id,user_name,credits "
                +" FROM t_user WHERE user_name=?";
        final User user = new User();
        jdbcTemplate.query(sqlStr, new Object[]{userName},
                new RowCallbackHandler() {
                    public void processRow(ResultSet rs) throws SQLException {
                        user.setUserId(rs.getInt("user_id"));
                        user.setUserName(userName);
                        user.setCredits(rs.getInt("credits"));
                    }
                });
        return user ;
    }

    public void updateLoginInfo(User user){
        String sqlStr = " UPDATE t_user SET last_visit=?,last_ip=?,credits=? "
                + " WHERE user_id =?";
        jdbcTemplate.update(sqlStr, new Object[] { user.getLastVisit(),
                user.getLastIp(),user.getCredits(),user.getUserId()});
    }

}












