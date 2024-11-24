package com.skella.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import com.skella.dao.PageDetails;
import com.skella.dto.PageDetail;

@RestController
@CrossOrigin
public class PageDetailController {
  
  @Autowired
  MongoClient mongoClient;
  @CrossOrigin(origins = "http://localhost:5173")
  @PostMapping("/addpagedetails")
  public ResponseEntity<String> addPageDetail(
          @RequestParam("tag") String tag,
          @RequestParam("title") String title,
          @RequestParam("description") String description) {
          // @RequestParam(value = "image", required = false) MultipartFile imageFile) {
  
      MongoDatabase database = mongoClient.getDatabase("skella");
      MongoCollection<Document> collection = database.getCollection("page-details");
  
      try {
          // Convert the image file to Binary, if provided
          // byte[] imageBytes = null;
          // if (imageFile != null && !imageFile.isEmpty()) {
          //     imageBytes = imageFile.getBytes();
          // }
  
          // Create a new document
          Document newPageDetail = new Document()
                  .append("tag", tag)
                  .append("title", title)
                  .append("description", description);
  
          // if (imageBytes != null) {
          //     newPageDetail.append("image", new Binary(imageBytes));
          // }
  
          // Insert the document into the collection
          collection.insertOne(newPageDetail);
  
          return new ResponseEntity<>("Page detail added successfully with ID: " 
                                      + newPageDetail.getObjectId("_id").toString(), HttpStatus.CREATED);
      // } catch (IOException e) {
      //     return new ResponseEntity<>("Failed to process image: " + e.getMessage(), HttpStatus.BAD_REQUEST);
      } catch (Exception e) {
          return new ResponseEntity<>("Failed to add page detail: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  
  @CrossOrigin(origins = "http://localhost:5173")
  @GetMapping("/getpagedetails/{tag}")
  public ResponseEntity<Map<String, Object>> getPageDetails(@PathVariable String tag) {
      MongoDatabase database = mongoClient.getDatabase("skella");
      MongoCollection<Document> collection = database.getCollection("page-details");
  
      // Query the document with the given tag
      Document doc = collection.find(Filters.eq("tag", tag)).first();
  
      if (doc == null) {
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
  
      // Map the document to a response object
      Map<String, Object> response = new HashMap<>();
      response.put("id", doc.getObjectId("_id").toString());
      response.put("tag", doc.getString("tag"));
      response.put("title", doc.getString("title"));
      response.put("description", doc.getString("description"));
  
      // Convert image to Base64 if available
      Binary imageBinary = doc.get("image", Binary.class);
      if (imageBinary != null) {
          String base64Image = Base64.getEncoder().encodeToString(imageBinary.getData());
          response.put("image", "data:image/jpeg;base64," + base64Image);
      }
  
      return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  @CrossOrigin(origins = "http://localhost:5173")
  @PutMapping("/modifypagedetails")
  public ResponseEntity<String> modifyPageDetail(
          @RequestParam("tag") String tag,
          @RequestParam(value = "title", required = false) String title,
          @RequestParam(value = "description", required = false) String description,
          @RequestParam(value = "image", required = false) String base64Image) {

      MongoDatabase database = mongoClient.getDatabase("skella");
      MongoCollection<Document> collection = database.getCollection("page-details");

      try {
          // Build the filter to find the document
          Document filter = new Document("tag", tag);

          // Build the update document
          Document updatedFields = new Document();
          if (title != null) {
              updatedFields.append("title", title);
          }
          if (description != null) {
              updatedFields.append("description", description);
          }
          if (base64Image != null && !base64Image.isEmpty()) {
              // Decode Base64 image and store it as Binary
              String base64Content = base64Image.replaceFirst("^data:image/[^;]+;base64,", "");
              byte[] imageBytes = Base64.getDecoder().decode(base64Content);
              updatedFields.append("image", new Binary(imageBytes));
          }

          if (updatedFields.isEmpty()) {
              return new ResponseEntity<>("No fields to update provided.", HttpStatus.BAD_REQUEST);
          }

          Document updateOperation = new Document("$set", updatedFields);

          // Update the document
          UpdateResult result = collection.updateOne(filter, updateOperation);

          if (result.getMatchedCount() == 0) {
              return new ResponseEntity<>("No page detail found with the provided tag.", HttpStatus.NOT_FOUND);
          }

          return new ResponseEntity<>("Page detail updated successfully.", HttpStatus.OK);
      } catch (IllegalArgumentException e) {
          return new ResponseEntity<>("Invalid Base64 image format: " + e.getMessage(), HttpStatus.BAD_REQUEST);
      } catch (Exception e) {
          return new ResponseEntity<>("Failed to update page detail: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}
