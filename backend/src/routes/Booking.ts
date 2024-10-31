import { Router } from "express";
import verifyToken from "../middleware/auth";
import Stripe from "stripe"
import { Response,Request } from "express";
import { Booking } from "../model/hotel";
import Hotel from "../model/hotel";
const router=Router();
const stripe = new Stripe(process.env.STRIPE_KEY as string);

router.post("/payment-intent",verifyToken,async(req:Request,res:Response)=>{
   
    const { price } = req.body;
    const userId=req.userId;
   
   

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(price) * 100), // Convert dollars to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error:any) {
   
    res.status(500).json({ error: error.message });
  }
    
})



   
  


// Create a booking
router.post('/',verifyToken, async (req: Request, res: Response) => {
  const {  hotelId, checkIn, checkOut, adultCount, childCount, firstName, lastName, email, totalCost } = req.body;
  const userId=req.userId;
  try {
    // Create a new booking
    const newBooking = new Booking({
      userId,
      hotelId,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      firstName,
      lastName,
      email,
      totalCost, // Ensure total cost is included in booking data
    });

    // Save the new booking
    await newBooking.save();

    // Find the hotel and update its bookings array
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Push the new booking into the hotel's bookings array
    hotel.bookings.push(newBooking);
    
    // Save the updated hotel document
    await hotel.save();

    // Respond with the booking details
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error: any) {
    
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }


});




// Get bookings for a user
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId; // Get userId from the request object
  
  try {
    // Find bookings by userId
    const bookings = await Booking.find({ userId });
   
    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error: any) {
    
    res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
  }
});

  





export default router;

