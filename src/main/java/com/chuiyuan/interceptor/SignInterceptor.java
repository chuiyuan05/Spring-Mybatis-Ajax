package com.chuiyuan.interceptor;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by chuiyuan on 16-9-5.
 */
public class SignInterceptor implements HandlerInterceptor {

    private static Logger logger = Logger.getLogger(SignInterceptor.class);
    /**
     * user id validate
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info("-->SignInterceptor:preHandle");
        String url = request.getRequestURI();
        //判断url是否是公开地址(实际使用时将公开地址配置在文件中)
        //这里公开地址是登录提交的地址
        if (url.endsWith("sign.html")){
            //如果进行登录提交,放行
            return true ;
        }
        //判断session
        HttpSession session = request.getSession() ;
        String username = (String)session.getAttribute("username");
        if (username!= null){
            //身份存在，放行
            return true ;
        }
        //执行这里表示用户身份需要验证，跳转到登录页面
        request.getRequestDispatcher("/sign.html").forward(request, response);
        return false;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        logger.info("-->SignInterceptor:postHandle");
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        logger.info("-->SignInterceptor:afterCompletion");
    }
}
