const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
infotext = form.querySelector("p"),
closeBtn = wrapper.querySelector(".close"),
copyBtn = wrapper.querySelector(".copy");

function fetchRequest(formData, file){
    infotext.innerHTML = "Scanning QR Code... ";
    fetch("https://api.qrserver.com/v1/read-qr-code/",{
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infotext.innerHTML = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code";
        if(!result) return;
        wrapper.querySelector("textarea").innerHTML = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infotext.innerHTML = "Couldn't Scan QR Code"
    });
}

fileInp.addEventListener("change", e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(formData, file);
})

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
    /* copyBtn.classList.add("copyText"); */
})

closeBtn.addEventListener("click", () => { wrapper.classList.remove("active"); })

form.addEventListener("click", () => fileInp.click());