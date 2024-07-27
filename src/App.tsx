import { createSignal, onCleanup } from "solid-js";
import "./App.css";
import { COMBINED } from "./constants/opposites";
import Ruler from "./components/Ruler";
function App() {
  const [level1, setLevel1] = createSignal(50 - 1);
  const [isDragging1, setIsDragging1] = createSignal(false);
  const [level2, setLevel2] = createSignal(50);
  const [isDragging2, setIsDragging2] = createSignal(false);
  const [isHidden, setIsHidden] = createSignal(false);
  const [words, setWords] = createSignal(["", ""]);

  const calculateScore = () => {
    const leftLevel = Math.round(level1()) + 1; // Get the level of the left slider
    // console.log("leftLevel", leftLevel);
    const rightLevel = Math.round(level2()); // Get the level of the right slider
    // console.log("rightLevel", rightLevel);
    let score = 0;
    const leftMoreThanRightBy = leftLevel - rightLevel;
    const size = 4;
    // const diff = Math.abs(leftMoreThanRightBy - size);
    if (
      leftMoreThanRightBy <= size / 2 &&
      leftMoreThanRightBy >= -size / 2 - 1
    ) {
      score = 4;
    } else if (
      leftMoreThanRightBy <= (size / 2) * 4 &&
      leftMoreThanRightBy >= (-size / 2) * 4
    ) {
      score = 3;
    } else if (
      leftMoreThanRightBy <= (size / 2) * 6 &&
      leftMoreThanRightBy >= (-size / 2) * 6
    ) {
      score = 2;
    }
    setIsHidden(false);

    console.log(`Score: ${score}`);
  };

  /**
   * The `randomize` function sets `Level1` to 49 and `Level2` to a random number between 0 and 99.
   */
  const randomize = () => {
    setLevel1(50 - 1);
    setLevel2(Math.floor(Math.random() * 100));
  };

  /**
   * The above code snippet includes functions for generating random words and handling mouse events in
   * a TypeScript React component.
   */
  const generateWords = () => {
    const randomIndex = Math.floor(Math.random() * COMBINED.length);
    setWords(COMBINED[randomIndex]);
  };

  const handleMouseDown1 = () => {
    setIsDragging1(true);
  };

  const handleMouseUp1 = () => {
    setIsDragging1(false);
  };

  /**
   * The function `handleMouseMove1` calculates a new level based on the vertical position of the mouse
   * or touch event relative to a slider element.
   * @param {MouseEvent | TouchEvent} event - The `event` parameter in the `handleMouseMove1` function
   * can be either a `MouseEvent` or a `TouchEvent`.
   * @remarks If the function `isDragging1()` returns false, the function `handleMouseMove1` will
   * return early and not execute the rest of the code. If the `slider` element is not found in the
   * document, the function will also return early. If both conditions are met, the function will
   * calculate a new level based on the mouse or touch event position and return that new level.
   */
  const handleMouseMove1 = (event: MouseEvent | TouchEvent) => {
    if (!isDragging1()) return;
    const slider = document.querySelector(".slider1");
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const clientY =
      (event as MouseEvent).clientY || (event as TouchEvent).touches[0].clientY;
    const offsetY = rect.bottom - clientY;
    const newLevel =
      Math.max(0, Math.min(100, (offsetY / rect.height) * 100)) - 1;
    setLevel1(newLevel);
  };

  const handleMouseDown2 = () => {
    setIsDragging2(true);
  };

  const handleMouseUp2 = () => {
    setIsDragging2(false);
  };

  /**
   * The function `handleMouseMove2` calculates a new level based on the vertical position of the mouse
   * or touch event relative to a slider element.
   * @param {MouseEvent | TouchEvent} event - The `event` parameter in the `handleMouseMove2` function
   * can be either a `MouseEvent` or a `TouchEvent`.
   * @remarks If the function `isDragging2()` returns false, the function `handleMouseMove2` will
   * return early and not execute the rest of the code. If `slider` is not found in the document, the
   * function will also return early. If both conditions are met, the function will calculate a new
   * level based on the mouse or touch event and return nothing explicitly (i.e., it does not have
   */
  const handleMouseMove2 = (event: MouseEvent | TouchEvent) => {
    if (!isDragging2()) return;
    const slider = document.querySelector(".slider2");
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const clientY =
      (event as MouseEvent).clientY || (event as TouchEvent).touches[0].clientY;
    const offsetY = rect.bottom - clientY;
    const newLevel = Math.max(0, Math.min(100, (offsetY / rect.height) * 100));
    setLevel2(newLevel);
  };

  document.addEventListener("mousemove", handleMouseMove1);
  document.addEventListener("mouseup", handleMouseUp1);
  document.addEventListener("mousemove", handleMouseMove2);
  document.addEventListener("mouseup", handleMouseUp2);
  document.addEventListener("touchmove", handleMouseMove1);
  document.addEventListener("touchend", handleMouseUp1);
  document.addEventListener("touchmove", handleMouseMove2);
  document.addEventListener("touchend", handleMouseUp2);
  onCleanup(() => {
    document.removeEventListener("mousemove", handleMouseMove1);
    document.removeEventListener("mouseup", handleMouseUp1);
    document.removeEventListener("mousemove", handleMouseMove2);
    document.removeEventListener("mouseup", handleMouseUp2);
    document.removeEventListener("touchmove", handleMouseMove1);
    document.removeEventListener("touchend", handleMouseUp1);
    document.removeEventListener("touchmove", handleMouseMove2);
    document.removeEventListener("touchend", handleMouseUp2);
  });

  return (
    <div class="fullscreen-container flex justify-between ">
      <div class="flex justify-center items-center flex-col relative gap-8 lg:flex-row mt-1">
        <div class="font-poppins flex flex-col gap-3 ">
          <button
            class=" border-gray-200 text-sm lg:text-xl"
            onClick={randomize}
          >
            Randomize
          </button>
          <button
            class=" border-gray-200 text-sm lg:text-xl"
            onClick={generateWords}
          >
            Generate Words
          </button>
          {/* <div class="font-sans font-extralight px-3 text-sm lg:text-m">
            Your words are:{" "}
            <div>
              <div class="font-poppins font-bold text-m lg:text-2xl">
                {words()[0] === "" ? "____" : words()[0]}
              </div>{" "}
              and{" "}
              <div class="font-poppins font-bold text-m lg:text-2xl">
                {words()[1] === "" ? "____" : words()[1]}
              </div>
            </div>
          </div> */}
        </div>
        <div class="flex flex-col space-y-10 items-center ">
          <div class="font-poppins text-s z-10 font-bold text-blue-600 lg:text-2xl">
            {words()[0] !== "" ? words()[0] : "_______"}
          </div>
          <div class={`flex flex-row space-x-2`}>
            <div class="slider1 relative w-10 h-80  rounded-lg">
              <div
                class="absolute left-0 right-0  rounded-lg"
                style={{ bottom: 0, height: `${level1()}%` }}
              ></div>
              <div
                class="absolute left-0 right-0 w-10 h-10  rounded-full cursor-pointer"
                style={{ bottom: `${level1()}%`, transform: "translateY(50%)" }}
                onMouseDown={handleMouseDown1}
                onTouchStart={handleMouseDown1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width={1.5}
                  stroke="currentColor"
                  class="size-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </div>
            </div>

            {!isHidden() ? (
              <div
                class="slider2 relative w-10 h-80 bg-gray-100 rounded-lg"
                onClick={() => setIsHidden(!isHidden())}
              >
                <div
                  class="absolute left-0 right-0  rounded-lg"
                  style={{ bottom: 0, height: `${level2()}%` }}
                ></div>
                <div
                  class="rightText absolute left-0 right-0 w-10 h-10 rounded-full cursor-pointer flex flex-col justify-center text-xs"
                  style={{
                    bottom: `${level2()}%`,
                    transform: "translateY(50%)",
                  }}
                  onMouseDown={handleMouseDown2}
                  onTouchStart={handleMouseDown2}
                >
                  <div class="bg-yellow-400 rounded-t-sm">2</div>
                  <div class="bg-orange-400">3</div>
                  <div class="bg-cyan-400">4</div>
                  <div class="bg-orange-400">3</div>
                  <div class="bg-yellow-400 rounded-b-sm">2</div>
                </div>
              </div>
            ) : (
              <div
                class="slider2 relative w-10 h-80 bg-gray-200 rounded-lg flex justify-center items-center text-gray-800 lg:hover:scale-110 font-semibold text-xs"
                onClick={calculateScore}
              >
                Score
              </div>
            )}
            <Ruler onClick={() => setIsHidden(!isHidden())} />
          </div>

          <div class="font-poppins text-s z-10 text-red-600 font-bold lg:text-2xl">
            {words()[1] !== "" ? words()[1] : "_______"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} class="logo" alt="Vite logo" />
//         </a>
//         <a href="https://solidjs.com" target="_blank">
//           <img src={solidLogo} class="logo solid" alt="Solid logo" />
//         </a>
//       </div>
//       <h1>Vite + Solid</h1>
//       <div class="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count()}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p class="read-the-docs">
//         Click on the Vite and Solid logos to learn more
//       </p>
//     </>
//   );
// }
