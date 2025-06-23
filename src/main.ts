import { Flip } from "./flip";

const btn = document.querySelector('button')!;
const ul = document.querySelector('ul')!;
const lis = Array.from(ul.children);
btn.addEventListener('click', function() {

  const flip = new Flip((lis[0] as HTMLElement), 5000, ['backgroundColor']);
  ul.appendChild(lis[0]);
  (lis[0] as HTMLElement).style.transform = 'translateX(100px) scale(1.2) rotate(155deg)';
  (lis[0] as HTMLElement).style.backgroundColor = 'green';

  flip.animate();
});

