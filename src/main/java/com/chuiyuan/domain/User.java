package com.chuiyuan.domain;

import java.io.Serializable;

/**
 * Created by chuiyuan on 16-8-29.
 */
public class User implements Serializable{
    private int uid ; //key
    private String username ;
    private String passwd ;
    private String dep ;
    private int role;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getDep() {
        return dep;
    }

    public void setDep(String dep) {
        this.dep = dep;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User [uid=" + uid + ", username=" + username +
                ", passwd="+passwd+", dep=" + dep
                + ", role=" + role + "]";
    }
}
