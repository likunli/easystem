package com.likun.easystem.utils;

public class ResultUtil {

    public static Msg success(Object object) {
        Msg msg = new Msg();
        msg.setCode(200);
        msg.setMsg("success");
        msg.setData(object);
        return msg;
    }

    public static Msg success() {
        return success(null);
    }

    public static Msg error(Integer code, String resultmsg) {
        Msg msg = new Msg();
        msg.setCode(code);
        msg.setMsg(resultmsg);
        return msg;
    }
}
