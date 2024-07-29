import { Box, Modal } from "@suid/material";
import useTheme from "@suid/material/styles/useTheme";
import { createSignal } from "solid-js";
import "./InstructionModal.css";

export default function InstructionModal() {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  return (
    <div class="">
      <div onClick={handleOpen} class=" font-bold lg:hover:underline">
        INSTRUCTIONS
      </div>
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
            //shrinks with the screen

            p: 4,
          }}
        >
          {/* <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="gray"
          >
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="gray">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div class="basic-modal text-gray-500 flex flex-col gap-3 font-poppins">
            <h1 class="font-bold text-xl">How to Play</h1>
            <p>
              The is simple 2-player game based on a popular TikTok board game.
              The game randomizes a percentage by placing the score bar at a
              random point (4 being the center), and also generates a pair of
              antonyms. One player will then hide the score bar by clicking on
              it and say a phrase describing where it is (without using
              numbers). The other player will then assign the pointer to where
              he thinks the score bar is and then reveals the answer by clicking
              on it again.
            </p>
            <h1 class="font-bold text-base">Example</h1>
            <ol class="text-s font-sans list-disc">
              <li>
                Player 1 clicks <i>Randomize</i> and <i>Generate Words</i>
              </li>
              <li>
                The words are <i>"Hot"</i> and <i>"Cold"</i> and the 4 of the
                score bar is at the 100 mark/highest point.
              </li>
              <li>
                Player 1 hides the score bar and says <i>"The sun"</i>
              </li>
              <li>
                Player 2 assigns the pointer to 100% and reveals the answer,
                scoring 4 points.
              </li>
            </ol>
            <h1 class="font-bold text-xl">Buttons</h1>
            <h2 class="font-semibold">Randomize</h2>
            <p>
              {" "}
              This button randomizes the wavelength level and sets the pointer
              to the middle of the ruler.
            </p>
            <h2 class="font-semibold">Generate words</h2>
            <p>
              {" "}
              This button generates a random paired antonyms from the list of
              words.
            </p>
            <h2 class="font-semibold">Score bar and Ruler</h2>
            <p>
              {" "}
              You can click on both the score bar and the ruler to toggle the
              score display.
            </p>
            <h2 class="font-semibold text-xl">
              <a href="https://www.tiktok.com/@michael.dicostanzo/video/7330776298576514347?lang=en">
                Board game version
              </a>
            </h2>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
