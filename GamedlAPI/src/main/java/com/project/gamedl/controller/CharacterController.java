package com.project.gamedl.controller;

import com.project.gamedl.domain.Character;
import com.project.gamedl.model.CharacterModel;
import com.project.gamedl.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/characters")
public class CharacterController {

    private final CharacterService characterService;
    @Autowired
    private ConversionService conversionService;

    @Autowired
    public CharacterController(CharacterService characterService){
        this.characterService = characterService;
    }

    @GetMapping
    public ResponseEntity<List<CharacterModel>> getAllCharacters(){
        List<CharacterModel> characterModels = new ArrayList<>();
        characterService.getAllCharacters().forEach(character -> characterModels.add(conversionService.convert(character,CharacterModel.class)));

        return new ResponseEntity<>(characterModels, HttpStatus.OK);
    }
    @GetMapping("/random")
    public ResponseEntity<CharacterModel> getRandomCharacter(){
        Optional<Character> optionalCharacter = characterService.getRandomCharacter();
        if(optionalCharacter.isEmpty()) {
            return new ResponseEntity<>(new CharacterModel(),HttpStatus.NOT_FOUND);
        }

        CharacterModel randomCharacterModel = conversionService.convert(optionalCharacter.get(), CharacterModel.class);
        return new ResponseEntity<>(randomCharacterModel,HttpStatus.OK);






    }



}
