package com.chuiyuan.security.impl;

import com.chuiyuan.security.ITokenManager;
import com.chuiyuan.utils.CodeUtil;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by chuiyuan on 16-9-7.
 * Keep token in HashMap or Redis.
 */
@Component
public class DefaultTokenManager implements ITokenManager {
    private static Logger logger = Logger.getLogger(DefaultTokenManager.class);
    /**
     * Keep token in JVM or Redis.
     */
    private static Map<String, String> tokenMap = new ConcurrentHashMap<String, String>();

    /**
     * (UUID, username).
     * Create and Store token in HashMap
     * @param username
     * @return
     */
    public String createToken(String username) {
        String token = CodeUtil.createUUID();
        logger.info("==>DefaultTokenManager:createToken:"+token);
        tokenMap.put(token, username);
        return token;
    }

    public boolean checkToken(String token) {
        return token!= null && token.length() >0 && tokenMap.containsKey(token);
    }
}
