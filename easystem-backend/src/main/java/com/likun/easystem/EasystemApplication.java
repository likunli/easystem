package com.likun.easystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * educational administration system
 * spring boot initialized module, entrance of application
 * TODO: 2018/12/15
 * paging, exception catching & response data modifying (this time only return success status)
 *
 * package /config          web related configuration
 * package /controller      web interface layer, RESTFul APIs routing map
 * package /entity          java beans and specific response object
 * package /repository      DAO layer, database related, using HQL and Spring data JPA for querying
 * package /service         service layer, specific logical implementation and corresponding interfaces
 * package /utils           common utils class used in application
 *
 * @author Likun Li
 * @version 2018.12
 * @since 1.8
 */
@SpringBootApplication
public class EasystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(EasystemApplication.class, args);
    }

}

