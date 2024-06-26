package com.project.gamedl.service;

import com.project.gamedl.data.CharacterRepository;
import com.project.gamedl.domain.Character;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    @Autowired
    public CharacterService(CharacterRepository characterRepository) {
        this.characterRepository = characterRepository;
    }

    public List<Character> getAllCharacters(){
        return characterRepository.findAll();
    }


    public Optional<Character> getRandomCharacter() {
        return characterRepository.getRandomCharacter();
    }
}
