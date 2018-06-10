module.exports = {
  apps : [
      {
        name: "server",
        script: "./bin/www",
        watch: true,
        env: {
            "NODE_ENV": "default"
        },
        env_test: {
            "NODE_ENV": "test"
        },
        log_date_format: "YYYY-MM-DD_HH:mm Z",
        merge_logs: true
      }
  ]
}