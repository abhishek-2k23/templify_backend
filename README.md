Absolutely! Here is a detailed API documentation for your file management backend, suitable for frontend developers and integrators.

---

# 📁 File Management API Documentation

**Base URL:**  
Replace `https://api.templify.com` with your actual custom domain.

```
https://api.templify.com/api/files
```

---

## Authentication

> **Note:**  
> This API currently uses the user's email as an identifier. No authentication token is required.  
> If you plan to add authentication in the future, you can extend this documentation.

---

## Endpoints

---

### 1. Upload File

**Endpoint:**  
`POST /upload`

**Description:**  
Upload a new file for a user. Only `.pdf`, `.txt`, `.xls`, and `.doc` files are allowed. The file is stored in Cloudinary, and its URL is saved in MongoDB, associated with the user's email. If the user does not exist, a new user entry is created.

**Request Headers:**  
- `Content-Type: multipart/form-data`

**Body Parameters:**  
| Name   | Type   | Required | Description                |
|--------|--------|----------|----------------------------|
| file   | File   | Yes      | The file to upload         |
| email  | String | Yes      | User's email address       |

**Example Request (curl):**
```bash
curl -X POST https://api.templify.com/api/files/upload \
  -F "file=@/path/to/your/file.pdf" \
  -F "email=user@example.com"
```

**Success Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "_id": "60f7c2b8e1b1c8a1b8e1b1c8",
    "filename": "file.pdf",
    "url": "https://res.cloudinary.com/your_cloud_name/raw/upload/v1626871234/uploads/file.pdf",
    "userEmail": "user@example.com",
    "uploadedAt": "2024-06-23T12:34:56.789Z",
    "__v": 0
  }
}
```

**Error Responses:**
- `400 Bad Request` if file or email is missing, or file type is not allowed.
- `500 Internal Server Error` for upload or server issues.

---

### 2. List User Files

**Endpoint:**  
`GET /list`

**Description:**  
Retrieve all files uploaded by a specific user.

**Query Parameters:**  
| Name   | Type   | Required | Description          |
|--------|--------|----------|----------------------|
| email  | String | Yes      | User's email address |

**Example Request (curl):**
```bash
curl "https://api.templify.com/api/files/list?email=user@example.com"
```

**Success Response:**
```json
{
  "files": [
    {
      "_id": "60f7c2b8e1b1c8a1b8e1b1c8",
      "filename": "file.pdf",
      "url": "https://res.cloudinary.com/your_cloud_name/raw/upload/v1626871234/uploads/file.pdf",
      "userEmail": "user@example.com",
      "uploadedAt": "2024-06-23T12:34:56.789Z",
      "__v": 0
    }
    // ...more files
  ]
}
```

**Error Responses:**
- `400 Bad Request` if email is missing.
- `500 Internal Server Error` for server issues.

---

### 3. Update File

**Endpoint:**  
`POST /update`

**Description:**  
Replace an existing file for a user. The old file is deleted from Cloudinary, and the new file is uploaded and its URL updated in MongoDB.

**Request Headers:**  
- `Content-Type: multipart/form-data`

**Body Parameters:**  
| Name   | Type   | Required | Description                        |
|--------|--------|----------|------------------------------------|
| file   | File   | Yes      | The new file to upload             |
| fileId | String | Yes      | The ID of the file to update       |
| email  | String | Yes      | User's email address               |

**Example Request (curl):**
```bash
curl -X POST https://api.templify.com/api/files/update \
  -F "file=@/path/to/new/file.txt" \
  -F "fileId=PUT_FILE_ID_HERE" \
  -F "email=user@example.com"
```

**Success Response:**
```json
{
  "message": "File updated successfully",
  "file": {
    "_id": "60f7c2b8e1b1c8a1b8e1b1c8",
    "filename": "file.txt",
    "url": "https://res.cloudinary.com/your_cloud_name/raw/upload/v1626871234/uploads/file.txt",
    "userEmail": "user@example.com",
    "uploadedAt": "2024-06-23T12:34:56.789Z",
    "__v": 0
  }
}
```

**Error Responses:**
- `400 Bad Request` if file, fileId, or email is missing, or file type is not allowed.
- `404 Not Found` if the file does not exist for the user.
- `500 Internal Server Error` for upload or server issues.

---

### 4. Delete File

**Endpoint:**  
`POST /delete`

**Description:**  
Delete a file for a user. The file is removed from Cloudinary and its record is deleted from MongoDB.

**Request Headers:**  
- `Content-Type: application/json`

**Body:**
```json
{
  "fileId": "PUT_FILE_ID_HERE",
  "email": "user@example.com"
}
```

**Example Request (curl):**
```bash
curl -X POST https://api.templify.com/api/files/delete \
  -H "Content-Type: application/json" \
  -d '{"fileId":"PUT_FILE_ID_HERE","email":"user@example.com"}'
```

**Success Response:**
```json
{
  "message": "File deleted successfully"
}
```

**Error Responses:**
- `400 Bad Request` if fileId or email is missing.
- `404 Not Found` if the file does not exist for the user.
- `500 Internal Server Error` for server issues.

---

### 5. Test API

**Endpoint:**  
`GET /test`

**Description:**  
Check if the API is running.

**Example Request (curl):**
```bash
curl https://api.templify.com/api/files/test
```

**Success Response:**
```json
{
  "message": "API is working!"
}
```

---

## File Type Restrictions

- Only the following file types are allowed for upload and update:
  - `.pdf`
  - `.txt`
  - `.xls`
  - `.doc`
- All other file types will be rejected with a `400 Bad Request` error.

---

## Error Handling

- All error responses will include an `error` field and, where applicable, a `details` field for more information.
- Example:
  ```json
  {
    "error": "File upload failed",
    "details": "Only PDF, TXT, XLS, and DOC files are allowed"
  }
  ```

---

## Example Workflow

1. **User uploads a file** using `/upload` with their email.
2. **User lists their files** using `/list?email=...` to get file IDs and URLs.
3. **User updates a file** using `/update` with the file ID and new file.
4. **User deletes a file** using `/delete` with the file ID.

---

## Notes for Frontend Developers

- Always provide the user's email for all operations.
- Use the `fileId` from the `/list` endpoint for update and delete operations.
- File URLs returned are direct links to Cloudinary and can be used for downloads or previews.
- If you need to support authentication or additional metadata, the backend can be extended.

---

If you need a Postman collection, OpenAPI/Swagger spec, or further customization, let me know!