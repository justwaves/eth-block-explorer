/* eslint-disable prefer-destructuring */
/* eslint-disable no-bitwise */
import React, { useRef, useEffect } from 'react';

const Identicon = props => {
  const identiconRef = useRef();

  const generateIdenticon = options => {
    const randseed = new Array(4);

    const seedrand = seed => {
      for (let i = 0; i < randseed.length; i++) {
        randseed[i] = 0;
      }
      for (let i = 0; i < seed.length; i++) {
        randseed[i % 4] =
          (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
      }
    };

    const rand = () => {
      const t = randseed[0] ^ (randseed[0] << 11);

      randseed[0] = randseed[1];
      randseed[1] = randseed[2];
      randseed[2] = randseed[3];
      randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

      return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
    };

    const createColor = () => {
      const h = Math.floor(rand() * 360);
      const s = `${rand() * 60 + 40}%`;
      const l = `${(rand() + rand() + rand() + rand()) * 25}%`;

      const color = `hsl(${h},${s},${l})`;
      return color;
    };

    const createImageData = size => {
      const width = size;
      const height = size;

      const dataWidth = Math.ceil(width / 2);
      const mirrorWidth = width - dataWidth;

      const data = [];
      for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < dataWidth; x++) {
          row[x] = Math.floor(rand() * 2.3);
        }
        const r = row.slice(0, mirrorWidth);
        r.reverse();
        row = row.concat(r);

        for (let i = 0; i < row.length; i++) {
          data.push(row[i]);
        }
      }

      return data;
    };

    const setCanvas = (
      identicon,
      imageData,
      color,
      scale,
      bgcolor,
      spotcolor,
    ) => {
      const width = Math.sqrt(imageData.length);
      const size = width * scale;

      const idcon = identicon;

      idcon.width = size;
      idcon.style.width = `${size}px`;

      idcon.height = size;
      idcon.style.height = `${size}px`;

      const cc = idcon.getContext('2d');
      cc.fillStyle = bgcolor;
      cc.fillRect(0, 0, idcon.width, idcon.height);
      cc.fillStyle = color;

      for (let i = 0; i < imageData.length; i++) {
        cc.fillStyle = imageData[i] === 1 ? color : spotcolor;

        if (imageData[i]) {
          const row = Math.floor(i / width);
          const col = i % width;

          cc.fillRect(col * scale, row * scale, scale, scale);
        }
      }
    };

    const opts = options || {};
    const size = opts.size || 8;
    const scale = opts.scale || 4;
    const seed = opts.seed || Math.floor(Math.random() * 10 ** 16).toString(16);

    seedrand(seed);

    const color = opts.color || createColor();
    const bgcolor = opts.bgColor || createColor();
    const spotcolor = opts.spotColor || createColor();
    const imageData = createImageData(size);
    const canvas = setCanvas(
      identiconRef.current,
      imageData,
      color,
      scale,
      bgcolor,
      spotcolor,
    );
    return canvas;
  };

  useEffect(() => {
    generateIdenticon({ ...props });
  }, [props]);

  return <canvas ref={identiconRef} />;
};

export default Identicon;
