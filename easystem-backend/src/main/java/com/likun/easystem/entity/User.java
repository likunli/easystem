package com.likun.easystem.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Getter
@Setter
@Table(name = "user")
@Scope("session")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String role;

    @Column(unique = true)
    private String username;


    private String password;

    private double gpa;

    private double balance;

    private double credit;

    private String major;

    private String country;

    public User() {

    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String role, String username, String password, double gpa, double balance, double credit, String major, String country) {
        this.role = role;
        this.username = username;
        this.password = password;
        this.gpa = gpa;
        this.balance = balance;
        this.credit = credit;
        this.major = major;
        this.country = country;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));
        return authorities;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", password=" + password + ", role=" + role +
                ",]";
    }


    /**
     * spring security authentication related
     */
    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return this.password;
    }

    /**
     * spring security authentication related
     */
    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return this.username;
    }
}
