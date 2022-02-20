#!/bin/bash
mvn clean install &
wait $!
cd target
scp -i /Users/kovro/Documents/AWSkey.pem backend-0.0.1-SNAPSHOT.jar ubuntu@ec2-18-190-24-178.us-east-2.compute.amazonaws.com:~/
