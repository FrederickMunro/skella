package com.skella.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import com.skella.service.R2UploadService;
import org.bson.Document;

@RestController
@CrossOrigin
public class PageDetailController {

    @Autowired
    MongoClient mongoClient;

    @Autowired
    private R2UploadService r2UploadService;

    @Value("${r2.endpoint}")
    private String endpoint;

    @Value("${r2.bucket-name}")
    private String bucketName;

    @Value("${r2.public-endpoint}")
    private String publicEndpoint;

    @PostMapping("/addpagedetails")
    public ResponseEntity<String> addPageDetail(
            @RequestParam(value = "tag", required = true) String tag,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("page-details");


        try {
            Document newPageDetail = new Document().append("tag", tag);

            if (title != null) newPageDetail.append("title", title);
            if (description != null) newPageDetail.append("description", description);

            // Upload the image to CDN if provided
            String imagePath = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                String key = "uploads/" + UUID.randomUUID() + "-" + imageFile.getOriginalFilename();
                Path tempFile = Files.createTempFile("upload-", imageFile.getOriginalFilename());
                try {
                    imageFile.transferTo(tempFile);
                    r2UploadService.uploadFile(bucketName, key, tempFile);
                    imagePath = "/" + key;
                    newPageDetail.append("image", imagePath);
                } finally {
                    Files.deleteIfExists(tempFile);
                }
            }

            // Insert the document into the collection
            collection.insertOne(newPageDetail);

            return new ResponseEntity<>("Page detail added successfully with ID: " 
                    + newPageDetail.getObjectId("_id").toString(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add page detail: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/modifypagedetails")
    public ResponseEntity<String> modifyPageDetail(
            @RequestParam("tag") String tag,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("page-details");

        try {
            Document filter = new Document("tag", tag);
            Document existingDoc = collection.find(filter).first();

            if (existingDoc == null) {
                return new ResponseEntity<>("Page detail not found.", HttpStatus.NOT_FOUND);
            }

            Document updatedFields = new Document();
            if (title != null) updatedFields.append("title", title);
            if (description != null) updatedFields.append("description", description);

            // Handle image replacement
            if (imageFile != null && !imageFile.isEmpty()) {
                String oldImagePath = existingDoc.getString("image");
                if (oldImagePath != null && !oldImagePath.isEmpty()) {
                    r2UploadService.deleteFile(bucketName, oldImagePath);
                }

                String key = "uploads/" + UUID.randomUUID() + "-" + imageFile.getOriginalFilename();
                Path tempFile = Files.createTempFile("upload-", imageFile.getOriginalFilename());
                try {
                    imageFile.transferTo(tempFile);
                    r2UploadService.uploadFile(bucketName, key, tempFile);
                    updatedFields.append("image", "/" + key);
                } finally {
                    Files.deleteIfExists(tempFile);
                }
            }

            if (updatedFields.isEmpty()) {
                return new ResponseEntity<>("No fields to update provided.", HttpStatus.BAD_REQUEST);
            }

            Document updateOperation = new Document("$set", updatedFields);
            UpdateResult result = collection.updateOne(filter, updateOperation);

            if (result.getMatchedCount() == 0) {
                return new ResponseEntity<>("No page detail found with the provided tag.", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>("Page detail updated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update page detail: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getpagedetails/{tag}")
    public ResponseEntity<Map<String, Object>> getPageDetails(@PathVariable String tag) {
        MongoDatabase database = mongoClient.getDatabase("skella");
        MongoCollection<Document> collection = database.getCollection("page-details");

        Document doc = collection.find(Filters.eq("tag", tag)).first();
        if (doc == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Map<String, Object> response = new HashMap<>();
        response.put("id", doc.getObjectId("_id").toString());
        response.put("tag", doc.getString("tag"));
        response.put("title", doc.getString("title"));
        response.put("description", doc.getString("description"));
        response.put("image", publicEndpoint + doc.getString("image"));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}