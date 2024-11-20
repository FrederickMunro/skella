package com.skella.dto;

import org.bson.Document;
import org.springframework.data.annotation.Id;

public class PageDetail {
  @Id
  private String id;
  private String tag;
  private String title;
  private String description;

  public PageDetail() {
    this.tag = tag;
    this.title = null;
    this.description = null;
  }

  public PageDetail(String title, String description) {
    this.tag = tag;
    this.title = title;
    this.description = description;
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

  public Document toDocument() {
    return new Document("tag", this.getTag())
            .append("title", this.getTitle())
            .append("description", this.getDescription());
  }

  public static PageDetail fromDocument(Document document) {
    PageDetail pageDetail = new PageDetail();
    pageDetail.setId(document.getObjectId("_id").toString());
    pageDetail.setTag(document.getString("tag"));
    pageDetail.setTitle(document.getString("title"));
    pageDetail.setDescription(document.getString("description"));
    return pageDetail;
  }
}
