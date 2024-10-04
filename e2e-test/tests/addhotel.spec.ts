import { test, expect } from '@playwright/test';
import path from 'path';  // Import path to handle file paths

const baseUrl = "http://localhost:5173/";
const addHotelUrl = `${baseUrl}add-hotel`;

async function signIn(page:any) {
  // Go to the sign-in page
  await page.goto(baseUrl);
  
  // Locate the "Sign In" link and click it
  const signInLink = page.locator('a', { hasText: 'Sign In' });
  await expect(signInLink).toBeVisible();
  await signInLink.click();

  // Wait for the page to redirect to the sign-in page
  await expect(page).toHaveURL('http://localhost:5173/sign-in');

  // Check for the email input field and fill it
  const emailField = page.locator('input[type="email"]');
  await expect(emailField).toBeVisible();
  await emailField.fill('subashneupane2024@gmail.com');  // Fill with test email

  // Check for the password input field and fill it
  const passwordField = page.locator('input[type="password"]');
  await expect(passwordField).toBeVisible();
  await passwordField.fill('123123');  // Fill with test password

  // Check for the "Sign In" button and click it
  const signInButton = page.locator('button[type="submit"]', { hasText: 'Login' });
  await expect(signInButton).toBeVisible();
  await signInButton.click();
  // Check if the user is redirected and logged in
  await expect(page.getByText("My Bookings")).toBeVisible();
  await expect(page.getByText("My Hotels")).toBeVisible();
  await expect(page.getByText("Sign Out")).toBeVisible();
}

// Before each test, the user will sign in
test.beforeEach(async ({ page }) => {
   await signIn(page)
});

test('Should allow the user to add a hotel after signing in', async ({ page }) => {
    // Navigate to the "Add Hotel" page after login
    await page.goto(addHotelUrl);
  
    // Fill out the hotel form
    await page.fill('input[name="name"]', 'Test Hotel');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="country"]', 'USA');
    await page.fill('textarea[name="description"]', 'A luxurious hotel in New York.');
    await page.fill('input[name="pricePerNight"]', '150');
    await page.selectOption('select[name="starRating"]', '4');
    
    // Select type and facilities
    await page.getByText("Budget").click();
    await page.getByText("Free Wifi").check();
    await page.getByText("Parking").check();
    await page.getByText("Spa").check();
    
    // Fill remaining fields
    await page.fill('input[name="adultCount"]', '2');
    await page.fill('input[name="childCount"]', '1');
  
    // Correct the file upload path
    
    const fileInput = page.locator('input[name="imageFiles"]'); // Ensure this matches your HTML
    await fileInput.setInputFiles(path.join(__dirname, "file", "test.jpeg")); // Ensure the path is correct
  
    // Submit the form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
  
    // Wait for confirmation or redirection
    await expect(page.getByText('Hotel added successfully')).toBeVisible();
});
