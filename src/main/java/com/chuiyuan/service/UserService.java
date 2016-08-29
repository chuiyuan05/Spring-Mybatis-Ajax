package com.chuiyuan.service;

import com.chuiyuan.dao.LoginLogDao;
import com.chuiyuan.dao.UserDao;
import com.chuiyuan.model.LoginLog;
import com.chuiyuan.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by chuiyuan on 16-8-29.
 */
@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private LoginLogDao loginLogDao ;

    public boolean hasMatchUser(String username, String password){
        int matchCount = userDao.getMatchCount(username, password);
        return matchCount > 0;
    }

    public User findUserByUserName(String username){
        return userDao.findUserByUserName(username) ;
    }

    public void loginSuccess(User user){
        user.setCredits(5 + user.getCredits());
        LoginLog loginLog = new LoginLog();
        loginLog.setUserId(user.getUserId());
        loginLog.setIp(user.getLastIp());
        loginLog.setLoginDate(user.getLastVisit());
        userDao.updateLoginInfo(user);
        loginLogDao.insertLoginLog(loginLog);
    }
}
