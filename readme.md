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
  