package com.project.gamedl.model;

import com.project.gamedl.domain.Game;
import com.project.gamedl.domain.Gender;
import com.project.gamedl.domain.Role;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


public class CharacterModel {
    private Integer id;
    private String name;
    private Role role;
    private Gender gender;
    private Integer age;
    private GameModel game;

    public Integer getId() {return id;}
    public void setId(Integer id) { this.id = id; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public GameModel getGame() {
        return game;
    }

    public void setGame(GameModel game) {
        this.game = game;
    }
}
