package com.chuiyuan.security;

/**
 * Created by chuiyuan on 16-9-7.
 */
public interface ITokenManager {
    public String createToken(String username);

    public boolean checkToken(String token);

    public boolean removeToken(String token);
}
