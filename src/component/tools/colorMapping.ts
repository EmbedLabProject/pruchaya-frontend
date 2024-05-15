export const getColorForPH = (ph: number): string => {
    if (ph < 7) {
      // Acidic range: red to yellow
      const red = 255;
      const green = Math.round((ph / 7) * 255);
      return `rgb(${red},${green},0)`;
    } else if (ph === 7) {
      // Neutral: green
      return 'rgb(0,255,0)';
    } else {
      // Basic range: blue to purple
      const blue = 255;
      const red = Math.round(((ph - 7) / 7) * 255);
      return `rgb(${red},0,${blue})`;
    }
  };
  