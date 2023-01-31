// Copyright (C) 2023 znci

let logo = "znci-logo.svg";
let cached = false;
let cachedSVG = "";

function fetchLogo(logo) {
	fetch(`./img/${logo}`).then(res => res.text())
	.then(text => {

		if(document.querySelector(".logo")) {
			document.querySelector(".logo").remove();
		}

		cached = true;

		const logo = document.createElement("div");

		logo.classList.add("logo");

		logo.innerHTML = text;

		document.querySelector(".display-logo").appendChild(logo);

		const svg = logo.children[0];

		for (const i in svg.children) {
			const child = svg.children[i];

			try {
				child.setAttribute("fill", "#" + document.querySelector(".input-hex").value);
			} catch (error) {
				
			}
		}

		console.log(logo.innerHTML);

		cachedSVG = logo.innerHTML;
	})
}

window.onload = fetchLogo(logo);

document.querySelector(".submit-hex").addEventListener("click", () => {
	fetchLogo(logo);
})
document.querySelector(".download").addEventListener("click", () => {
	if(cached === true) {

		let svgBlob = cachedSVG;
		let blob = new Blob([svgBlob], {type: "image/svg+xml;charset=utf-8"});
		let url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url ;
		a.download = logo;
		a.click();
	}
})