package com.inditex.prices.controller;

import com.inditex.prices.dto.PriceResponse;
import com.inditex.prices.service.PriceService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/prices")
public class PriceController {

    private final PriceService service;

    public PriceController(PriceService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<PriceResponse> getPrice(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date,
        @RequestParam Long productId,
        @RequestParam Long brandId
    ) {
        return service.findApplicablePrice(date, productId, brandId)
            .map(p -> ResponseEntity.ok(new PriceResponse(
                p.getProductId(), p.getBrandId(), p.getPriceList(),
                p.getStartDate(), p.getEndDate(), p.getPrice(), p.getCurr()
            )))
            .orElse(ResponseEntity.notFound().build());
    }
}
