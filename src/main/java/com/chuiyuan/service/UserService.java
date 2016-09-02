package com.chuiyuan.service;

import org.springframework.stereotype.Service;


/**
 * Created by chuiyuan on 16-8-30.
 */
@Service
public class UserService {
    /*@Autowired
    private UserMybatisTemplateDao userDao ;

    public boolean hasMatchUser(String username, String password){
        Map params = new HashMap();
        params.put("username", username);
        params.put("password", password);
        int match = userDao.getMatchCount(params) ;
        System.out.println(match);
        return match>0;
    }

    public User findUserById(int userId){
        return userDao.findUserById(userId);
    }

    public List<User> findUserByName(String username){
        //return userDao.findUserByName(username);
        return null ;
    }
*/
}
