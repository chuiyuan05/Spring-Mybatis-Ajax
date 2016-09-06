package com.chuiyuan.controller;

import com.chuiyuan.bean.Response;
import com.chuiyuan.bean.UserToken;
import com.chuiyuan.bean.LoginParam;
import com.chuiyuan.service.UserService;
import com.chuiyuan.utils.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by chuiyuan on 16-9-6.
 */
@RestController
public class LoginController {

    @Autowired
    private UserService userService ;

    @RequestMapping(value = {"/login"}, method = RequestMethod.POST)
    public Response login(LoginParam param){
        String username =param.getUsername();
        String passwd = param.getPasswd();

        boolean isLogin = userService.login(username, passwd);

        if(isLogin){
            String token = MD5.convert(username); //for test
            UserToken userToken = new UserToken() ;
            userToken.setUsername(username);
            userToken.setToken(token);
            return new Response().success(userToken);
        }else {
            return new Response().failure("login failure");
        }
    }

}
