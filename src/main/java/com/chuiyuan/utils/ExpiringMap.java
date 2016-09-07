package com.chuiyuan.utils;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by chuiyuan on 16-9-7.
 * Value Can not be null if using containsKey.
 * Value can be null if using containsKeyCoarse.
 */
public class ExpiringMap<K, V> extends AbstractMap<K,V>
        implements Map<K,V>{

    private static long DEFAULT_LIFE_MILLIS = 7200000L;//2 hours.
    private static long DEFAULT_CLEANUP_MILLIS = 14400000L;//4 hours

    private ConcurrentHashMap<K, Value> map = new ConcurrentHashMap<K, Value>();
    private PriorityQueue<Key> pq = new PriorityQueue<Key>();

    private Timer cleanupTimer;

    /**
     *Runs CleanupTask every 4 hours.
     */
    public ExpiringMap(){
        this(DEFAULT_CLEANUP_MILLIS);
    }

    public ExpiringMap(long cleanupMillis) {
        cleanupTimer = new Timer();
        cleanupTimer.scheduleAtFixedRate(new CleanupTask(this), cleanupMillis, cleanupMillis);
    }

    private class Key implements Comparable<Key>{
        protected K key;
        protected long expiryMillis;

        public Key(K key, long expiryMillis) {
            this.key = key;
            this.expiryMillis = expiryMillis;
        }

        @Override
        public int compareTo(Key k) {
            if(this.expiryMillis < k.expiryMillis) {
                return -1;
            } else if(this.expiryMillis > k.expiryMillis) {
                return 1;
            }
            return 0;
        }
    }

    public int size() {
        return map.size();
    }

    private class Value {
        protected V val;
        protected long expiryMillis;

        public Value(V value, long expiryMillis) {
            val = value;
            this.expiryMillis = expiryMillis;
        }
    }

    @Override
    public V get(Object key) {
        Value v = map.get(key);
        if(v != null) {
            long curTime = System.currentTimeMillis();
            if(curTime <= v.expiryMillis) {
                return v.val;
            } else {
                return null;
            }
        }
        return null;
    }

    /**
     * life_millis 2 hours by default.
     * @param key
     * @param value Can not be null here.
     * @return
     */
    @Override
    public V put(K key, V value){
        return put(key, value, DEFAULT_LIFE_MILLIS);
    }

    /**
     * @param key
     * @param value Can not be null.
     * @param lifeMillis
     * @return
     */
    public V put(K key, V value, long lifeMillis) {
        long expiryMillis = System.currentTimeMillis() + lifeMillis;
        Value v = new Value(value, expiryMillis);
        Key k = new Key(key, expiryMillis);
        pq.add(k);
        Value ret = map.put(key, v);
        if(ret == null) {
            return null;
        } else {
            return ret.val;
        }
    }

    /**
     * Equals to get(key)!=null, so value can not be null.
     * @param key
     * @return
     */
    @Override
    public boolean containsKey(Object key) {
        return get(key) != null;
    }

    /**
     * Not accurate, entry may have been expired.
     * So value can be null.
     * @param key
     * @return
     */
    public boolean containsKeyCoarse(Object key){
        return map.containsKey(key);
    }

    @Override
    public Set<Entry<K, V>> entrySet() {
        return null;
    }

    public void cleanup() {
        Key k = pq.peek();
        Set<Key> delSet = new HashSet<Key>();
        long curTime = System.currentTimeMillis();
        while(k != null && k.expiryMillis < curTime) {
            delSet.add(pq.remove());
            k = pq.peek();
        }

        Iterator<ExpiringMap<K, V>.Key> keyIter = delSet.iterator();
        while(keyIter.hasNext()) {
            k = keyIter.next();
            map.remove(k.key);
        }
    }

    class CleanupTask extends TimerTask {

        ExpiringMap<K, V> map;

        public CleanupTask(ExpiringMap<K, V> expiringMap) {
            map = expiringMap;
        }

        @Override
        public void run() {
            map.cleanup();
        }

    }
}
