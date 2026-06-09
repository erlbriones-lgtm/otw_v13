import fs from "fs";
import https from "https";
import { exec } from "child_process";

const LOG_FILE = "./transcode.log";

function log(msg: string) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line);
  console.log(msg);
}

fs.writeFileSync(LOG_FILE, `--- Optimization Task Initiated ---\n`);

async function getLfsVideoUrl(): Promise<string | null> {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      operation: "download",
      transfers: ["basic"],
      ref: { name: "refs/heads/main" },
      objects: [
        {
          oid: "3a25339be034f41f02dc1b5c8be62e45298f251ee3d6970897e5b3e5aaa866ce",
          size: 417441336
        }
      ]
    });

    const options = {
      hostname: "github.com",
      path: "/erlbriones-lgtm/otw_v12.git/info/lfs/objects/batch",
      method: "POST",
      headers: {
        "Accept": "application/vnd.git-lfs+json",
        "Content-Type": "application/vnd.git-lfs+json",
        "Content-Length": data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        try {
          if (res.statusCode === 200) {
            const parsed = JSON.parse(body);
            const href = parsed.objects?.[0]?.actions?.download?.href;
            if (href) {
              resolve(href);
              return;
            }
          }
          log(`LFS API responded with status ${res.statusCode}: ${body}`);
        } catch (e: any) {
          log(`JSON parse error in LFS response: ${e.message}`);
        }
        resolve(null);
      });
    });

    req.on("error", (e) => {
      log(`LFS API network error: ${e.message}`);
      resolve(null);
    });

    req.write(data);
    req.end();
  });
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    log(`Downloading original video to ${dest}...`);
    const file = fs.createWriteStream(dest);
    
    function get(targetUrl: string) {
      https.get(targetUrl, (response) => {
        if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          get(response.headers.location);
          return;
        }
        
        if (response.statusCode !== 200) {
          reject(new Error(`Server returned HTTP ${response.statusCode}`));
          return;
        }

        const totalSize = parseInt(response.headers['content-length'] || "0", 10);
        let downloaded = 0;
        let lastPercent = -5;

        response.on('data', (chunk) => {
          downloaded += chunk.length;
          const percent = Math.floor((downloaded / totalSize) * 100);
          if (percent >= lastPercent + 5) {
            log(`Download Progress: ${percent}% (${(downloaded / 1024 / 1024).toFixed(1)} / ${(totalSize / 1024 / 1024).toFixed(1)} MB)`);
            lastPercent = percent;
          }
        });

        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          log("Download complete!");
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }

    get(url);
  });
}

function runCmd(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    log(`Running command: ${cmd}`);
    exec(cmd, (error, stdout, stderr) => {
      if (stderr) {
        log(`[Stderr] ${stderr}`);
      }
      if (error) {
        log(`[Error] Command failed with code ${error.code}`);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function main() {
  try {
    const originalFile = "./temp/original_saulog.mp4";
    const webmDest = "./temp/webm/saulog.webm";
    const mp3Dest = "./audio/SAULOG AVP 2026 V3.mp3";

    fs.mkdirSync("./temp/webm", { recursive: true });
    fs.mkdirSync("./audio", { recursive: true });

    // Clean up potentially corrupt file
    if (fs.existsSync(originalFile)) {
      const stats = fs.statSync(originalFile);
      // If smaller than 400MB, it is definitely partial/corrupt
      if (stats.size < 400_000_000) {
        log(`Deleting corrupt existing source file (${(stats.size / 1024 / 1024).toFixed(1)} MB)`);
        fs.unlinkSync(originalFile);
      }
    }

    if (!fs.existsSync(originalFile)) {
      const url = await getLfsVideoUrl();
      if (!url) {
        throw new Error("Could not check LFS URL.");
      }
      await downloadFile(url, originalFile);
    } else {
      log("Valid original source video found in cache.");
    }

    log("Starting video transcoding to highly-optimized web standards...");
    
    // We transcode to:
    // - Format: WebM
    // - Video codec: libvpx (VP8 is incredibly fast to encode compared to VP9, taking less than 20-30 seconds instead of minutes!)
    // - Audio: completely stripped (`-an`) because audio is served instantly via MP3 separately!
    // - Frame rate: 24 FPS (`-r 24`) for movie-like cinematic speed
    // - Size/Resolution: 640x360 or 854x480. Let's do 640x360 for ambient background which is extremely optimized, lightweight (around 6-9MB total!), and buttery smooth on any hardware! Or let's use 854x480 which is absolutely perfect for displays. Let's use `-vf "scale=-2:480"`!
    // - Bitrate: 600K target, extremely fast encoding configurations (`-speed 8 -cpu-used 8 -deadline realtime`)
    log("Running ffmpeg WebM VP8 compression...");
    
    if (fs.existsSync(webmDest)) {
      fs.unlinkSync(webmDest);
    }

    await runCmd(`ffmpeg -y -i ${originalFile} -vf "scale=-2:480,fps=24" -c:v libvpx -b:v 650k -crf 38 -speed 8 -cpu-used 8 -deadline realtime -an ${webmDest}`);
    log(`Successfully generated optimized WebM! File size: ${(fs.statSync(webmDest).size / 1024 / 1024).toFixed(2)} MB`);

    log("Extracting high quality optimized background audio to MP3...");
    if (fs.existsSync(mp3Dest)) {
      fs.unlinkSync(mp3Dest);
    }
    
    await runCmd(`ffmpeg -y -i ${originalFile} -vn -c:a libmp3lame -q:a 4 ${mp3Dest}`);
    log(`Successfully generated optimized MP3! File size: ${(fs.statSync(mp3Dest).size / 1024 / 1024).toFixed(2)} MB`);

    log("🧹 Cleaning up raw 400MB temporary file to conserve disk space...");
    try {
      if (fs.existsSync(originalFile)) {
        fs.unlinkSync(originalFile);
        log("Raw file deleted successfully.");
      }
    } catch (e: any) {
      log(`Could not delete raw file: ${e.message}`);
    }

    log("🎉 ALL MEDIA COMPRESSION & OPTIMIZATION COMPLETED SUCCESSFULLY!");
  } catch (err: any) {
    log(`❌ Task error: ${err.message}`);
  }
}

main();
