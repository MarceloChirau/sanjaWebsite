

const navMenu=document.querySelector('.menu-is-closed');
const hamburgerBtn=document.querySelector('.hamburder-btn');

hamburgerBtn.addEventListener('click',()=>{
    document.body.classList.toggle('nav-open');
 
 
     hamburgerBtn.classList.toggle('open');
 })

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get the session_id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
        try {
            // 2. Fetch session details from your backend
            const response = await fetch(`/api/v1/booking/session-detail/${sessionId}`);
            const result = await response.json();

            if (response.ok) {
                const session = result.session;
                // 3. Update the UI
                document.getElementById('customer-name').textContent = session.customer_details.name;
                document.getElementById('amount-paid').textContent = (session.amount_total / 100).toFixed(2);
                document.getElementById('order-id').textContent = session.id.slice(-10); // Last 10 chars
            }
        } catch (err) {
            console.error('Error fetching session:', err);
        }
    }
});