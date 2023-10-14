const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from(".nav-bar", {
        y: '-10',
        opacity: 0, 
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })

    .from(".hero-footer", {
        y: '-10',
        opacity: 0, 
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

var timeout;
function cursorSqueeze(){

    // define default scale values
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        cursor(xscale, yscale);

        timeout = setTimeout(function(){
            document.querySelector("#circle-cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    })
}

function cursor(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#circle-cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}
cursorSqueeze();
cursor();
firstPageAnim();


// second section

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var rot_diff = 0;
    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        rot_diff = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            display: "block",
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,rot_diff*0.8)
        });
    });


    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        });
    });
})

//LIVE TIME DISPLAY
// Calling showTime function at every second
setInterval(showTime, 1000);

// Defining showTime funcion
function showTime() {
	// Getting current time and date
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	am_pm = " AM EST";

	// Setting time for 12 Hrs format
	if (hour >= 12) {
		if (hour > 12) hour -= 12;
		am_pm = " PM EST";
	} else if (hour == 0) {
		hr = 12;
		am_pm = " AM EST";
	}

	// hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;

	let currentTime =
		hour +
		":" +
		min +
		am_pm;

	// Displaying the time
	document.getElementById(
		"clock"
	).innerHTML = currentTime;
}

showTime();
