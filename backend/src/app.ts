import express,{Request,Response,NextFunction} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import githubRoutes from "./routes/githubRoutes";

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"))
let base="/api/v1";
app.use(base+"/auth", authRoutes);
app.use(base+"/user", userRoutes);
app.use(base+"/github", githubRoutes);
app.get(base, (req:Request, res:Response) => success(res,"GitHub Recap Backend Running!",200));
app.get("/", (req:Request, res:Response) => success(res,"GitHub Recap Backend Running!",200));
app.all(base+"/{*spalt}" (req:Request, res:Response) => error(res,"Route not found.",req.url)));
app.all("{*spalt}" (req:Request, res:Response) => error(res,"Route not found.",req.url));
app.get((err:Error,req:Request, res:Response,next:NextFunction) => error(res,"Error occured!",err));

export default app;
