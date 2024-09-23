let form = document.querySelector("form");
let select = document.querySelector("select");
let input = document.querySelector("input");
let img = document.querySelector("img");
let downloadBtn = document.createElement("button");

// Create a download button dynamically
downloadBtn.textContent = "Download QR";
downloadBtn.classList.add("btn", "btn-primary", "mt-3");
downloadBtn.style.display = "none"; // Initially hidden
img.parentElement.appendChild(downloadBtn);

const getQr = async (e) => {
    e.preventDefault();

    // Check if user input is valid
    if (select.value === "Select Size" || input.value.trim() === "") {
        alert("Please select a size and enter text");
        return;
    }

    try {
        // Fetch QR code from API
        const response = await fetch(
            `https://api.qrserver.com/v1/create-qr-code/?size=${select.value}&data=${encodeURIComponent(input.value)}`
        );

        if (!response.ok) {
            throw new Error("Failed to generate QR code");
        }

        // Update img source with the new QR code
        img.setAttribute("src", response.url);

        // Show download button
        downloadBtn.style.display = "block";

        // Prepare the download button functionality
        downloadBtn.onclick = () => {
            const link = document.createElement("a");
            link.href = response.url;
            link.download = "qr_code.png";
            link.click();
        };

        // Reset the form
        form.reset();
    } catch (error) {
        console.error(error);
        alert("Something went wrong, please try again.");
    }
};

form.addEventListener("submit", getQr);
