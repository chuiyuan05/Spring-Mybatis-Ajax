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

    private static final String[] IGNORE_URL = {"login"};
    private static final String LOGIN_URL = "/pages/login.html";

    @Autowired
    DefaultTokenManager tokenManager ;

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info("==>TokenInterceptor:preHandle");
        String url = request.getRequestURI();
        logger.info("==>request url:"+url);

        //判断url是否是公开地址(实际使用时将公开地址配置在文件中)
        //这里公开地址是登录提交的地址
        for(String str : IGNORE_URL){
            if(url.endsWith(str)){
                logger.info("==>in IGNORE_URL");
                return true ;
            }
        }

        //If contains token
        Cookie[]  cookies = request.getCookies();
        if(cookies != null && cookies.length > 0){
            for (Cookie cookie : cookies){
                if (cookie.getName().equals("token")) {
                    String token = cookie.getValue();
                    logger.info("==>check token:"+token);
                    if(tokenManager.checkToken(token)){
                        logger.info("==>Has token:"+ token);
                        return true ;
                    }
                }
            }
        }
        logger.info("==>No cookie, dispatch to login.html");
        request.getRequestDispatcher(LOGIN_URL).forward(request, response);
        return false;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        logger.info("==>TokenInterceptor:postHandle");
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        logger.info("==>TokenInterceptor:afterCompletion");
    }
}
