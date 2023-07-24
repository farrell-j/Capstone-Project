# Capstone-Project

//INTRODUCTION
A large amount of resources dedicated to satellite tracking throughout the Space Force has created to data overlap, where conflicting information converges. This convergence creates misinformation and adds introduces unnecessary complexity into the reporting process.
{Name of Project} was created to solve this issue.A

{Name of Project} is a one stop website for Space Force reporters, intel professionals and operators to come together and share the latest updates for Satalite Tracking data. The site specifically focuses on information surrounding new launches to ensure continuity through the branch. The app pulls from external data bases including Space-Track.org as well as CelesTrak.org and relies on interactions between Gaurdian users to make sense of the data and provide nrt satalite updates.

//INSTALLATION DETAILS
The application was created via 

1. PostgreSQL
2. Knex
3. Express
4. React App
5. Docker
6. Bcrypt

In order to stream line the process, the installation has been added to a docker-compose.yaml file to combind all the necessary downloads and add-ons into one 'docker-compose up' command. However, before you run the command, ensure that you have Docker installed on your system: https://www.docker.com/products/docker-desktop/

//DATABASE
The database for {Name of Project} was seeded with knex and created with simpicity and utility in mind. It is seperated into three catagories:
1. User_Account
2. Satellite_Table
3. Post_Table

    User_Account includes authorized DOD users and Admins
    
    Satellite_Table includes relevant sat-data bY SATCAT

    Post_Table allows for interaction between users to be saved and called on request.

//UI
    
