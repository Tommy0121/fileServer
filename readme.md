# 查看进程

    ps axf 找到dist/server/index.js

# 杀死进程

    kill <pid>

# 启动程序

    nohup npm run start &
    推出terminal的时候不要关闭session，使用exit命令推出
    
# 设置npm yarn 代理
  
    yarn config set registry http://registry.npm.taobao.org/
    查看当前代理
    yarn config get registry
    推荐使用.yarnrc文件来设定yarn的config，具体yarn config选项参见官网 [yarn config](https://yarn.bootcss.com/docs/cli/config/)

# git 设置文件大小写敏感 

    git 默认文件名大小写不敏感，导致一些需要更改的文件并没有修改，需要关闭大小写不敏感
    git config core.ignorecase false

# TODO

## Front-End

&emsp;&emsp;add input area for chat room need support add image automatic identification url link

## Back-End

&emsp;&emsp;add mysql connection to persistent data