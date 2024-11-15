package com.skella.service;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MongoService {

    @Autowired
    private MongoClient mongoClient;

    public String testConnection() {
        try {
            MongoDatabase database = mongoClient.getDatabase("admin");
            database.runCommand(new Document("ping", 1));
            return "Pinged your deployment. You successfully connected to MongoDB!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to connect to MongoDB!";
        }
    }
}
