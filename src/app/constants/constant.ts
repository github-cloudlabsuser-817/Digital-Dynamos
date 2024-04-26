export const Constants = {

}

export const Keys = {
    reportSettings: 'report-settings',
    languageSettings: 'language-settings',
    patients: 'patients',
    newPatientAdded: 'new-patient-added',
    reports: 'reports',
    isLoggedIn: 'is-user-logged-in'
}

export const Sections = {
    English: {
        complaints: 'Chief Complaints:',
        signs: "Signs:",
        medicalAss: "Medical Assessment:",
        allergies: "Allergies:",
        recommendations: "Recommendations:",
        remarks: "Remarks",
        suggestedLabTests: "Suggested Lab Tests:",
        medicationNames: "Medication Names:",
        conclusion: "Conclusion:",
        totalNutrition: "Total Nutritional Summary:",
        lang: "English language"
    },
    German: {
        complaints: "Hauptsymptome:",
        signs: "Anzeichen:",
        medicalAss: "Medizinische Bewertung:",
        allergies: "Allergien:",
        recommendations: "Empfehlungen:",
        remarks: "Bemerkungen:",
        suggestedLabTests: "Labortests:",
        medicationNames: "Medikation:",
        conclusion: "Fazit:",
        lang: "Deutsch Sprache"
    },
    Spanish: {
        complaints: "Quejas principales:",
        signs: "Signos:",
        medicalAss: "Evaluación médica:",
        allergies: "Alergias:",
        recommendations: "Recomendaciones:",
        remarks: "Observaciones:",
        suggestedLabTests: "Pruebas de laboratorio sugeridas:",
        medicationNames: "Nombres de medicamentos:",
        conclusion: "Conclusión:",
        lang: "Española idioma"
    },
    Hindi: {
        complaints: "मुख्य शिकायतें:",
        signs: "संकेत:",
        medicalAss: "चिकित्सा मूल्यांकन:",
        allergies: "एलर्जी:",
        recommendations: "सिफारिशें:",
        remarks: "टिप्पणियाँ:",
        suggestedLabTests: "सुझाए गए लैब टेस्ट:",
        medicationNames: "दवाओं के नाम:",
        conclusion: "नतीजा:",
        lang: "हिंदी भाषा"
    }
}

export const Prompt = {
    English: {
        prefix: "Generate a patient consultation report in english language including the ",
        suffix: " in the given particular order from the below conversation",
        medicine: "provide max 2 or 3 best medicine names only which matches the patients symptoms:"
    },
    German: {
        prefix:"Erstellen Sie einen Patientenkonsultationsbericht in deutscher Sprache inkl ",
        suffix:" in der gegebenen Reihenfolge aus dem folgenden Gespräch",
        medicine: "Geben Sie maximal 2 oder 3 Namen der besten Arzneimittel an, die den Symptomen des Patienten entsprechen:"
    },
    Spanish: {
        prefix:"Generar un informe de consulta del paciente en idioma español incluyendo el ",
        suffix:" en el orden particular dado a continuación de la conversación",
        medicine: "proporcione como máximo 2 o 3 mejores nombres de medicamentos que coincidan con los síntomas del paciente:"
    },
    Hindi: {
        prefix:"सहित हिंदी भाषा में रोगी परामर्श रिपोर्ट तैयार करें ",
        suffix:" दिए गए विशिष्ट आदेश में दिए गए क्रम",
        medicine: "केवल अधिकतम 2 या 3 सर्वोत्तम दवा के नाम प्रदान करें जो रोगी के लक्षणों से मेल खाते हों:"
    }
}

export const SectionTitleRegex = {
    English: /(Chief Complaints:|Signs:|Allergies:|Recommendations:|Remarks:|Medical Assessment:|Conclusion:)/g,
    German: /(Hauptsymptome:|Anzeichen:|Medizinische Bewertung:|Allergien:|Empfehlungen:|Bemerkungen:|Labortests:|Medikation:|Fazit:)/g,
    Spanish: /(Quejas principales:|Signos:|Evaluación médica:|Alergias:|Recomendaciones:|Observaciones:|Pruebas de laboratorio sugeridas:|Nombres de medicamentos:|Conclusión:)/g,
    Hindi: /(रोगी परामर्श:|मुख्य शिकायतें:|संकेत:|चिकित्सा मूल्यांकन:|एलर्जी:|सिफारिशें:|टिप्पणियाँ:|सुझाए गए लैब टेस्ट:|दवाओं के नाम:|नतीजा:)/g
}

export const SectionTitleInputRegex = {
    English: /(Signs:|Allergies:|Recommendations:|Remarks:|Medical Assessment:|Conclusion:)/g,
    German: /(Anzeichen:|Medizinische Bewertung:|Allergien:|Empfehlungen:|Bemerkungen:|Labortests:|Medikation:|Fazit:)/g,
    Spanish: /(Signos:|Evaluación médica:|Alergias:|Recomendaciones:|Observaciones:|Pruebas de laboratorio sugeridas:|Nombres de medicamentos:|Conclusión:)/g,
    Hindi: /(मुख्य शिकायतें:|संकेत:|चिकित्सा मूल्यांकन:|एलर्जी:|सिफारिशें:|टिप्पणियाँ:|सुझाए गए लैब टेस्ट:|दवाओं के नाम:|नतीजा:)/g
}

export const DietSectionTitleRegex = {
    English: /(Consolidated Diet Report:|Total Nutritional Summary for all days:|Total Nutritional Summary:|Recommendations:)/g,
}