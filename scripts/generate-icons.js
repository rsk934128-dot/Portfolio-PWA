import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';

function createPNG(width, height, isMaskable = false) {
  // RGBA buffer with filter byte at start of each row: (width * 4 + 1) * height
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const nx = x / width;
      const ny = y / height;

      // Distance from center
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Rounded rect boundary
      const cornerRadius = isMaskable ? 0 : 0.22;
      const rx = Math.max(0, Math.abs(dx) - (1 - cornerRadius));
      const ry = Math.max(0, Math.abs(dy) - (1 - cornerRadius));
      const cornerDist = Math.sqrt(rx * rx + ry * ry);
      const outside = !isMaskable && cornerDist > cornerRadius;

      if (outside) {
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      // Rich gradient background (#0f172a to #31104b)
      let r = Math.round(15 + 34 * nx + 30 * ny);
      let g = Math.round(23 + 20 * (1 - ny) + 10 * nx);
      let b = Math.round(42 + 80 * nx + 100 * ny);
      let a = 255;

      // Safe area device outline
      const scale = isMaskable ? 0.75 : 0.85;
      const devW = 0.46 * scale;
      const devH = 0.65 * scale;
      const inDev = Math.abs(dx) < devW && Math.abs(dy) < devH;
      const devBorder = inDev && (
        Math.abs(Math.abs(dx) - devW) < 0.03 ||
        Math.abs(Math.abs(dy) - devH) < 0.03
      );

      if (devBorder) {
        // Cyan border
        r = 56;
        g = 189;
        b = 248;
      } else if (inDev) {
        // Inner screen
        r = 9;
        g = 13;
        b = 22;

        // Center code bracket & monogram SF representation
        const isLeftBracket = (Math.abs(dx + 0.16) < 0.02 && Math.abs(dy) < 0.12) ||
          (Math.abs(dy - 0.12) < 0.02 && dx > -0.16 && dx < -0.08) ||
          (Math.abs(dy + 0.12) < 0.02 && dx > -0.16 && dx < -0.08);

        const isRightBracket = (Math.abs(dx - 0.16) < 0.02 && Math.abs(dy) < 0.12) ||
          (Math.abs(dy - 0.12) < 0.02 && dx < 0.16 && dx > 0.08) ||
          (Math.abs(dy + 0.12) < 0.02 && dx < 0.16 && dx > 0.08);

        if (isLeftBracket) {
          r = 52;
          g = 211;
          b = 153; // Emerald
        } else if (isRightBracket) {
          r = 129;
          g = 140;
          b = 248; // Indigo
        } else if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.06) {
          // Center core
          r = 255;
          g = 255;
          b = 255;
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  // Build PNG chunks
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  function makeChunk(typeStr, data) {
    const type = Buffer.from(typeStr, 'ascii');
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length, 0);

    const toCrc = Buffer.concat([type, data]);
    const crcVal = zlib.crc32(toCrc);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crcVal >>> 0, 0);

    return Buffer.concat([length, type, data, crc]);
  }

  // IHDR: width (4), height (4), bit depth (1 = 8), color type (1 = 6 RGBA), compression (1 = 0), filter (1 = 0), interlace (1 = 0)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPNG(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPNG(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPNG(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPNG(64, 64, false));

console.log('Generated all PWA PNG icons successfully!');
