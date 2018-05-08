# ImageCollectorRest
Node.js API for IOS application (https://github.com/timeofneon/Image-Collector)
ENDPOIND: https://imagecollector.herokuapp.com
As API deployed to Heroku image uploading temporarily unavailable.
#

* [Categories] (#cat)
  * [GET] (#catget)
  * [POST] (#catpost)
* [Individual category] (#indcat)
  * [GET] (#indcatget)
  * [DELETE] (#indcatdelete)
* [Posts] (#posts)
   * [GET] (#postsget)
   * [POST] (#postspost)
* [Posts by category] (#postscat)
   * [GET] (#postscatget)
* [Individual post] (#post)
   * [GET] (#postget)
   * [DELETE] (#postdelete)

## <a name="cat"></a> Categories

`/categories`

# <a name="catget"></a> GET

Response body example:

```json
{
    "count": 2,
    "categories": [
        {
            "name": "Amsterdam",
            "_id": "5ae6395ef0c338c2840d6b74"
        },
        {
            "name": "Berlin",
            "_id": "5ae63a5cec922ec34835dce7"
        }
    ]
}
```

# <a name="catpost"></a> POST

Request body: raw(JSON)

| key  |  Value  | Description |
| ---- | ------- | ----------- |
| name | String  | input name of new category /

Example of request:

```json
{
"name": "Rotterdam"
}
```

Response body example:

```json
{
    "message": "Create category seccessfully",
    "createdCategory": {
        "name": "Rotterdam",
        "_id": "5af1f55eeffd1a002038e2da"
    }
}
```

Note: No headers in request

## <a name="indcat"></a> Individual category

`/categories/:categoryId`

# <a name="indcatget"></a> GET

Response body example:

```json
{
    "category": {
        "_id": "5ae63a7dec922ec34835dce9",
        "name": "Prague"
    }
}
```

# <a name="indcatdelete"></a> DELETE

Response body example:

```json
{
    "message": "Category deleted"
}
```

## <a name="posts"></a> Posts

`/imagePosts`

# <a name="postsget"></a> GET

Response body example:

```json
{
    "count": 2,
    "imagePosts": [
        {
            "_id": "5af1cce324c71c00206eaf1d",
            "image": "uploads/2018-05-08T16:14:27.453Zamsterdam_1900x1500p_Clssg.jpg",
            "category": "5ae63a5cec922ec34835dce7"
        },
        {
            "_id": "5af1cce824c71c00206eaf1e",
            "image": "uploads/2018-05-08T16:14:32.567Zamsterdam_28199376.jpg",
            "category": "5ae63a5cec922ec34835dce7"
        }
    ]
}
```

# <a name="postspost"></a> POST

Request body: form-data 

|    key   |  Value  |        Description        |
| -------- | ------- | ------------------------- |
| category | String  |        category iD        |
|  image   |  file   | file attached to the post |

Response body example:

```json
{
    "message": "ImagePost stored",
    "createdPost": {
        "category": "5ae63a5cec922ec34835dce7",
        "image": "uploads/2018-05-08T19:22:42.030ZAmsterdam.jpg",
        "_id": "5af1f902b2c16f00207cee0e"
    }
}
```

Note: No headers in request

## <a name="postscat"></a> Posts by category

`/imagePosts/cat/:catId`

# <a name="postscatget"></a> GET

Note: post by category(work with error)

Response body example:

```json
{
    "imagePosts": [
        {
            "_id": "5af1cce324c71c00206eaf1d",
            "image": "uploads/2018-05-08T16:14:27.453Zamsterdam_1900x1500p_Clssg.jpg",
            "category": "5ae63a5cec922ec34835dce7"
        },
        {
            "_id": "5af1cce824c71c00206eaf1e",
            "image": "uploads/2018-05-08T16:14:32.567Zamsterdam_28199376.jpg",
            "category": "5ae63a5cec922ec34835dce7"
        }
    ]
}
```

## <a name="post"></a> Individual post

`/imagePosts/:postId`

# <a name="postget"></a> GET

Response body example:

```json
{
    "_id": "5af1f902b2c16f00207cee0e",
    "image": "uploads/2018-05-08T19:22:42.030ZAmsterdam.jpg",
    "category": "5ae63a5cec922ec34835dce7"
}
```

# <a name="postdelete"></a> DELETE

Response body example:

```json
resp:
{
    "message": "ImagePost  deleted"
}
```
