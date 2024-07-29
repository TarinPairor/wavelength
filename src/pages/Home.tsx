import { AppBar } from "@suid/material";
import InstructionModal from "../components/InstructionModal";
import "./Home.css";
import MenuIcon from "@suid/icons-material/Menu";
import { Modal } from "@suid/material";
import useTheme from "@suid/material/styles/useTheme";
import { createSignal } from "solid-js";
import { Box, IconButton, Toolbar } from "@suid/material";

function Home() {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const [isRandomAdjectives, setIsRandomAdjectives] = createSignal(false);
  const [isOriginalWords, setIsOriginalWords] = createSignal(true);
  const [isDisplayScore, setIsDisplayScore] = createSignal(false);

  const gameUrl = () => {
    const params = new URLSearchParams({
      randomAdjectives: isRandomAdjectives().toString(),
      originalWords: isOriginalWords().toString(),
      displayScore: isDisplayScore().toString(),
    });
    return `/game?${params.toString()}`;
  };

  const MainAppBar = () => {
    return (
      <div class="">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleOpen}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Modal
            open={open()}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: theme.palette.background.paper,
                border: "2px solid #000",
                boxShadow: "24px",
                width: "80%",
                p: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div class="font-poppins text-xs flex flex-col items-center gap-8">
                <h2 class="text-gray-500 font-bold mb-3 text-2xl">Settings</h2>
                <div class="flex gap-5">
                  <button
                    class={
                      isRandomAdjectives() ? "bg-slate-700 text-gray-200" : ""
                    }
                    onClick={() => setIsRandomAdjectives(!isRandomAdjectives())}
                  >
                    Random Adjectives
                  </button>
                  <button
                    class={
                      isOriginalWords() ? "bg-slate-700 text-gray-200" : ""
                    }
                    onClick={() => setIsOriginalWords(!isOriginalWords())}
                  >
                    Original Words
                  </button>
                </div>
                <div class="flex gap-5">
                  <button
                    class={isDisplayScore() ? "bg-slate-700 text-gray-200" : ""}
                    onClick={() => setIsDisplayScore(!isDisplayScore())}
                  >
                    Display Score
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </Box>
      </div>
    );
  };

  return (
    <div class="home flex justify-center items-center">
      <div>
        <div class="">
          <MainAppBar />
        </div>
        <div class="flex justify-center items-center h-screen w-screen font-poppins md:text-white ">
          <div class="flex flex-col items-center space-y-2 mt-[90px]">
            <h1 class="text-3xl font-extrabold">Welcome to</h1>
            <h1 class="text-4xl font-bold md:text-transparent">WAVELENGTH</h1>
            <p class="text-xl font-bold mt-5">
              Are you on the same wavelength? Find out here.
            </p>
            <div class="lg:text-xl sm:text-base flex font-sans">
              Click here for&nbsp;
              <InstructionModal />
            </div>

            <a
              href={gameUrl()}
              class="mt-5 text-2xl font-semibold bg-black text-white px-5 py-2 rounded-lg"
            >
              Start Game
            </a>
          </div>
        </div>
      </div>

      <div class="footer">
        <p class="text-sm">
          Connect with me on{" "}
          <a
            href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 underline"
          >
            Here
          </a>
          {""}
          {/* and{" "}
          <a
            href="https://github.com/your-github-profile"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 underline"
          >
            GitHub
          </a> */}
          .
        </p>
      </div>
    </div>
  );
}

export default Home;
