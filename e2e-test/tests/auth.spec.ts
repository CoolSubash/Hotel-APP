import { test, expect } from '@playwright/test';


const url="http://localhost:5173/";
test('Should allow the user to Sign In', async ({ page }) => {
  
  // Go to the initial URL
  await page.goto(url);
  
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

 

  const myBookings = page.getByText("My Bookings");
  const myHotels = page.getByText("My Hotels");
  const signOutButton = page.getByText("Sign Out");
  await expect(myBookings).toBeVisible();
  await expect(myHotels).toBeVisible();
  await expect(signOutButton).toBeVisible();

});

const registerUrl= "http://localhost:5173/register"



test('Should allow the user to Register', async ({ page }) => {
  
  const number=Math.floor(Math.random()*9999)+1000
  const user_email=`user_email${number}@gmail.com`
  // Go to the registration page
  await page.goto(registerUrl);
  
  // Check for the email input field and fill it
   page.getByText("Create an Account")
  const emailField = page.locator('input[type="email"]');
  await expect(emailField).toBeVisible();
  await emailField.fill(user_email);  // Test email

  // Check for the password input field and fill it
  const passwordField = page.locator('input[name="password"]');
  await expect(passwordField).toBeVisible();
  await passwordField.fill('123123');  // Test password

  // Check for the confirm password input field and fill it
  const confirmPasswordField = page.locator('input[name="confirmPassword"]');
  await expect(confirmPasswordField).toBeVisible();
  await confirmPasswordField.fill('123123');  // Same password for confirmation

  // Check for the first name input field and fill it
  const firstNameField = page.locator('input[name="firstName"]');
  
  await firstNameField.fill('Subash');  // Test first name

  // Check for the last name input field and fill it
  const lastNameField = page.locator('input[name="lastName"]');
  
  await lastNameField.fill('Neupane');  // Test last name

  // Check for the "Register" button and click it
  const registerButton = page.locator('button[type="submit"]', { hasText: 'Create Account' });
  
  await registerButton.click();

  // Wait for the success message or redirection
  
  await expect(page.getByText("My Bookings")).toBeVisible()
  


});




