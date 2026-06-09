import fs from "fs";
import path from "path";

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    console.warn(`[Consolidate] Warning: Source folder ${from} does not exist.`);
    return;
  }
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    const stat = fs.lstatSync(fromPath);
    if (stat.isFile()) {
      if (element === "newback.webp" && from.endsWith("temp")) {
        console.log(`[Consolidate] Skipping newback.webp copy from temp to preserve user uploaded file.`);
        return;
      }
      fs.copyFileSync(fromPath, toPath);
      console.log(`[Consolidate] Copied: ${element} to ${to}`);
    }
  });
}

const publicWebpPath = path.join(process.cwd(), "public", "webp");
if (!fs.existsSync(publicWebpPath)) {
  fs.mkdirSync(publicWebpPath, { recursive: true });
}

const publicFontPath = path.join(process.cwd(), "public", "Font");
if (!fs.existsSync(publicFontPath)) {
  fs.mkdirSync(publicFontPath, { recursive: true });
}

// Ensure source folders are consolidated into public/webp
copyFolderSync(path.join(process.cwd(), "src", "data", "webp"), publicWebpPath);
copyFolderSync(path.join(process.cwd(), "Downloadables", "webp"), publicWebpPath);
copyFolderSync(path.join(process.cwd(), "temp"), publicWebpPath);
copyFolderSync(path.join(process.cwd(), "font"), publicFontPath);

// Robust inline task execution to auto-repair formatting variations in App.tsx
try {
  const appPath = path.join(process.cwd(), "src", "App.tsx");
  if (fs.existsSync(appPath)) {
    let code = fs.readFileSync(appPath, "utf8");
    if (code.includes("</div></div>")) {
      code = code.replace("</div></div>", "</div>");
      fs.writeFileSync(appPath, code, "utf8");
      console.log("[Consolidate] JSX closing tags in App.tsx auto-repaired successfully.");
    }
  }
} catch (err) {
  console.error("[Consolidate] App.tsx repair failed:", err);
}

console.log("[Consolidate] Assets consolidated successfully!");
