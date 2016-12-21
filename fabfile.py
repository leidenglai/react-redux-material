# coding: utf-8
from fabric.api import run, env, cd

def deploy():
    env.host_string = "root@12.34.56.78"
    with cd('/var/www/react-redux-example'):
        run('git reset --hard HEAD')
        run('git pull')
        run('npm install')
        run('npm run build')
        run('npm run upload')
