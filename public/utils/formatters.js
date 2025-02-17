export const formatISODate = (dateString) => {
  if (typeof dateString === "string" || dateString instanceof String) {
    return dateString.split(".")[0].replace("T", " ");
  }
  return "NA";
};

export const secondsToText = (secondsTotal) => {
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = String(secondsTotal % 60).padStart(2, "0");
  return `${minutes}m ${seconds}s`;
};

export const storeValueIsUndefined = (value) =>
  !value || value === "undefined" || value === "null";
