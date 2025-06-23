Here’s a clear API documentation for your backend, tailored for frontend developers:

---

# 📁 File Management API Documentation

Base URL: `http://localhost:3000/api/files`

---

## 1. Upload File

**Endpoint:**  
`POST /upload`  
**Content-Type:** `multipart/form-data`

**Body Parameters:**
- `file` (required): The file to upload (`.pdf`, `.txt`, `.xls`, `.doc` only)
- `email` (required): User’s email address

**Example Request (curl):**
```bash
curl -X POST http://localhost:3000/api/files/upload \
  -F "file=@/path/to/your/file.pdf" \
  -F "email=user@example.com"
```

**Success Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "_id": "file_id",
    "filename": "file.pdf",
    "url": "https://res.cloudinary.com/...",
    "userEmail": "user@example.com",
    "uploadedAt": "2024-06-23T12:34:56.789Z",
    "__v": 0
  }
}
```

---

## 2. List User Files

**Endpoint:**  
`GET /list?email=user@example.com`

**Query Parameters:**
- `email` (required): User’s email address

**Example Request (curl):**
```bash
curl "http://localhost:3000/api/files/list?email=user@example.com"
```

**Success Response:**
```json
{
  "files": [
    {
      "_id": "file_id",
      "filename": "file.pdf",
      "url": "https://res.cloudinary.com/...",
      "userEmail": "user@example.com",
      "uploadedAt": "2024-06-23T12:34:56.789Z",
      "__v": 0
    }
    // ...more files
  ]
}
```

---

## 3. Update File

**Endpoint:**  
`POST /update`  
**Content-Type:** `multipart/form-data`

**Body Parameters:**
- `file` (required): The new file to upload (`.pdf`, `.txt`, `.xls`, `.doc` only)
- `fileId` (required): The ID of the file to update (from the list endpoint)
- `email` (required): User’s email address

**Example Request (curl):**
```bash
curl -X POST http://localhost:3000/api/files/update \
  -F "file=@/path/to/new/file.txt" \
  -F "fileId=PUT_FILE_ID_HERE" \
  -F "email=user@example.com"
```

**Success Response:**
```json
{
  "message": "File updated successfully",
  "file": {
    "_id": "file_id",
    "filename": "file.txt",
    "url": "https://res.cloudinary.com/...",
    "userEmail": "user@example.com",
    "uploadedAt": "2024-06-23T12:34:56.789Z",
    "__v": 0
  }
}
```

---

## 4. Delete File

**Endpoint:**  
`POST /delete`  
**Content-Type:** `application/json`

**Body:**
```json
{
  "fileId": "PUT_FILE_ID_HERE",
  "email": "user@example.com"
}
```

**Example Request (curl):**
```bash
curl -X POST http://localhost:3000/api/files/delete \
  -H "Content-Type: application/json" \
  -d '{"fileId":"PUT_FILE_ID_HERE","email":"user@example.com"}'
```

**Success Response:**
```json
{
  "message": "File deleted successfully"
}
```

---

## 5. Test API

**Endpoint:**  
`GET /test`

**Example Request (curl):**
```bash
curl http://localhost:3000/api/files/test
```

**Success Response:**
```json
{
  "message": "API is working!"
}
```

---

## ⚠️ Notes for Frontend Developers

- Only `.pdf`, `.txt`, `.xls`, and `.doc` files are allowed for upload and update.
- All endpoints that require a file use `multipart/form-data`.
- Always provide the user’s email for all operations.
- Use the `fileId` from the list endpoint for update and delete operations.
- File URLs returned are direct links to Cloudinary.

---

If you need a Postman collection or Swagger/OpenAPI spec, let me know!