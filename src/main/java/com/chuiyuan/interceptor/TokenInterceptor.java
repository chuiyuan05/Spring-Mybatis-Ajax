package com.chuiyuan.interceptor;

import com.chuiyuan.security.impl.DefaultTokenManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by chuiyuan on 16-9-7.
 */
public class TokenInterceptor implements HandlerInterceptor {

    private static Logger logger = Logger.getLogger(TokenInterceptor.class);

    @Autowired
    DefaultTokenManager tokenManager ;

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
