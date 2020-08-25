pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                bat 'yarn install && yarn build' 
            }
        }
        stage('Deploy'){
            steps{
                bat 'xcopy /y /c /h /r /s /e ./file-control/build/* ./fileServer/resource/'
            }
        }
    }
}
