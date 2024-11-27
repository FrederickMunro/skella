package com.skella.dto;

import java.util.Base64;
import java.util.List;

import org.bson.Document;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;

public class Pool {
    @Id
    private String id;
    private String name;
    private String description;
    private String tag;
    private String image;
    private String model;
    private List<List<String>> sizeDepth;

    public Pool() {
        this.name = null;
        this.tag = null;
        this.image = null;
        this.model = null;
        this.sizeDepth = null;
    }

    public Pool(String name, String description, String tag, List<List<String>> sizeDepth, String image, String model) {
        this.name = name;
        this.description = description;
        this.tag = tag;
        this.sizeDepth = sizeDepth;
        this.image = image;
        this.model = model;
    }

    /* Accessors */

    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public String getTag() {
        return this.tag;
    }

    public String getImage() {
        return this.image;
    }

    public String getModel() {
        return this.model;
    }

    public List<List<String>> getSizeDepth() {
        return this.sizeDepth;
    }

    /* Mutators */

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setSizeDepth(List<List<String>> sizeDepth) {
        this.sizeDepth = sizeDepth;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Document toDocument() {
        Document document = new Document("name", this.getName())
            .append("description", this.getDescription())
            .append("tag", this.getTag())
            .append("sizeDepth", this.getSizeDepth())
            .append("image", this.getImage())
            .append("model", this.getModel());
        return document;
    }

    public static Pool fromDocument(Document document) {
        Pool pool = new Pool();
        pool.setId(document.getObjectId("_id").toString());
        pool.setName(document.getString("name"));
        pool.setName(document.getString("description"));
        pool.setTag(document.getString("tag"));
        pool.setSizeDepth((List<List<String>>) document.get("sizeDepth"));
        pool.setImage(document.getString("image"));
        pool.setModel(document.getString("model"));
        return pool;
    }
}