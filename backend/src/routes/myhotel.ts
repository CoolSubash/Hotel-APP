import express, { Response, Request } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { Router } from "express";
import { body, validationResult } from "express-validator";
import { HotelType } from "../shared/types"; // Ensure this is your type definition
import verifyToken from "../middleware/auth";
import { getHotel } from "../controller/myhotels"; // Adjust this import as necessary
import streamifier from "streamifier";
import Hotel from "../model/hotel"; // Import the Hotel model

// Validation rules
const hotelValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Hotel type is required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price per night is required and must be a number"),
  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required and must be an array"),
  body("adultCount")
    .notEmpty()
    .isNumeric()
    .withMessage("Adult count is required and must be a number"),
  body("childCount")
    .notEmpty()
    .isNumeric()
    .withMessage("Child count is required and must be a number"),
  body("starRating")
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage("Star rating is required and must be between 1 and 5"),
];

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max per file
    files: 6, // Limit to 6 files
  },
});

// Create the router
const router = Router();

const uploadImage = async (files: any) => {
  const urls: string[] = [];
  await Promise.all(
    files.map((file: Express.Multer.File) => {
      return new Promise<void>((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          (error: any, result: any) => {
            if (error) {
              return reject(error);
            }
            if (result) {
              urls.push(result.secure_url); // Store the URL in the array
            }
            resolve();
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    })
  );

  return urls;
};

// Image upload route
router.post(
  "/",
  verifyToken,
  upload.array("imageFiles"), // Ensure the key matches in Postman
  hotelValidation,
  async (req: Request, res: Response) => {
    console.log(req.body)
    console.log(req.files)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    try {
      const files = req.files as Express.Multer.File[] | undefined;
      if (!files || files.length === 0) {
        return res.status(400).send("No file uploaded");
      }
   
      const urls: string[] = await uploadImage(files);
     
      

      // Extract and convert fields
      const {
        name,
        city,
        country,
        description,
        type,
        adultCount,
        childCount,
        facilities,
        pricePerNight,
        starRating,
      } = req.body;
     

      // Create a new Hotel instance with converted types
      const newHotelData: Partial<HotelType> = {
        userId: (req as any).userId, // TypeScript might need type assertion
        name,
        city,
        country,
        description,
        type,
        adultCount: Number(adultCount),
        childCount: Number(childCount),
        facilities: Array.isArray(facilities) ? facilities : [facilities],
        pricePerNight: Number(pricePerNight),
        starRating: Number(starRating),
        lastUpdated: new Date(),
        imageUrls: urls,
        bookings: [],
      };
      

      const hotel = new Hotel(newHotelData);
      await hotel.save();

      return res
        .status(201)
        .json({ message: "Hotel added successfully", hotel });
    } catch (error) {
      console.error("Error during image upload or hotel save:", error);
      return res.status(500).send("Error processing request");
    }
  }
);

// Route to update the hotel

router.put("/:id", verifyToken, upload.array("imageFiles",6), hotelValidation,async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.files);
  
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) {
      return res.status(400).send("No file uploaded");
    }

    try {
      const id = req.params.id;
      const existingHotel = await Hotel.findById(id);
      if (!existingHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      if (existingHotel.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "You are not authorized to delete this hotel" });
      }

      const existingImageUrls = existingHotel.imageUrls;

      for (const url of existingImageUrls) {
        const publicId = url.split("/").pop()?.split(".")[0];
        console.log(publicId);
        if (publicId) {
          await cloudinary.v2.uploader.destroy(publicId);
        }
      }

      const urls: string[] = await uploadImage(files);
      console.log(urls);

      const {
        name,
        city,
        country,
        description,
        type,
        adultCount,
        childCount,
        facilities,
        pricePerNight,
        starRating,
      } = req.body;

      // Create a new Hotel instance with converted types
      const newHotelData: Partial<HotelType> = {
        userId: (req as any).userId, // TypeScript might need type assertion
        name,
        city,
        country,
        description,
        type,
        adultCount: Number(adultCount),
        childCount: Number(childCount),
        facilities: Array.isArray(facilities) ? facilities : [facilities],
        pricePerNight: Number(pricePerNight),
        starRating: Number(starRating),
        lastUpdated: new Date(),
        imageUrls: urls,
        bookings: [],
      };

      const hotel = await Hotel.findByIdAndUpdate(
        {
          _id:id,
        },
        newHotelData,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

     
      res.status(201).json({message:"Updated Successfully"});
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Error while Updating  hotels" });
    }
  }
);

// Route to get hotels
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotelList = await Hotel.find({
      userId: req.userId,
    }).sort({lastUpdated:-1});
  

    return res.json(hotelList);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

// Route to get single hotels

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const hotelList = await Hotel.find({
      _id: id,
      userId: req.userId,
    });

    return res.json(hotelList);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

// Router to Delete Hotel

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id=req.params.id;
    const existingHotel = await Hotel.findById(id);
    if (!existingHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
     // Verify the logged-in user is the owner of the hotel
     if (existingHotel.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not authorized to delete this hotel" });
    }

    const existingImageUrls = existingHotel.imageUrls;

    for (const url of existingImageUrls) {
      const publicId = url.split("/").pop()?.split(".")[0];
     
      if (publicId) {
        await cloudinary.v2.uploader.destroy(publicId);
      }
    }
    const deleteHotel = await Hotel.findByIdAndDelete({
      _id: req.params.id,
      userID: req.userId,
    });

    return res.status(200).send("Hotel Deleted Successfully");
  } catch (err) {
    return res.status(500).send("Something Went Wrong Try again");
  }
});

// Export the router
export default router;
