const queue = [];

Promise.resolve().then(() => {
  Promise.all(queue).then((results) => {
    results.forEach((result, index) => {
      if (result.error) {
        console.log(`%c𐄂 (${index + 1}) ${result.name}`, "color: red;");
        // console.log(result.error.stack.split("\n")[2].trim());
        if (result.description) {
          console.log(
            `%cℹ️ \n${result.description}`,
            "color: lightblue; background: black; display: block;"
          );
        }
        console.log(`%c${result.error.stack}`, "color: pink;");
      } else {
        console.log(`%c✔ (${index + 1}) ${result.name}`, "color: green;");
      }
    });
  });
});

export const test = (name, callback, description) => {
  queue.push(
    new Promise(async (resolve) => {
      try {
        const result = await callback();
        resolve({ name });
      } catch (error) {
        resolve({ name, error, description });
      }
    })
  );
};

export const strictEqual = (a, b, msg = "Values should be strictly equal") => {
  if (a !== b) {
    throw new Error(`Expected ${a} to equal ${b}`);
  }
};

export const deepEqual = (a, b, msg = "Values should be deeply equal") => {
  try {
    if (typeof b !== typeof a) {
      throw new Error("Values not equal");
    }
    if (typeof a === "function") {
      throw new Error("Cannot compare functions");
    }
    if (typeof a !== "object") {
      if (a !== b) {
        throw new Error("Values not equal");
      }
      return;
    }
    if (Object.entries(a).length !== Object.entries(b).length) {
      throw new Error("Different number of key-value pairs");
    }
    Object.entries(a).forEach(([key, value]) => {
      deepEqual(value, b[key]);
    });
  } catch (e) {
    throw new Error(
      `Expected: \n${JSON.stringify(a, null, 2)}\nto equal: \n${JSON.stringify(
        b,
        null,
        2
      )}`
    );
  }
};
