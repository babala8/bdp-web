pipeline {
    agent any

     environment {
        APP_NAME = 'messi'
        NGINX_DIRECTORY  = '/home/brain/apps/v1.0'
    }

    stages {
        stage ('checkout') {
            steps {
                checkout scm
            }
        }

        stage ('install') {
            steps {
                 script {
                    sh 'npm install --no-spin'
                }
            }
        }

        stage ('clearCache') {
            steps {
                script {
                    sh 'rm -rf ${APP_NAME}'
                    sh 'rm -rf ${NGINX_DIRECTORY}/${APP_NAME}'
                }
            }
        }

        stage ('build') {
            steps {
                script {
                    sh 'npm run color-less && node --max_old_space_size=5048 ./node_modules/@angular/cli/bin/ng build --prod --build-optimizer --base-href /${APP_NAME}/ --output-path ${APP_NAME}'
                }
            }
        }

        stage ('publish') {
            steps {
                script {
                    sh 'cp -r ${APP_NAME} ${NGINX_DIRECTORY}'
                    sh 'nginx'
                }
            }
        }
    }
}