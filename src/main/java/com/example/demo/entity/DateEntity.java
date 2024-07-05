package com.example.demo.entity;

import java.time.OffsetDateTime;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class DateEntity extends Auditable {
    @Id
    private String id;

    @Column(name = "created_date ", columnDefinition = "DATE")
    private Date createdDate;

    @Column(name = "created_timestamp", columnDefinition = "TIMESTAMP")
    private OffsetDateTime createdTimestamp;

    @Column(name = "created_tstz", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime createdTstz;

    @Column(name = "created_tslocaltz ", columnDefinition = "TIMESTAMP WITH LOCAL TIME ZONE")
    private OffsetDateTime createdTslocaltz;

}
