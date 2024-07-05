## Oracle sysdba でPluggale Databaseに接続する手順

Docker上にOracleが起動している前提で。。


```
$ docker ps
CONTAINER ID   IMAGE                                                      COMMAND                  CREATED       STATUS
       PORTS                                                                                  NAMES
bb5dbc08b97a   container-registry.oracle.com/database/express:21.3.0-xe   "/bin/bash -c $ORACL…"   9 hours ago   Up 6 hours (healthy)   0.0.0.0:1521->1521/tcp, :::1521->1521/tcp, 0.0.0.0:5500->5500/tcp, :::5500->5500/tcp   oracle-express-21

$ docker exec -it bb5dbc08b97a /bin/bash
bash-4.2$  sqlplus / as sysdba

SQL*Plus: Release 21.0.0.0.0 - Production on Fri Jul 5 13:18:02 2024
Version 21.3.0.0.0

Copyright (c) 1982, 2021, Oracle.  All rights reserved.


Connected to:
Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production
Version 21.3.0.0.0

SQL> SHOW CON_NAME;

CON_NAME
------------------------------
CDB$ROOT
SQL> SELECT NAME, OPEN_MODE FROM V$PDBS;

NAME
--------------------------------------------------------------------------------
OPEN_MODE
----------
PDB$SEED
READ ONLY

XEPDB1
READ WRITE


SQL> alter session set container = XEPDB1;

Session altered.

SQL> SHOW CON_NAME;

CON_NAME
------------------------------
XEPDB1

SQL> quit
Disconnected from Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production
Version 21.3.0.0.0
bash-4.2$ exit
exit
```

sysdbaでログインができました！



## ユーザ作成手順


sysdbaでログインしてユーザを作成します

```
SQL> CREATE ROLE FOO_ROLE;

 GRANT
 CREATE SESSION,
 CREATE ANY INSQL> DEX,
 CREATE ANY VIEW,
 CREATE ANY SYNONYM,
 CREATE ANY SEQUENCE,
 CREATE ANY TABLE,
 SELECT ANY TABLE,
 INSERT ANY TABLE,
 UPDATE ANY TABLE,
 DELETE ANY TABLE
 TO FOO_ROLE;

CREATE USER "FOO"  PROFILE "DEFAULT"
     IDENTIFIED BY "BAR" DEFAULT TABLESPACE "USERS"
     TEMPORARY TABLESPACE "TEMP"
     QUOTA UNLIMITED
     ON "USERS"
     ACCOUNT UNLOCK;

Role created.
Grant succeeded.
User created.

SQL>  GRANT FOO_ROLE TO FOO;

Grant succeeded.

SQL> exit
Disconnected from Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production
Version 21.3.0.0.0
bash-4.2$
```

ログインしてみます。

```
bash-4.2$ sqlplus FOO/BAR@localhost:1521/XEPDB1

SQL*Plus: Release 21.0.0.0.0 - Production on Fri Jul 5 13:26:44 2024
Version 21.3.0.0.0

Copyright (c) 1982, 2021, Oracle.  All rights reserved.

Last Successful login time: Fri Jul 05 2024 13:26:25 +00:00

Connected to:
Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production
Version 21.3.0.0.0

SQL>
```

ユーザでログインができました！これで下記の設定で、JDBC接続もOKです。

```
spring.datasource.url=jdbc:oracle:thin:@localhost:1521/XEPDB1
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
spring.datasource.username=FOO
spring.datasource.password=BAR
```


