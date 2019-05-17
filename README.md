# Thumbpoll Backend

repo for REST API backend (https://thumbpoll.herokkuapp.com)

## Setup

```js
yarn
yarn setup
```

update the `.env` file

## Development

```js
yarn dev
```

## Production

```js
yarn start
```

---

# Endpoint and Data

## Users

| Endpoint          | Method | Description           | isAuthenticated |
| ----------------- | ------ | --------------------- | --------------- |
| `/`               | GET    | Hello Thumbpoll       |
| `/users/register` | POST   | Register new user     |
| `/users/login`    | POST   | Login to user         |
| `/users/profile`  | GET    | Get user profile      | YES             |  |
| `/users/:id`      | GET    | Get one user by id    |                 |  |
| `/users`          | GET    | Get all users         |                 |  |
| `/users/:id`      | PUT    | Update one user by id |                 |  |
| `/users/:id`      | DELETE | Delete one user by id |

Example Data users:

```json
{
  "polls": ["5cdaefdcc49ecf36a7a785ff", "5cdaf01303f0b037050e30aa"],
  "_id": "5cdae38b37e0192f7a61b704",
  "fullName": "admin",
  "email": "admin@gmail.com",
  "createdAt": "2019-05-14T15:49:31.123Z",
  "updatedAt": "2019-05-14T16:43:00.072Z",
  "id": 1,
  "__v": 0
}
```

## Polls

| Endpoint          | Method | Description           | isAuthenticated |
| ----------------- | ------ | --------------------- | --------------- |
| `/polls/`         | GET    | Get All Polls         | YES             |
| `/polls`          | POST   | Create new polls      | YES             |
| `/polls/:id`      | GET    | Get one poll by id    | YES             |
| `/polls/:id`      | DELETE | Delete one poll by id | YES             |
| `/polls/:id`      | PUT    | Update one poll by id | YES             |
| `polls/user/:_id` | GET    | Get Poll by author id | YES             |

Example Data:

```json
{
  "options": [
    {
      "voters": [],
      "_id": "5cdaf0540067d837281a3e0e",
      "description": "Asshiaf",
      "pollId": "5cdaf01303f0b037050e30aa",
      "id": 1,
      "__v": 0
    },
    {
      "voters": [],
      "_id": "5cdaf06a0067d837281a3e0f",
      "description": "Waalaikumsalam",
      "pollId": "5cdaf01303f0b037050e30aa",
      "id": 2,
      "__v": 0
    },
    {
      "voters": [],
      "_id": "5cdaf0750067d837281a3e10",
      "description": "P",
      "pollId": "5cdaf01303f0b037050e30aa",
      "id": 3,
      "__v": 0
    }
  ],
  "_id": "5cdaf01303f0b037050e30aa",
  "moderator": {
    "_id": "5cdae38b37e0192f7a61b704",
    "fullName": "admin",
    "email": "admin@gmail.com",
    "createdAt": "2019-05-14T15:49:31.123Z",
    "updatedAt": "2019-05-14T16:43:00.072Z",
    "id": 1,
    "__v": 0
  },
  "title": "Assalamualaikum?",
  "timeLimit": "2019-05-15T16:42:59.979Z",
  "createdAt": "2019-05-14T16:42:59.987Z",
  "updatedAt": "2019-05-14T16:44:37.869Z",
  "id": 2,
  "__v": 0
}
```

## Options

| Endpoint       | Method | Description        | isAuthenticated |
| -------------- | ------ | ------------------ | --------------- |
| `/options`     | POST   | Create new options | YES             |
| `/options/:id` | PUT    | Edit options       | YES             |

Example Data :

```json
{
  "voters": [],
  "_id": "5cdaf0540067d837281a3e0e",
  "description": "Asshiaf",
  "pollId": "5cdaf01303f0b037050e30aa",
  "id": 1,
  "__v": 0
}
```

## Vote

| Endpoint          | Method | Description  | isAuthenticated |
| ----------------- | ------ | ------------ | --------------- |
| `vote/:_id`       | PUT    | Vote option  | YES             |
| `vote/count/:_id` | GET    | Count voters | YES             |

Example Data :

```json
{
  "message": "Count Voters Success",
  "pollId": "5cdaf27a0067d837281a3e11",
  "result": [
    {
      "desc": "Sistem informasi akuntansi",
      "votes": 3
    },
    {
      "desc": "Aplikasi inventory barang",
      "votes": 7
    },
    {
      "desc": "Website profil",
      "votes": 2
    }
  ],
  "totalVotes": 12
}
```
