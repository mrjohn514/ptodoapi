# Todolist API example application.

The application is using mvc 

# INSTALL
1.Install Node.js and npm if they aren't already installed on your system. You can download them from the Node.js website.
2.Clone the project repository or download the source files.
3.Open a terminal or command prompt window and navigate to the project directory.
4.Run the command npm install to install any required dependencies.
5.By default, the application will be available at http://localhost:3000. Open a web browser and visit this URL to access the application.



# API

The API to the todolist app is described below.

## index.html file rendering

### Request

`GET /`

    curl -i -H 'Accept: application/json' -d 'name=Foo&status=new' http://localhost:3000

### Response

 ../index.html 
 



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
