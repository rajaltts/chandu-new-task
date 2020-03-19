pipeline {
	agent { label 'JENKINSSLAVE' }
  options { 
	  skipDefaultCheckout true
	  disableConcurrentBuilds()
	  timestamps()
        	buildDiscarder(logRotator(numToKeepStr: '20', daysToKeepStr: '10'))}
	        //US14403
    parameters 
    {
        string(name: 'BuildNo', defaultValue: '$Dev_vNo.$BUILD_NUMBER.0', description: 'Build Number')
		string(name: 'PublishDirectory', defaultValue: 'NGECatPublish', description: 'Publish directory')
    }
  stages {
	  stage('clean workspace') {
      steps {
        deleteDir()
        checkout scm
      }
    }
    stage("Set Build Name"){
     steps {
        script {
            currentBuild.displayName = "${BuildNo}"
                }
     }}
            stage("SonarqubeAnalysis"){
     steps {
        script {
		bat '''npm cache clean --force'''
		bat '''npm install --no-optional"'''
		bat '''npm audit fix'''
		bat '''npm run-script build"'''	
            	bat "sonar-scanner"
                }
           }
    }
 }
  }
