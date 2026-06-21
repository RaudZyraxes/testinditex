package com.inditex.prices.exception;

public class PriceNotFoundException extends RuntimeException {
    public PriceNotFoundException(Long productId, Long brandId) {
        super("No applicable price found for productId=" + productId + " brandId=" + brandId);
    }
}
