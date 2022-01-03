const form = document.querySelector("form");
const resultContainer = document.querySelector(".result");

form.addEventListener("submit", displayResult);

class Animal {
  constructor(sound) {
    this.sound = sound;
  }

  speak(message) {
    const result = message
      .split(" ")
      .map((word) => `${word} ${this.sound}`)
      .join(" ");
    return result;
  }
}

class Lion extends Animal {
  constructor() {
    super("roar");
  }
}

class Tiger extends Animal {
  constructor() {
    super("grr");
  }
}

class Monkey extends Animal {
  constructor() {
    super("ooh aah");
  }
}

class Snake extends Animal {
  constructor() {
    super("sss");
  }
}

class Owl extends Animal {
  constructor() {
    super("hoot hoot");
  }
}

class Cow extends Animal {
  constructor() {
    super("moo");
  }
}

class Pig extends Animal {
  constructor() {
    super("oink");
  }
}

const animals = {
  lion: new Lion(),
  tiger: new Tiger(),
  monkey: new Monkey(),
  snake: new Snake(),
  owl: new Owl(),
  cow: new Cow(),
  pig: new Pig(),
};

function displayResult(event) {
  event.preventDefault();

  const message = document.getElementById("animalMessage").value;

  const checkedNodes = document.querySelectorAll(
    ".animals input[type=checkbox]:checked"
  );

  let selectedAnimals = [];

  for (let node of checkedNodes) {
    selectedAnimals.push(node.name);
  }

  resultContainer.innerHTML = "";

  for (let animal of selectedAnimals) {
    resultContainer.innerHTML +=
      "<p>" + animal + " says: " + animals[animal].speak(message) + "</p>";
  }

  resultContainer.style.opacity = 1;
}
