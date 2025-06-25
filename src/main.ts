import { Flip } from "./flip";

const btn = document.querySelector('button')!;
const ul = document.querySelector('ul')!;
const lis = Array.from(ul.children);
btn.addEventListener('click', function() {

  const flip = new Flip((lis[0] as HTMLElement), 1000, ['backgroundColor']);
  ul.appendChild(lis[0]);
  (lis[0] as HTMLElement).style.transform = 'translateX(100px) scale(1.5) rotate(255deg)';
  (lis[0] as HTMLElement).style.backgroundColor = 'green';

  flip.animate();

  // const flips: Flip[] = [];
  // lis.forEach(item => {
  //   const flip = new Flip(item as HTMLElement, 1000, ['backgroundColor', 'width']);
  //   flips.push(flip);
  // });
  // lis.sort(() => Math.random() - 0.5).forEach((item) => {
  //   (item as HTMLElement).style.backgroundColor = getRandomColor();
  //   (item as HTMLElement).style.width = getRandomNumber(100, 300) + 'px';
  //   ul.appendChild(item);
  // });

  // flips.forEach(flip => {
  //   flip.animate();
  // });
});

function getRandomColor() {
  return '#' + Math.random().toString(16).substring(2, 8);
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}