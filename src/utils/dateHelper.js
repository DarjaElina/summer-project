export const parseUTCDateFromDB = (dateStr) => {
  const isoUTC = dateStr.replace(" ", "T") + "Z";
  return new Date(isoUTC);
}