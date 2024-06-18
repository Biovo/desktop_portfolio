class Typewriter {
    constructor(el, options) {
        this.el = el;
        this.words = [...this.el.dataset.typewriter.split(",")];
        this.speed = options?.speed || 100;
        this.delay = options?.delay || 1500;
        this.repeat = options?.repeat;
        this.initTyping();
    }

    wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    toggleTyping = () => this.el.classList.toggle("typing");

    async typewrite(word) {
        await this.wait(this.delay);
        this.toggleTyping();
        for (const letter of word.split("")) {
            this.el.textContent += letter;
            await this.wait(this.speed)
        }
        this.toggleTyping();
        await this.wait(this.delay);
        this.toggleTyping();
        while (this.el.textContent.length !== 0) {
            this.el.textContent = this.el.textContent.slice(0, -1);
            await this.wait(this.speed)
        }
        this.toggleTyping();
    }

    async initTyping() {
        for (const word of this.words) {
            await this.typewrite(word);
        }
        if (this.repeat) {
            await this.initTyping();
        } else {
            this.el.style.animation = 'none';
        }
    }
}

new Typewriter(document.querySelector("[data-typewriter]"));

document.querySelectorAll(".draggable").forEach(element => {
    element.addEventListener("mousedown", startDragMouse);
    element.addEventListener("touchstart", startDragTouch);
});

function startDragMouse(e) {
    const dragElement = e.currentTarget.parentElement;
    startX = e.clientX;
    startY = e.clientY;

    function moveWindowMouse(e) {
        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        dragElement.style.left = (dragElement.offsetLeft - newX) + "px";
        dragElement.style.top = (dragElement.offsetTop - newY) + "px";
    }

    function stopDragMouse() {
        document.removeEventListener("mousemove", moveWindowMouse);
        document.removeEventListener("mouseup", stopDragMouse);
    }

    document.addEventListener("mousemove", moveWindowMouse);
    document.addEventListener("mouseup", stopDragMouse);

    e.preventDefault();
}

function startDragTouch(e) {
    const dragElement = e.currentTarget.parentElement;
    const touch = e.touches[0];
    const offsetX = touch.clientX - dragElement.offsetLeft;
    const offsetY = touch.clientY - dragElement.offsetTop;

    function moveWindowTouch(e) {
        const touch = e.touches[0];
        dragElement.style.left = (touch.clientX - offsetX) + "px";
        dragElement.style.top = (touch.clientY - offsetY) + "px";
    }

    function stopDragTouch() {
        document.removeEventListener("touchmove", moveWindowTouch);
        document.removeEventListener("touchend", stopDragTouch);
    }

    document.addEventListener("touchmove", moveWindowTouch);
    document.addEventListener("touchend", stopDragTouch);

    e.preventDefault(); // Prevent default behavior to avoid scrolling or other unwanted actions
}

function sendMail() {
    var params = {
        from_name: document.getElementById("fullName").value,
        email_id: document.getElementById("email_id").value,
        message: document.getElementById("message").value
    }
    emailjs.send("portfolio_contact", "contact_form", params).then(function (res) {
        alert("Success! " + res.status);
    })
}