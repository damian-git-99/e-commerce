package com.backend.spring.shared.exceptions;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String, Object>> handleServerException(DataAccessException dataAccessException) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", dataAccessException.getMostSpecificCause().getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleException(ResourceNotFoundException ex) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", ex.getMessage());
        return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleException(CustomException ex) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", ex.getMessage());
        return new ResponseEntity<>(map, ex.getHttpStatus());
    }

}
