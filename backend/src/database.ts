
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure dotenv is configured

const dbUri: string | undefined = process.env.MONGO_DATABASE_URL;

if (!dbUri) {
  throw new Error('MongoDB connection string is not defined in the .env file');
}

export const connectToDatabase = async (): Promise<boolean> => {
  try {
    await mongoose.connect(dbUri);
    console.log('Successfully connected to MongoDB' );
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    return false;
  }
};

