#!/bin/bash

# --- CONFIGURATION ---
BASE_DIR="modules"
DIFFICULTIES=("easy" "medium" "hard")
FRAGMENT_TYPES=("intro" "conceptual-base" "implementation")
TIMES=("45m" "1h 30m" "2h" "3h")

# --- UTILS ---
log_info() { echo -e "\033[34m[INFO]\033[0m $1"; }
log_success() { echo -e "\033[32m[SUCCESS]\033[0m $1"; }

create_lesson() {
    local category=$1; local sub_id=$2; local l_id=$3; local t_en=$4; local t_es=$5; local next_id=$6;
    local lesson_dir="$BASE_DIR/$category/$sub_id/$l_id"
    mkdir -p "$lesson_dir/fragments" "$lesson_dir/local_simulators"
    
    local f_count=3; local f_list=""; local lb_en=""; local lb_es=""
    
    for (( i=0; i<$f_count; i++ )); do
        local f_id=${FRAGMENT_TYPES[$i]}
        f_list+="\"$f_id\""
        
        local en_lab="${f_id//-/ }"; local es_lab=$(echo "$en_lab" | sed 's/intro/Inicio/;s/conceptual base/Conceptos/;s/implementation/Implementación/')
        lb_en+="\"$f_id\": \"$en_lab\""; lb_es+="\"$f_id\": \"$es_lab\""
        [ $i -lt $((f_count-1)) ] && f_list+=", " && lb_en+=", " && lb_es+=", "

        local bridge=""; if [ "$f_id" == "intro" ] && [ ! -z "$next_id" ]; then
            bridge="<InternalPreview subjectId=\"$sub_id\" lessonId=\"$next_id\" lang={props.lang} />"
        fi

        # MDX Fragment Generation
        cat <<EOF > "$lesson_dir/fragments/$f_id.en.mdx"
## ${en_lab^}

Engineering systems often encounter high **latency** when the **normalization** of data is not performed at the architectural level. Understanding a **DFA** is essential for high-performance state management.

$bridge

This module focuses on the technical nuances of $l_id. We explore how to build robust, scalable solutions by adhering to standard CS paradigms.
EOF

        cat <<EOF > "$lesson_dir/fragments/$f_id.es.mdx"
## ${es_lab^}

Los sistemas de ingeniería suelen encontrar una alta **latency** cuando no se realiza la **normalization** de los datos a nivel arquitectónico. Entender un **DFA** es esencial para la gestión de estados de alto rendimiento.

$bridge

Este módulo se centra en los matices técnicos de $l_id. Exploramos cómo construir soluciones robustas y escalables siguiendo los paradigmas estándar de la informática.
EOF
    done

    # Lesson Manifest Generation
    cat <<EOF > "$lesson_dir/manifest.json"
{
  "id": "$l_id",
  "title": { "en": "$t_en", "es": "$t_es" },
  "learningPoints": { 
    "en": ["Analyze system performance", "Implement $l_id patterns", "Debug complex state machines"],
    "es": ["Analizar el rendimiento del sistema", "Implementar patrones de $l_id", "Depurar máquinas de estado complejas"] 
  },
  "fragments": [$f_list],
  "fragmentLabels": { "en": { $lb_en }, "es": { $lb_es } },
  "metadata": { 
    "estimatedTime": "${TIMES[$RANDOM % 4]}", 
    "difficulty": "${DIFFICULTIES[$RANDOM % 3]}" 
  }
}
EOF
}

create_subject() {
    local cat=$1; local order=$2; local id=$3; local t_en=$4; local t_es=$5; local d_en=$6; local d_es=$7; shift 7; local lessons=("$@")
    local subject_dir="$BASE_DIR/$cat/$id"; mkdir -p "$subject_dir"
    
    log_info "Seeding Subject: $t_en ($cat)"
    
    local lessons_json=""; for i in "${!lessons[@]}"; do lessons_json+="\"${lessons[$i]}\""; [ $i -lt $((${#lessons[@]}-1)) ] && lessons_json+=", "; done
    
    # Subject Manifest Generation
    cat <<EOF > "$subject_dir/manifest.json"
{
  "id": "$id",
  "title": { "en": "$t_en", "es": "$t_es" },
  "type": "$cat",
  "order": $order,
  "description": { "en": "$d_en", "es": "$d_es" },
  "lessons": [$lessons_json]
}
EOF

    # Sequential Lesson Generation
    for i in "${!lessons[@]}"; do
        local next=""; if [ $i -lt $((${#lessons[@]}-1)) ]; then next="${lessons[$((i+1))]}"; fi
        local lesson_id="${lessons[$i]}"
        local l_title_en=$(echo "$lesson_id" | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g')
        local l_title_es="Fundamentos de $(echo "$l_title_en" | tr '[:upper:]' '[:lower:]')"
        
        create_lesson "$cat" "$id" "$lesson_id" "$l_title_en" "$l_title_es" "$next"
    done
}

# --- MAIN EXECUTION ---
log_info "Initializing Knowledge Graph Seeding..."
rm -rf "$BASE_DIR"

# 1. FOUNDATIONS
create_subject "foundations" 1 "boolean-logic" "Boolean Logic" "Lógica Booleana" \
    "Foundational circuits and logical gates." "Circuitos fundamentales y compuertas lógicas." \
    "logic-gates" "boolean-algebra" "karnaugh-maps"

# 2. SOFTWARE
create_subject "software" 2 "clean-code" "Clean Code" "Código Limpio" \
    "Principles for professional maintainability." "Principios para la mantenibilidad profesional." \
    "solid-principles" "dry-paradigm" "kiss-philosophy"

# 3. HARDWARE
create_subject "hardware" 3 "computer-arch" "Architecture" "Arquitectura" \
    "Understanding CPU and Memory hierarchies." "Entendiendo CPU y jerarquías de Memoria." \
    "von-neumann" "instruction-sets" "pipeline-logic"

# 4. MIDDLEWARE
create_subject "middleware" 4 "networking" "Networking" "Redes" \
    "Deep dive into OSI and protocols." "Inmersión profunda en OSI y protocolos." \
    "osi-model" "tcp-ip-suite" "dns-resolution"

# 5. SECURITY
create_subject "security" 5 "cryptography" "Cryptography" "Criptografía" \
    "The math behind data integrity." "La matemática detrás de la integridad de datos." \
    "symmetric-keys" "public-infrastructure" "hashing-algorithms"

log_success "Knowledge Graph successfully seeded in /modules."
