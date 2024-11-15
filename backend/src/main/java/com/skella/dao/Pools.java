package com.skella.dao;

import java.util.ArrayList;

import com.skella.dto.Pool;

public class Pools {
    private ArrayList<Pool> pools;
    
    public Pools() {
        pools = new ArrayList<Pool>();
    }

    public void add(Pool pool) {
        this.pools.add(pool);
    }

    public ArrayList<Pool> getPools() {
        return this.pools;
    }
}
