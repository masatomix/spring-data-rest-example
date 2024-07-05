```
bash-4.2$ sqlplus FOO/BAR@localhost:1521/XEPDB1

SQL*Plus: Release 21.0.0.0.0 - Production on Fri Jul 5 15:04:20 2024
Version 21.3.0.0.0

Copyright (c) 1982, 2021, Oracle.  All rights reserved.

Last Successful login time: Fri Jul 05 2024 15:03:51 +00:00

Connected to:
Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production
Version 21.3.0.0.0

SQL> SELECT DBTIMEZONE FROM DUAL;

DBTIME
------
+00:00

```


```
SQL> describe date_entity;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 ID                                        NOT NULL VARCHAR2(255 CHAR)
 CREATE_AT                                          TIMESTAMP(6) WITH LOCAL TIME ZONE
 UPDATE_AT                                          TIMESTAMP(6) WITH LOCAL TIME ZONE
 CREATED_DATE                                       DATE
 CREATED_TIMESTAMP                                  TIMESTAMP(6)
 CREATED_TSLOCALTZ                                  TIMESTAMP(6) WITH LOCAL TIME ZONE
 CREATED_TSTZ                                       TIMESTAMP(6) WITH TIME ZONE

SQL>

```



```
SQL> select sessiontimezone from dual;

SESSIONTIMEZONE
---------------------------------------------------------------------------
+00:00


SQL> select * from Date_Entity;

ID
CREATE_AT
UPDATE_AT
CREATED_D
CREATED_TIMESTAMP
CREATED_TSLOCALTZ
CREATED_TSTZ
---------------------------------------------------------------------------
e15ddcd4-0d19-4d86-8785-790ec70a5bc3
05-JUL-24 02.53.39.542340 PM
05-JUL-24 02.53.39.542437 PM
01-JAN-24
01-JAN-24 09.00.00.000000 AM
01-JAN-24 12.00.00.000000 AM         // クライアント側のTimezoneで表示された
01-JAN-24 09.00.00.000000 AM +09:00  // Insertされたときの？Timezoneで表示された
---------------------------------------------------------------------------

SQL>
```


```
SQL> alter session set time_zone='Asia/Tokyo';

Session altered.

SQL>  select sessiontimezone from dual;

SESSIONTIMEZONE
---------------------------------------------------------------------------
Asia/Tokyo

SQL> select * from Date_Entity;

ID
CREATE_AT
UPDATE_AT
CREATED_D
CREATED_TIMESTAMP
CREATED_TSLOCALTZ
CREATED_TSTZ
---------------------------------------------------------------------------
e15ddcd4-0d19-4d86-8785-790ec70a5bc3
05-JUL-24 11.53.39.542340 PM
05-JUL-24 11.53.39.542437 PM
01-JAN-24
01-JAN-24 09.00.00.000000 AM
01-JAN-24 09.00.00.000000 AM         // クライアント側のTimezoneで表示された
01-JAN-24 09.00.00.000000 AM +09:00  // Insertされたときの？Timezoneで表示された
---------------------------------------------------------------------------


SQL>
```


```
SQL> alter session set time_zone='asia/jakarta';

Session altered.

SQL> select sessiontimezone from dual;

SESSIONTIMEZONE
---------------------------------------------------------------------------
Asia/Jakarta

SQL> select * from Date_Entity;

ID
CREATE_AT
UPDATE_AT
CREATED_D
CREATED_TIMESTAMP
CREATED_TSLOCALTZ
CREATED_TSTZ
---------------------------------------------------------------------------
e15ddcd4-0d19-4d86-8785-790ec70a5bc3
05-JUL-24 09.53.39.542340 PM
05-JUL-24 09.53.39.542437 PM
01-JAN-24
01-JAN-24 09.00.00.000000 AM
01-JAN-24 07.00.00.000000 AM         // クライアント側のTimezoneで表示された
01-JAN-24 09.00.00.000000 AM +09:00  // Insertされたときの？Timezoneで表示された
---------------------------------------------------------------------------

SQL>
```





Jakartaでデータを1件入れた後、再度selectしてみた

```
SQL> select sessiontimezone from dual;

SESSIONTIMEZONE
---------------------------------------------------------------------------
Asia/Jakarta

SQL>
SQL> SELECT * FROM DATE_ENTITY;

ID
CREATE_AT
UPDATE_AT
CREATED_D
CREATED_TIMESTAMP
CREATED_TSLOCALTZ
CREATED_TSTZ
---------------------------------------------------------------------------
e15ddcd4-0d19-4d86-8785-790ec70a5bc3
05-JUL-24 09.53.39.542340 PM
05-JUL-24 09.53.39.542437 PM
01-JAN-24
01-JAN-24 09.00.00.000000 AM         // 「UTCで0時というデータ」をJSTでいれたけどTimezoneがわからない(こまった)
01-JAN-24 07.00.00.000000 AM         // クライアントのTimezone で返ってくる
01-JAN-24 09.00.00.000000 AM +09:00  // InsertしたときのTimezone
--------------------------------------------------------------------------------
c08da472-4c02-4168-aaf2-1a92a9fddc88
05-JUL-24 10.20.24.634837 PM
05-JUL-24 10.20.24.634857 PM
01-JAN-24
01-JAN-24 07.00.00.000000 AM         // 「UTCで0時というデータ」をJakartaでいれたけどTimezoneがわからない(こまった)
01-JAN-24 07.00.00.000000 AM         // クライアントのTimezone で返ってくる
01-JAN-24 07.00.00.000000 AM +07:00  // InsertしたときのTimezone
---------------------------------------------------------------------------


SQL>
```

たとえば「UTCで0時というデータ」をJSTでいれたとして(日本時間で9時)

- CREATED_TIMESTAMP( ``TIMESTAMP(6)`` ) : 元データのTimezoneがわからず、9時が返ってくる
- CREATED_TSLOCALTZ( ``TIMESTAMP(6) WITH LOCAL TIME ZONE`` ) : 元データのTimezoneはわからないけど、クライアントのTimezoneに合わせて返ってくる
- CREATED_TSTZ ( ``TIMESTAMP(6) WITH TIME ZONE`` ) : 元データのTimezoneを保持したまま、データが返ってくる


TIMESTAMP は、クライアントアプリ全員のTimezoneがJST固定とかであれば、困らないかもしれない

TIMESTAMP WITH LOCAL TIME ZONE は、データがどのTimezoneからInsertされていようが、取得時のTimezoneにちゃんと変換されてそうなので使い勝手がいい

TIMESTAMP WITH TIME ZONE は、データがどのTimezoneからInsertされたかまで保持しているが、そこまでいらない気がする
