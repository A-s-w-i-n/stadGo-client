import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import api, { apiAuth } from "../../servises/api/axios interceptor ";
import { useNavigate } from "react-router-dom";
import { stadim } from "../../domain/modals/stadium";
import OwnerNav from "../navbar/ownerNav";

const VideoUpload = () => {
  const navigate = useNavigate();
  const [stadiumInfo, setStadiumInfo] = useState<stadim[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uplodeVideo, setVideoUplode] = useState<string>("");
  const [uplodeVideoModal, setuplodeVideoModal] = useState(false);

  const openUplodeVideoModal = () => {
    setuplodeVideoModal(true);
  };
  const closeUplodeVideoModal = () => {
    setuplodeVideoModal(false);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadVideoToS3 = async (file: File) => {
    console.log("working");
    const s3 = new AWS.S3({
      accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: import.meta.env.VITE_S3BUCKET_NAME,
      Key: `videos/${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    try {
      const response = await s3.upload(params).promise();
      console.log("File uploaded:", response.Location);
      setVideoUplode(response.Location);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      if(selectedFile.type.startsWith('video/')){

        uploadVideoToS3(selectedFile);
      }else{
        console.log("Selected file is not a valid video");
        
      }
    }
  };

  const emailId = JSON.parse(localStorage.getItem("owner") as string);
  const emailCheck = emailId.OwnerLoginCheck;
  const email = emailCheck.email;

  const fetchVideo=()=>{

    
      apiAuth.post("/stadium/fetchStadium", { email }).then((result) => {
        console.log(result.data.fetchStadiumData[0]._id);

        setStadiumInfo(result.data.fetchStadiumData);
        // console.log(stadiumInfo[0].video);
    });
  

}

useEffect(()=>{
  fetchVideo()
},[])

  const uplodeVideos = async () => {
    handleUpload();
    const id = stadiumInfo[0]._id;
    if (uplodeVideo) {
      const uplode = await apiAuth.post("/owner/videoUplode", {
        uplodeVideo,
        id,
      });
      fetchVideo()
      if (uplode.status) {
        closeUplodeVideoModal();
        stadiumInfo[0].video;
      }
    } else {
    }
  };
  // useEffect(()=>{

  // },[])

  return (
    <div>
      <OwnerNav />
      <div>
        {stadiumInfo.map((item) => (
          <div className=" flex flex-wrap ">
            <div className="w-full ml-[6rem] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4  rounded overflow-hidden shadow-lg">
              <img
                className="w-full rounded-2xl"
                src={item.image[0]}
                alt="Sunset in the mountains"
              />
              <video
                className="grid rounded-2xl mt-9"
                controls
                width="400"
                src={item.video}
              />

              <div className="px-6 py-4">
                <div className="font-bold text-xl text-center mb-2">
                  {item.stadiumname}
                </div>
              </div>
              <div className="flex items-center justify-center px-6 pt-4 pb-2">
                <button
                  className="bg-cyan-400  px-3 py-2 rounded-2xl"
                  onClick={openUplodeVideoModal}
                >
                  UPLODE
                </button>
              </div>
            </div>
          </div>
        ))}
        {uplodeVideoModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="border rounded-xl bg-slate-200 border-black w-100">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onClick={handleFileChange}
                  />
                </label>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className=" border border-black bg-white text-black  py-2 px-4 rounded-md hover:bg-slate-300 mt-4"
                  onClick={uplodeVideos}
                >
                  Upload
                </button>
              </div>
              <div>
                <button
                  className="bg-cyan-400 px-3 py-3 rounded-2xl"
                  onClick={closeUplodeVideoModal}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
