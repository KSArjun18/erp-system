require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const userRouter = require("./routes/user");
const timesheetRouter = require("./routes/timesheet");
const attendanceRouter = require("./routes/attendance");
const payrollRouter = require("./routes/payroll");
const employeeRoutes=require("./routes/employee")

app.use(express.json());

app.use(cors())
app.use("/api/v1", userRouter);
app.use("/api/v1/time_sheets", timesheetRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/payrolls", payrollRouter);
app.use('/api/v1/employee', employeeRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

