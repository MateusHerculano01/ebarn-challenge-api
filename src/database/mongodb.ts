import mongoose from 'mongoose';
import { connectionString } from '../database'

const connectMongo = async (): Promise<void> => {
  mongoose.connect(connectionString).then(() => console.log('💾 Connected to database'))
    .catch(err => {
      console.error('❌', err);
    });
};

export { connectMongo };
