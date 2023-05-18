# Todolist API example application.

The application is using mvc 


# REST API

The REST API to the example app is described below.

## Get list of Todos

### Request

`GET /todo`

    curl -i -H 'Accept: application/json' http://localhost:3000/todo/

### Response
data:{
message:"success"
[
    {
        "_id": "6465a62e2e65ebd58bdadc37",
        "description": "todo1",
        "priority": 12,
        "completed": false,
        "canceled": false,
        "deleted": false,
        "__v": 0
    },
]
}
## Create a new Todo

### Request

`POST /create-todo`

    curl -i -H 'Accept: application/json' -d 'name=Foo&status=new' http://localhost:3000/create-todo

### Response

data:{
     message:"success"
    {
        "_id": "6465a62e2e65ebd58bdadc37",
        "description": "todo1",
        "priority": 12,
        "completed": false,
        "canceled": false,
        "deleted": false,
        "__v": 0
    }
}

## DELETE A TODO

### Request

`DELETE /delete-todo/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/delete-todo/6465a62e2e65ebd58bdadc37

### Response

 data:{
 message:"success",
 todoid:6465a62e2e65ebd58bdadc37 ,
 }

## COMPLETE A TODO

### Request

`PUT /complete-todo/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/complete-todo/6465a62e2e65ebd58bdadc37 

### Response

 data:{
 message:"success",
 todoid:6465a62e2e65ebd58bdadc37 ,
 }

## CANCEL A TODO

### Request

`PUT /cancel-todo/:id`

    curl -i -H 'Accept: application/json' -d 'name=Bar&junk=rubbish' http://localhost:3000/cancel-todo/6465a62e2e65ebd58bdadc37

### Response

 data:{
 message:"success",
 todoid:6465a62e2e65ebd58bdadc37 ,
 }


## Get list of Things again

### Request

`GET /count-todo`

    curl -i -H 'Accept: application/json' http://localhost:3000/count-todo

### Response

data:{
message:"success"
"total": 2,
"pending": 2,
 "canceled": 0,
"completed": 0    
}



## GET SORTED TODOS (PENDING,CANCELD,COMPLETED)
### Request

`GET /sort-todo`

    curl -i -H 'Accept: application/json' -X PUT http://localhost:3000/sort-todo

### Response

     data: {
     pending:[],
     cancled:[],
     completed[],
     }
