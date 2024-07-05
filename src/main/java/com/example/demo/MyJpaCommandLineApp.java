package com.example.demo;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.entity.DateEntity;
import com.example.demo.repository.DateEntityRepository;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class MyJpaCommandLineApp implements CommandLineRunner {

    @Autowired
    private DateEntityRepository repository; // ここで自分のRepositoryをインジェクションする

    public static void main(String[] args) {
        SpringApplication.run(MyJpaCommandLineApp.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        // for (int i = 0; i < 5; i++) {
        DateEntity instance = createObj();

        Instant instant = Instant.parse("2024-01-01T00:00:00Z");
        OffsetDateTime time = OffsetDateTime.ofInstant(instant, ZoneId.systemDefault());
        Date date = Date.from(instant);
        log.debug("Date    : {}", date);
        log.debug("DateTime: {}", time);

        instance.setCreatedDate(date);
        instance.setCreatedTimestamp(time);
        instance.setCreatedTstz(time);
        instance.setCreatedTslocaltz(time);
        repository.save(instance);
        // }

        // ここでRepositoryを使った処理を実行する
        log.debug(getTimezone());
        List<DateEntity> list = repository.findAll();
        var result = list.get(0);
        log.debug("Date         : {}", result.getCreatedDate());
        log.debug("TimeStamp    : {}", result.getCreatedTimestamp());
        log.debug("With TimeZone: {}", result.getCreatedTstz());
        log.debug("With Local TZ: {}", result.getCreatedTslocaltz());
    }

    private DateEntity createObj() {
        DateEntity instance = new DateEntity();
        instance.setId(java.util.UUID.randomUUID().toString());
        return instance;
    }

    @PostConstruct
    public void init() {
        // Set JVM default timezone
        // TimeZone.setDefault(TimeZone.getTimeZone("Asia/Tokyo"));
        // TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        // TimeZone.setDefault(TimeZone.getTimeZone("Asia/Jakarta"));
    }

    public String getTimezone() {
        ZoneId zoneId = ZoneId.systemDefault();
        return "Current Timezone: " + zoneId.getId();
    }
}