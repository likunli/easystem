package com.likun.easystem.repository;


import com.likun.easystem.entity.Global;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface GlobalRepository extends CrudRepository<Global, Long> {


    @Query(value = "select c.credit from Global c where c.id = 1")
    Double getCredit();


    @Transactional
    @Modifying
    @Query(value = "update Global c set c.credit = ?1 where c.id = 1")
    void setCredit(Double credit);
}
