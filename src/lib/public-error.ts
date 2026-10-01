export const GENERIC_USER_ERROR_MESSAGE_LV = "Radās tehniska kļūda. Lūdzu, mēģini vēlreiz.";

/**
 * Lietotājam nekad nerāda iekšējo kļūdas tekstu, jo tas var saturēt
 * tehniskas detaļas par sistēmu.
 */
export function getUserFacingErrorMessageLv(): string {
  return GENERIC_USER_ERROR_MESSAGE_LV;
}

