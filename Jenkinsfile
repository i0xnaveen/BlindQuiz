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

                    // Your database setup scripts or commands go here
                    // For example: sh 'mysql -h localhost -u root3 -pmysql quizonline < setup.sql'

                    // Build application
                    sh 'npm install --force'
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
                    sh 'npm test'
                    
                    // Run tests
                    dir('quizBckend-Online') {
                        sh 'mvn test'
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
