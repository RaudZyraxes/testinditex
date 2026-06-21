package com.inditex.prices.service;

import com.inditex.prices.model.Price;
import com.inditex.prices.repository.PriceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PriceService {

    private final PriceRepository repository;

    public PriceService(PriceRepository repository) {
        this.repository = repository;
    }

    public Optional<Price> findApplicablePrice(LocalDateTime date, Long productId, Long brandId) {
        return repository.findApplicable(date, productId, brandId).stream().findFirst();
    }
}
