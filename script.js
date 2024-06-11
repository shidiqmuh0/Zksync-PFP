const upload = document.getElementById('upload');
const profilePic = document.getElementById('profilePic');
const overlay = document.getElementById('overlay');
const canvas = document.getElementById('canvas');
const saveBtn = document.getElementById('saveBtn');
const shareBtn = document.getElementById('shareBtn');

upload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Create a canvas to resize the image to 500x500 pixels
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            tempCanvas.width = 500;
            tempCanvas.height = 500;

            // Calculate the aspect ratio
            const aspectRatio = img.width / img.height;
            let newWidth, newHeight;

            if (aspectRatio > 1) { // Landscape
                newWidth = 500;
                newHeight = 500 / aspectRatio;
            } else { // Portrait or square
                newHeight = 500;
                newWidth = 500 * aspectRatio;
            }

            // Calculate the position to center the image
            const xOffset = (500 - newWidth) / 2;
            const yOffset = (500 - newHeight) / 2;

            tempCtx.drawImage(img, xOffset, yOffset, newWidth, newHeight);

            profilePic.src = tempCanvas.toDataURL();
            profilePic.style.display = 'block';
            overlay.style.display = 'block';
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

saveBtn.addEventListener('click', function() {
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(profilePic, 0, 0, 500, 500);
    ctx.drawImage(overlay, 0, 0, 500, 500);

    canvas.toBlob(function(blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'profile_with_overlay.jpg';
        link.click();

        // Show share button after saving the image
        const shareURL = URL.createObjectURL(blob);
        shareBtn.href = `https://twitter.com/intent/tweet?text=#Zksync_PFP`;
        shareBtn.style.display = 'block';
    }, 'image/jpeg');
});

shareBtn.addEventListener('click', function() {
    const text = encodeURIComponent("#Zksync_PFP");
    const shareURL = shareBtn.href;
    const tweetURL = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(tweetURL, '_blank');
});