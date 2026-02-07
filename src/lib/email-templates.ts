export const generateOrderEmail = (
    orderId: string,
    customer: { name: string; address: string; city: string; state: string; pincode: string; phone: string },
    items: any[],
    amount: number,
    paymentMethod: string,
    transactionId?: string
) => {
    // Current Date Formatted
    const orderDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const itemsHtml = items.map((item: any) => `
      <tr>
          <td style="padding: 12px 0; border-bottom: 1px dotted #D4C5B0; color: #4A4A4A; font-family: 'Georgia', serif;">
            ${item.name} <span style="font-size: 12px; color: #888;">(x${item.quantity})</span>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px dotted #D4C5B0; text-align: right; color: #2C1810; font-weight: 600;">
            ₹${(item.price * item.quantity).toLocaleString()}
          </td>
      </tr>
  `).join('');

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Order Confirmation - Vaishnavi Organics</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F9F8F6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">

  <!-- Main Container -->
  <div style="max-width: 600px; margin: 40px auto; background-color: #FFFFFF; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-top: 6px solid #B85C38;">
      
      <!-- Header Section with Temple Motif Aesthetic -->
      <div style="text-align: center; padding: 40px 20px 20px; background-image: radial-gradient(circle at top, #FFF8E1 0%, #FFFFFF 70%);">
          <!-- Decorative Icon (Simulating Line Art) -->
          <div style="font-size: 40px; margin-bottom: 10px; opacity: 0.8;">🛕</div> 
          
          <h1 style="margin: 0; color: #2C1810; font-family: 'Georgia', serif; font-size: 28px; letter-spacing: 1px;">Vaishnavi Organics</h1>
          <p style="color: #B85C38; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 8px;">The Essence of South India</p>
      </div>

      <!-- Greeting & Success Message -->
      <div style="padding: 20px 40px; text-align: center;">
          <h2 style="color: #4A4A4A; font-size: 20px; margin-bottom: 15px; font-weight: normal;">Vanakkam, ${customer.name}!</h2>
          <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">
              Your order has been successfully placed. We are delighted to bring a piece of our heritage to your home.
          </p>
      </div>

      <!-- Theme Highlight Section: Best South Indian Places -->
      <div style="margin: 20px 40px; padding: 20px; background-color: #FFFDF5; border: 1px dashed #DAA520; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0 0 10px; color: #B85C38; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Sourced from the Land of Wonders</h3>
          <p style="color: #555; font-size: 13px; line-height: 1.6; font-style: italic; margin: 0;">
              From the backwaters of <strong>Kerala</strong> to the temples of <strong>Tamil Nadu</strong>,<br>
              the heritage of <strong>Karnataka</strong> to the spices of <strong>Andhra & Telangana</strong>.
          </p>
      </div>

      <!-- Order Details Section -->
      <div style="padding: 10px 40px 30px;">
          <div style="border-top: 2px solid #EEE; border-bottom: 2px solid #EEE; padding: 20px 0; margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span style="color: #888; font-size: 13px; text-transform: uppercase;">Order ID</span>
                  <span style="color: #2C1810; font-weight: bold;">${orderId}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span style="color: #888; font-size: 13px; text-transform: uppercase;">Date</span>
                  <span style="color: #2C1810;">${orderDate}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                  <span style="color: #888; font-size: 13px; text-transform: uppercase;">Payment</span>
                  <span style="color: #2C1810; text-transform: capitalize;">${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
              </div>
              ${transactionId ? `
              <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                  <span style="color: #888; font-size: 13px; text-transform: uppercase;">Transaction ID</span>
                  <span style="color: #2C1810; font-weight: bold;">${transactionId}</span>
              </div>
              ` : ''}
          </div>

          <!-- Items Table -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              ${itemsHtml}
          </table>

          <!-- Total Amount -->
          <div style="text-align: right;">
              <p style="margin: 0; font-size: 13px; color: #888; text-transform: uppercase;">Total Amount</p>
              <p style="margin: 5px 0 0; font-size: 24px; color: #B85C38; font-weight: bold; font-family: 'Georgia', serif;">₹${amount.toLocaleString()}</p>
          </div>
      </div>

      <!-- Delivery & Support Info -->
      <div style="background-color: #F4F1EA; padding: 30px 40px; display: flex; flex-direction: column; gap: 20px;">
         
         <!-- Delivery Address -->
         <div>
            <h4 style="margin: 0 0 10px; color: #2C1810; font-size: 14px; text-transform: uppercase;">Delivery Location</h4>
            <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.5;">
                ${customer.address}<br>
                ${customer.city}, ${customer.state} - ${customer.pincode}
            </p>
         </div>

         <!-- Support -->
         <div style="border-top: 1px solid #D4C5B0; padding-top: 20px;">
            <p style="margin: 0; color: #666; font-size: 13px; line-height: 1.5;">
                <strong>Need Help?</strong><br>
                Contact our support team at <a href="mailto:support@vaishnaviorganics.com" style="color: #B85C38; text-decoration: none;">support@vaishnaviorganics.com</a>
            </p>
         </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #2C1810; color: #D4C5B0; text-align: center; padding: 20px; font-size: 12px;">
          <p style="margin: 0 0 10px;">Thank you for preserving traditions.</p>
          <p style="margin: 0; opacity: 0.6;">&copy; ${new Date().getFullYear()} Vaishnavi Organics</p>
      </div>
  </div>
</body>
</html>
  `;
};
