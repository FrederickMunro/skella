package com.skella.controller;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.file.Files;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;
import java.util.HashMap;
import java.util.Base64;
import org.bson.types.Binary;
import java.nio.file.Path;
import java.nio.file.Files;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.skella.dto.Pool;

import com.skella.service.R2UploadService;

@RestController
@CrossOrigin
class PoolController {

    @Autowired
    MongoClient mongoClient;

    @Autowired
    private R2UploadService r2UploadService;

    @Value("${r2.endpoint}")
    private String endpoint;

    @Value("${r2.public-endpoint}")
    private String publicEndpoint;

    @Value("${r2.bucket-name}")
    private String bucketName;

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
            pool.put("tag", doc.getString("tag"));
            pool.put("image", publicEndpoint + "/" + doc.getString("image"));
            pool.put("model", publicEndpoint + "/" + doc.getString("model"));
            pool.put("sizeDepth", doc.getList("sizeDepth", List.class));
            pools.add(pool);
        });

        return new ResponseEntity<>(pools, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/addpool")
    public ResponseEntity<?> addPool(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "tag", required = true) String tag,
            @RequestParam(value = "sizedepth", required = false) String sizeDepth,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "model", required = false) MultipartFile modelFile,
            @RequestParam(value = "file", required = false) MultipartFile pdfFile) {
        try {
            // Validate mandatory parameters
            if (tag == null || tag.isEmpty()) {
                return ResponseEntity.badRequest().body("Missing required parameters: 'name' or 'tag'");
            }
    
            // Upload the image to Cloudflare R2 if provided
            String imagePath = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                // Generate a unique key for the uploaded file
                String key = "uploads/" + UUID.randomUUID() + "-" + imageFile.getOriginalFilename();
    
                // Create a temporary file
                Path tempFile = Files.createTempFile("upload-", imageFile.getOriginalFilename());
    
                try {
                    // Transfer the MultipartFile to the temporary file
                    imageFile.transferTo(tempFile);
    
                    // Upload to Cloudflare R2
                    r2UploadService.uploadFile(bucketName, key, tempFile);
    
                    // Construct the public URL
                    imagePath = String.format(key);
                } finally {
                    // Clean up the temporary file
                    Files.deleteIfExists(tempFile);
                }
            }

            String modelPath = null;
            if (modelFile != null && !modelFile.isEmpty()) {
                // Generate a unique key for the uploaded file
                String key = "uploads/" + UUID.randomUUID() + "-" + modelFile.getOriginalFilename();
    
                // Create a temporary file
                Path tempFile = Files.createTempFile("upload-", modelFile.getOriginalFilename());
    
                try {
                    // Transfer the MultipartFile to the temporary file
                    modelFile.transferTo(tempFile);
    
                    // Upload to Cloudflare R2
                    r2UploadService.uploadFile(bucketName, key, tempFile);
    
                    // Construct the public URL
                    modelPath = String.format(key);
                } finally {
                    // Clean up the temporary file
                    Files.deleteIfExists(tempFile);
                }
            }

            String pdfPath = null;
            if (pdfFile != null && !pdfFile.isEmpty()) {
                // Generate a unique key for the uploaded file
                String key = "pdf/" + UUID.randomUUID() + "-" + pdfFile.getOriginalFilename();
    
                // Create a temporary file
                Path tempFile = Files.createTempFile("pdf-", pdfFile.getOriginalFilename());
    
                try {
                    // Transfer the MultipartFile to the temporary file
                    pdfFile.transferTo(tempFile);
    
                    // Upload to Cloudflare R2
                    r2UploadService.uploadFile(bucketName, key, tempFile);
    
                    // Construct the public URL
                    pdfPath = String.format(key);
                } finally {
                    // Clean up the temporary file
                    Files.deleteIfExists(tempFile);
                }
            }
    
            // Parse sizeDepth JSON into List<List<String>>
            List<List<String>> sizeDepthArray = null;
            if (sizeDepth != null && !sizeDepth.isEmpty()) {
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    sizeDepthArray = objectMapper.readValue(sizeDepth, List.class);
                } catch (Exception e) {
                    return ResponseEntity.badRequest().body("Invalid 'sizeDepth' format");
                }
            }
    
            // Create the Pool object
            Pool pool = new Pool(name, description, tag, sizeDepthArray, imagePath, modelPath, pdfPath);
    
            // Save the Pool object to MongoDB
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

        try {
            // Find the pool to get the image path
            Document pool = collection.find(new Document("_id", new ObjectId(id))).first();

            if (pool != null && pool.getString("image") != null) {
                String imagePath = pool.getString("image");

                // Extract the key from the image URL
                String key = endpoint + "/" + pool.getString("image");

                // Delete the image from Cloudflare R2
                r2UploadService.deleteFile(bucketName, key);
            }

            // Delete the pool from the database
            collection.deleteOne(new Document("_id", new ObjectId(id)));

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/pools/{id}")
    public ResponseEntity<?> updatePool(
            @PathVariable String id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "sizedepth", required = false) String sizeDepthJson,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "model", required = false) MultipartFile modelFile,
            @RequestParam(value = "pdf", required = false) MultipartFile pdfFile) {

        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("pools");

        try {
            Document query = new Document("_id", new ObjectId(id));
            Document existingPool = collection.find(query).first();

            if (existingPool == null) {
                return new ResponseEntity<>("Pool not found", HttpStatus.NOT_FOUND);
            }

            Document updateDoc = new Document();

            // Update name and description if provided
            if (name != null && !name.isEmpty()) {
                updateDoc.append("name", name);
            }
            if (description != null && !description.isEmpty()) {
                updateDoc.append("description", description);
            }

            // Handle sizeDepth updates
            if (sizeDepthJson != null && !sizeDepthJson.isEmpty()) {
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    List<List<String>> sizeDepth = objectMapper.readValue(sizeDepthJson, List.class);
                    updateDoc.append("sizeDepth", sizeDepth);
                } catch (Exception e) {
                    return new ResponseEntity<>("Invalid sizeDepth format", HttpStatus.BAD_REQUEST);
                }
            } else {
                // If sizeDepthJson is null or empty, retain the existing value in the database
                updateDoc.append("sizeDepth", existingPool.get("sizeDepth"));
            }

            // Handle image upload if provided
            if (imageFile != null && !imageFile.isEmpty()) {
                // Delete old image from Cloudflare R2
                String oldImagePath = existingPool.getString("image");
                if (oldImagePath != null && !oldImagePath.isEmpty()) {
                    // Extract the key from the URL
                    String oldKey = oldImagePath;
                    r2UploadService.deleteFile(bucketName, oldKey);
                }

                // Generate a unique key for the new uploaded file
                String key = "uploads/" + UUID.randomUUID() + "-" + imageFile.getOriginalFilename();

                // Create a temporary file
                Path tempFile = Files.createTempFile("upload-", imageFile.getOriginalFilename());

                try {
                    // Transfer the MultipartFile to the temporary file
                    imageFile.transferTo(tempFile);

                    // Upload to Cloudflare R2
                    r2UploadService.uploadFile(bucketName, key, tempFile);

                    // Construct the public URL
                    String imagePath = String.format(key);

                    // Add the new image URL to the update document
                    updateDoc.append("image", imagePath);
                } finally {
                    // Clean up the temporary file
                    Files.deleteIfExists(tempFile);
                }
            }

            // Handle image upload if provided
            if (modelFile != null && !modelFile.isEmpty()) {
                // Delete old image from Cloudflare R2
                String oldModelPath = existingPool.getString("model");
                if (oldModelPath != null && !oldModelPath.isEmpty()) {
                    // Extract the key from the URL
                    String oldKey = oldModelPath;
                    r2UploadService.deleteFile(bucketName, oldKey);
                }

                // Generate a unique key for the new uploaded file
                String key = "uploads/" + UUID.randomUUID() + "-" + modelFile.getOriginalFilename();

                // Create a temporary file
                Path tempFile = Files.createTempFile("upload-", modelFile.getOriginalFilename());

                try {
                    // Transfer the MultipartFile to the temporary file
                    modelFile.transferTo(tempFile);

                    // Upload to Cloudflare R2
                    r2UploadService.uploadFile(bucketName, key, tempFile);

                    // Construct the public URL
                    String modelPath = String.format(key);

                    // Add the new image URL to the update document
                    updateDoc.append("model", modelPath);
                } finally {
                    // Clean up the temporary file
                    Files.deleteIfExists(tempFile);
                }
            }

            if (pdfFile != null && !pdfFile.isEmpty()) {
                // Delete old image from Cloudflare R2
                String oldPdfPath = existingPool.getString("model");
                if (oldPdfPath != null && !oldPdfPath.isEmpty()) {
                    // Extract the key from the URL
                    String oldKey = oldPdfPath;
                    r2UploadService.deleteFile(bucketName, oldKey);
                }

                // Generate a unique key for the new uploaded file
                String key = "pdf/" + UUID.randomUUID() + "-" + pdfFile.getOriginalFilename();

                // Create a temporary file
                Path tempFile = Files.createTempFile("pdf-", pdfFile.getOriginalFilename());

                try {
                    // Transfer the MultipartFile to the temporary file
                    pdfFile.transferTo(tempFile);

                    // Upload to Cloudflare R2
                    r2UploadService.uploadFile(bucketName, key, tempFile);

                    // Construct the public URL
                    String pdfPath = String.format(key);

                    // Add the new image URL to the update document
                    updateDoc.append("pdf", pdfPath);
                } finally {
                    // Clean up the temporary file
                    Files.deleteIfExists(tempFile);
                }
            }

            // Update the pool in MongoDB
            collection.updateOne(query, new Document("$set", updateDoc));

            // Fetch and return the updated pool
            Document updatedPool = collection.find(query).first();
            return new ResponseEntity<>(Pool.fromDocument(updatedPool), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/poolsbytag/{tag}")
    public ResponseEntity<List<Map<String, Object>>> getPoolsByTag(@PathVariable("tag") String tag) {
        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("pools");

        try {
            // Find pools with the specified tag
            List<Map<String, Object>> pools = new ArrayList<>();
            collection.find(new Document("tag", tag)).forEach(doc -> {
                Map<String, Object> pool = new HashMap<>();
                pool.put("id", doc.getObjectId("_id").toString());
                pool.put("name", doc.getString("name"));
                pool.put("description", doc.getString("description"));
                pool.put("tag", doc.getString("tag"));
                String imagePath = publicEndpoint + "/" + doc.getString("image");
                pool.put("image", imagePath);
                String modelPath = publicEndpoint + "/" + doc.getString("model");
                pool.put("model", modelPath);
                String pdfPath = publicEndpoint + "/" + doc.getString("pdf");
                pool.put("pdf", pdfPath);
                pool.put("sizeDepth", doc.get("sizeDepth"));
                pools.add(pool);
            });

            if (pools.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(pools, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}