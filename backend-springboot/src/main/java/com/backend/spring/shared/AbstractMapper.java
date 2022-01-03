package com.backend.spring.shared;


import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

// E = Entity, D = DTO
public interface AbstractMapper<E,D> {
    D toDTO(E entity);
    E toEntity(D dto);

    default List<D> toDTOs(List<E> entities){
        if (entities == null) return Collections.emptyList();
        return entities.stream().map(this::toDTO).collect(Collectors.toList());
    }

    default List<E> toEntities(List<D> dtos){
        if (dtos == null) return Collections.emptyList();
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }
}
