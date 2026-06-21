# Prices API — Inditex Java Test

API REST en Spring Boot para consultar el precio aplicable a un producto en una fecha dada, según prioridad de tarifas.

## Stack

- **Java 17**
- **Spring Boot 3.2**
- **Spring Data JPA**
- **H2** (base de datos en memoria)
- **JUnit 5** + **MockMvc** (tests de integración)
- **Maven**

## Requisitos

- Java 17+
- Maven 3.8+

## Ejecución

```bash
# Modo desarrollo
mvn spring-boot:run

# Compilar
mvn package

# Tests
mvn test
```

La aplicación arranca en http://localhost:8080

La consola H2 está disponible en http://localhost:8080/h2-console  
(JDBC URL: `jdbc:h2:mem:pricesdb`)

## Endpoint

```
GET /api/prices?date={date}&productId={productId}&brandId={brandId}
```

| Parámetro | Tipo | Ejemplo |
|-----------|------|---------|
| `date` | ISO 8601 | `2020-06-14T10:00:00` |
| `productId` | Long | `35455` |
| `brandId` | Long | `1` |

### Ejemplo de respuesta

```json
{
  "productId": 35455,
  "brandId": 1,
  "priceList": 1,
  "startDate": "2020-06-14T00:00:00",
  "endDate": "2020-12-31T23:59:59",
  "price": 35.50,
  "curr": "EUR"
}
```

Devuelve `404` si no hay tarifa aplicable para los parámetros indicados.

## Lógica de prioridad

Cuando dos tarifas se solapan en el tiempo, se aplica la de mayor valor en el campo `PRIORITY`.

## Tests incluidos

| Test | Fecha | Resultado esperado |
|------|-------|--------------------|
| 1 | 2020-06-14 10:00 | Tarifa 1 — 35.50 EUR |
| 2 | 2020-06-14 16:00 | Tarifa 2 — 25.45 EUR |
| 3 | 2020-06-14 21:00 | Tarifa 1 — 35.50 EUR |
| 4 | 2020-06-15 10:00 | Tarifa 3 — 30.50 EUR |
| 5 | 2020-06-16 21:00 | Tarifa 4 — 38.95 EUR |
