import checkResponse from "./checkResponse";
export const baseUrl = "http://localhost:3001";

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${token}`,
});

export function getItems() {
  return request(`${baseUrl}/items`);
}

export function addItem({ name, imageUrl, weather }, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

export function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

export function updateProfile({ name, avatar }, token) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ name, avatar }),
  });
}

export function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: authHeaders(token),
  });
}

export function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
