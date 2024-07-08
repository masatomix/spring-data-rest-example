## SQL*Plusのセットアップ
  
```
$ git clone https://github.com/oracle/docker-images.git
$ cd docker-images/OracleInstantClient/oraclelinux7/21/

$ docker images
REPOSITORY                                       TAG         IMAGE ID       CREATED         SIZE
container-registry.oracle.com/database/express   21.3.0-xe   8da8cedb7fbf   10 months ago   11.4GB

$
$ sudo docker build -t oracle/instantclient:21 .

Sending build context to Docker daemon  5.632kB
Step 1/3 : FROM oraclelinux:7-slim
7-slim: Pulling from library/oraclelinux
91f27b00e0d3: Pull complete 
Digest: sha256:680095cdd84f7d4698952a9b214391ebe3807ca2567499694feacf955f2bdc9f
Status: Downloaded newer image for oraclelinux:7-slim
 ---> 2e357a675a80
Step 2/3 : RUN  yum -y install oracle-instantclient-release-el7 &&      yum -y install oracle-instantclient-basic oracle-instantclient-devel oracle-instantclient-sqlplus &&      rm -rf /var/cache/yum
 ---> Running in effe868b319f
Loaded plugins: ovl
Resolving Dependencies
--> Running transaction check
---> Package oracle-instantclient-release-el7.x86_64 0:1.0-3.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

================================================================================
 Package                             Arch      Version      Repository     Size
================================================================================
Installing:
 oracle-instantclient-release-el7    x86_64    1.0-3.el7    ol7_latest     14 k

Transaction Summary
================================================================================
Install  1 Package

Total download size: 14 k
Installed size: 18 k
Downloading packages:
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : oracle-instantclient-release-el7-1.0-3.el7.x86_64            1/1 
  Verifying  : oracle-instantclient-release-el7-1.0-3.el7.x86_64            1/1 

Installed:
  oracle-instantclient-release-el7.x86_64 0:1.0-3.el7                           

Complete!
Loaded plugins: ovl
Resolving Dependencies
--> Running transaction check
---> Package oracle-instantclient-basic.x86_64 0:21.14.0.0.0-1 will be installed
--> Processing Dependency: libaio for package: oracle-instantclient-basic-21.14.0.0.0-1.x86_64
---> Package oracle-instantclient-devel.x86_64 0:21.14.0.0.0-1 will be installed
---> Package oracle-instantclient-sqlplus.x86_64 0:21.14.0.0.0-1 will be installed
--> Running transaction check
---> Package libaio.x86_64 0:0.3.109-13.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

================================================================================
 Package                 Arch   Version        Repository                  Size
================================================================================
Installing:
 oracle-instantclient-basic
                         x86_64 21.14.0.0.0-1  ol7_oracle_instantclient21  53 M
 oracle-instantclient-devel
                         x86_64 21.14.0.0.0-1  ol7_oracle_instantclient21 655 k
 oracle-instantclient-sqlplus
                         x86_64 21.14.0.0.0-1  ol7_oracle_instantclient21 706 k
Installing for dependencies:
 libaio                  x86_64 0.3.109-13.el7 ol7_latest                  24 k

Transaction Summary
================================================================================
Install  3 Packages (+1 Dependent package)

Total download size: 55 M
Installed size: 246 M
Downloading packages:
--------------------------------------------------------------------------------
Total                                               58 MB/s |  55 MB  00:00     
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : libaio-0.3.109-13.el7.x86_64                                 1/4 
  Installing : oracle-instantclient-basic-21.14.0.0.0-1.x86_64              2/4 
  Installing : oracle-instantclient-devel-21.14.0.0.0-1.x86_64              3/4 
  Installing : oracle-instantclient-sqlplus-21.14.0.0.0-1.x86_64            4/4 
  Verifying  : oracle-instantclient-devel-21.14.0.0.0-1.x86_64              1/4 
  Verifying  : oracle-instantclient-sqlplus-21.14.0.0.0-1.x86_64            2/4 
  Verifying  : oracle-instantclient-basic-21.14.0.0.0-1.x86_64              3/4 
  Verifying  : libaio-0.3.109-13.el7.x86_64                                 4/4 

Installed:
  oracle-instantclient-basic.x86_64 0:21.14.0.0.0-1                             
  oracle-instantclient-devel.x86_64 0:21.14.0.0.0-1                             
  oracle-instantclient-sqlplus.x86_64 0:21.14.0.0.0-1                           

Dependency Installed:
  libaio.x86_64 0:0.3.109-13.el7                                                

Complete!
Removing intermediate container effe868b319f
 ---> 24e07a436873
Step 3/3 : CMD ["sqlplus", "-v"]
 ---> Running in 3756f9e6b4ef
Removing intermediate container 3756f9e6b4ef
 ---> 55f7813c0225
Successfully built 55f7813c0225
Successfully tagged oracle/instantclient:21
$



$ docker images
REPOSITORY                                       TAG         IMAGE ID       CREATED         SIZE
oracle/instantclient                             21        b38ca1e1d601   10 days ago     404MB
container-registry.oracle.com/database/express   21.3.0-xe   8da8cedb7fbf   11 months ago   11.4GB
$ 

```

イメージに入って、SQL*Plusを実行してみます。

```
$ sudo docker run -it --rm oracle/instantclient:21 /bin/bash;
bash-4.2# sqlplus -v

SQL*Plus: Release 21.0.0.0.0 - Production
Version 21.14.0.0.0

bash-4.2# exit
exit
$

```


TCP/IP経由で別のOracleにも接続できます。

```
bash-4.2# sqlplus FOO/BAR@192.168.10.xxx:1521/XEPDB1

SQL*Plus: Release 21.0.0.0.0 - Production on Mon Jul 8 03:58:34 2024
Version 21.14.0.0.0

Copyright (c) 1982, 2022, Oracle.  All rights reserved.

Last Successful login time: Mon Jul 08 2024 01:51:24 +00:00
c
Connected to:
Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production
Version 21.3.0.0.0

SQL>
```

最後にDockerのLink機能で同Docker上のOracleにもつないでみます。

```
$ sudo docker run -it --link oracle-express-21:db --rm oracle/instantclient:21  /bin/bash;
bash-4.2# sqlplus FOO/BAR@db:1521/XEPDB1

SQL*Plus: Release 21.0.0.0.0 - Production on Mon Jul 8 04:17:14 2024
Version 21.14.0.0.0

Copyright (c) 1982, 2022, Oracle.  All rights reserved.

Last Successful login time: Mon Jul 08 2024 04:15:01 +00:00

Connected to:
Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production
Version 21.3.0.0.0

SQL> quit
Disconnected from Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production
Version 21.3.0.0.0
bash-4.2# exit
exit
$
```
