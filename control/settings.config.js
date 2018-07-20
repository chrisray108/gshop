module.exports = {
  apps : [
      {
        name: "server",
        script: "./bin/www",
        env: 
        {
            "NODE_ENV": "default"
        },
        env_production:
        {
            "NODE_ENV": "test"
        },        
      }
  ],
  "deploy" : {
    "production" : {
      "user" : "root",
      // Multi host is possible, just by passing IPs/hostname as an array
      "host" : ["47.96.87.41"],
      // Branch
      "ref"  : "origin/master",
      // Git repository to clone
      "repo" : "git@github.com:chrisray108/gshop.git",
      // Path of the application on target servers
      "path" : "/var/www/production/gshop",
      // Can be used to give options in the format used in the configura-
      // tion file.  This is useful for specifying options for which there
      // is no separate command-line flag, see 'man ssh' 
      // can be either a single string or an array of strings
      "ssh_options": "StrictHostKeyChecking=no",
      // To prepare the host by installing required software (eg: git) 
      // even before the setup process starts
      // can be multiple commands separated by the character ";"
      // or path to a script on your local machine
      "pre-setup" : "yum install git -y",
      // Commands / path to a script on the host machine
      // This will be executed on the host after cloning the repository
      // eg: placing configurations in the shared dir etc
      "post-setup": "ls -la",
      // Commands to execute locally (on the same machine you deploy things)
      // Can be multiple commands separated by the character ";"
      "pre-deploy-local" : "echo 'This is a local executed command'",
      // Commands to be executed on the server after the repo has been cloned
      "post-deploy" : "cd control && npm install && pm2 startOrRestart settings.config.js --env production",
      // Environment variables that must be injected in all applications on this env
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}
