pipeline {
    agent any

	parameters {
        booleanParam(name: 'Lint', defaultValue: true, description: '')
        booleanParam(name: 'Sonarqube', defaultValue: true, description: '')
    }
    
    environment {
        PATH = '/home/jenkins/.nvm/versions/node/v20.15.0/bin:'+
        '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:'+
        '/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:'
        version = ''
    }

    stages {
        stage('Clone repository') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Pull image Dependencies') {
            steps {
                script {
                    // Read the version from package.json
                    
                    sh 'docker pull soilfish/wcf-component-lib:1.0.0'
                }
            }
        }

        stage('Get Version') {
            steps {
                script {
                    // Read the version from package.json
                    version = sh(script: 'cat package.json | grep \\"version\\" | awk -F: \'{ print $2 }\' | sed \'s/[", ]//g\'', returnStdout: true).trim()
                    echo "Version: ${version}"
                }
            }
        }

        stage('Prepare') {
            steps {
                script {

                    

                    slackChannel = 'df-sso-wcf-noti'
                    projectID = 'medical-web'
                    goodStatus = 'good'
                    warningStatus = 'warning'
                    registryIP = 'registry.hub.docker.com'
                    imgTag = version
                    KUBERNETES_DEPLOYMENT = 'med-web'
                    KUBERNETES_NAMESPACE = 'default'

                    slackSend color: warningStatus,
                    message: "Prepare Build started: ${projectID}:${imgTag}",
                    channel: "${slackChannel}"
                    

                    sh 'npm -v'
                    sh 'which node'
                    sh 'yarn install'
                }
            }
        }

        stage('Lint') {
            when {
                expression { params.Lint == true }
            }
            steps {
                script {
                    sh 'npm run lint'
                }
            }
        }

				stage('SonarQube analysis') {
            when {
                expression { params.Sonarqube == true }
            }
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv('sonarqube-server') {
                        echo "scannerHome = ${scannerHome}"
                        sh "${scannerHome}/bin/sonar-scanner -X \
                        -Dsonar.sources=. "
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    slackSend color: warningStatus,
                    message: "Build image: [${projectID}:${imgTag}]",
                    channel: "${slackChannel}"
                    echo "Start building image [${projectID}:${imgTag}]"

                    docker.withRegistry("http://${registryIP}", 'dockerhubSoilfish') {
                        def img = docker.build("soilfish/${projectID}:${imgTag}", '--no-cache .')
                        img.push("${imgTag}")
                    }
                    sh "docker image tag soilfish/${projectID}:${imgTag} soilfish/${projectID}:latest"
                    sh "docker push soilfish/${projectID}:latest"
                    echo "Removing docker image soilfish/${projectID}:${imgTag}"
                    sh "docker rmi soilfish/${projectID}:${imgTag}"
                    sh "docker rmi soilfish/${projectID}:latest"
                    sh "docker rmi ${registryIP}/soilfish/${projectID}:${imgTag}"
                    slackSend color: "${goodStatus}", message: "Completed Build soilfish/${projectID}:${imgTag}", channel: "${slackChannel}"
                }
            }
        }

        stage('Delete image Dependencies') {
            steps {
                script {
                    sh 'docker image rm soilfish/wcf-component-lib:1.0.0'
                }
            }
        }

        stage('Deploy kube') {
            steps {
                withKubeConfig([credentialsId: 'wcf2-kube-config']) {
                    sh """
                    kubectl set image deployment/${KUBERNETES_DEPLOYMENT} ${KUBERNETES_DEPLOYMENT}=soilfish/${projectID}:${imgTag} --namespace=${KUBERNETES_NAMESPACE}
                    """

                    sh """
                    kubectl rollout restart deployment ${KUBERNETES_DEPLOYMENT}  -n default
                    """

                    slackSend color: "${goodStatus}", message: "Deploy soilfish/${projectID}:${imgTag} successfully", channel: "${slackChannel}"
                }
            }
        }
    }
    post {
        success {
            slackSend color: "${goodStatus}",
                        message: 'follower link: https://dev-wcf.soilfish.co/login',
                        channel: "${slackChannel}"
        }
        failure {
            slackSend color: "${warning}",
                message: 'Deploying Failed ${projectID}',
                channel: "${slackChannel}"
        }
    }
}
