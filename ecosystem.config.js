module.exports = {
  apps: [
    {
      name: 'nestjs-boilerplate',
      script: './dist/main.js',
      exec_mode: 'cluster_mode',
      instances: 1,
      env_local: {
        NODE_ENV: 'local',
      },
      env_dev: {
        NODE_ENV: 'dev',
      },
      env_prod: {
        NODE_ENV: 'prod',
      },
    },
  ],
}
