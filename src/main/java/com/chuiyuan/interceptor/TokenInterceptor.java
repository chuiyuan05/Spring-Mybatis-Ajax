package com.chuiyuan.interceptor;

import com.chuiyuan.security.impl.DefaultTokenManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
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
        logger.info("==>TokenInterceptor:preHandle");
        //判断url是否是公开地址(实际使用时将公开地址配置在文件中)
        //这里公开地址是登录and提交的地址
        String url = request.getRequestURI();
        if (url.endsWith("login.html")|| url.endsWith("login")){
            logger.info("==>login");
            return true;
        }
        //If contains token
        Cookie[]  cookies = request.getCookies();
        if(cookies != null){
            for (Cookie cookie : cookies){
                if (cookie.getName().equals("token")) {
                    String token = cookie.getValue();
                    if(tokenManager.checkToken(token)){
                        logger.info("==>Has token:"+ token);
                        return true ;
                    }
                }
            }
        }
        logger.info("==>No cookie, dispatch to login.html");
        request.getRequestDispatcher("/pages/login.html").forward(request, response);
        return false;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        logger.info("==>TokenInterceptor:postHandle");
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        logger.info("==>TokenInterceptor:afterCompletion");
    }
}
