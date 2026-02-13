import mongoose from "mongoose";
import dotenv from "dotenv";
import { job as Job } from "./models/job.model.js";
import { Company } from "./models/company.model.js";
import { User } from "./models/user.model.js";

dotenv.config({});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const seedJobs = async () => {
    try {
        // Create user first
        let userId;
        const existingUsers = await User.findOne();
        if (!existingUsers) {
            console.log("Creating sample user...");
            const user = await User.create({
                fullname: "Admin User",
                email: "admin@techcorp.com",
                phoneNumber: 9999999999,
                password: "password123",
                role: "recruiter"
            });
            userId = user._id;
            console.log("User created:", userId);
        } else {
            userId = existingUsers._id;
        }

        // Check if companies exist
        let companyId;
        const existingCompanies = await Company.findOne();
        if (!existingCompanies) {
            console.log("Creating sample company...");
            const company = await Company.create({
                name: "Tech Corp India",
                description: "Leading tech company",
                website: "https://techcorp.com",
                location: "Delhi NCR",
                logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ584acfWMPuHP7nRm1z5_Yt5zLmKyGrANsQ&s",
                userID: userId
            });
            companyId = company._id;
            console.log("Company created:", companyId);
        } else {
            companyId = existingCompanies._id;
        }

        // Sample jobs data
        const sampleJobs = [
            {
                title: "Senior Frontend Developer",
                description: "Looking for experienced React developer with 3+ years experience to build amazing web applications.",
                requirements: ["React", "JavaScript", "CSS", "REST APIs"],
                salary: 12,
                experienceLevel: 3,
                location: "Delhi NCR",
                jobType: "Full-time",
                position: 2,
                company: companyId,
                created_by: userId
            },
            {
                title: "Backend Engineer",
                description: "We are hiring a backend engineer experienced with Node.js and MongoDB. Join our growing team!",
                requirements: ["Node.js", "Express", "MongoDB", "JavaScript"],
                salary: 14,
                experienceLevel: 2,
                location: "Bangalore",
                jobType: "Full-time",
                position: 3,
                company: companyId,
                created_by: userId
            },
            {
                title: "Full Stack Developer",
                description: "Full stack opportunity with MERN stack. Build scalable applications from frontend to backend.",
                requirements: ["React", "Node.js", "MongoDB", "Express"],
                salary: 15,
                experienceLevel: 2,
                location: "Hyderabad",
                jobType: "Full-time",
                position: 1,
                company: companyId,
                created_by: userId
            },
            {
                title: "UI/UX Designer",
                description: "Creative designer needed to create beautiful and functional user interfaces.",
                requirements: ["Figma", "UI Design", "Prototyping", "CSS"],
                salary: 10,
                experienceLevel: 2,
                location: "Pune",
                jobType: "Full-time",
                position: 2,
                company: companyId,
                created_by: userId
            },
            {
                title: "DevOps Engineer",
                description: "Manage and optimize cloud infrastructure on AWS and Docker containers.",
                requirements: ["AWS", "Docker", "Kubernetes", "Linux"],
                salary: 16,
                experienceLevel: 3,
                location: "Mumbai",
                jobType: "Full-time",
                position: 1,
                company: companyId,
                created_by: userId
            },
            {
                title: "Data Scientist",
                description: "Work with big data and machine learning to solve real-world problems.",
                requirements: ["Python", "Machine Learning", "SQL", "Data Analysis"],
                salary: 18,
                experienceLevel: 3,
                location: "Bangalore",
                jobType: "Full-time",
                position: 2,
                company: companyId,
                created_by: userId
            }
        ];

        // Clear existing jobs (optional - comment out if you want to keep existing jobs)
        // await Job.deleteMany({});
        // console.log("Cleared existing jobs");

        // Insert new jobs
        const insertedJobs = await Job.insertMany(sampleJobs);
        console.log(`✅ Successfully inserted ${insertedJobs.length} jobs!`);
        console.log("Sample jobs added to database");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding jobs:", error);
        process.exit(1);
    }
};

const runSeed = async () => {
    await connectDB();
    await seedJobs();
};

runSeed();
