import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: { http_req_duration: ["p(95)<300"], checks: ["rate>0.99"] }
};

export default function () {
  const response = http.post(`${__ENV.BASE_URL || "http://localhost:3000"}/orders`, JSON.stringify({
    customerName: "Smoke",
    items: [{ description: "Item", quantity: 1, unitPrice: 10 }]
  }), { headers: { "Content-Type": "application/json" } });
  check(response, { "order created": (res) => res.status === 201 });
}
