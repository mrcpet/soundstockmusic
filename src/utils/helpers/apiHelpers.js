export function validateItemData(data) {
  let errors = {};
  if (!data.name || typeof data.name !== "string") {
    errors.name = "A name is required";
  }
  if (data.quantity == undefined || typeof data.quantity !== "number") {
    errors.quantity = "A quantity number is required";
  }
  if (data.description && typeof data.description !== "string") {
    errors.description = "Invalid description type";
  }
  if (data.category && typeof data.category !== "string") {
    errors.category = "Invalid category";
  }

  const hasErrors = Object.keys(errors).length > 0;
  return [hasErrors, errors];
}

//TODO implement this function on user registration
export function validateUserData(data) {
  let errors = {};
  if (!data.name || typeof data.name !== "string") {
    errors.name = "A name is required";
  }
  if (
    !data.password ||
    typeof data.password !== "string" ||
    data.password.length < 8
  ) {
    errors.password = "Invalid password format";
  }
  if (data.email && typeof data.email !== "string") {
    errors.email = "Invalid email format";
  }

  const hasErrors = Object.keys(errors).length > 0;
  return [hasErrors, errors];
}

export function notFoundResponse(response, message = "Resource not found") {
  return response.json({ message }, { status: 404 });
}
