package com.likun.easystem.service;


import com.likun.easystem.entity.User;

import java.util.List;

public interface UserService {

    User getUser(Long id);

    List<User> getUsers();

    void deleteUser(Long id);

    User findByUsername(String userName);

    void save(User user);

    List<User> getTeachers();
}
