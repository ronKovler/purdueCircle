call mvn clean install -DskipTests
scp -i AWSkey.pem target/backend-0.0.1-SNAPSHOT.jar ubuntu@ec2-18-190-24-178.us-east-2.compute.amazonaws.com:~/