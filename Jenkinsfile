pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                bat 'yarn install && yarn build' 
            }
        }
    }
}
