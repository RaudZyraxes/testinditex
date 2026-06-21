package com.inditex.prices.service;

import com.inditex.prices.dto.PriceResponse;
import com.inditex.prices.exception.PriceNotFoundException;
import com.inditex.prices.model.Price;
import com.inditex.prices.repository.PriceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class PriceService {

    private final PriceRepository repository;

    public PriceResponse findApplicablePrice(LocalDateTime date, Long productId, Long brandId) {
        log.info("Querying price for productId={} brandId={} date={}", productId, brandId, date);

        Price price = repository.findApplicable(date, productId, brandId)
            .stream()
            .findFirst()
            .orElseThrow(() -> new PriceNotFoundException(productId, brandId));

        log.debug("Applicable price found: priceList={} price={}", price.getPriceList(), price.getPrice());

        return new PriceResponse(
            price.getProductId(),
            price.getBrandId(),
            price.getPriceList(),
            price.getStartDate(),
            price.getEndDate(),
            price.getPrice(),
            price.getCurr()
        );
    }
}
