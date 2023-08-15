import React, { useState } from "react";
import { myBucket, s3Config } from "../../s3Config";
import AWS from 'aws-sdk'

const VideoUplode = () => {
//   const [video, setVideo] = useState<File>(new File([], ""));
//   const  [prograss,setPrograss] = useState(0)

 
//   const uplodeFile =(e:React.MouseEvent<HTMLButtonElement>,file : any)=>{
//     e.preventDefault()

//     try {
//         const params ={
//             body : file,
//             bucket : s3Config.bucketName,
//             key : `videos/${file.name}`
//         }

//         myBucket.putObject(params).on("httpUploadProgress",(e)=>{
//             setPrograss(Math.round((e.loaded/e.total)*100))
//         }).on("success",(response)=>{
//             console.log('res',response.data)
            
//             const fileLocation = `https://s3.amazonaws.com/${params.bucket}/${params.key}`;
//             console.log('file location',fileLocation);
//         }).send((err,data)=>{
            
//         })
//     } catch (error) {
        
//     }

//   }

//   const uplodeNewFile = (e:React.MouseEvent<HTMLButtonElement>)=>{

//     e.preventDefault()


//     const s3 = new AWS.S3({
//         accessKeyId :s3Config.accessKeyId,
//         secretAccessKey : s3Config.secretAccessKey,
//         region :s3Config.region
//     })

//     const videoParams = {
//         body : setVideo,
//         bucket : s3Config.bucketName,
//     }

//     Promise.all([
//         s3.upload(videoParams).promise(),
//     ]).then(async([vidioResponse] )=>{
//         console.log('video Response ',vidioResponse);
//         const videoLocations = import.meta.env.VITE_S3BUCKET_URL/`${vidioResponse.Key}`

//       const videoLocation =vidioResponse.Key
//       console.log("videoLocation",videoLocation);
      

//       const handleVideoChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
//         const file :File | null =e.target.files?.[0] || null

//         setVideo(file as File)
//       }
//       if(videoLocation){

//       }
        
//     })
//   }
const [video, setVideo] = useState<File | null>(null);
const [prograss, setPrograss] = useState(0);

const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file: File | null = e.target.files?.[0] || null;
  setVideo(file);
}

const uploadFile = async () => {
  if (!video) {
    console.log("No video selected.");
    return;
  }

  try {
    const s3 = new AWS.S3({
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey,
      region: s3Config.region
    });

    const videoParams = {
      Body: video,
      Bucket: s3Config.bucketName,
      Key: `videos/${video.name}`
    };

    const videoResponse = await s3.upload(videoParams).promise();
    console.log('video Response', videoResponse);

    const videoLocation = `${import.meta.env.VITE_S3BUCKET_URL}/${videoResponse.Key}`;
    console.log("videoLocation", videoLocation);

  } catch (error) {
    console.error("Error uploading video:", error);
  }
}
  



  return (
    <div>
      <h1>Video Upload</h1>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <button  onClick={uploadFile}>Upload Video</button>
    </div>
  );
};

export default VideoUplode;
