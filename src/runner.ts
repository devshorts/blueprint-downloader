import youtubedl from 'youtube-dl';
import { log } from "./log";
import { MultiProgress, MultiProgressInstance, randomSpinner, spinners } from "paradox-multi-spinner/lib";

interface Loader {
  url: string;
  outputName: string
}

export async function download(loader: Loader): Promise<void> {
  const p = new Promise((r, e) => {
    youtubedl.exec(
      loader.url,
      ['--output', loader.outputName + '.%(ext)s', '--ffmpeg-location', require('ffmpeg-static')],
      {},
      (err, output) => {
        if (err) {
          log.error(err);
          e(err);
        } else r();
      }
    );
  });

  const instance = new MultiProgressInstance(
    "Downloading " + loader.url + ", please wait",
    spinners.dots.frames
  ).attachTo(p);

  const progress = new MultiProgress()

  progress.addProgress(instance)
  progress.start()

  await p

  progress.stop()
}
