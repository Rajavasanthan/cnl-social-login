/*
User
* Name
* age
* photourl
Story
* ID
* title
* content
* react [userID,type]


- STORY ROUTE
::add new story
POST /story
how: add new post 
{
    _id:1,
    title:'Soem titel of a story',
    content:'some more text on the story to figure out how it looks like',
    react:[]
    userId:001
}
::delete story by id
DELETE /story/:id
::give react by id
UPDATE /story/:id 
how: {
    react:[{_uid:01,2}]
}



- USER ROUTE:::
::add new User
POST /user
::delete id
DELETE /user/:id
::update user
UPDATE /user/:id




*/