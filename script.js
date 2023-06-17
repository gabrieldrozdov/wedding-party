// YOU’RE INVITED!
let inviteHeadingSpans = document.querySelectorAll(".invite-heading span");
let colors = ["#ffe9ee", "#FB5012", "#00CFC1", "#FFB41F"];
let temp = "";
let colorIndex = 0;
for (let span of inviteHeadingSpans) {
	for (let letter of span.innerText) {
		if (colorIndex+1 >= colors.length) {
			temp += `<span style="background-color:${colors[colorIndex]};color:${colors[0]};animation-duration:${Math.random()+1}s;" class="invite-heading-letter" data-color-index="${colorIndex}">${letter}</span>`;
		} else {
			temp += `<span style="background-color:${colors[colorIndex]};color:${colors[colorIndex+1]};animation-duration:${Math.random()+1}s;" class="invite-heading-letter" data-color-index="${colorIndex}">${letter}</span>`;
		}
		colorIndex++;
		if (colorIndex >= colors.length) {
			colorIndex = 0;
		}
	}
	span.innerHTML = temp;
	temp = "";
}
setInterval(() => {
	let inviteHeadingLetters = document.querySelectorAll(".invite-heading-letter");
	for (let letter of inviteHeadingLetters) {
		let colorIndex = parseInt(letter.dataset.colorIndex);
		colorIndex++;
		if (colorIndex >= colors.length) {
			colorIndex = 0;
		}
		letter.dataset.colorIndex = colorIndex;
		letter.style.backgroundColor = colors[colorIndex];
		if (colorIndex+1 >= colors.length) {
			letter.style.color = colors[0];
		} else {
			letter.style.color = colors[colorIndex+1];
		}
	}
}, 500)

// Cutouts
function cutoutsIn() {
	let cutouts = document.querySelector(".cutouts");
	cutouts.style.transform = "translateY(0%)";
	let intro = document.querySelector(".intro");
	intro.style.transform = "scale(0)";
	let invite = document.querySelector(".invite");
	invite.style.transform = "scale(1)";
}

// Confetti
const count = 200,
defaults = {
	spread: 360,
	origin: { y: .5 },
	ticks: 100,
	gravity: 0,
	decay: 0.94,
	startVelocity: 30,
	colors: ["#ffe9ee", "#FB5012", "#00CFC1", "#FFB41F"],
	shapes: ["circle", "heart"],
};

function fire(particleRatio, opts) {
	confetti(
		Object.assign({}, defaults, opts, {
		particleCount: Math.floor(count * particleRatio),
		})
	);
}

function confettiFire() {
	// SFX
	let yay = new Audio("../sounds/yay.m4a");
	yay.play();
	let pop = new Audio("../sounds/pop.wav");
	pop.play();
	let party = new Audio("../sounds/party.mp3");
	party.loop = true;
	party.play();

	// Confetti blast
	fire(0.25, {
		spread: 360,
		startVelocity: 55,
	});
	fire(0.2, {
		spread: 60,
	});
	fire(0.35, {
		spread: 300,
		decay: 0.91,
		scalar: 0.8,
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 25,
		decay: 0.92,
		scalar: 1.2,
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 45,
	});

	// Confetti snow
	let skew = 1;
	function randomInRange(min, max) {
		return Math.random() * (max - min) + min;
	}
	(function frame() {
		skew = Math.max(0.8, skew - 0.001);

		confetti({
			particleCount: 1,
			startVelocity: 0,
			ticks: 200,
			origin: {
			x: Math.random(),
			// since particles fall down, skew start toward the top
			y: Math.random() * skew - 0.2,
			},
			colors: ["#ffe9ee", "#FB5012", "#00CFC1", "#FFB41F"],
			shapes: ["circle", "heart"],
			gravity: randomInRange(0.4, 0.6),
			scalar: randomInRange(0.4, 1),
			drift: randomInRange(-0.4, 0.4),
		});
		requestAnimationFrame(frame);
	})();
}