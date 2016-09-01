package com.chuiyuan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


/**
 * Created by chuiyuan on 16-8-29.
 */
@Controller
public class LoginController {

    @RequestMapping(value = {"/","/login"})
    public String login(){
        return "login.jsp";
    }


}
