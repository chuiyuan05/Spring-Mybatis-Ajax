package com.chuiyuan.controller;

import com.chuiyuan.bean.Response;
import com.chuiyuan.bean.UserToken;
import com.chuiyuan.domain.User;
import com.chuiyuan.security.impl.DefaultTokenManager;
import com.chuiyuan.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by chuiyuan on 16-9-6.
 */
@Controller
public class LoginController {
    private static Logger logger = Logger.getLogger(LoginController.class);

    @Autowired
    private UserService userService ;

    @Autowired
    private DefaultTokenManager tokenManager ;

    @RequestMapping(value = {"/user"}, method = RequestMethod.GET)
    public @ResponseBody User get(){
        User user = new User();
        user.setUsername("cc");
        user.setPasswd("dd");
        return user;
    }

    @RequestMapping(value = {"/login"}, method = RequestMethod.POST)
    public @ResponseBody Response login(@RequestBody User user){
        String username =user.getUsername();
        String passwd = user.getPasswd();

        logger.info("==>"+username+":"+passwd);
        boolean isLogin = userService.login(username, passwd);
        //boolean isLogin = true ;
        if(isLogin){
            String token =  tokenManager.createToken(username);
            UserToken userToken = new UserToken() ;
            userToken.setUsername(username);
            userToken.setToken(token);
            logger.info("==>login success");
            return new Response().success(userToken);
        }else {
            logger.info("==>login fail");
            return new Response().failure("login failure");
        }
    }

}
