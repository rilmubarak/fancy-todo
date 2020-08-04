# fancy-todo
My Todo's App is an application to list your daily todo's. This app has : 
* RESTful endpoint for Todo's CRUD operation
* RESTful endpoint for User Login & Register Operation
* JSON formatted response
* Technology includes: 
    - 3 Third Party API (QR code, google Oauth)
    - Authentication and Authorization
    - Express Js (Node JS Framework), 
    - Object-relation Mapping: Sequelize, 
    - Database: Postgres, 
    - Token Signing/Verification: Json Web Token, 
    - Password Encryption: Bcrypt

&nbsp;
## RESTful endpoints

### Global Endpoints
_Response (401 - User not authenticated)_
```
{
  "message": "User not authenticated"
}
```
_Response (500 - Server internal error)_
```
{
  "message": "Server internal error"
}
```
### GET /todos
> Get all todos

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<Deadline Challange>",
    "description": "<saturday, 18:00>",
    "status": "<Almost Done>",
    "due_date": "<2020-07-23>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    "UserId": "<4>",
    "qrCode": "<https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: Deadline Challange. descripsi: Saturday, 18:00>",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

---
### GET /todos/:id
> Get todos base on requested id.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
  "id": "<integer>"
}
```

_Response (200)_
```
{
  "id": 1,
  "title": "<Deadline Challange>",
  "description": "<saturday, 18:00>",
  "status": "<Almost Done>",
  "due_date": "<2020-07-23>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "UserId": "<4>",
  "qrCode": "<https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: Deadline Challange. descripsi: Saturday, 18:00>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (404 - Not Found)_
```
{
  "message": "todos not found"
}
```

---
### POST /todos
> Create Todos

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
{
  "title": "<Deadline Challange>",
  "description": "<saturday, 18:00>"
  "status": "<Almost Done>"
  "due_date": "<2020-07-23>"
}
```

_Response (201 - Created)_
```
{
  "id": 1,
  "title": "<Deadline Challange>",
  "description": "<saturday, 18:00>",
  "status": "<Almost Done>",
  "due_date": "<2020-07-23>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "UserId": "<4>",
  "qrCode": "<https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: Deadline Challange. descripsi: Saturday, 18:00>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "value is required"
}
```

---
### PUT /todos/:id
> Get todos base on requested id.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
{
  "title": "<Deadline Challange edit>",
  "description": "<saturday, 17:00>",
  "status": "<Almost Done edit>",
  "due_date": "<2020-07-21>"
}
```

_Request Params_
```
{
  "id": "<integer>"
}
```

_Response (200)_
```
{
  "id": 1,
  "title": "<Deadline Challange edit>",
  "description": "<saturday, 17:00>",
  "status": "<Almost Done edit>",
  "due_date": "<2020-07-21>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "UserId": "<4>",
  "qrCode": "<https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: Deadline Challange. descripsi: Saturday, 18:00>",
}
```

_Response (403 - Bad Request)_
```
{
  "message": "Forbidden Access"
}
```

_Response (404 - Bad Request)_
```
{
  "message": "Data not foud"
}
```

---
### DELETE /todos/:id
> Delete todos

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
  "id": "<integer>"
}
```

_Response (200)_
```

{
  "id": 1,
  "title": "<Deadline Challange edit>",
  "description": "<saturday, 17:00>",
  "status": "<Almost Done edit>",
  "due_date": "<2020-07-21>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "UserId": "<4>",
  "qrCode": "<https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=title: Deadline Challange. descripsi: Saturday, 18:00>",
}
```

_Response (403 - Bad Request)_
```
{
  "message": "Forbidden Access"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /login
> Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<baril@gmail.com>",
  "password": "<12345>"
}
```

_Response (200)_
```
{
  "access_token": "<access_token>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /register
> Register User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<baril@gmail.com>",
  "password": "<12345>"
}
```

_Response (201)_
```
{
  "id": 1,
  "email": "baril@gmail.com",
  "password": "$2b$10$Eq03uiQCB86/IxvwEiQlYuL/4zavUfMqZm8dGKRsoDvvREzVKhaiy",
  "updatedAt": "2020-07-06T13:01:52.682Z",
  "createdAt": "2020-07-06T13:01:52.682Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /googleSignin
> Login User with Aouth Google

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id_token" : "<token from google>" 
}
```

_Response (201)_
```
{
  "access_token": "<access_token>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```