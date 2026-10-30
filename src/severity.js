
// Severity enum
export const SEVERITY = Object.freeze({
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
});

export function severityText(severity) {
    // Check if the value exists in the SEVERITY enum values
    const isValid = Object.values(SEVERITY).includes(severity);
    
    // Fallback to 'LOW' if it's invalid. Prevents crashes
    const safeSeverity = isValid ? severity : SEVERITY.LOW;

    return safeSeverity.toLowerCase();
}

export function severityCssClass(severity) {
    // Check if the value exists in the SEVERITY enum values
    const isValid = Object.values(SEVERITY).includes(severity);
    
    // Fallback to 'LOW' if it's invalid. Prevents crashes
    const safeSeverity = isValid ? severity : SEVERITY.LOW;

    return safeSeverity.toLowerCase()+"-severity";
}