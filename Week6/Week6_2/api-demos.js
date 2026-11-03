const dataButton = document.getElementById("load-data");
const dataStatus = document.getElementById("fetch-status");
const sampleList = document.getElementById("sample-list");
const savedNote = document.getElementById("saved-note");
const storageStatus = document.getElementById("storage-status");
const locationStatus = document.getElementById("location-status");
const clipboardStatus = document.getElementById("clipboard-status");
const shareStatus = document.getElementById("share-status");
const canvas = document.getElementById("campus-canvas");
const canvasStatus = document.getElementById("canvas-status");

function setStatus(element, message, state) {
    element.textContent = message;
    element.dataset.state = state || "neutral";
}

dataButton.addEventListener("click", async () => {
    dataButton.disabled = true;
    setStatus(dataStatus, "Loading sample data…", "neutral");

    try {
        const response = await fetch("./sample-data.json", {
            headers: { Accept: "application/json" }
        });
        if (!response.ok) {
            throw new Error(`The sample file returned HTTP ${response.status}.`);
        }

        const data = await response.json();
        if (!Array.isArray(data.examples)) {
            throw new Error("The sample file did not contain an examples list.");
        }

        sampleList.replaceChildren();
        data.examples.forEach((example) => {
            const item = document.createElement("li");
            const title = document.createElement("strong");
            const description = document.createElement("p");
            title.textContent = example.title;
            description.textContent = example.description;
            item.append(title, description);
            sampleList.append(item);
        });
        setStatus(dataStatus, `Loaded ${data.examples.length} examples with Fetch.`, "success");
    } catch (error) {
        setStatus(dataStatus, `Could not load sample data: ${error.message}`, "error");
    } finally {
        dataButton.disabled = false;
    }
});

try {
    savedNote.value = localStorage.getItem("week6-2-note") || "";
    setStatus(
        storageStatus,
        savedNote.value ? "Restored your note from this browser." : "No saved note yet.",
        "success"
    );
} catch (error) {
    setStatus(storageStatus, `Browser storage is unavailable: ${error.message}`, "error");
}

document.getElementById("save-note").addEventListener("click", () => {
    try {
        localStorage.setItem("week6-2-note", savedNote.value);
        setStatus(storageStatus, "Saved in this browser only.", "success");
    } catch (error) {
        setStatus(storageStatus, `Could not save your note: ${error.message}`, "error");
    }
});

document.getElementById("get-location").addEventListener("click", () => {
    if (!("geolocation" in navigator)) {
        setStatus(locationStatus, "This browser does not support Geolocation.", "error");
        return;
    }

    setStatus(locationStatus, "Waiting for location permission…", "neutral");
    navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
            setStatus(
                locationStatus,
                `Your browser reports latitude ${coords.latitude.toFixed(4)}, longitude ${coords.longitude.toFixed(4)}. These coordinates stay on this page.`,
                "success"
            );
        },
        (error) => {
            const messages = {
                1: "Location permission was denied.",
                2: "Your location is currently unavailable.",
                3: "The location request timed out."
            };
            setStatus(locationStatus, messages[error.code] || `Location error: ${error.message}`, "error");
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
});

document.getElementById("copy-message").addEventListener("click", async () => {
    if (!navigator.clipboard || !window.isSecureContext) {
        setStatus(clipboardStatus, "Clipboard access requires browser support and a secure connection (HTTPS or localhost).", "error");
        return;
    }

    try {
        await navigator.clipboard.writeText("Week 6_2: learning six browser APIs.");
        setStatus(clipboardStatus, "Message copied to your clipboard.", "success");
    } catch (error) {
        setStatus(clipboardStatus, `Could not copy the message: ${error.message}`, "error");
    }
});

document.getElementById("share-page").addEventListener("click", async () => {
    if (!navigator.share) {
        setStatus(shareStatus, "Web Share is not supported in this browser. Try a supported mobile browser.", "error");
        return;
    }

    try {
        await navigator.share({
            title: "Week 6_2 — Six Browser APIs",
            text: "Try these six browser API examples.",
            url: window.location.href
        });
        setStatus(shareStatus, "The share sheet was opened.", "success");
    } catch (error) {
        if (error.name === "AbortError") {
            setStatus(shareStatus, "Sharing was cancelled.", "neutral");
            return;
        }
        setStatus(shareStatus, `Could not share this page: ${error.message}`, "error");
    }
});

function drawCampusConnections() {
    const context = canvas.getContext("2d");
    if (!context) {
        setStatus(canvasStatus, "This browser could not create a 2D canvas context.", "error");
        return;
    }

    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#eef4fb";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#145da0";
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(160, 88);
    context.lineTo(480, 88);
    context.stroke();

    [
        { x: 160, label: "Student A" },
        { x: 480, label: "Student B" }
    ].forEach(({ x, label }) => {
        context.fillStyle = "#fff";
        context.beginPath();
        context.arc(x, 58, 24, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "#172033";
        context.lineWidth = 3;
        context.stroke();
        context.fillStyle = "#172033";
        context.font = "bold 20px Arial";
        context.textAlign = "center";
        context.fillText(label, x, 139);
    });

    context.fillStyle = "#b94b27";
    context.beginPath();
    context.arc(width / 2, 88, 12, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#172033";
    context.font = "bold 16px Arial";
    context.fillText("Shared interest", width / 2, 39);
    setStatus(canvasStatus, "Drew the connection with CanvasRenderingContext2D.", "success");
}

document.getElementById("redraw-canvas").addEventListener("click", drawCampusConnections);
drawCampusConnections();
