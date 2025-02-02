import multer from "multer";
import path from 'path';
import fs from "fs"

// Define temp directory using absolute path
const tempDir = path.join(process.cwd(), 'public', 'temp');

// Create directory if it doesn't exist
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,tempDir)
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)
        cb(null,file.originalname+"-"+uniqueSuffix)
    }
})

const upload = multer({
    storage,
})

export {upload}