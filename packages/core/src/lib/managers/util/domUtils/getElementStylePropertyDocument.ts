'use strict';

function getElementStylePropertyDocument(element: Element, property: string, pseudoStyle: string | null = null):string {
    const styles = getComputedStyle(element, pseudoStyle);
    return styles.getPropertyValue(property);
}

export = getElementStylePropertyDocument;