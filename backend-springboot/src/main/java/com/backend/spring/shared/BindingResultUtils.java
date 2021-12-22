package com.backend.spring.shared;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

public class BindingResultUtils {

    public static ResponseEntity<?> returnBindingErrors(BindingResult result) {
        Map<String, Object> response = new HashMap<>();
        FieldError error = result.getFieldErrors().get(0);
        String firstError = error.getField() + " " + error.getDefaultMessage();
        response.put("error", firstError);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}
