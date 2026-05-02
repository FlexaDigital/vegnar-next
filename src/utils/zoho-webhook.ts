// Zoho CRM Webhook Integration via API Route
export interface ZohoLeadData {
  formType: string;
  fullName?: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  message?: string;
  [key: string]: any; // For additional fields
}

export const sendToZohoCRM = async (leadData: ZohoLeadData): Promise<void> => {
  try {
    const response = await fetch('/api/zoho-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });
    
    if (!response.ok) {
      console.error('Zoho CRM integration failed');
    }
  } catch (error) {
    // Silent fail - don't block form submission
  }
};