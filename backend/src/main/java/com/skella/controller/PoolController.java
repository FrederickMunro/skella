package com.skella.controller;

import java.io.IOError;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Base64;
import org.bson.types.Binary;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.skella.dao.Pools;
import com.skella.dto.Pool;

@RestController
@CrossOrigin
class PoolController {

    @Autowired
    MongoClient mongoClient;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/allpools")
    public ResponseEntity<List<Map<String, Object>>> getAllPools() {
        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("pools");

        List<Map<String, Object>> pools = new ArrayList<>();
        collection.find().forEach(doc -> {
            Map<String, Object> pool = new HashMap<>();
            pool.put("id", doc.getObjectId("_id").toString());
            pool.put("name", doc.getString("name"));
            pool.put("description", doc.getString("description"));
            pool.put("sizes", doc.get("sizes"));
            pool.put("depths", doc.get("depths"));
            
            // Convert Binary image to Base64 string
            Binary imageBinary = doc.get("image", Binary.class);
            if (imageBinary != null) {
                String base64Image = Base64.getEncoder().encodeToString(imageBinary.getData());
                pool.put("image", "data:image/jpeg;base64," + base64Image);
            }
            
            pools.add(pool);
        });

        return new ResponseEntity<>(pools, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/addpool")
    public ResponseEntity<Pool> addPool(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("size[]") ArrayList<String> size,
            @RequestParam("depth[]") ArrayList<String> depth,
            @RequestParam("image") MultipartFile image) {

        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("pools");

        try {
            byte[] imageBytes = image.getBytes();
            Pool pool = new Pool(name, description, size, depth, imageBytes);
            collection.insertOne(pool.toDocument());
            return new ResponseEntity<>(pool, HttpStatus.CREATED);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/pools/{id}")
    public ResponseEntity<Void> deletePool(@PathVariable String id) {
        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("pools");

        collection.deleteOne(new Document("_id", new ObjectId(id)));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/pools/{id}")
    public ResponseEntity<Pool> updatePool(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("size[]") ArrayList<String> size,
            @RequestParam("depth[]") ArrayList<String> depth,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("pools");
        
        try {
            Document query = new Document("_id", new ObjectId(id));
            Document existingPool = collection.find(query).first();
            
            if (existingPool == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Document updateDoc = new Document()
                .append("name", name)
                .append("description", description)
                .append("size", size)
                .append("depth", depth);

            // Only update image if a new one is provided
            if (image != null && !image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                updateDoc.append("image", new Binary(imageBytes));
            }

            collection.updateOne(query, new Document("$set", updateDoc));
            
            // Fetch and return updated pool
            Document updatedPool = collection.find(query).first();
            return new ResponseEntity<>(Pool.fromDocument(updatedPool), HttpStatus.OK);
            
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}