package com.chuiyuan.security.impl;

import com.chuiyuan.security.ITokenManager;
import com.chuiyuan.utils.CodeUtil;
import com.chuiyuan.utils.expiringmap.ExpiringMap;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

/**
 * Created by chuiyuan on 16-9-7.
 * Keep token in HashMap or Redis.
 * Singleton by default in Spring.
 * 5 Hours by default.
 */
@Component
public class DefaultTokenManager implements ITokenManager {
    private static Logger logger = Logger.getLogger(DefaultTokenManager.class);
    /**
     * Store token in JVM or Redis.
     */
    //private static Map<String, String> tokenMap = new ConcurrentHashMap<>();
    private static Map<String, String> tokenMap = ExpiringMap.builder()
            .expiration(30, TimeUnit.HOURS)
            .build();
    /**
     * (UUID, username).
     * Create and Store token in HashMap
     * @param username
     * @return
     */
    public String createToken(String username) {
        listTokens();
        String token = CodeUtil.createUUID();
        logger.info("==>DefaultTokenManager:createToken:"+token);
        tokenMap.put(token, username);
        return token;
    }

    public boolean checkToken(String token) {
        listTokens();
        return token!= null && token.length() >0 && tokenMap.containsKey(token);
    }

    /**
     * Logout to remove token.
     * @param token
     * @return
     */
    public boolean removeToken(String token) {
        listTokens();
        if(token != null && token.length()>0 && tokenMap.containsKey(token)){
            tokenMap.remove(token);
            return true ;
        }
        return false ;
    }

    /**
     * For test.
     */
    public void listTokens(){
        for(Map.Entry<String, String> entry : tokenMap.entrySet()){
            logger.info("==>entry(:"+entry.getValue()+":"+entry.getKey());
        }
    }
}
