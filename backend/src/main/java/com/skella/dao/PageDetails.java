package com.skella.dao;

import java.util.ArrayList;

import com.skella.dto.PageDetail;

public class PageDetails {
  private ArrayList<PageDetail> pageDetails;
  
  public PageDetails() {
    pageDetails = new ArrayList<PageDetail>();
  }

  public void add(PageDetail pageDetails) {
    this.pageDetails.add(pageDetails);
  }

  public ArrayList<PageDetail> getPageDetails() {
    return this.pageDetails;
  }
}
