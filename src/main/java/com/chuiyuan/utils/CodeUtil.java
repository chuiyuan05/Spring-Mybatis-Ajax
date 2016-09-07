package com.chuiyuan.utils;

import org.apache.log4j.Logger;

import java.util.UUID;

/**
 * Created by chuiyuan on 16-9-7.
 */
public class CodeUtil {
    private static Logger logger = Logger.getLogger(CodeUtil.class);

    /**
     * Create UUID.UUID(Universally Unique Identifier)全局唯一标识符,
     * 是指在一台机器上生成的数字，它保证对在同一时空中的所有机器都是唯一的。按照
     * 开放软件基金会(OSF)制定的标准计算，用到了以太网卡地址、纳秒级时间、芯片ID码和许多可能的数字。
     * @return
     */
    public static String createUUID(){
        return UUID.randomUUID().toString().replaceAll("-","").toUpperCase();
    }
}
