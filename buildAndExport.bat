call mvn clean install -DskipTests
scp -i AWSkey.pem target/backend-0.0.1-SNAPSHOT.jar ubuntu@3.137.16.13:~/