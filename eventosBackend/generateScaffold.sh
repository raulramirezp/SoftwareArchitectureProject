#!/bin/bash
rails generate scaffold Category description:string imagen:string
rails generate scaffold User name:string lastname:string nickname:string birthdate:datetime email:string
rails generate scaffold Authentication user_id:integer token:string password_digest:string
rails generate scaffold Event name:string assistants:integer category:references user:references isPrivate:string minAge:integer place:string
rails generate scaffold Eventdate beginAt:datetime endAt:datetime event:references
rails generate scaffold Invitation user:references invited:references event:references
rails generate scaffold Relationship user:references invited:references
rails generate scaffold Friendship user:references friend:references
echo "DONE..."
