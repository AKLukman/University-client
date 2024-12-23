export const genders = ["Male", "Female", "Other"];
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const gendersOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));
export const bloodGroupsOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));
