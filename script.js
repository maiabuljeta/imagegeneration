document.getElementById('generate').addEventListener('click', async () => {
    const inputText = document.getElementById('input').value;
    const outputDiv = document.getElementById('output');
    const generatedImage = document.getElementById('generatedImage');

    if (inputText.trim() === "") {
        alert("Please enter a prompt to generate an image.");
        return;
    }

    outputDiv.innerText = "Generating image...";
    generatedImage.style.display = "none";

    try {
        const response = await axios.post('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2', {
            inputs: inputText,
        }, {
            headers: {
                'Authorization': 'eARoPcozlVwTksGPUXvvEYXILdcXEMAcdY' // Replace with your Hugging Face API key
            },
            responseType: 'blob',
        });

        const url = URL.createObjectURL(response.data);
        generatedImage.src = url;
        generatedImage.style.display = "block";
        outputDiv.innerText = ""; // Clear previous message
    } catch (error) {
        console.error("Error while generating image:", error);
        outputDiv.innerText = "Failed to generate image.";
    }
});
