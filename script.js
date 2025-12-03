// Moon zodiac signs (Rashi) in Vedic astrology
const rashis = [
    { name: 'Mesh (Aries)', sanskrit: 'मेष' },
    { name: 'Vrishabh (Taurus)', sanskrit: 'वृषभ' },
    { name: 'Mithun (Gemini)', sanskrit: 'मिथुन' },
    { name: 'Kark (Cancer)', sanskrit: 'कर्क' },
    { name: 'Simha (Leo)', sanskrit: 'सिंह' },
    { name: 'Kanya (Virgo)', sanskrit: 'कन्या' },
    { name: 'Tula (Libra)', sanskrit: 'तुला' },
    { name: 'Vrishchik (Scorpio)', sanskrit: 'वृश्चिक' },
    { name: 'Dhanu (Sagittarius)', sanskrit: 'धनु' },
    { name: 'Makar (Capricorn)', sanskrit: 'मकर' },
    { name: 'Kumbh (Aquarius)', sanskrit: 'कुंभ' },
    { name: 'Meen (Pisces)', sanskrit: 'मीन' }
];

// Calculate Rashi based on date (simplified calculation based on month)
function calculateRashiFromDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth(); // 0-11
    const day = date.getDate();

    // Approximate Rashi calculation based on solar month
    // This is a simplified version - actual calculation requires exact planetary positions
    let rashiIndex = 0;

    if ((month === 2 && day >= 21) || (month === 3 && day <= 19)) {
        rashiIndex = 0; // Mesh (Aries)
    } else if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) {
        rashiIndex = 1; // Vrishabh (Taurus)
    } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
        rashiIndex = 2; // Mithun (Gemini)
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 22)) {
        rashiIndex = 3; // Kark (Cancer)
    } else if ((month === 6 && day >= 23) || (month === 7 && day <= 22)) {
        rashiIndex = 4; // Simha (Leo)
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        rashiIndex = 5; // Kanya (Virgo)
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        rashiIndex = 6; // Tula (Libra)
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 21)) {
        rashiIndex = 7; // Vrishchik (Scorpio)
    } else if ((month === 10 && day >= 22) || (month === 11 && day <= 21)) {
        rashiIndex = 8; // Dhanu (Sagittarius)
    } else if ((month === 11 && day >= 22) || (month === 0 && day <= 19)) {
        rashiIndex = 9; // Makar (Capricorn)
    } else if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) {
        rashiIndex = 10; // Kumbh (Aquarius)
    } else if ((month === 1 && day >= 19) || (month === 2 && day <= 20)) {
        rashiIndex = 11; // Meen (Pisces)
    }

    return rashis[rashiIndex];
}

// Get random Rashi
function getRandomRashi() {
    const randomIndex = Math.floor(Math.random() * rashis.length);
    return rashis[randomIndex];
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// DOM Elements
const form = document.getElementById('predictionForm');
const deliveryDateInput = document.getElementById('deliveryDate');
const calculatedRashiDiv = document.getElementById('calculatedRashi');
const randomRashiInput = document.getElementById('randomRashi');
const randomRashiBtn = document.getElementById('randomRashiBtn');
const submittedPredictionsSection = document.getElementById('submittedPredictions');
const predictionDisplay = document.getElementById('predictionDisplay');
const newPredictionBtn = document.getElementById('newPredictionBtn');

// Event Listeners
deliveryDateInput.addEventListener('change', function() {
    if (this.value) {
        const rashi = calculateRashiFromDate(this.value);
        calculatedRashiDiv.innerHTML = `
            <strong>${rashi.name}</strong><br>
            <span style="font-size: 1.3rem;">${rashi.sanskrit}</span>
        `;
        calculatedRashiDiv.style.color = '#2c5282';
    } else {
        calculatedRashiDiv.innerHTML = '<em>Select a date to see the moon sign</em>';
        calculatedRashiDiv.style.color = '#888';
    }
});

randomRashiBtn.addEventListener('click', function() {
    const rashi = getRandomRashi();
    randomRashiInput.value = `${rashi.name} (${rashi.sanskrit})`;
    
    // Add animation effect
    randomRashiInput.style.transform = 'scale(1.05)';
    randomRashiInput.style.backgroundColor = '#fff5f7';
    setTimeout(() => {
        randomRashiInput.style.transform = 'scale(1)';
        randomRashiInput.style.backgroundColor = '';
    }, 300);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(form);
    const guestName = formData.get('guestName');
    const relation = formData.get('relation');
    const gender = formData.get('gender');
    const deliveryDate = formData.get('deliveryDate');
    const babyName = formData.get('babyName');
    const additionalNotes = formData.get('additionalNotes');
    
    // Get calculated Rashi
    const calculatedRashi = deliveryDate ? calculateRashiFromDate(deliveryDate) : null;
    const randomRashiValue = randomRashiInput.value;
    
    // Create prediction display
    let predictionHTML = `
        <h3>🎊 Prediction Summary 🎊</h3>
        <p><strong>Guest Name:</strong> ${guestName}</p>
        <p><strong>Relation:</strong> ${relation}</p>
        <p><strong>Predicted Gender:</strong> ${gender === 'Boy' ? '👶 Boy' : '👧 Girl'}</p>
        <p><strong>Predicted Delivery Date:</strong> ${formatDate(deliveryDate)}</p>
        <p><strong>Predicted Baby Name:</strong> ${babyName}</p>
    `;
    
    if (calculatedRashi) {
        predictionHTML += `
            <p><strong>Moon Sign (Rashi) for ${formatDate(deliveryDate)}:</strong><br>
            ${calculatedRashi.name} (${calculatedRashi.sanskrit})</p>
        `;
    }
    
    if (randomRashiValue) {
        predictionHTML += `<p><strong>Random Rashi Selection:</strong> ${randomRashiValue}</p>`;
    }
    
    if (additionalNotes) {
        predictionHTML += `<p><strong>Additional Wishes:</strong><br>${additionalNotes}</p>`;
    }
    
    predictionDisplay.innerHTML = predictionHTML;
    
    // Hide form and show prediction
    form.parentElement.style.display = 'none';
    submittedPredictionsSection.style.display = 'block';
    
    // Scroll to prediction
    submittedPredictionsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Store prediction in localStorage (optional - for keeping data)
    const prediction = {
        guestName,
        relation,
        gender,
        deliveryDate,
        babyName,
        calculatedRashi: calculatedRashi ? `${calculatedRashi.name} (${calculatedRashi.sanskrit})` : null,
        randomRashi: randomRashiValue,
        additionalNotes,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    try {
        const predictions = JSON.parse(localStorage.getItem('babyPredictions') || '[]');
        predictions.push(prediction);
        localStorage.setItem('babyPredictions', JSON.stringify(predictions));
    } catch (error) {
        console.error('Error saving prediction:', error);
    }
});

newPredictionBtn.addEventListener('click', function() {
    // Reset form
    form.reset();
    calculatedRashiDiv.innerHTML = '<em>Select a date to see the moon sign</em>';
    randomRashiInput.value = '';
    
    // Show form and hide prediction
    form.parentElement.style.display = 'block';
    submittedPredictionsSection.style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Set min date to today for delivery date input
const today = new Date().toISOString().split('T')[0];
deliveryDateInput.setAttribute('min', today);

// Optional: Set max date to 1 year from now
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);
deliveryDateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
