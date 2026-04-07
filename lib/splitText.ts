export const splitChars = (element: HTMLElement): HTMLElement[] => {
  const text = element.innerText;
  element.innerHTML = "";
  const chars: HTMLElement[] = [];

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    if (text[i] === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.innerText = text[i];
    }
    span.style.display = "inline-block";
    element.appendChild(span);
    chars.push(span);
  }

  return chars;
};
