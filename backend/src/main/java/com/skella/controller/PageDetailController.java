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
import com.skella.dao.PageDetails;
import com.skella.dto.PageDetail;

@RestController
@CrossOrigin
public class PageDetailController {
  
  @Autowired
  MongoClient mongoClient;

  @CrossOrigin(origins = "http://localhost:5173")
  @GetMapping("/getpagedetails/{tag}")
  public ResponseEntity<PageDetail> getPageDetails(@PathVariable String tag) {
    MongoDatabase database = mongoClient.getDatabase("skella");
    MongoCollection<Document> collection = database.getCollection("page-details");

    // Query the document with the given tag
    Document doc = collection.find(Filters.eq("tag", tag)).first();

    if (doc == null) {
      // Return 404 if no document is found
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Map the document to a PageDetail object
    PageDetail pageDetail = new PageDetail();
    pageDetail.setId(doc.getObjectId("_id").toString());
    pageDetail.setTag(doc.getString("tag"));
    pageDetail.setTitle(doc.getString("title"));
    pageDetail.setDescription(doc.getString("description"));

    // Return the PageDetail object
    return new ResponseEntity<>(pageDetail, HttpStatus.OK);
  }

  @CrossOrigin(origins = "http://localhost:5173")
  @PostMapping("/addpagedetails")
  public ResponseEntity<String> addPageDetail(@RequestBody Map<String, Object> pageDetailData) {
    MongoDatabase database = mongoClient.getDatabase("skella");
    MongoCollection<Document> collection = database.getCollection("page-details");

    try {
      // Create a new document
      Document newPageDetail = new Document()
              .append("tag", pageDetailData.get("tag"))
              .append("title", pageDetailData.get("title"))
              .append("description", pageDetailData.get("description"));

      // Insert the document into the collection
      collection.insertOne(newPageDetail);

      // Return success response
      return new ResponseEntity<>("Page detail added successfully with ID: " + newPageDetail.getObjectId("_id").toString(), HttpStatus.CREATED);
    } catch (Exception e) {
      // Handle any potential errors
      return new ResponseEntity<>("Failed to add page detail: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
