package com.likun.easystem.utils;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class Msg<T> {

    /**
     * success code 200
     * exception code 500
     */
    private Integer code;

    private String msg;

    private T data;

}
