package com.chuiyuan.controller;

import com.chuiyuan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Created by chuiyuan on 16-8-29.
 */
@Controller
public class LoginController {
    @Autowired
    UserService userService ;

    @RequestMapping(value = {"/","/test"})
    public String test(){
        return "test.jsp";
    }


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody String login(HttpServletRequest request, HttpServletResponse response){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if(userService.hasMatchUser(username, password)){
            System.out.println("match");
            return 1+"::"+username;
        }
        return "0::error";
    }

}
