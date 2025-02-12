export async function testSupabaseInsert() {
         try {
                  const response = await fetch('https://drnyyxtshnzwgkabxtgr.supabase.co/rest/v1/user_waitlist', {
                           method: 'POST',
                           headers: {
                                    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                                    'Content-Type': 'application/json',
                           },
                           body: JSON.stringify({ email: 'test@example.com' }),
                  });

                  console.log('Status:', response.status);

                  const text = await response.text();
                  console.log('Raw Response:', text);

                  if (text) {
                           const data = JSON.parse(text);
                           console.log('Parsed JSON:', data);
                  } else {
                           console.log('No content returned from server.');
                  }
         } catch (error) {
                  console.error('Fetch Error:', error);
         }
}
