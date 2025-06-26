import { Flip } from "./index";

const btn = document.querySelector('button')!;
const ul = document.querySelector('ul')!;
const lis = Array.from(ul.children);
btn.addEventListener('click', async function() {

  // const flip = new Flip((lis[0] as HTMLElement), 1000, ['backgroundColor']);
  // ul.appendChild(lis[0]);
  // (lis[0] as HTMLElement).style.transform = 'translateX(100px) scale(1.5) rotate(2550deg)';
  // (lis[0] as HTMLElement).style.backgroundColor = 'green';

  // await flip.animate();
  // console.log('Animation finished');
  // (lis[0] as HTMLElement).style.transform = 'rotate(9000deg)';
  // flip.animate(() => {
  //   console.log('Animation finished');
  // }, 5000);
 

  
  const flip = new Flip(lis as HTMLElement[], 1000, ['backgroundColor', 'width']);
  lis.sort(() => Math.random() - 0.5).forEach((item) => {
    (item as HTMLElement).style.backgroundColor = getRandomColor();
    (item as HTMLElement).style.width = getRandomNumber(100, 300) + 'px';
    ul.appendChild(item);
  });

  await flip.animate();
  console.log('Animation finished');
  lis.forEach(item => {
    (item as HTMLElement).style.transform = 'rotate(190deg)';
  })
  flip.animate(() => {
    console.log('Animation finished');
  }, 5000);
});

function getRandomColor() {
  return '#' + Math.random().toString(16).substring(2, 8);
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
