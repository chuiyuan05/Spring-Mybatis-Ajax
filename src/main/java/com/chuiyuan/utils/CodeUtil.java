package com.chuiyuan.utils;

import org.apache.log4j.Logger;
import java.security.MessageDigest;
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

    private static final char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F' };

    public static String createMD5(String input){
        try {
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(input.getBytes());
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
