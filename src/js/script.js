const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input_color");
const tools = document.querySelectorAll(".button_tool");
const sizeButtons = document.querySelectorAll(".button_size");
const buttonClear = document.querySelector(".button_Clear");

let brushSize = 20;

let isPainting = false;

let activeTool = "brush";

/* Encontrar inconsistência no código ??? */
inputColor.addEventListener("change", ({ target }) => {
  ctx.fillStyle = target.value;
});

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
  isPainting = true;

  if (activeTool == "brush") {
    draw(clientX, clientY);
  }  

  if (activeTool == "rubber") {
    erase(clientX, clientY);
  }
});

/* Função de mover o Mouse */
canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (isPainting) {
    if (activeTool == "brush") {
      draw(clientX, clientY);
    }

    if (activeTool == "rubber") {
      erase(clientX, clientY);
    }
  }
});

canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
  isPainting = false;
});

/* Função Desenhar */
const draw = (x, y) => {
  ctx.globalCompositeOperation = "source-over";
  ctx.beginPath();
  ctx.arc(
    x - canvas.offsetLeft,
    y - canvas.offsetTop,
    brushSize / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
};

/* Função Apagar */
const erase = (x, y) => {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(
    x - canvas.offsetLeft,
    y - canvas.offsetTop,
    brushSize / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
};

/* Função de selecionar a ferramenta e atualizar o valor da variável */
const selecTool = ({ target }) => {
  const selectedTool = target.closest("button");
  const action = selectedTool.getAttribute("data-action");

  if (action) {
    tools.forEach((tool) => tool.classList.remove("active"));
    selectedTool.classList.add("active");
    activeTool = action;
  }
};
const selecSize = ({ target }) => {
  const selectedTool = target.closest("button");
  const size = selectedTool.getAttribute("data-size");

  sizeButtons.forEach((tool) => tool.classList.remove("active"));
  selectedTool.classList.add("active");
  brushSize = size;
};

tools.forEach((tool) => {
  tool.addEventListener("click", selecTool);
});

sizeButtons.forEach((button) => {
  button.addEventListener("click", selecSize);
});

buttonClear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
