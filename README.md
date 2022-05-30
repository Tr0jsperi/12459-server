# GB/T 12459 Server

Node.js GB/T 12459 server to look up pip fitting's data

用于查询 `GB/T 12459` 管件尺寸的服务

## How To Use

 1. Install node.js
 2. `git clone https://github.com/Tr0jsperi/12459-server.git`
 3. `cd 12459-server`
 4. `npm install`

    //If pm2 is installed, skip 5~6
 5. `npm install pm2 -g`
 6. `pm2 startup`
 7. `pm2 start /server.js --name="IAPWS97Server" --watch --max-memory-restart 100M`

 
## POST methods
    //list the exact pip fitting's data
    //列出查询管件的具体尺寸
    post {{url}}/12459row
    {{header}} 

    {
        "mode": 2 , "head": 40
    } 

    //list all the pip fittings' DN data
    //列出查询管件类别的所有公称尺寸
    post {{url}}/12459dn
    {{header}} 

    {
        "mode": 3
    } 

    //list all the pip fittings' catagories
    //列出能够查询的管件列别名称
    post {{url}}/12459tname
    {{header}} 

    {
    } 
