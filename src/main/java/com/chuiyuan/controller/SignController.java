package com.chuiyuan.controller;

import com.chuiyuan.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


/**
 * Created by chuiyuan on 16-8-29.
 */
@Controller
public class SignController {

    static Logger logger = Logger.getLogger(SignController.class.getName());

    @Autowired
    UserService userService ;

    @RequestMapping(value = {"/sign","/"}, method = RequestMethod.POST)
    public String sign(HttpSession session, String username, String password){
        logger.info("-->SignController:sign");
        //调用service调用身份验证
        //store user info in session
        session.setAttribute("username", username);
        return "redirect:/home.html";
    }

    @RequestMapping(value = "/signout")
    public String signout(HttpSession session){
        logger.info("-->SignController:signout");
        session.invalidate();
        return "redirect:/sign.html";
    }

   /* @RequestMapping(value = {"/home","/"})
    public void home(HttpServletResponse response){
        try {
            logger.info("send redirect");
            response.sendRedirect("http://localhost:8080/pages/home.html");
        }catch (IOException e){
            logger.info("exception");
        }
    }


    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public @ResponseBody String login(HttpServletRequest request, HttpServletResponse response){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        logger.info("login");
        return "1::username";
    }*/

}
