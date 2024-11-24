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
    private Binary image; // Stored as Binary in MongoDB
    private List<List<String>> sizeDepth; // Added sizeDepth field

    // Default Constructor
    public Pool() {
        this.name = null;
        this.tag = null;
        this.image = null;
        this.sizeDepth = null;
    }

    // Updated Constructor
    public Pool(String name, String description, String tag, List<List<String>> sizeDepth, byte[] image) {
        this.name = name;
        this.description = description;
        this.tag = tag;
        this.sizeDepth = sizeDepth;
        this.image = (image != null) ? new Binary(image) : null;
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

    public Binary getImage() {
        return this.image;
    }

    public List<List<String>> getSizeDepth() {
        return this.sizeDepth;
    }

    /**
     * Returns the image as a Base64 string.
     */
    public String getImageBase64() {
        if (this.image != null) {
            return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(this.image.getData());
        }
        return null;
    }

    public Document toDocument() {
        Document document = new Document("name", this.getName())
            .append("description", this.getDescription())
            .append("tag", this.getTag())
            .append("sizeDepth", this.getSizeDepth());
        if (this.getImage() != null) {
            document.append("image", this.getImage());
        }
        return document;
    }

    public static Pool fromDocument(Document document) {
        Pool pool = new Pool();
        pool.setId(document.getObjectId("_id").toString());
        pool.setName(document.getString("name"));
        pool.setName(document.getString("description"));
        pool.setTag(document.getString("tag"));
        pool.setSizeDepth((List<List<String>>) document.get("sizeDepth"));
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

    public void setTag(String tag) {
        this.tag = tag;
    }

    public void setImage(Binary image) {
        this.image = image;
    }

    /**
     * Sets the image from a Base64 string.
     */
    public void setImageBase64(String base64Image) {
        if (base64Image != null && base64Image.startsWith("data:image/")) {
            String base64Data = base64Image.substring(base64Image.indexOf(",") + 1);
            byte[] imageBytes = Base64.getDecoder().decode(base64Data);
            this.image = new Binary(imageBytes);
        }
    }

    public void setSizeDepth(List<List<String>> sizeDepth) {
        this.sizeDepth = sizeDepth;
    }
}