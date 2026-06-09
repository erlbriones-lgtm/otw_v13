import fs from "fs";
import https from "https";
import { execSync } from "child_process";

// Step 1: Fetch LFS URL
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
        } catch (e) {
          console.error("JSON parse error:", e);
        }
        resolve(null);
      });
    });

    req.on("error", (e) => {
      console.error("LFS API call error:", e);
      resolve(null);
    });

    req.write(data);
    req.end();
  });
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Downloading from direct LFS source: ${url.substring(0, 100)}...`);
    const file = fs.createWriteStream(dest);
    
    // Follow redirect if standard https node get doesn't do it automatically
    function get(targetUrl: string) {
      https.get(targetUrl, (response) => {
        if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          get(response.headers.location);
          return;
        }
        
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${targetUrl}' (${response.statusCode})`));
          return;
        }

        const totalSize = parseInt(response.headers['content-length'] || "0", 10);
        let downloaded = 0;
        let lastLoggedPercent = -10;

        response.on('data', (chunk) => {
          downloaded += chunk.length;
          const percent = Math.floor((downloaded / totalSize) * 100);
          if (percent >= lastLoggedPercent + 10) {
            console.log(`Download progress: ${percent}% (${(downloaded / 1024 / 1024).toFixed(1)} MB / ${(totalSize / 1024 / 1024).toFixed(1)} MB)`);
            lastLoggedPercent = percent;
          }
        });

        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log("Download finished successfully.");
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

function optimize() {
  const originalFile = "./temp/original_saulog.mp4"; // Target temp file
  const webmDest = "./temp/webm/saulog.webm"; // Symmetrical resolution webm
  const mp3Dest = "./audio/SAULOG AVP 2026 V3.mp3"; // Symmetrical mp3 audio file
  
  // Ensure we can fetch and download
  getLfsVideoUrl().then(async (url) => {
    if (!url) {
      console.error("Could not obtain LFS URL!");
      process.exit(1);
    }
    
    fs.mkdirSync("./temp/webm", { recursive: true });
    fs.mkdirSync("./audio", { recursive: true });

    // Download original to temporary storage if it doesn't exist
    if (!fs.existsSync(originalFile) || fs.statSync(originalFile).size < 100000) {
      console.log("Downloading saulog source video...");
      await downloadFile(url, originalFile);
    } else {
      console.log("Original video source already downloaded.");
    }

    // Inspect the original video attributes via ffprobe
    try {
      console.log("--- Original Video Info ---");
      console.log(execSync(`ffmpeg -i ${originalFile} 2>&1`).toString());
    } catch(err: any) {
      console.log(err.stdout?.toString() || err.message);
    }

    // Process a lightweight WebM with resolution 1280x720 (720p) or 854x480 (480p)
    // 720p is extremely sharp but plays beautifully. Let's do a fast VP9 encode.
    // If VP9 encoding is too slow on single core, we can do `-c:v libvpx` (VP8) or standard fast presets.
    // We want the file to be under 15MB instead of 417MB! Let's compress with VP9.
    console.log("Starting WebM optimization to 720p, high performance, high compression...");
    try {
      fs.unlinkSync(webmDest);
    } catch(e){}

    // Run ffmpeg process: 720p scale, crf 33 (good balance), high speed, 1M target bitrate
    // -c:v libvpx-vp9 -b:v 1M -crf 33 -quality good -speed 4 -c:a libopus
    // This will create an incredible, highly optimized 15-20MB WebM asset!
    const cmdWebm = `ffmpeg -y -i ${originalFile} -vf "scale=-2:720" -c:v libvpx-vp9 -b:v 1M -crf 33 -quality good -speed 4 -c:a libopus -b:a 96k -row-mt 1 ${webmDest}`;
    console.log(`Executing: ${cmdWebm}`);
    execSync(cmdWebm, { stdio: "inherit" });
    
    console.log("WebM optimized and written successfully!");
    console.log(`Optimized WebM file size: ${(fs.statSync(webmDest).size / 1024 / 1024).toFixed(2)} MB`);

    // ALSO: Ensure that we extract and optimize the background audio track to a super lightweight MP3!
    // If the audio track doesn't exist or is currently low bitrate, let's export it nicely.
    console.log("Starting Audio track extraction to MP3 for instant loading...");
    try {
      fs.unlinkSync(mp3Dest);
    } catch(e){}
    
    const cmdAudio = `ffmpeg -y -i ${originalFile} -vn -c:a libmp3lame -q:a 4 ${mp3Dest}`;
    console.log(`Executing: ${cmdAudio}`);
    execSync(cmdAudio, { stdio: "inherit" });
    console.log(`Optimized MP3 file size: ${(fs.statSync(mp3Dest).size / 1024 / 1024).toFixed(2)} MB`);

    console.log("🎉 ALL ASSETS HAVE BEEN FULLY OPTIMIZED AND RESTORED FOR THE WEB!");
  }).catch((err) => {
    console.error("Optimization failed:", err);
  });
}

optimize();
