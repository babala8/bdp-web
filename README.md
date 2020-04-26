# 开发向导
## 一、代码同步
将版本服务器中以下工程目录分别同步到本地：
* 主应用（[http://ubuntu/ui-platform/messi-master-ui](http://ubuntu/ui-platform/messi-master-ui)）
* 加钞子应用（[http://ubuntu/ui/addnotes-slave-ui](http://ubuntu/ui/addnotes-slave-ui)）
* 数据分析子应用（[http://ubuntu/ui/data_insight-slave-ui](http://ubuntu/ui/data_insight-slave-ui)）

## 二、安装依赖
命令行进入各个应用根目录，执行```npm install```安装相关依赖；

## 三、运行调试
### 3.1. 后端服务地址配置
* 主应用
文件路径：messi-master-ui/src/index.html
```
...
 <script>
    //后端服务地址
    const SERVICE_URL = 'http://10.34.12.164:9090/';
    //socket服务地址
    const SOCKET_URL = 'ws://10.2.72.76:8080/push-server/v2/websocket';
  </script>
...
```

* 加钞子应用
文件路径：addnotes-slave-ui/src/index.html
```
...
<script>
        //后端服务地址
        const SERVICE_URL = 'http://10.34.12.164:9090/';
    </script>
...
```
* 数据分析子应用
文件路径：data_insight-slave-ui/src/index.html
```
...
<script>
    //后端服务地址
    const SERVICE_URL = 'http://10.34.12.164:9090/insight/';
    const saikuAPI = 'http://10.2.72.201:8080/saiku_ui';
    const hdfsMonitor = 'http://10.2.72.160:50070/dfshealth.html';
    const hmrMonitor = 'http://10.2.72.160:8088/cluster';
    const hbaseMonitor = 'http://10.2.72.160:60010/master-status';
    const hsparkMonitor = 'http://10.2.72.160:8080/spark';
    const hkylinMonitor = 'http://10.2.72.160:7070/kylin';
</script>
...
```
### 3.2. 子应用配置
文件路径：messi-master-ui/src/assets/apps.json
```
[
      {
        "name": "app2",
        "link": "/assets/app2",
        "url":"http://localhost/insight",   //大数据子应用代理地址
        "sourceType": "link",
        "desc": "大数据子应用"
      },
      {
        "name": "app3",
        "link": "/assets/app3",
        "url": "http://localhost/addnotes",    //加钞子应用代理地址
        "sourceType": "link",
        "desc": "加钞子应用"
      }
]
```
### 3.3. nginx代理配置
编译nginx配置文件*nginx.conf*：
```
    server {
        # 服务端口
        listen       80;
        location / {
            root   html;
            index  index.html index.htm;
        }
        # 代理主应用
        location /messi {
            proxy_pass http://localhost:4400;   //主应用实际地址
        }
        # 代理加钞子应用
        location /addnotes {
            proxy_pass http://localhost:4200;   //加钞子应用实际地址
        }
        # 代理大数据子应用
        location /insight {
            proxy_pass http://localhost:4190;   //大数据子应用实际地址
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```
应用访问入口为```http://localhost:{nginx服务端口}/messi```;
例：http://localhost:80/messi
## 四、服务器部署

1. 命令行切换到各个应用根目录，分别执行```npm run build```编译打包，编译完成后生成对应的编译文件夹，各个应用对应的文件目录分别为：
    * 主应用：messi-master-ui/messi
    * 加钞子应用：addnotes-slave-ui/addnotes
    * 大数据子应用：data_insight_slave_ui/data_insight

2. 上传编译后的文件夹到服务器任意同一目录下，如```/home/brain/apps/v1.0```；
3. 修改nginx配置文件，添加如下配置：
```
...
    server {
        listen 3100;
        location / {
            root /home/brain/apps/v1.0;   //root后跟指定目录文件夹路径
            index index.html index.htm;
        }
    } 
...
```
4. 启动nginx服务：```nginx -c {nginx.conf文件路径}```，应用访问地址：```http://{服务器IP}:{nginx服务端口}/messi```；
5. 重启nginx服务：nginx -s reload；
6. 停止nginx服务：nginx -s stop；

### 附：应用配置
* messi-master-ui/messi/index.html
```
···
<base href="/messi/">   //URL访问前缀，与文件所在文件夹名称一致
···
<script>
    const SERVICE_URL = 'http://10.34.12.164:9090/';    //后端服务地址
    const SOCKET_URL = 'ws://10.2.72.76:8080/push-server/v2/websocket';
</script>
...
```

* messi-master-ui/messi/assets/apps.json
```
[
    {
        "name": "app2",
        "link": "/assets/app2",
        "url":"http://10.34.12.164:3100/data_insight",  //大数据子应用代理地址
        "sourceType": "link",
        "desc": "大数据子应用"
    },
    {
        "name": "app3",
        "link": "/assets/app3",
        "url": "http://10.34.12.164:3100/addnotes",    //加钞子应用代理地址
        "sourceType": "link",
        "desc": "加钞子应用"
    }
]
```

* addnotes-slave-ui/addnotes/index.html
```
...
        <base href="/addnotes/">    //URL访问前缀，与文件所在文件夹名称一致
...
        const SERVICE_URL = 'http://10.34.12.164:9090/';    //后端服务地址
...
```

* data_insight-slave-ui/data_insight/index.html
```
...
        <base href="/data_insight/">    //URL访问前缀，与文件所在文件夹名称一致
...
<script>
        const SERVICE_URL = 'http://10.34.12.164:9090/insight/';    //后端服务地址
        const saikuAPI = 'http://10.2.72.201:8080/saiku_ui';
        const hdfsMonitor = 'http://10.2.72.160:50070/dfshealth.html';
        const hmrMonitor = 'http://10.2.72.160:8088/cluster';
        const hbaseMonitor = 'http://10.2.72.160:60010/master-status';
        const hsparkMonitor = 'http://10.2.72.160:8080/spark';
        const hkylinMonitor = 'http://10.2.72.160:7070/kylin';
</script>
...
```

