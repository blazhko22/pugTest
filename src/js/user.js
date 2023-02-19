const btn = document.querySelectorAll(".btnUser");

btn.forEach(el => {
    if(el.textContent === 'Active') {
        return el.classList.add("activeBtn")
    }else {
        return el.classList.add("inActiveBtn")
    }
})