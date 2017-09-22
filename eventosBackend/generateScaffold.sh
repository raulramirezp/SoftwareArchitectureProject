#!/bin/bash
rails generate scaffold Category description:string imagen:string
rails generate scaffold Authentication
rails generate scaffold User name:string lastname:string nickname:string gender:string birthdate:datetime  authentication:references
rails generate scaffold Event name:string assistants:integer category:references user:references visibility:string evetype:string minage:integer
rails generate scaffold Evendate beginat:datetime endat:datetime place:string event:references
rails generate scaffold Participant user:references event:references
rails generate scaffold Invitation user:references event:references
echo "DONE..."
