import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";
import https from "https";

dotenv.config();

const app = express();
const PORT = 3000;
const HOST = process.env.HOST || "127.0.0.1";

app.use(express.json());

// Lazy-initialized Gemini Client
let gClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Graceful fallback if API key is not set
    return null;
  }
  if (!gClient) {
    gClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return gClient;
}

// API Route: Cultural & Concierge Companion "Sikatuna AI"
app.post("/api/tourism-companion", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Expected an array." });
    }

    const ai = getGemini();
    if (!ai) {
      // Elegant mocked fallback responses if Gemini key is missing
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let mockReply = "Welcome to Tagbilaran, the City of Peace and Friendship! I am Sikatuna AI, your heritage assistant. I am standing by using our offline reserve database. How may I guide you through our historic landmarks, clay pottery arts, and creative industries today?";
      
      if (lastUserMsg.includes("sandugo") || lastUserMsg.includes("blood compact") || lastUserMsg.includes("friendship")) {
        mockReply = "The Sandugo, or official Blood Compact, took place on March 16, 1565 between Datu Sikatuna and Spanish explorer Miguel López de Legazpi in Bohol, Tagbilaran. It was a solemn pact establishing peace and friendship. Today, we elevate this heritage into a creative canvas of modern culinary arts, theater, and digital design!";
      } else if (lastUserMsg.includes("global") || lastUserMsg.includes("creative") || lastUserMsg.includes("clay") || lastUserMsg.includes("art")) {
        mockReply = "Tagbilaran is flourishing with global creative city initiatives. We are particularly famous for our ancient clay pottery traditions (such as the traditional pottery in Manga and Dampas districts) and our vibrant young community of digital creators, fiber artisans, and modern musicians.";
      } else if (lastUserMsg.includes("landmark") || lastUserMsg.includes("place") || lastUserMsg.includes("visit")) {
        mockReply = "I highly recommend visiting: \n1. Modernized Heritage District / Tagbilaran City Hall\n2. St. Joseph the Worker Cathedral (dating back to 1724 with beautiful ceiling frescos)\n3. The Bohol Sandugo Shrine with its majestic overlooking view of the Bohol Sea\n4. Our creative hubs and pottery sheds in Manga, showcasing authentic Bohol pottery.";
      }
      return res.json({ text: mockReply });
    }

    // Format historical messages for chat
    const formattedPrompt = messages.map(m => `${m.role === "user" ? "User" : "Sikatuna AI"}: ${m.content}`).join("\n");
    const systemPrompt = `You are "Sikatuna AI", the official cultural concierge and heritage ambassador for the Tagbilaran City Tourism Web Platform. 
Your tone must be authoritative, poetic, globally sophisticated, and deeply hospitable, worthy of a recognized city of "Peace and Friendship."
Ensure every response features vivid, elegant local details, celebrating Tagbilaran's creative scene:
* Historic Blood Compact (Sandugo) in Barangay Bool in 1565.
* Our ancient clay craft roots (banga and clay pottery in Manga and Dampas districts).
* Beautiful colonial architecture, like the St. Joseph the Worker Cathedral.
* Creative communities merging traditional design with technology (digital art, eco architecture).
* Refined food scene, merging traditional Bol ano delicacies like Calamay with contemporary gastronomy.

Respond directly and concisely in markdown format without any bullet dots with hyphens. Keep answers beautiful and rich with substance. Avoid larping metadata or system logs.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({ text: result.text || "" });
  } catch (error: any) {
    console.error("Gemini companion error:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});

// API Route: Local weather & creative telemetry
app.get("/api/local-status", (req, res) => {
  // Philippine Standard Time is UTC+8
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const pstTime = new Date(utc + (3600000 * 8));
  
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  
  const alerts = [
    { id: 1, type: "Global Initiative", text: "Tagbilaran Crafts & Folk Art portfolio reviewed by the National Commission for Culture and the Arts." },
    { id: 2, type: "Heritage Restorations", text: "Preservation works are officially complete at the iconic St. Joseph Cathedral plaza." },
    { id: 3, type: "Artisan Sync", text: "Manga District pottery collective holds live terracotta pottery wheel showcase this Saturday." }
  ];

  res.json({
    time: formatter.format(pstTime),
    timezone: "PST (UTC+8)",
    weather: {
      temperature: 31,
      humidity: 74,
      condition: "Gentle Coastal Breeze",
      description: "Partly cloudy with warm tropical golden sunlight",
      windSpeed: "12 km/h"
    },
    alerts
  });
});

// API Route: Dynamic local music scanner for audio folder (falling back to Tagbeats.mp3)
app.get("/api/music-files", (req, res) => {
  let musicDir = path.join(process.cwd(), "audio");
  let urlPrefix = "/audio";
  
  if (!fs.existsSync(musicDir)) {
    musicDir = path.join(process.cwd(), "Tagbeats.mp3");
    urlPrefix = "/Tagbeats.mp3";
    
    if (!fs.existsSync(musicDir)) {
      return res.json([]);
    }
  }

  try {
    const isDir = fs.statSync(musicDir).isDirectory();
    if (!isDir) {
      const stats = fs.statSync(musicDir);
      const sizeMb = (stats.size / (1024 * 1024)).toFixed(2) + " MB";
      return res.json([{
        id: "music-track-1",
        title: "Tagbilaran Friendship Beats",
        fileName: path.basename(musicDir),
        url: urlPrefix,
        artist: "Tagbilaran Cultural Ensembles",
        duration: "2:15",
        category: "Official Trailer",
        fileSize: sizeMb
      }]);
    }

    const files = fs.readdirSync(musicDir);
    // Find all valid audio files
    const audioFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === ".mp3" || ext === ".wav" || ext === ".m4a" || ext === ".ogg";
      })
      .map((file, idx) => {
        const filePath = path.join(musicDir, file);
        const stats = fs.statSync(filePath);
        const sizeMb = (stats.size / (1024 * 1024)).toFixed(2) + " MB";

        const nameWithoutExt = path.basename(file, path.extname(file));
        const friendlyTitle = nameWithoutExt
          .replace(/[-_()]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/\b\w/g, c => c.toUpperCase());

        let defaultDuration = "2:15";
        let defaultMood = "Official Trailer";

        console.log(`[Music Scanner] Found track: ${file}, Size: ${stats.size} bytes (${sizeMb})`);

        return {
          id: `music-track-${idx + 1}`,
          title: friendlyTitle,
          fileName: file,
          url: `${urlPrefix}/${encodeURIComponent(file)}`,
          artist: "Tagbilaran Cultural Ensembles",
          duration: defaultDuration,
          category: defaultMood,
          fileSize: sizeMb
        };
      });

    res.json(audioFiles);
  } catch (err: any) {
    console.error("Failed to read audio folder dynamically:", err);
    res.status(500).json({ error: "Failed to read track folder." });
  }
});

// API Route: Secure and reliable file downloads
app.get("/api/download", (req, res) => {
  const fileName = req.query.file as string;
  if (!fileName) {
    return res.status(400).json({ error: "Filename is required" });
  }

  // Prevent directory traversal attacks
  const safeFileName = path.basename(fileName);
  const filePath = path.join(process.cwd(), "Downloadables", safeFileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  // Set response headers securely & robustly for different formats
  const lowerName = safeFileName.toLowerCase();
  if (lowerName.endsWith(".xlsx")) {
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  } else if (lowerName.endsWith(".csv")) {
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
  } else {
    res.setHeader("Content-Type", "application/octet-stream");
  }

  // Send the file using Express's res.download which handles Content-Disposition properly
  res.download(filePath, safeFileName, (err) => {
    if (err) {
      console.error("File download error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download file" });
      }
    }
  });
});

// Git LFS dynamic media path resolver for high performance direct cloud streaming with TTL cache
let cachedLfsUrl: string | null = null;
let cachedLfsExpiry = 0;

async function getLfsVideoUrl(): Promise<string | null> {
  const now = Date.now();
  if (cachedLfsUrl && now < cachedLfsExpiry) {
    return cachedLfsUrl;
  }

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
              cachedLfsUrl = href;
              // Cache for 45 minutes (2700 seconds) to be safely under the 1-hour expiry
              cachedLfsExpiry = Date.now() + 2700 * 1000;
              resolve(href);
              return;
            }
          }
        } catch (e) {
          console.error("JSON parse error in LFS fetch:", e);
        }
        resolve(null);
      });
    });

    req.on("error", (e) => {
      console.error("LFS fetch HTTP request error:", e);
      resolve(null);
    });

    req.write(data);
    req.end();
  });
}

// Proxy the video file directly supporting HTTP Range requests to allow perfect scrubbing and bypass iframe CORS restrictions
app.get([
  "/temp/webm/saulog.webm",
  "/audio/webm/SAULOG AVP 2026 V3.webm",
  "/audio/webm/SAULOG%20AVP%202026%20V3.webm"
], async (req, res) => {
  try {
    const localWebmPath = path.join(process.cwd(), "temp", "webm", "saulog.webm");
    if (fs.existsSync(localWebmPath)) {
      const stats = fs.statSync(localWebmPath);
      if (stats.size > 1000000) { // Valid file greater than 1MB
        console.log(`[Local Media] Serving optimized cached WebM file directly (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
        res.setHeader("Content-Type", "video/webm");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
        return res.sendFile(localWebmPath);
      }
    }

    const lfsUrl = await getLfsVideoUrl();
    if (lfsUrl) {
      console.log("[LFS Redirect] Redirecting dynamic video request directly to Git LFS raw resource for high-speed hardware decoding");
      res.redirect(302, lfsUrl);
    } else {
      console.error("[LFS Redirect] LFS URL lookup failed, falling back to 404.");
      res.status(404).send("LFS media file not available.");
    }
  } catch (error) {
    console.error("[LFS Redirect] Exceptional failure in video router:", error);
    res.status(500).send("Error handling video stream redirect.");
  }
});

// Serve static assets or set up Vite middleware
async function start() {
  // Automatically download missing assets from GitHub repository trying multiple folder candidate paths
  app.get(["/webp/:filename", "/temp/:filename"], async (req, res, next) => {
    const filename = req.params.filename;
    if (!filename) return next();
    const lowerFilename = filename.toLowerCase();

    // Skip video or audio files managed by dedicated handlers
    if (lowerFilename.endsWith(".webm") || lowerFilename.endsWith(".mp3") || lowerFilename.endsWith(".mp4")) {
      return next();
    }

    const isTempReq = req.path.startsWith("/temp");
    const targetPath = isTempReq
      ? path.join(process.cwd(), "temp", filename)
      : path.join(process.cwd(), "public", "webp", filename);

    if (fs.existsSync(targetPath)) {
      return next();
    }

    const candidateUrls = [
      `https://raw.githubusercontent.com/erlbriones-lgtm/otw_v12/main/public/webp/${encodeURIComponent(filename)}`,
      `https://raw.githubusercontent.com/erlbriones-lgtm/otw_v12/main/temp/${encodeURIComponent(filename)}`,
      `https://raw.githubusercontent.com/erlbriones-lgtm/otw_v12/main/src/data/webp/${encodeURIComponent(filename)}`,
      `https://raw.githubusercontent.com/erlbriones-lgtm/otw_v12/main/Downloadables/webp/${encodeURIComponent(filename)}`,
      `https://raw.githubusercontent.com/erlbriones-lgtm/otw_v12/main/public/temp/${encodeURIComponent(filename)}`,
      `https://raw.githubusercontent.com/erlbriones-lgtm/otw_v12/main/public/${encodeURIComponent(filename)}`,
      `https://raw.githubusercontent.com/erlbriones-lgtm/otw_v12/main/${encodeURIComponent(filename)}`
    ];

    console.log(`[Auto-Download] Missing asset detected: ${filename}. Initiating cascading search on GitHub repository...`);

    const downloadSequentially = (index: number) => {
      if (index >= candidateUrls.length) {
        console.error(`[Auto-Download] All GitHub paths failed for ${filename}`);
        return next();
      }

      const url = candidateUrls[index];
      https.get(url, (gitRes) => {
        if (gitRes.statusCode === 200) {
          fs.mkdirSync(path.dirname(targetPath), { recursive: true });
          const fileStream = fs.createWriteStream(targetPath);
          gitRes.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`[Auto-Download] Successfully downloaded and cached ${filename} into ${isTempReq ? "temp/" : "public/webp/"}`);
            res.sendFile(targetPath);
          });
        } else {
          downloadSequentially(index + 1);
        }
      }).on("error", (err) => {
        console.error(`[Auto-Download] Network error at candidate ${index} for ${filename}:`, err);
        downloadSequentially(index + 1);
      });
    };

    downloadSequentially(0);
  });

  // Always statically serve the webp directories at root level and /webp in addition to Vite/dist
  // Force correct MIME type for webp images to ensure all browsers render them perfectly
  const setWebpHeaders = (res: any, filePath: string) => {
    const lowerPath = filePath.toLowerCase();
    if (lowerPath.endsWith(".webp")) {
      res.setHeader("Content-Type", "image/webp");
    } else if (lowerPath.endsWith(".jpg") || lowerPath.endsWith(".jpeg")) {
      res.setHeader("Content-Type", "image/jpeg");
    }
  };

  const webpStaticPublic = express.static(path.join(process.cwd(), "public", "webp"), {
    setHeaders: setWebpHeaders
  });

  const webpStaticSrc = express.static(path.join(process.cwd(), "src", "data", "webp"), {
    setHeaders: setWebpHeaders
  });

  const webpStaticDownloadables = express.static(path.join(process.cwd(), "Downloadables", "webp"), {
    setHeaders: setWebpHeaders
  });

  const webpStaticTemp = express.static(path.join(process.cwd(), "temp"), {
    setHeaders: setWebpHeaders
  });

  const fontStaticSrc = express.static(path.join(process.cwd(), "src", "Font"), {
    setHeaders: (res, filePath) => {
      const lower = filePath.toLowerCase();
      if (lower.endsWith(".otf")) {
        res.setHeader("Content-Type", "font/otf");
      } else if (lower.endsWith(".ttf")) {
        res.setHeader("Content-Type", "font/ttf");
      } else if (lower.endsWith(".woff")) {
        res.setHeader("Content-Type", "font/woff");
      } else if (lower.endsWith(".woff2")) {
        res.setHeader("Content-Type", "font/woff2");
      }
    }
  });

  const fontStaticPublic = express.static(path.join(process.cwd(), "public", "Font"), {
    setHeaders: (res, filePath) => {
      const lower = filePath.toLowerCase();
      if (lower.endsWith(".otf")) {
        res.setHeader("Content-Type", "font/otf");
      }
    }
  });

  const fontStaticRoot = express.static(path.join(process.cwd(), "font"), {
    setHeaders: (res, filePath) => {
      const lower = filePath.toLowerCase();
      if (lower.endsWith(".otf")) {
        res.setHeader("Content-Type", "font/otf");
      } else if (lower.endsWith(".ttf")) {
        res.setHeader("Content-Type", "font/ttf");
      } else if (lower.endsWith(".woff")) {
        res.setHeader("Content-Type", "font/woff");
      } else if (lower.endsWith(".woff2")) {
        res.setHeader("Content-Type", "font/woff2");
      }
    }
  });

  // Serve from public webp first (as we consolidated there), fallback to Downloadables, src, or temp
  app.use("/webp", webpStaticPublic);
  app.use("/webp", webpStaticDownloadables);
  app.use("/webp", webpStaticSrc);
  app.use("/webp", webpStaticTemp);
  app.use("/temp", webpStaticTemp); // Maps /temp prefix to webpStaticTemp for seamless loading of sdasdasd.png
  app.use("/font", fontStaticRoot);
  app.use("/Font", fontStaticRoot);
  app.use("/Font", fontStaticPublic);
  app.use("/Font", fontStaticSrc);
  app.use(webpStaticPublic);
  app.use(webpStaticDownloadables);
  app.use(webpStaticSrc);
  app.use(webpStaticTemp);
  app.use(fontStaticRoot);
  app.use(fontStaticPublic);
  app.use(fontStaticSrc);

  // Serve downloadables statically with proper attachment and MIME headers
  app.use("/downloadables", express.static(path.join(process.cwd(), "Downloadables"), {
    setHeaders: (res, filePath) => {
      const lowerPath = filePath.toLowerCase();
      if (lowerPath.endsWith(".xlsx")) {
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        // Decode and re-encode baseline filenames to prevent any platform character issues
        const filename = path.basename(filePath);
        res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
      }
    }
  }));

  // Serve case-variant Tagbeats.mp3 with correct audio headers
  app.use("/Tagbeats.mp3", express.static(path.join(process.cwd(), "Tagbeats.mp3"), {
    setHeaders: (res, filePath) => {
      if (filePath.toLowerCase().endsWith(".mp3")) {
        res.setHeader("Content-Type", "audio/mpeg");
      }
    }
  }));

  // Serve case-variant audio folder with correct audio headers
  app.use("/audio", express.static(path.join(process.cwd(), "audio"), {
    setHeaders: (res, filePath) => {
      if (filePath.toLowerCase().endsWith(".mp3")) {
        res.setHeader("Content-Type", "audio/mpeg");
      }
    }
  }));

  // Robustly find dist directory
  const getDistPath = () => {
    try {
      if (typeof __dirname !== "undefined") {
        if (fs.existsSync(path.join(__dirname, "index.html"))) {
          return __dirname;
        }
        const candidate = path.join(__dirname, "dist");
        if (fs.existsSync(path.join(candidate, "index.html"))) {
          return candidate;
        }
      }
    } catch (e) {}
    return path.join(process.cwd(), "dist");
  };

  const distPath = getDistPath();

  if (process.env.NODE_ENV !== "production") {
    const viteModuleName = "vite";
    const { createServer: createViteServer } = await import(viteModuleName);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".webp")) {
          res.setHeader("Content-Type", "image/webp");
        }
      }
    }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    const displayHost = HOST === "0.0.0.0" ? "localhost" : HOST;
    console.log(`Tagbilaran Tourism dev server running at http://${displayHost}:${PORT}`);
  });
}

start();
