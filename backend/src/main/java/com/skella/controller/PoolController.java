package com.skella.controller;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Base64;
import org.bson.types.Binary;

import org.bson.Document;
import org.bson.conversions.Bson;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
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
            pool.put("tag", doc.getString("tag"));
            
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
        @RequestParam("tag") String tag,
        @RequestParam("sizedepth") String sizeDepth,
        @RequestParam(value = "image", required = false) String base64Image) {
        try {
            // Validate inputs
            if (name == null || name.isEmpty() || sizeDepth == null || sizeDepth.isEmpty() || tag == null || tag.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            System.out.println(sizeDepth);

            ObjectMapper objectMapper = new ObjectMapper();
            List<List<String>> sizeDepthArray = objectMapper.readValue(sizeDepth, List.class);

            // Decode Base64 image if provided
            byte[] imageBytes = null;
            if (base64Image != null && !base64Image.isEmpty()) {
                try {
                    // Remove the Base64 header if present
                    String base64Content = base64Image.replaceFirst("^data:image/[^;]+;base64,", "");
                    imageBytes = Base64.getDecoder().decode(base64Content);
                } catch (IllegalArgumentException e) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }

            // Create the pool object and save it to the database
            Pool pool = new Pool(name, description, tag, sizeDepthArray, imageBytes);
            MongoDatabase database = mongoClient.getDatabase("skella");
            MongoCollection<Document> collection = database.getCollection("pools");
            collection.insertOne(pool.toDocument());

            return new ResponseEntity<>(pool, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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
    @GetMapping("/poolsbytag/{tag}")
    public ResponseEntity<List<Map<String, Object>>> getPoolsByTag(@PathVariable String tag) {
        // Connect to MongoDB database and collection
        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("pools");

        // Filter by tag
        Bson filter = Filters.eq("tag", tag);
        List<Map<String, Object>> pools = new ArrayList<>();

        // Fetch and process documents
        collection.find(filter).forEach(doc -> {
            Map<String, Object> pool = new HashMap<>();
            pool.put("id", doc.getObjectId("_id").toString());
            pool.put("name", doc.getString("name"));
            pool.put("description", doc.getString("description"));
            pool.put("tag", doc.getString("tag"));

            // Convert image (if available) to Base64 string
            Binary imageBinary = doc.get("image", Binary.class);
            if (imageBinary != null) {
                String base64Image = Base64.getEncoder().encodeToString(imageBinary.getData());
                pool.put("image", "data:image/jpeg;base64," + base64Image);
            }

            // Add sizedepth to the response if it exists
            List<List<String>> sizeDepth = (List<List<String>>) doc.get("sizeDepth");
            if (sizeDepth != null) {
                pool.put("sizeDepth", sizeDepth);
            }

            pools.add(pool);
        });

        // Return the response
        return new ResponseEntity<>(pools, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/pools/{id}")
    public ResponseEntity<Pool> updatePool(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "sizedepth", required = false) String sizeDepthJson,
            @RequestParam(value = "image", required = false) String image) {
        
        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("pools");

        try {
            Document query = new Document("_id", new ObjectId(id));
            Document existingPool = collection.find(query).first();

            if (existingPool == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Document updateDoc = new Document().append("name", name);
            updateDoc.append("description", description);

            // Update sizedepth if provided
            if (sizeDepthJson != null && !sizeDepthJson.isEmpty()) {
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    List<List<String>> sizeDepth = objectMapper.readValue(sizeDepthJson, List.class);
                    updateDoc.append("sizeDepth", sizeDepth);
                } catch (Exception e) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }

            // Update image if provided
            if (image != null && !image.isEmpty()) {
                String base64Content;
                if (image.startsWith("data:image/jpeg;base64,")) {
                    base64Content = image.replace("data:image/jpeg;base64,", "");
                } else if (image.startsWith("data:image/png;base64,")) {
                    base64Content = image.replace("data:image/png;base64,", "");
                } else {
                    throw new IllegalArgumentException("Unsupported image format. Only JPEG and PNG are allowed.");
                }
                byte[] imageBytes = Base64.getDecoder().decode(base64Content);
                updateDoc.append("image", new Binary(imageBytes));
            }

            collection.updateOne(query, new Document("$set", updateDoc));

            // Fetch and return updated pool
            Document updatedPool = collection.find(query).first();
            return new ResponseEntity<>(Pool.fromDocument(updatedPool), HttpStatus.OK);

        } catch (Exception e) {
            // Capture and print stack trace
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            String stackTrace = sw.toString();
            System.err.println("Stack trace: " + stackTrace); // Print to console or logger
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}