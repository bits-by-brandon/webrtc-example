module.exports = {
  apps : [{
    name      : 'webrtc-chat',
    script    : 'index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '192.81.214.130',
      ref  : 'origin/master',
      repo : 'git@github.com:brandondc741/webrtc-example.git',
      path : '/var/www/public/webrtc.brandonchang.me',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
