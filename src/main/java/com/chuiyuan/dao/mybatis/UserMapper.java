package com.chuiyuan.dao.mybatis;

import com.chuiyuan.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by chuiyuan on 16-9-2.
 * Add repository or not is both ok.
 */
@Repository
public interface UserMapper {
    public User findUserById(int uid);

    public List<User> findUserByName(String username);

    public int insertUser(User user);

    public int deleteUser(int uid);

    public int getLastId();

    public void updateUser(User user);

    /**
     * params:username, passwd(after MD5)
     * @param params
     * @return
     */
    public User findUserByNameAndPasswd(Map params);
}
