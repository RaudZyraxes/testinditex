package com.inditex.prices.controller;

import com.inditex.prices.dto.PriceResponse;
import com.inditex.prices.service.PriceService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/prices")
@RequiredArgsConstructor
@Validated
public class PriceController {

    private final PriceService service;

    @GetMapping
    public ResponseEntity<PriceResponse> getPrice(
        @RequestParam @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date,
        @RequestParam @NotNull Long productId,
        @RequestParam @NotNull Long brandId
    ) {
        return ResponseEntity.ok(service.findApplicablePrice(date, productId, brandId));
    }
}
