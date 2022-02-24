call mvn clean install -DskipTests
scp -i AWSkey.pem target/backend-0.0.1-SNAPSHOT.jar ubuntu@ec2-3-140-216-16.us-east-2.compute.amazonaws.com:~/