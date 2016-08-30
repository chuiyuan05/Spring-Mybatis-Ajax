package com.chuiyuan.controller;

import com.chuiyuan.model.User;
import com.chuiyuan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * Created by chuiyuan on 16-8-29.
 */
@Controller
public class LoginController {

    @Autowired
    private UserService userService ;
    //with .html or not both are ok
    @RequestMapping(value = {"/","/login"})
    public String loginPage(){
        System.out.println("login");
        return "login.jsp";
    }

    @RequestMapping(value = "/loginCheck")
    public ModelAndView loginCheck(HttpServletRequest request,
                                   LoginCommand loginCommand){
        boolean isValidUser = userService.hasMatchUser(loginCommand.getUserName(),
                loginCommand.getPassword());
        if (!isValidUser){
            return new ModelAndView("login.jsp", "error","username or password error");
        }else {
            User user = userService.findUserByUserName(loginCommand.getUserName());
            user.setLastIp(request.getRemoteAddr());
            user.setLastVisit(new Date());
            userService.loginSuccess(user);
            request.getSession().setAttribute("user", user);
            return new ModelAndView("main.jsp");
        }
    }


}
