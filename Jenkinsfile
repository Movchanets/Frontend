#!groovy
//  groovy Jenkinsfile
properties([disableConcurrentBuilds()])

pipeline  {
    
    agent { 
        label 'master'
        }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
        timestamps()
    }
    stages {
		stage("Removing old containers") {
            steps {
                echo 'Removing containers ...'
                 dir('.'){
                   sh " docker ps -q --filter "name=front_dashboard" | grep -q . && docker stop front_dashboard || echo Not Found"
				
                    sh "docker ps -q --filter "name=front_dashboard" | grep -q . && docker rm front_dashboard || echo Not Found"
                }
            }
        }
        stage("Removing old images") {
            steps {
                echo 'Removing images ...'
                 dir('.'){
                    sh "docker ps -q --filter "name=movchanets/front_dashboard" | grep -q . && docker rmi movchanets/front_dashboard || echo Not Found"
                }
            }
        }
        stage("Creating images") {
            steps {
                echo 'Creating docker image ...'
                    dir('.'){
                    sh "docker build -t movchanets/front_dashboard ."
                }
            }
        }
        stage("docker login") {
            steps {
                echo " ============== docker login =================="
                withCredentials([usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                    docker login -u $USERNAME -p $PASSWORD
                    '''
                }
            }
        }
        stage("docker push image") {
            steps {
                echo " ============== pushing image =================="
                sh '''
                docker push movchanets/front_dashboard:latest
                '''
            }
        }
        
        stage("docker run") {
            steps {
                echo " ============== starting frontend =================="
                sh '''
                docker run -d --restart=always --name front_dashboard -p 80:3000 movchanets/front_dashboard:latest
                '''
            }
        }
    }
}