# dynamic_element_creation

This is a dynmaic element/form creation web application where you can provide the type , value and the attributes of the element and it will be created dynamically for you. You can change the attributes of the element also and see the changes in front of your eyes

## Pull the docker image from docker hub
  
   Run below command to pull the docker image
  
   ### docker pull shweta735/dynamic_element:latest

## To run the application locally

   clone the application and run 
 
   ### docker-compose -f docker-compose-db.yml -f docker-compose.yml up -d
 
   The above command will bring up the containers. You can check using docker ps command
 
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
