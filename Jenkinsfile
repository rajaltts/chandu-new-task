@Library('ecat-library@develop') _
uipkg='reactcomponentsui'
branchname='develop'

packageName = 'package.json' //Location of the package.json file
property = 'version' // Property name to be updated 
jenkinsfile = 'Jenkinsfile' // Jenkins file name to be deleted post build
pipeline {
  agent { label "${DBNODE}" }
  options {     
	//  skipDefaultCheckout true
	  disableConcurrentBuilds() 
	  timestamps ()
	  buildDiscarder(logRotator(numToKeepStr: '20', daysToKeepStr: '10'))}
    parameters 
    {
        string(name: 'BuildNo', defaultValue: getparams("defaultbuild"), description: 'Build Number')
    }
  stages {
	  stage('clean workspace') {
      steps {
        deleteDir()
        checkout scm
      }
    }
    stage("Set Build Name and config values"){
     steps {
        script 
        {
          currentBuild.displayName = "${BuildNo}"
          configs=getjenkinvar.getJsonString(branchname)	
          Source=getparams("source").toLowerCase()
          echo " source: ${Source}"
          getappval=getjsonvalue(configs."${Source}","${uipkg}")
          emailtoval=getjenkinvar.getemailval(getappval.emailto)	
        }
      }
    } 
	  
	stage("Build project"){
  	steps {	     
      script{	
          gitcheckout(branchname, "${DEPLOYMENTSCRIPTSREPO}", 'DeploymentScripts', 'Scripts')    
          npm.buildVersionUpdate("${WORKSPACE}\\${packageName}", property , BuildNo)
          npm.install()
          npm.build()
          deletedirectory("${WORKSPACE}\\Scripts")
          deletedirectory("${WORKSPACE}\\configpath")
          deletefile("${WORKSPACE}\\jenkinsfile")
          npm.publish()      
        }	
      }
    }
  }
  post {
    success 
      {
          emailext attachLog: true, body: '$DEFAULT_CONTENT', recipientProviders: [developers(), requestor()], replyTo: '$DEFAULT_REPLYTO', subject: '$DEFAULT_SUBJECT', to: "${emailtoval}"
      }
    failure 
      {
          emailext attachLog: true, body: '$DEFAULT_CONTENT', recipientProviders: [developers(), requestor()], replyTo: '$DEFAULT_REPLYTO', subject: '$DEFAULT_SUBJECT', to: "${emailtoval}"
      }
    }
}