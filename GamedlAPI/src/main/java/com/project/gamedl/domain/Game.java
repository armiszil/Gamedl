package com.project.gamedl.domain;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "games")
public class Game {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "name",nullable = false)
        private String name;

        @Column(name = "genre",nullable = false)
        private String genre;

        @Column(name ="franchise_name",nullable = false)
        private String franchiseName;

        @Column(name = "release_date",nullable = false)
        private Date releaseDate;

        @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
        private List<Character> characters;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getGenre() {
            return genre;
        }

        public void setGenre(String genre) {
            this.genre = genre;
        }

        public String getFranchiseName() {
            return franchiseName;
        }

        public void setFranchiseName(String franchiseName) {
            this.franchiseName = franchiseName;
        }

        public Date getReleaseDate() {
            return releaseDate;
        }

        public void setReleaseDate(Date releaseDate) {
            this.releaseDate = releaseDate;
        }

        public List<Character> getCharacters() {
            return characters;
        }

        public void setCharacters(List<Character> characters) {
            this.characters = characters;
        }
}
