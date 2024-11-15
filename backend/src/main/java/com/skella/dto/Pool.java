package com.skella.dto;

import java.util.ArrayList;

import org.bson.Document;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;

public class Pool {
    @Id
    private String id;
    private String name;
    private String description;
    private ArrayList<String> sizes;
    private ArrayList<String> depths;
    private Binary image;

    /* Constructors */

    public Pool() {
        this.name = null;
        this.description = null;
        this.sizes = null;
        this.depths = null;
        this.image = null;
    }

    public Pool(String name, String description, ArrayList<String> sizes, ArrayList<String> depths, byte[] image) {
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.depths = depths;
        this.image = new Binary(image);
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

    public ArrayList<String> getSizes() {
        return this.sizes;
    }

    public ArrayList<String> getDepths() {
        return this.depths;
    }

    public Binary getImage() {
        return this.image;
    }

    public Document toDocument() {
        return new Document("name", this.getName())
                        .append("description", this.getDescription())
                        .append("sizes", this.getSizes())
                        .append("depths", this.getDepths())
                        .append("image", this.getImage());
    }

    public static Pool fromDocument(Document document) {
        Pool pool = new Pool();
        pool.setId(document.getObjectId("_id").toString());
        pool.setName(document.getString("name"));
        pool.setDescription(document.getString("description"));
        pool.setSizes((ArrayList<String>) document.get("sizes"));
        pool.setDepths((ArrayList<String>) document.get("depths"));
        pool.setImage((Binary) document.get("image"));
        return pool;
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

    public void setSizes(ArrayList<String> sizes) {
        this.sizes = sizes;
    }

    public void setDepths(ArrayList<String> depths) {
        this.depths = depths;
    }

    public void setImage(Binary image) {
        this.image = image;
    }
}