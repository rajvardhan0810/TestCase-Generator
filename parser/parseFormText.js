export function parseFormText(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  const fields = [];

  lines.forEach(line => {
    const lower = line.toLowerCase();

    let field = {
      name: "",
      type: "string"
    };

    // NAME + TYPE
    if (lower.includes("email")) {
      field.name = "email";
      field.type = "email";
    } else if (lower.includes("password")) {
      field.name = lower.includes("confirm") ? "confirmPassword" : "password";
      field.type = "string";
    } else if (lower.includes("username")) {
      field.name = "username";
    } else if (lower.includes("phone")) {
      field.name = "phone";
      field.type = "number";
    } else if (lower.includes("age")) {
      field.name = "age";
      field.type = "number";
    } else if (lower.includes("date")) {
      field.name = "date";
      field.type = "date";
    } else if (lower.includes("plan")) {
      field.name = "planType";
      field.type = "enum";
      field.enumValues = ["free", "pro", "enterprise"];
    } else {
      field.name = lower.split(" ")[0];
    }

    // REQUIRED
    if (lower.includes("required")) {
      field.required = true;
    }

    // MIN / MAX LENGTH
    const minLengthMatch = lower.match(/min\s*(\d+)/);
    if (minLengthMatch) field.minLength = parseInt(minLengthMatch[1]);

    const maxLengthMatch = lower.match(/max\s*(\d+)/);
    if (maxLengthMatch) field.maxLength = parseInt(maxLengthMatch[1]);

    // RANGE (18 to 60)
    const rangeMatch = lower.match(/(\d+)\s*to\s*(\d+)/);
    if (rangeMatch) {
      field.min = parseInt(rangeMatch[1]);
      field.max = parseInt(rangeMatch[2]);
    }

    fields.push(field);
  });

  return { fields };
}