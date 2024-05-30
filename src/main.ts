import fs from "fs";
import player from "play-sound";

const soundPlayer = player({
  player: "cvlc" as any, // Use VLC to play sounds
});

const MAX_SOUND_LENGTH_MS = 10 * 1000; // 10 seconds
async function playSound(sound: string) {
  console.log("Playing random sound");
  console.log(`Playing sound: ${sound}`);

  // Load sound file
  const soundPath = `${SOUND_DIRECTORY}/${sound}`;
  const process = soundPlayer.play(soundPath, (err) => {
    if (err) {
      console.error(`Failed to play sound: ${sound}`);
      throw err;
    }
  });

  await sleep(MAX_SOUND_LENGTH_MS);
  process.kill();
  console.log("Sound finished");
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

// const MIN_SLEEP_MS = 1000 * 10; // 10 seconds
const MIN_SLEEP_MS = 1000 * 60; // 1 minute
// const MAX_SLEEP_MS = 1000 * 20; // 20 seconds
const MAX_SLEEP_MS = 1000 * 60 * 3; // 3 minutes
function sleepRandomTime() {
  const sleepTime = Math.floor(
    Math.random() * (MAX_SLEEP_MS - MIN_SLEEP_MS) + MIN_SLEEP_MS
  );
  console.log(`Sleeping for ${sleepTime}ms`);
  return sleep(sleepTime);
}

const SOUND_DIRECTORY = "./sounds";
async function main() {
  // Load sound list from directory
  const soundList = await fs.promises.readdir(SOUND_DIRECTORY);
  console.log(soundList);

  let availableSounds = shuffleArray(soundList);
  console.log("initial shuffle order");
  console.log(availableSounds.reverse());
  availableSounds.reverse();
  while (true) {
    if (availableSounds.length === 0) {
      availableSounds = shuffleArray(soundList);
      console.log("new shuffle order");
      console.log(availableSounds.reverse());
      availableSounds.reverse();
    }
    const randomSound = availableSounds.pop() as string;
    await playSound(randomSound);

    await sleepRandomTime();
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
