import pgPromise from 'pg-promise';
import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
dotenv.config();





import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionAPI from './fuel-consumption-api.js';

const pgp = pgPromise();

const connectionOptions = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production', // Enable SSL in production
};

const db = pgp(connectionOptions);

const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption)

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
    cors({
        origin:"*",
        credentials: true
    })
)
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));


app.get('/api/vehicles', fuelConsumptionAPI.vehicles);
app.get('/api/vehicle', fuelConsumptionAPI.vehicle);
app.post('/api/vehicle', fuelConsumptionAPI.addVehicle);
app.post('/api/refuel', fuelConsumptionAPI.refuel);

app.listen(PORT, () => console.log(`App listening on localhost:${PORT}`));

