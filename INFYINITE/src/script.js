const outerPercent = 90;
const innerPercent = 70;

const outerProgress = document.querySelector('svg path.outer-meter');
const innerProgress = document.querySelector('svg path.inner-meter');

if (outerProgress) {
  // Get the length of the path
  const length = outerProgress.getTotalLength();
  // Calculate the percentage of the total length
  let to = length * ((100 - outerPercent) / 100);
  // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
  outerProgress.getBoundingClientRect();
  // Set the Offset
  outerProgress.style.strokeDashoffset = Math.max(0, to);
}

if (innerProgress) {
    // Get the length of the path
    const length = innerProgress.getTotalLength();
    // Calculate the percentage of the total length
    let to = length * ((100 - innerPercent) / 100);
    // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
    innerProgress.getBoundingClientRect();
    // Set the Offset
    innerProgress.style.strokeDashoffset = Math.max(0, to);
}