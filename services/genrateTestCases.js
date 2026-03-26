export function generateTestCases(fields) {
  const testCases = [];

  const add = (field, type, reason, value) => {
    testCases.push({ field, type, reason, value });
  };

  fields.forEach(f => {
    const { name, type, required, min, max, minLength, maxLength, enumValues } = f;

    // REQUIRED
    if (required) {
      add(name, "invalid", "required field empty", "");
      add(name, "invalid", "null value", null);
    }

    // EMAIL
    if (type === "email") {
      const rand = Math.random().toString(36).substring(2, 7);

      add(name, "valid", "valid email", `${rand}@gmail.com`);
      add(name, "invalid", "missing @", `${rand}gmail.com`);
      add(name, "invalid", "missing domain", `${rand}@`);
    }

    // NUMBER
    if (type === "number") {
      const minVal = min ?? 0;
      const maxVal = max ?? 100;

      const mid = Math.floor((minVal + maxVal) / 2);

      add(name, "valid", "within range", mid);
      add(name, "invalid", "below minimum", minVal - 1);
      add(name, "invalid", "above maximum", maxVal + 1);
      add(name, "boundary", "min", minVal);
      add(name, "boundary", "max", maxVal);
    }

    // STRING
    if (type === "string") {
      const minL = minLength ?? 1;
      const maxL = maxLength ?? 10;

      add(name, "valid", "valid string", "a".repeat(minL));
      add(name, "invalid", "too short", minL > 1 ? "a".repeat(minL - 1) : "");
      add(name, "invalid", "too long", "a".repeat(maxL + 1));
      add(name, "boundary", "min length", "a".repeat(minL));
      add(name, "boundary", "max length", "a".repeat(maxL));
    }

    // ENUM
    if (type === "enum" && enumValues) {
      enumValues.forEach(val => add(name, "valid", "valid enum", val));
      add(name, "invalid", "invalid enum", "random");
    }

    // DATE
    if (type === "date") {
      add(name, "valid", "valid date", "2024-01-01");
      add(name, "invalid", "invalid format", "32-13-2024");
    }

    // CONFIRM PASSWORD
    if (name === "confirmPassword") {
      add(name, "invalid", "password mismatch", "wrong123");
    }
  });

  return testCases;
}