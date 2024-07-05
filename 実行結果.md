

```
$ ./gradlew clean bootRun

> Task :bootRun

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.5)

2024-07-05T23:53:36.573+09:00  INFO 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : Starting MyJpaCommandLineApp using Java 21.0.3 with PID 1222845 (/home/sysmgr/git/sandbox/spring-data-rest-example_db/build/classes/java/main started by sysmgr in /home/sysmgr/git/sandbox/spring-data-rest-example_db)
2024-07-05T23:53:36.574+09:00 DEBUG 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : Running with Spring Boot v3.2.5, Spring v6.1.6
2024-07-05T23:53:36.574+09:00  INFO 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : No active profile set, falling back to 1 default profile: "default"
2024-07-05T23:53:37.078+09:00  INFO 1222845 --- [demo] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2024-07-05T23:53:37.112+09:00  INFO 1222845 --- [demo] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 29 ms. Found 3 JPA repository interfaces.
2024-07-05T23:53:37.401+09:00  INFO 1222845 --- [demo] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2024-07-05T23:53:37.409+09:00  INFO 1222845 --- [demo] [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2024-07-05T23:53:37.409+09:00  INFO 1222845 --- [demo] [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.20]
2024-07-05T23:53:37.440+09:00  INFO 1222845 --- [demo] [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2024-07-05T23:53:37.440+09:00  INFO 1222845 --- [demo] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 833 ms
2024-07-05T23:53:37.524+09:00  INFO 1222845 --- [demo] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2024-07-05T23:53:37.527+09:00  WARN 1222845 --- [demo] [           main] c.zaxxer.hikari.util.DriverDataSource    : Registered driver with driverClassName=oracle.jdbc.driver.OracleDriver was not found, trying direct instantiation.
2024-07-05T23:53:37.700+09:00  INFO 1222845 --- [demo] [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection oracle.jdbc.driver.T4CConnection@202d9236
2024-07-05T23:53:37.701+09:00  INFO 1222845 --- [demo] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2024-07-05T23:53:37.705+09:00  INFO 1222845 --- [demo] [           main] o.s.b.a.h2.H2ConsoleAutoConfiguration    : H2 console available at '/h2-console'. Database available at 'jdbc:oracle:thin:@localhost:1521/XEPDB1'
2024-07-05T23:53:37.767+09:00  INFO 1222845 --- [demo] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2024-07-05T23:53:37.792+09:00  INFO 1222845 --- [demo] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.4.4.Final
2024-07-05T23:53:37.810+09:00  INFO 1222845 --- [demo] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2024-07-05T23:53:37.924+09:00  INFO 1222845 --- [demo] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2024-07-05T23:53:38.505+09:00  INFO 1222845 --- [demo] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2024-07-05T23:53:38.587+09:00 DEBUG 1222845 --- [demo] [           main] org.hibernate.SQL                        : create table app_user (user_id varchar2(6 char) not null, age number(10,0) not null, email varchar2(255 char), first_name varchar2(255 char), last_name varchar2(255 char), company_code varchar2(255 char) not null, primary key (user_id))
2024-07-05T23:53:38.602+09:00 DEBUG 1222845 --- [demo] [           main] org.hibernate.SQL                        : create table company (company_code varchar2(255 char) not null, company_name varchar2(255 char), primary key (company_code))
2024-07-05T23:53:38.615+09:00 DEBUG 1222845 --- [demo] [           main] org.hibernate.SQL                        : create table date_entity (id varchar2(255 char) not null, create_at TIMESTAMP WITH LOCAL TIME ZONE, update_at TIMESTAMP WITH LOCAL TIME ZONE, created_date DATE, created_timestamp TIMESTAMP, created_tslocaltz TIMESTAMP WITH LOCAL TIME ZONE, created_tstz TIMESTAMP WITH TIME ZONE, primary key (id))
2024-07-05T23:53:38.625+09:00 DEBUG 1222845 --- [demo] [           main] org.hibernate.SQL                        : alter table app_user add constraint FK7hjs5p84vn7rc6tj2nssqyi50 foreign key (company_code) references company
2024-07-05T23:53:38.636+09:00  INFO 1222845 --- [demo] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2024-07-05T23:53:38.797+09:00  INFO 1222845 --- [demo] [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
2024-07-05T23:53:39.033+09:00  WARN 1222845 --- [demo] [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2024-07-05T23:53:39.492+09:00  INFO 1222845 --- [demo] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path ''
2024-07-05T23:53:39.498+09:00  INFO 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : Started MyJpaCommandLineApp in 3.131 seconds (process running for 3.407)
2024-07-05T23:53:39.502+09:00 DEBUG 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : Date    : Mon Jan 01 09:00:00 JST 2024
2024-07-05T23:53:39.502+09:00 DEBUG 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : DateTime: 2024-01-01T09:00+09:00
2024-07-05T23:53:39.526+09:00 DEBUG 1222845 --- [demo] [           main] org.hibernate.SQL                        : select de1_0.id,de1_0.create_at,de1_0.created_date,de1_0.created_timestamp,de1_0.created_tslocaltz,de1_0.created_tstz,de1_0.update_at from date_entity de1_0 where de1_0.id=?
2024-07-05T23:53:39.555+09:00 DEBUG 1222845 --- [demo] [           main] org.hibernate.SQL                        : insert into date_entity (create_at,created_date,created_timestamp,created_tslocaltz,created_tstz,update_at,id) values (?,?,?,?,?,?,?)
2024-07-05T23:53:39.580+09:00 DEBUG 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : Current Timezone: Asia/Tokyo
2024-07-05T23:53:39.607+09:00 DEBUG 1222845 --- [demo] [           main] org.hibernate.SQL                        : select de1_0.id,de1_0.create_at,de1_0.created_date,de1_0.created_timestamp,de1_0.created_tslocaltz,de1_0.created_tstz,de1_0.update_at from date_entity de1_0
2024-07-05T23:53:39.613+09:00 TRACE 1222845 --- [demo] [           main] org.hibernate.orm.jdbc.extract           : extracted value (1:VARCHAR) -> [e15ddcd4-0d19-4d86-8785-790ec70a5bc3]
2024-07-05T23:53:39.613+09:00 TRACE 1222845 --- [demo] [           main] org.hibernate.orm.jdbc.extract           : extracted value (2:TIMESTAMP_WITH_TIMEZONE) -> [2024-07-05T14:53:39.542340Z]
2024-07-05T23:53:39.614+09:00 TRACE 1222845 --- [demo] [           main] org.hibernate.orm.jdbc.extract           : extracted value (3:TIMESTAMP) -> [2024-01-01 09:00:00.0]
2024-07-05T23:53:39.614+09:00 TRACE 1222845 --- [demo] [           main] org.hibernate.orm.jdbc.extract           : extracted value (4:TIMESTAMP_WITH_TIMEZONE) -> [2024-01-01T09:00Z]
2024-07-05T23:53:39.614+09:00 TRACE 1222845 --- [demo] [           main] org.hibernate.orm.jdbc.extract           : extracted value (5:TIMESTAMP_WITH_TIMEZONE) -> [2024-01-01T00:00Z]
2024-07-05T23:53:39.614+09:00 TRACE 1222845 --- [demo] [           main] org.hibernate.orm.jdbc.extract           : extracted value (6:TIMESTAMP_WITH_TIMEZONE) -> [2024-01-01T09:00+09:00]
2024-07-05T23:53:39.614+09:00 TRACE 1222845 --- [demo] [           main] org.hibernate.orm.jdbc.extract           : extracted value (7:TIMESTAMP_WITH_TIMEZONE) -> [2024-07-05T14:53:39.542437Z]
2024-07-05T23:53:39.616+09:00 DEBUG 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : Date         : 2024-01-01 09:00:00.0
2024-07-05T23:53:39.616+09:00 DEBUG 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : TimeStamp    : 2024-01-01T09:00Z
2024-07-05T23:53:39.616+09:00 DEBUG 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : With TimeZone: 2024-01-01T09:00+09:00
2024-07-05T23:53:39.616+09:00 DEBUG 1222845 --- [demo] [           main] com.example.demo.MyJpaCommandLineApp     : With Local TZ: 2024-01-01T00:00Z
<==========---> 83% EXECUTING [2m 2s]
> :bootRun

```
