package com.chuiyuan.utils;

import org.apache.log4j.Logger;
import org.junit.Test;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
/**
 * Created by chuiyuan on 16-9-7.
 */
public class TestExpiringMap {
    private static Logger logger = Logger.getLogger(TestExpiringMap.class);

    @Test
    public void simplePutTest() {
        ExpiringMap<String, String> map = new ExpiringMap<String, String>();
        String value = "testValue1";
        String ret = map.put("testKey1", value);
        assertTrue("simple put works", ret == null);
        logger.debug(map.containsKey("testKey1"));
    }

    @Test
    public void simpleGetTest() {
        ExpiringMap<String, String> map = new ExpiringMap<String, String>(1000);
        String value = "testValue1";
        String ret = map.put("testKey1", value, 5000);

        ret = map.get("testKey1");
        assertNotNull("ret is not null", ret);
        assertEquals("valid return", value, ret);
    }

}
