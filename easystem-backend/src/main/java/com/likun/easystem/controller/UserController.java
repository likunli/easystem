package com.likun.easystem.controller;


import com.likun.easystem.service.UserService;
import com.likun.easystem.entity.User;
import com.likun.easystem.utils.Msg;
import com.likun.easystem.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    /**
     * reserved interface
     *
     * @return
     */
    @GetMapping("/users")
    public Msg getUsers() {
        List<User> res = userService.getUsers();
        return ResultUtil.success(res);
    }

    /**
     * reserved interface
     *
     * @param id
     * @return
     */
    @GetMapping("/user/{id}")
    public Msg getUser(@PathVariable Long id) {
        User res = userService.getUser(id);
        return ResultUtil.success(res);
    }

    /**
     * reserved interface
     *
     * @param id
     * @return
     */
    @DeleteMapping("/user/{id}")
    public boolean deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return true;
    }

    /**
     * /api/account/login
     * login
     *
     * @param principal
     * @return
     */
    @GetMapping("/account/login")
    public Principal login(Principal principal) {
        return principal;
    }

    /**
     * /api/account/register
     * register
     *
     * @param newUser
     * @return
     */
    @PostMapping(value = "/account/register")
    @SuppressWarnings("unchecked")
    public Msg register(@RequestBody User newUser) {
        if (userService.findByUsername(newUser.getUsername()) != null) {
            return ResultUtil.error(501, "Your imput name (" + newUser.getUsername() + ") already existed!");
        }
        userService.save(newUser);
        return ResultUtil.success();
    }

    /**
     * /api/users/teacher
     * (course manager) get teacher list
     * @return
     */
    @GetMapping("users/teacher")
    public Msg getTeachers() {
        List<User> res = userService.getTeachers();
        return ResultUtil.success(res);
    }
}
