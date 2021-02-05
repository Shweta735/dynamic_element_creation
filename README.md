# dynamic_element_creation

This is a dynamic element/form creation web application where you can provide the type , value and the attributes of the element and it will be created dynamically for you. You can change the attributes of the element also and see the changes in front of your eyes.

I have kept the front end quite simple. It does the basic job of taking input from the user and showing the output. For backend I have used express framework in nodejs and postgresql as the database

#### Sample Data :

Enter type of the element : input

Enter value of the element : Let's create a dynamic element

Provide attributes of the element separated by comma : type,name,size

Provide attribute values of the element corresponding to the attribute separated by comma : text,dynamic,50

## Pull the docker image from docker hub
  
   Run below command to pull the docker image
  
   ### docker pull shweta735/dynamicelement:latest

## To run the application locally

   clone the application and run 
 
   ### docker-compose -f docker-compose-db.yml -f docker-compose.yml up -d
 
   The above command will bring up the containers. You can check using docker ps command
   
   If the application container is not up, run npm install.
 
   Run below command to stop the containers
 
   ### docker-compose -f docker-compose-db.yml -f docker-compose.yml down

## To run the application on heroku
 
   Go to https://codeclouds-dynamicelement.herokuapp.com/
 
## For Automated test
 
   Run below cammand on your machine to run the test cases
   
   ### npm run test
 
## For further improvement
 
   Can beautify the front end
   
   Can add more validations and verifications
