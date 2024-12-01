package com.skella.dto;

import org.bson.Document;
import org.springframework.data.annotation.Id;

public class PageDetail {
  @Id
  private String id;
  private String tag;
  private String title;
  private String description;
  private String story;
  private String image;

  public PageDetail() {
    this.tag = null;
    this.title = null;
    this.description = null;
    this.image = null;
  }

  public PageDetail(String tag, String title, String description, String image, String story) {
    this.tag = tag;
    this.title = title;
    this.description = description;
    this.image = image;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setStory(String story) {
    this.story = story;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getId() {
    return this.id;
  }

  public String getTag() {
    return this.tag;
  }

  public String getTitle() {
    return this.title;
  }

  public String getDescription() {
    return this.description;
  }

  public String getImage() {
    return this.image;
  }

  public String getStory() {
    return this.story;
  }

  public Document toDocument() {
    return new Document("tag", this.getTag())
      .append("title", this.getTitle())
      .append("description", this.getDescription())
      .append("story", this.getStory())
      .append("image", this.getImage());
  }

  public static PageDetail fromDocument(Document document) {
    PageDetail pageDetail = new PageDetail();
    pageDetail.setId(document.getObjectId("_id").toString());
    pageDetail.setTag(document.getString("tag"));
    pageDetail.setTitle(document.getString("title"));
    pageDetail.setDescription(document.getString("description"));
    pageDetail.setStory(document.getString("story"));
    pageDetail.setImage(document.getString("image"));
    return pageDetail;
  }
}
