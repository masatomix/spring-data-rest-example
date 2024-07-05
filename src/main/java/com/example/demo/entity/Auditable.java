package com.example.demo.entity;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class Auditable {
    @Id
    private String id;
    
    // レコード単位で、Timezoneを持つ事ができるデータ型
    // TIMESTAMP WITH TIME ZONE型:
    // @Column(name = "create_at", updatable = false)
    // TIMESTAMP WITH LOCAL TIME ZONE型:
    @Column(name = "create_at", columnDefinition = "TIMESTAMP WITH LOCAL TIME ZONE", updatable = false)
    private OffsetDateTime createAt;

    // @Column(name = "update_at")
    @Column(name = "update_at", columnDefinition = "TIMESTAMP WITH LOCAL TIME ZONE")
    private OffsetDateTime updateAt;

    @PrePersist
    public void onPrePersist() {
        setCreateAt(OffsetDateTime.now());
        setUpdateAt(OffsetDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        setUpdateAt(OffsetDateTime.now());
    }
}
