// REWRITTEN TO TAKE ADVANTAGE OF CLOSURES
const $ = (id) => {
    return document.getElementById(id);
};

const createSlideshow = function () {
    // PRIVATE VARIABLES AND FUNCTIONS
    let timer;
    let play = true;
    let speed = 2000; 
    let nodes = { image: null, caption: null };
    let img = { cache: [], counter: 0 }; //loadImages pushes slides to cache, slides are HTML Image() instances??
    
    const stopSlideShow = function () {
        clearInterval(timer);
    };

    const displayNextImage = () => {
        img.counter = ++img.counter % img.cache.length;
        var image = img.cache[img.counter]; //Uses counter to grab next element in array
        nodes.image.src = image.src; //Sends to DOM
        nodes.caption.innerHTML = image.title; //Sends to DOM
    };
  
    const setPlayText = function (btn) {
        if (play) {
            btn.value = 'Resume';
        } else {
            btn.value = 'Pause';
        }
    };

    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {
        loadImages: function (slides) {
            var image;
            for (let i = 0; i < slides.length; i++) {
                image = new Image(); //HTML Image Element
                image.src = slides[i].href;
                image.title = slides[i].title;
                img.cache.push(image);
            }
            return this;
        },
        startSlideShow: function (image, caption) {
            if(image && caption) {
                nodes.image = image; //Sets to DOM element
                nodes.caption = caption; //Sets to DOM element
            }
            displayNextImage();
            timer = setInterval(displayNextImage, speed); //Calls the displayNextImage at interval set by second parameter
            return this;
        },
        setSpeed: function () {
            let userInput = parseInt(prompt(`The current speed is ${speed}. To change the speed please enter a number below.`));
            if (!isNaN(userInput)) { //If speed is set to NaN (ie: if you hit cancel), interval speed becomes like a nanosecond. It is seizure inducing.
                speed = userInput; 
                clearInterval(timer);
                play = true; //Fixes the glitch that arises if speed is changed when slideshow is paused...which is slideshow restarts but btn still says resume. Btn functionality becomes glitchy too.
                $('play_pause').value = 'Pause'; //See note above
                this.startSlideShow($('image'), $('caption'), speed);
            }
        },
        createToggleHandler: function () {
            let me = this;
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'THIS' IS THE CLICKED BUTTON
                // 'ME' IS THE OBJECT LITERAL
                if (play) {
                    stopSlideShow();
                } else {
                    me.startSlideShow();
                }
                setPlayText(this);
                // TOGGLE PLAY 'FLAG'
                play = !play;
            };
        }
    };
};

window.addEventListener('load', () => {
    // CREATE THE SLIDESHOW OBJECT
    const slideshow = createSlideshow();

    const slides = [
        {href: 'images/backpack.jpg', title: 'He backpacks in the Sierras often'},
        {href: 'images/boat.jpg', title: 'He loves his boat'},
        {href: 'images/camaro.jpg', title: 'He loves his Camaro more'},
        {href: 'images/punk.jpg', title: 'He used to be in a punk band and toured with No Doubt and Sublime'},
        {href: 'images/race.jpg', title: 'He\'s active and loves obstacle course racing'}
    ];
	// START THE SLIDESHOW
    slideshow.loadImages(slides).startSlideShow($('image'), $('caption'));
    // PAUSE THE SLIDESHOW
    $('play_pause').onclick = slideshow.createToggleHandler();
    
    //LET USER SET SPEED
    $('speed').addEventListener('click', () => {
        slideshow.setSpeed();
    });
});

