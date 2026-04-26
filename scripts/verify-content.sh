#!/bin/bash

check_parity() {
    local errors=0

    # Scan for all lesson manifests
    manifests=$(find modules -name "manifest.json")

    for manifest in $manifests; do
        dir=$(dirname "$manifest")
        
        # Only check lessons (depth of modules/cat/subject/lesson)
        depth=$(echo "$dir" | tr -cd '/' | wc -c)
        if [ "$depth" -ne 3 ]; then continue; fi

        # Extract fragments array from JSON (requires jq or simple grep for safety)
        fragments=$(grep -oP '"fragments":\s*\[\K[^\]]+' "$manifest" | tr -d '"' | tr -d ' ')
        
        IFS=',' read -ra FRAG_ARRAY <<< "$fragments"
        for frag in "${FRAG_ARRAY[@]}"; do
            # Check for English version
            if [ ! -f "$dir/fragments/$frag.en.mdx" ]; then
                echo "❌ MISSING [EN]: $dir/fragments/$frag.en.mdx"
                errors=$((errors + 1))
            fi
            # Check for Spanish version
            if [ ! -f "$dir/fragments/$frag.es.mdx" ]; then
                echo "❌ MISSING [ES]: $dir/fragments/$frag.es.mdx"
                errors=$((errors + 1))
            fi
        done
    done

    if [ $errors -gt 0 ]; then
        echo "⚠️ Total Parity Violations: $errors"
        exit 1
    else
        echo "✅ Content Parity Verified: 1:1 Mapping Active."
    fi
}

check_parity
