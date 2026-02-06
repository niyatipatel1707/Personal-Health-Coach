// Health Monitoring Agent Web Application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initHealthChart();
    setupEventListeners();
    simulateInitialData();
    
    // Set up real-time updates
    setupRealTimeUpdates();
});

// Initialize Chart.js
let healthChart;
function initHealthChart() {
    const ctx = document.getElementById('healthChart').getContext('2d');
    
    healthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: [72, 75, 70, 68, 74, 76, 72],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }, {
                label: 'Daily Steps (thousands)',
                data: [8.5, 7.2, 9.1, 6.8, 8.9, 5.4, 7.2],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Event Listeners
function setupEventListeners() {
    // Sync sliders with number inputs
    document.getElementById('heartRateSlider').addEventListener('input', function() {
        document.getElementById('heartRate').value = this.value;
    });
    
    document.getElementById('heartRate').addEventListener('input', function() {
        document.getElementById('heartRateSlider').value = this.value;
    });
    
    // Analyze Health Button
    document.getElementById('analyzeHealth').addEventListener('click', analyzeHealthData);
    
    // Update Patient Info
    document.getElementById('updatePatient').addEventListener('click', updatePatientInfo);
    
    // Generate New Recommendations
    document.getElementById('generateNewRecs').addEventListener('click', generateNewRecommendations);
    
    // Time Selector Buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateChartTimeRange(this.textContent);
        });
    });
}

// Health Analysis Function
function analyzeHealthData() {
    // Get input values
    const heartRate = parseInt(document.getElementById('heartRate').value);
    const systolic = parseInt(document.getElementById('systolic').value);
    const diastolic = parseInt(document.getElementById('diastolic').value);
    const steps = parseInt(document.getElementById('steps').value);
    const sleep = parseFloat(document.getElementById('sleep').value);
    const water = parseInt(document.getElementById('water').value);
    
    // Show loading state
    const analyzeBtn = document.getElementById('analyzeHealth');
    const originalText = analyzeBtn.innerHTML;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeBtn.disabled = true;
    
    // Simulate analysis delay
    setTimeout(() => {
        // Analyze heart rate
        let hrStatus = 'Normal';
        let hrColor = '#2ecc71';
        if (heartRate < 60) {
            hrStatus = 'Low';
            hrColor = '#3498db';
        } else if (heartRate > 100) {
            hrStatus = 'High';
            hrColor = '#e74c3c';
        }
        
        // Analyze blood pressure
        let bpStatus = 'Normal';
        let bpColor = '#2ecc71';
        if (systolic > 140 || diastolic > 90) {
            bpStatus = 'High';
            bpColor = '#e74c3c';
        } else if (systolic < 90 || diastolic < 60) {
            bpStatus = 'Low';
            bpColor = '#3498db';
        }
        
        // Analyze activity
        let activityStatus = 'Good';
        if (steps < 5000) activityStatus = 'Poor';
        else if (steps < 7500) activityStatus = 'Fair';
        
        // Analyze sleep
        let sleepStatus = 'Good';
        if (sleep < 6) sleepStatus = 'Poor';
        else if (sleep < 7) sleepStatus = 'Fair';
        
        // Calculate overall status
        let overallStatus = 'Good';
        let overallColor = '#2ecc71';
        let overallIcon = 'fa-check-circle';
        
        if (hrStatus === 'High' || bpStatus === 'High' || activityStatus === 'Poor' || sleepStatus === 'Poor') {
            overallStatus = 'Needs Attention';
            overallColor = '#e74c3c';
            overallIcon = 'fa-exclamation-triangle';
        } else if (hrStatus === 'Low' || bpStatus === 'Low' || activityStatus === 'Fair' || sleepStatus === 'Fair') {
            overallStatus = 'Fair';
            overallColor = '#f39c12';
            overallIcon = 'fa-info-circle';
        }
        
        // Update UI
        document.getElementById('overallStatus').textContent = overallStatus;
        document.getElementById('overallStatus').style.color = overallColor;
        document.querySelector('.status-icon i').className = `fas ${overallIcon}`;
        
        document.getElementById('hrStatus').textContent = hrStatus;
        document.getElementById('hrStatus').style.color = hrColor;
        
        document.getElementById('bpStatus').textContent = bpStatus;
        document.getElementById('bpStatus').style.color = bpColor;
        
        document.getElementById('activityStatus').textContent = activityStatus;
        document.getElementById('sleepStatus').textContent = sleepStatus;
        
        // Update compression ratio (simulated)
        const compressionRatio = 65 + Math.floor(Math.random() * 10); // 65-75%
        document.getElementById('compressionRatio').textContent = `${compressionRatio}%`;
        document.getElementById('compressionFill').style.width = `${compressionRatio}%`;
        
        // Generate recommendations
        generateRecommendations(heartRate, systolic, diastolic, steps, sleep, water);
        
        // Generate alerts if needed
        generateAlerts(heartRate, systolic, diastolic, steps, sleep);
        
        // Update chart with new data
        updateChartWithNewData(heartRate, steps);
        
        // Reset button
        analyzeBtn.innerHTML = originalText;
        analyzeBtn.disabled = false;
        
        // Show success message
        showNotification('Health analysis complete!', 'success');
        
    }, 1500); // 1.5 second delay to simulate processing
}

// Generate Recommendations
function generateRecommendations(hr, sys, dia, steps, sleep, water) {
    const recommendations = [];
    
    // Base recommendations
    recommendations.push({
        icon: 'fa-tint',
        title: 'Hydration',
        text: `Drink at least ${Math.max(8, 10 - water)} glasses of water daily to maintain proper hydration.`
    });
    
    // Sleep recommendations
    if (sleep < 7) {
        recommendations.push({
            icon: 'fa-bed',
            title: 'Sleep Quality',
            text: `Aim for 7-9 hours of quality sleep. You're currently getting ${sleep} hours.`
        });
    }
    
    // Activity recommendations
    if (steps < 7500) {
        recommendations.push({
            icon: 'fa-walking',
            title: 'Physical Activity',
            text: `Try to reach 10,000 steps daily. You're at ${steps} steps today.`
        });
    }
    
    // Heart rate recommendations
    if (hr > 100) {
        recommendations.push({
            icon: 'fa-heart',
            title: 'Heart Rate',
            text: 'Practice relaxation techniques like deep breathing to help lower your heart rate.'
        });
    } else if (hr < 60) {
        recommendations.push({
            icon: 'fa-heart',
            title: 'Heart Rate',
            text: 'Consult with your healthcare provider about your low resting heart rate.'
        });
    }
    
    // Blood pressure recommendations
    if (sys > 140 || dia > 90) {
        recommendations.push({
            icon: 'fa-tachometer-alt',
            title: 'Blood Pressure',
            text: 'Reduce sodium intake and consider monitoring your blood pressure regularly.'
        });
    }
    
    // Nutrition recommendation
    recommendations.push({
        icon: 'fa-apple-alt',
        title: 'Nutrition',
        text: 'Include at least 5 servings of fruits and vegetables in your daily diet.'
    });
    
    // Update UI
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    
    // Take first 3 recommendations
    recommendations.slice(0, 3).forEach(rec => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.innerHTML = `
            <i class="fas ${rec.icon} recommendation-icon"></i>
            <div class="recommendation-text">
                <h4>${rec.title}</h4>
                <p>${rec.text}</p>
            </div>
        `;
        recommendationsList.appendChild(item);
    });
}

// Generate Alerts
function generateAlerts(hr, sys, dia, steps, sleep) {
    const alerts = [];
    
    // Critical alerts
    if (hr > 120 || hr < 50) {
        alerts.push({
            type: 'danger',
            icon: 'fa-exclamation-circle',
            title: 'Critical Heart Rate',
            text: 'Your heart rate is outside safe limits. Please consult a healthcare professional.'
        });
    }
    
    if (sys > 180 || dia > 120) {
        alerts.push({
            type: 'danger',
            icon: 'fa-exclamation-circle',
            title: 'Critical Blood Pressure',
            text: 'Your blood pressure is dangerously high. Seek medical attention immediately.'
        });
    }
    
    // Warning alerts
    if (steps < 3000) {
        alerts.push({
            type: 'warning',
            icon: 'fa-exclamation-triangle',
            title: 'Low Activity Level',
            text: 'Your daily steps are very low. Try to incorporate more movement into your day.'
        });
    }
    
    if (sleep < 5) {
        alerts.push({
            type: 'warning',
            icon: 'fa-exclamation-triangle',
            title: 'Insufficient Sleep',
            text: 'You\'re not getting enough sleep. Lack of sleep can impact your health significantly.'
        });
    }
    
    // Info alerts
    alerts.push({
        type: 'info',
        icon: 'fa-info-circle',
        title: 'Regular Check-up',
        text: 'Remember to schedule your annual health check-up.'
    });
    
    // Update UI
    const alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = '';
    
    alerts.forEach(alert => {
        const item = document.createElement('div');
        item.className = `alert-item alert-${alert.type}`;
        item.innerHTML = `
            <i class="fas ${alert.icon}"></i>
            <div class="alert-text">
                <h4>${alert.title}</h4>
                <p>${alert.text}</p>
            </div>
        `;
        alertsList.appendChild(item);
    });
}

// Update Patient Info
function updatePatientInfo() {
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    
    showNotification(`Patient info updated: ${name}, ${age} years`, 'info');
}

// Generate New Recommendations
function generateNewRecommendations() {
    const btn = document.getElementById('generateNewRecs');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Get current values
        const heartRate = parseInt(document.getElementById('heartRate').value);
        const steps = parseInt(document.getElementById('steps').value);
        const sleep = parseFloat(document.getElementById('sleep').value);
        
        // Generate new recommendations
        const newRecs = [
            {
                icon: 'fa-brain',
                title: 'Mental Health',
                text: 'Practice mindfulness meditation for 10 minutes daily to reduce stress.'
            },
            {
                icon: 'fa-utensils',
                title: 'Meal Timing',
                text: 'Try to eat your meals at consistent times each day for better metabolism.'
            },
            {
                icon: 'fa-sun',
                title: 'Sunlight Exposure',
                text: 'Get 15-20 minutes of sunlight exposure daily for vitamin D synthesis.'
            },
            {
                icon: 'fa-users',
                title: 'Social Connection',
                text: 'Maintain regular social connections for emotional well-being.'
            },
            {
                icon: 'fa-book',
                title: 'Health Education',
                text: 'Read about nutrition and exercise to make informed health decisions.'
            }
        ];
        
        // Shuffle and pick 3
        const shuffled = newRecs.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        
        // Update UI
        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = '';
        
        selected.forEach(rec => {
            const item = document.createElement('div');
            item.className = 'recommendation-item';
            item.innerHTML = `
                <i class="fas ${rec.icon} recommendation-icon"></i>
                <div class="recommendation-text">
                    <h4>${rec.title}</h4>
                    <p>${rec.text}</p>
                </div>
            `;
            recommendationsList.appendChild(item);
        });
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        showNotification('New recommendations generated!', 'success');
    }, 1000);
}

// Chart Updates
function updateChartTimeRange(range) {
    let labels, heartRateData, stepsData;
    
    switch(range) {
        case 'Weekly':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            heartRateData = [72, 74, 71, 73];
            stepsData = [8.5, 7.8, 8.2, 8.9];
            break;
        case 'Monthly':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            heartRateData = [72, 73, 71, 72, 74, 73];
            stepsData = [8.5, 7.2, 8.8, 8.1, 7.9, 8.5];
            break;
        default: // Daily
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            heartRateData = [72, 75, 70, 68, 74, 76, 72];
            stepsData = [8.5, 7.2, 9.1, 6.8, 8.9, 5.4, 7.2];
    }
    
    healthChart.data.labels = labels;
    healthChart.data.datasets[0].data = heartRateData;
    healthChart.data.datasets[1].data = stepsData;
    healthChart.update();
}

function updateChartWithNewData(heartRate, steps) {
    // Add new data point to the chart
    const labels = healthChart.data.labels;
    const hrData = healthChart.data.datasets[0].data;
    const stepsData = healthChart.data.datasets[1].data;
    
    // Shift data left and add new data at the end
    labels.push(labels.shift());
    hrData.push(heartRate);
    hrData.shift();
    stepsData.push(steps / 1000); // Convert to thousands
    stepsData.shift();
    
    healthChart.update();
}

// Simulate Initial Data
function simulateInitialData() {
    // Simulate some random variations
    const heartRate = 70 + Math.floor(Math.random() * 10);
    const steps = 7000 + Math.floor(Math.random() * 3000);
    const sleep = 6.5 + Math.random() * 2;
    
    document.getElementById('heartRate').value = heartRate;
    document.getElementById('heartRateSlider').value = heartRate;
    document.getElementById('steps').value = steps;
    document.getElementById('sleep').value = sleep.toFixed(1);
    
    // Perform initial analysis
    setTimeout(() => analyzeHealthData(), 500);
}

// Real-time Updates Simulation
function setupRealTimeUpdates() {
    // Simulate real-time heart rate monitoring
    setInterval(() => {
        const currentHR = parseInt(document.getElementById('heartRate').value);
        const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newHR = Math.max(40, Math.min(200, currentHR + variation));
        
        document.getElementById('heartRate').value = newHR;
        document.getElementById('heartRateSlider').value = newHR;
        
        // Update chart occasionally
        if (Math.random() > 0.7) {
            updateChartWithNewData(newHR, parseInt(document.getElementById('steps').value));
        }
    }, 5000); // Update every 5 seconds
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'danger' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
    
    // Add CSS animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0;
                margin-left: 10px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Export functionality
document.addEventListener('keydown', function(e) {
    // Ctrl+S to export report
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        exportHealthReport();
    }
});

function exportHealthReport() {
    const patientName = document.getElementById('patientName').value;
    const overallStatus = document.getElementById('overallStatus').textContent;
    
    const report = `
HEALTH MONITORING AGENT - REPORT
================================
Patient: ${patientName}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

OVERALL STATUS: ${overallStatus}

VITAL SIGNS:
- Heart Rate: ${document.getElementById('heartRate').value} bpm
- Blood Pressure: ${document.getElementById('systolic').value}/${document.getElementById('diastolic').value}
- Temperature: ${document.getElementById('temperature').value}°F

ACTIVITY:
- Daily Steps: ${document.getElementById('steps').value}
- Sleep: ${document.getElementById('sleep').value} hours
- Water Intake: ${document.getElementById('water').value} glasses

RECOMMENDATIONS:
${Array.from(document.querySelectorAll('.recommendation-text')).map((item, i) => `${i + 1}. ${item.querySelector('h4').textContent}: ${item.querySelector('p').textContent}`).join('\n')}

ALERTS:
${Array.from(document.querySelectorAll('.alert-text')).map((item, i) => `${i + 1}. ${item.querySelector('h4').textContent}: ${item.querySelector('p').textContent}`).join('\n')}

Data Compression: ${document.getElementById('compressionRatio').textContent}

================================
Generated by Health Monitoring Agent v1.0
    `;
    
    // Create download link
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health_report_${patientName.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Health report exported!', 'success');
}