pipeline {
    agent any
    tools {
        jdk 'java21'
        maven 'maven3'
        nodejs 'nodejs3'
    }
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/i0xnaveen/BlindQuiz'
            }
        }
        stage('Build and Setup Database') {
            steps {
                script {
                    // Start MySQL container
                    sh 'docker run -d --name mysql-container -e MYSQL_ROOT_PASSWORD=mysql -e MYSQL_DATABASE=quizonline -e MYSQL_USER=root3 -e MYSQL_PASSWORD=mysql -p 3306:3306 mysql:latest'
                    
                    // Allow time for MySQL to start
                    sleep 30
                 
                       
                        
                    
                    dir('quizBckend-Online') {
                        sh 'mvn clean package'
                    }
                }
            }
        }
        stage('Test Application') {
            steps {
                script {
                    // Start your application
                    
                    
                    // Run tests
                    dir('quizBckend-Online') {
                        sh 'mvn test'
                    }
                }
            }
        }
        stage('Docker image build') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dockerhub', toolName: 'docker') {
                        sh 'pwd'
                        sh 'ls -la'
                        sh 'docker compose version'
                        sh 'docker-compose build'
                        sh 'docker-compose push'
                        
                    }
                }
            }
        }
    }
    post {
        always {
            // Cleanup Docker container after the build
            script {
                sh 'docker stop mysql-container'
                sh 'docker rm mysql-container'
            }
        }
    }
}
