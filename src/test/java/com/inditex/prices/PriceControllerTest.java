package com.inditex.prices;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PriceControllerTest {

    @Autowired
    private MockMvc mvc;

    private static final String URL = "/api/prices";
    private static final long PRODUCT = 35455;
    private static final long BRAND = 1;

    @Test
    void test1_june14_10h_returns_tariff1() throws Exception {
        mvc.perform(get(URL)
                .param("date", "2020-06-14T10:00:00")
                .param("productId", String.valueOf(PRODUCT))
                .param("brandId", String.valueOf(BRAND)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.priceList").value(1))
            .andExpect(jsonPath("$.price").value(35.50));
    }

    @Test
    void test2_june14_16h_returns_tariff2() throws Exception {
        mvc.perform(get(URL)
                .param("date", "2020-06-14T16:00:00")
                .param("productId", String.valueOf(PRODUCT))
                .param("brandId", String.valueOf(BRAND)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.priceList").value(2))
            .andExpect(jsonPath("$.price").value(25.45));
    }

    @Test
    void test3_june14_21h_returns_tariff1() throws Exception {
        mvc.perform(get(URL)
                .param("date", "2020-06-14T21:00:00")
                .param("productId", String.valueOf(PRODUCT))
                .param("brandId", String.valueOf(BRAND)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.priceList").value(1))
            .andExpect(jsonPath("$.price").value(35.50));
    }

    @Test
    void test4_june15_10h_returns_tariff3() throws Exception {
        mvc.perform(get(URL)
                .param("date", "2020-06-15T10:00:00")
                .param("productId", String.valueOf(PRODUCT))
                .param("brandId", String.valueOf(BRAND)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.priceList").value(3))
            .andExpect(jsonPath("$.price").value(30.50));
    }

    @Test
    void test5_june16_21h_returns_tariff4() throws Exception {
        mvc.perform(get(URL)
                .param("date", "2020-06-16T21:00:00")
                .param("productId", String.valueOf(PRODUCT))
                .param("brandId", String.valueOf(BRAND)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.priceList").value(4))
            .andExpect(jsonPath("$.price").value(38.95));
    }
}
