import { createSignal, onCleanup } from "solid-js";
import "./App.css";
import { OPPOSITES } from "./constants/opposites";

function App() {
  const [level1, setLevel1] = createSignal(50 - 3);
  const [isDragging1, setIsDragging1] = createSignal(false);
  const [level2, setLevel2] = createSignal(50);
  const [isDragging2, setIsDragging2] = createSignal(false);
  const [isHidden, setIsHidden] = createSignal(false);
  const [words, setWords] = createSignal(["", ""]);

  const generateWords = () => {
    const randomIndex = Math.floor(Math.random() * OPPOSITES.length);
    setWords(OPPOSITES[randomIndex]);
  };

  const handleMouseDown1 = () => {
    setIsDragging1(true);
  };

  const handleMouseUp1 = () => {
    setIsDragging1(false);
  };

  // const addThree = (num: number) => {
  //   return num + 3;
  // };

  const handleMouseMove1 = (event: MouseEvent) => {
    if (!isDragging1()) return;
    const slider = document.querySelector(".slider1");
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const offsetY = rect.bottom - event.clientY;
    const newLevel =
      Math.max(0, Math.min(100, (offsetY / rect.height) * 100)) - 3;
    setLevel1(newLevel);
  };

  const handleMouseDown2 = () => {
    setIsDragging2(true);
  };

  const handleMouseUp2 = () => {
    setIsDragging2(false);
  };

  const handleMouseMove2 = (event: MouseEvent) => {
    if (!isDragging2()) return;
    const slider = document.querySelector(".slider2");
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const offsetY = rect.bottom - event.clientY;
    const newLevel = Math.max(0, Math.min(100, (offsetY / rect.height) * 100));
    setLevel2(newLevel);
  };

  document.addEventListener("mousemove", handleMouseMove1);
  document.addEventListener("mouseup", handleMouseUp1);
  document.addEventListener("mousemove", handleMouseMove2);
  document.addEventListener("mouseup", handleMouseUp2);
  onCleanup(() => {
    document.removeEventListener("mousemove", handleMouseMove1);
    document.removeEventListener("mouseup", handleMouseUp1);
    document.removeEventListener("mousemove", handleMouseMove2);
    document.removeEventListener("mouseup", handleMouseUp2);
  });

  // const calculateScore = () => {
  //   const leftLevel = addThree(Math.round(level1())); // Get the level of the left slider
  //   const rightLevel = Math.round(level2()); // Get the level of the right slider
  //   let score = 0;
  //   const leftMoreThanRightBy = leftLevel - rightLevel;
  //   if (leftMoreThanRightBy > 15) {
  //     score = 0;
  //   } else if (leftMoreThanRightBy > 9 && leftMoreThanRightBy <= 15) {
  //     score = 2;
  //   } else if (leftMoreThanRightBy > 3 && leftMoreThanRightBy <= 9) {
  //     score = 3;
  //   } else if (leftMoreThanRightBy > -4 && leftMoreThanRightBy <= 3) {
  //     score = 4;
  //   } else if (leftMoreThanRightBy > -10 && leftMoreThanRightBy <= -4) {
  //     score = 3;
  //   } else if (leftMoreThanRightBy > -16 && leftMoreThanRightBy <= -10) {
  //     score = 2;
  //   } else if (leftMoreThanRightBy <= -16) {
  //     score = 0;
  //   }
  //   return score;
  // };

  return (
    <div class="flex justify-between">
      <div class="flex flex-row justify-center items-center relative gap-20">
        <div class="font-poppins flex flex-col gap-1">
          <button
            class="bg-white border-gray-200 hover:bg-gradient-to-r from-orange-100 to-slate-50"
            onClick={() => setIsHidden(!isHidden())}
          >
            {isHidden() ? "Show" : "Hide"}
          </button>
          {/* <button class="bg-white" onClick={calculateScore}>
            Score{" "}
          </button> */}
          <button
            class="bg-white border-gray-200 hover:bg-gradient-to-r from-orange-100 to-slate-50"
            onClick={generateWords}
          >
            Generate Words!
          </button>
          {words() && words()[0] != "" && words()[1] != "" && (
            <div class="font-poppins px-3">
              Your words are:{" "}
              <div>
                <div class="font-poppins font-bold text-xl">{words()[0]}</div>{" "}
                and{" "}
                <div class="font-poppins font-bold text-xl">{words()[1]}</div>
              </div>
            </div>
          )}
        </div>

        <div class={`flex`}>
          <div class="slider1 relative w-10 h-64  rounded-lg">
            <div
              class="absolute left-0 right-0  rounded-lg"
              style={{ bottom: 0, height: `${level1()}%` }}
            ></div>
            <div
              class="absolute left-0 right-0 w-10 h-10  rounded-full cursor-pointer"
              style={{ bottom: `${level1()}%`, transform: "translateY(50%)" }}
              onMouseDown={handleMouseDown1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={1.5}
                stroke="currentColor"
                class="size-6"
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
            <div class="slider2 relative w-10 h-64 bg-gray-300 rounded-lg">
              <div
                class="absolute left-0 right-0  rounded-lg"
                style={{ bottom: 0, height: `${level2()}%` }}
              ></div>
              <div
                class="rightText absolute left-0 right-0 w-10 h-10 rounded-full cursor-pointer flex flex-col justify-center text-xs"
                style={{ bottom: `${level2()}%`, transform: "translateY(50%)" }}
                onMouseDown={handleMouseDown2}
              >
                <div class="bg-yellow-500">2</div>
                <div class="bg-orange-500">3</div>
                <div class="bg-cyan-500">4</div>
                <div class="bg-orange-500">3</div>
                <div class="bg-yellow-500">2</div>
              </div>
            </div>
          ) : (
            <div class="slider2 relative w-10 h-64 bg-gray-300 rounded-lg"></div>
          )}
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
