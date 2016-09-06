package com.chuiyuan.controller;

import com.chuiyuan.bean.Response;
import com.chuiyuan.param.LoginParam;
import com.chuiyuan.service.UserService;
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

    @RequestMapping(value = {"/","/login"}, method = RequestMethod.POST)
    public Response login(LoginParam param){
        String username =param.getUsername();
        String password = param.getPasswd();
        return null;
    }

}
