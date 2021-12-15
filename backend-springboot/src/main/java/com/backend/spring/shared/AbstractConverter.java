package com.backend.spring.shared;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractConverter <E, D>{

    public abstract E toEntity(D dto);

    public abstract D toDTO(E entity);

    public List<E> toEntity(List<D> dtos) {
        if (dtos == null) return Collections.emptyList();
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

    public List<D> toDTO(List<E> entities) {
        if (entities == null) return Collections.emptyList();
        return entities.stream().map(this::toDTO).collect(Collectors.toList());
    }
    
}
