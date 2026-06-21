package com.inditex.prices.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "PRICES")
public class Price {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long brandId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer priceList;
    private Long productId;
    private Integer priority;
    private BigDecimal price;
    private String curr;

    public Long getId() { return id; }
    public Long getBrandId() { return brandId; }
    public LocalDateTime getStartDate() { return startDate; }
    public LocalDateTime getEndDate() { return endDate; }
    public Integer getPriceList() { return priceList; }
    public Long getProductId() { return productId; }
    public Integer getPriority() { return priority; }
    public BigDecimal getPrice() { return price; }
    public String getCurr() { return curr; }
}
