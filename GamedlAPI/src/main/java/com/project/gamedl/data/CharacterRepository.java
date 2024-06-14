package com.project.gamedl.data;

import com.project.gamedl.domain.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CharacterRepository extends JpaRepository<Character,Long> {

    @Query(value = "SELECT * FROM characters ORDER BY rand() LIMIT 1", nativeQuery = true)
    Optional<Character> getRandomCharacter();
}
