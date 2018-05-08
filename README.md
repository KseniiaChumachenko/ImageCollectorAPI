# ImageCollectorRest
Node.js API for IOS application (https://github.com/timeofneon/Image-Collector)
Base URL: https://imagecollector.herokuapp.com
As API deployed to Heroku image uploading temporarily unavailable.
#
<h1>Categories</h1> `/categories`
<h2 style='color:green'>GET</h2>
<h3>Response body example:</h3>
```
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
<h2 style='color:blue'>POST</h2>
<h3>Request body: raw(JSON)</h3>
| key  |  Value  |        Description         |
| ---- | ------- | -------------------------- |
| name | String  | input name of new category |
Example of request:
```
{
"name": "Rotterdam"
}
```
<h3>Response body example:</h3>
```
{
    "message": "Create category seccessfully",
    "createdCategory": {
        "name": "Rotterdam",
        "_id": "5af1f55eeffd1a002038e2da"
    }
}
```
Note: No headers in request
<h1>Individual categories</h1> `/categories/:categoryId`
<h2 style='color:green'>GET</h2>
<h3>Response body example:</h3>
```
{
    "category": {
        "_id": "5ae63a7dec922ec34835dce9",
        "name": "Prague"
    }
}
```
<h2 style='color:red'>DELETE</h2>
<h3>Response body example:</h3>
```
{
    "message": "Category deleted"
}
```
<h1>Posts</h1> `/imagePosts`
<h2 style='color:green'>GET</h2>
<h3>Response body example:</h3>
```
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
<h2 style='color:blue'>POST</h2>
<h3>Request body: form-data </h3>
|    key   |  Value  |        Description        |
| -------- | ------- | ------------------------- |
| category | String  |        category iD        |
|  image   |  file   | file attached to the post |
<h3>Response body example:</h3>
```
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
<h1>Posts by category</h1> `/imagePosts/cat/:catId`
<h2 style='color:green'>GET</h2>
Note: post by category(work with error)
<h3>Response body example:</h3>
```
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
<h1>Individual post</h1> `/imagePosts/:postId`
<h2 style='color:green'>GET</h2>
<h3>Response body example:</h3>
```
{
    "_id": "5af1f902b2c16f00207cee0e",
    "image": "uploads/2018-05-08T19:22:42.030ZAmsterdam.jpg",
    "category": "5ae63a5cec922ec34835dce7"
}
```
<h2 style='color:red'>DELETE</h2>
<h3>Response body example:</h3>
```
resp:
{
    "message": "ImagePost  deleted"
}
```
